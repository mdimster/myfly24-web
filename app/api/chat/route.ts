import { NextRequest, NextResponse } from "next/server";
import { rateLimit, LIMITS } from "@/app/lib/rate-limit";
import { cacheKey, getCached, setCache } from "@/app/lib/cache";
import { getPhase } from "@/app/lib/prompts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  conversationId?: string;
}

export async function POST(req: NextRequest) {
  try {
    // ─── API Key Check ───
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API nicht konfiguriert" },
        { status: 503 }
      );
    }

    // ─── Rate Limiting ───
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const dailyLimit = rateLimit(
      `daily:${ip}`,
      LIMITS.CONVERSATIONS_PER_DAY,
      LIMITS.DAY_MS
    );

    if (!dailyLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Du hast heute schon viele Beratungen gestartet. Probier es morgen wieder – oder melde dich für unseren Newsletter an!",
          type: "rate_limit",
        },
        { status: 429 }
      );
    }

    // ─── Parse Body ───
    const body: ChatRequest = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Keine Nachrichten gesendet" },
        { status: 400 }
      );
    }

    // Message limit per conversation
    if (messages.length > LIMITS.MESSAGES_PER_CONVERSATION) {
      return NextResponse.json(
        {
          error:
            "Diese Beratung ist schon sehr lang. Starte eine neue für frische Empfehlungen!",
          type: "message_limit",
        },
        { status: 429 }
      );
    }

    // ─── Phase bestimmen ───
    const userMessages = messages.filter((m) => m.role === "user");
    const { model, systemPrompt, phase } = getPhase(userMessages.length);

    // ─── Cache Check (nur für Recommendation-Phase) ───
    if (phase === "recommend") {
      const answers = userMessages.map((m) => m.content);
      const key = cacheKey(answers);
      const cached = getCached(key);

      if (cached) {
        return NextResponse.json({
          content: cached,
          model: "cache",
          phase,
          cached: true,
        });
      }
    }

    // ─── Anthropic API Call ───
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: phase === "qualify" ? 256 : 1024,
        system: systemPrompt,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Anthropic API error:", response.status, errorData);

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Der Berater ist gerade sehr beschäftigt. Versuch es in einer Minute nochmal." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Es gab ein Problem mit dem Reiseberater. Bitte versuche es erneut." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.content
      ?.map((block: { type: string; text?: string }) =>
        block.type === "text" ? block.text : ""
      )
      .filter(Boolean)
      .join("\n");

    if (!content) {
      return NextResponse.json(
        { error: "Leere Antwort vom Berater" },
        { status: 502 }
      );
    }

    // ─── Cache setzen (nur für Recommendations) ───
    if (phase === "recommend") {
      const answers = userMessages.map((m) => m.content);
      const key = cacheKey(answers);
      setCache(key, content);
    }

    return NextResponse.json({
      content,
      model: model.includes("haiku") ? "haiku" : "sonnet",
      phase,
      cached: false,
      usage: {
        input: data.usage?.input_tokens,
        output: data.usage?.output_tokens,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Unerwarteter Fehler. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
