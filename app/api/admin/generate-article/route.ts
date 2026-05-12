import { NextRequest, NextResponse } from "next/server";
import { saveArticle, ARTICLE_IMAGES, TOPIC_POOL, getAllArticles, getImageForCategory } from "@/app/lib/articles";

const ADMIN_KEY = process.env.ADMIN_KEY || "myfly24-admin-2026";

const ARTICLE_PROMPT = `Du bist der Chefredakteur des myFly24 Reisemagazins – dem Online-Magazin des KI-Reiseberaters myFly24.

Schreibe einen hochwertigen Magazin-Artikel zum folgenden Thema. Der Artikel soll informativ, unterhaltsam und praktisch sein.

ANFORDERUNGEN:
- Sprache: Deutsch, du-Form, modern aber nicht flapsig
- Länge: 800-1200 Wörter
- Ton: Wie ein kluger Reise-Freund, der echte Erfahrung hat
- Struktur: Einleitung, 3-5 Abschnitte mit Zwischenüberschriften, Fazit
- Konkrete Tipps: Nenne echte Orte, Preise (Schätzungen), Zeiträume
- Ehrlich: Nenne auch Nachteile oder Dinge die man beachten sollte
- Am Ende: Ein kurzer Hinweis dass der myFly24 Reiseberater bei der Planung helfen kann

FORMAT: Antworte NUR mit einem JSON-Objekt (kein Markdown-Block, kein Fließtext davor/danach):
{
  "title": "Packender Titel (max 60 Zeichen)",
  "excerpt": "Kurzer Teaser für die Vorschau (max 160 Zeichen)",
  "content": "Vollständiger Artikel in Markdown (mit ## für Überschriften, **fett**, - für Listen)",
  "readingTime": 5
}`;

export async function POST(req: NextRequest) {
  try {
    // Auth-Check
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${ADMIN_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API nicht konfiguriert" }, { status: 503 });
    }

    const body = await req.json();
    const { topic, category } = body;

    if (!topic || !category) {
      return NextResponse.json({ error: "Topic und Category erforderlich" }, { status: 400 });
    }

    // Bild basierend auf Kategorie wählen (vermeidet Duplikate)
    const existingArticles = getAllArticles();
    const usedImages = existingArticles.map((a) => a.image);
    const image = getImageForCategory(category, usedImages);

    // Artikel generieren
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: ARTICLE_PROMPT,
        messages: [
          {
            role: "user",
            content: `Thema: ${topic}\nKategorie: ${category}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Article generation error:", response.status, err);
      return NextResponse.json({ error: "Artikel-Generierung fehlgeschlagen" }, { status: 502 });
    }

    const data = await response.json();
    const rawText = data.content
      ?.map((block: { type: string; text?: string }) => block.type === "text" ? block.text : "")
      .filter(Boolean)
      .join("\n");

    // JSON parsen
    const cleaned = rawText.replace(/```json\n?|```\n?/g, "").trim();
    const articleData = JSON.parse(cleaned);

    // Slug generieren
    const slug = articleData.title
      .toLowerCase()
      .replace(/[äÄ]/g, "ae")
      .replace(/[öÖ]/g, "oe")
      .replace(/[üÜ]/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);

    const article = {
      slug,
      title: articleData.title,
      excerpt: articleData.excerpt,
      content: articleData.content,
      category,
      image,
      publishedAt: new Date().toISOString().split("T")[0],
      readingTime: articleData.readingTime || 5,
    };

    // Speichern
    saveArticle(article);

    return NextResponse.json({
      success: true,
      article: { slug: article.slug, title: article.title },
      usage: {
        input: data.usage?.input_tokens,
        output: data.usage?.output_tokens,
      },
    });
  } catch (error) {
    console.error("Generate article error:", error);
    return NextResponse.json({ error: "Fehler bei der Artikel-Generierung" }, { status: 500 });
  }
}

// GET: Nächstes Thema für Cron vorschlagen
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${ADMIN_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = getAllArticles();
  const usedTopics = existing.map((a) => a.title.toLowerCase());

  // Thema finden das noch nicht verwendet wurde
  const available = TOPIC_POOL.filter(
    (t) => !usedTopics.some((used) => used.includes(t.topic.toLowerCase().slice(0, 20)))
  );

  const next = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];

  return NextResponse.json({ suggestion: next, remainingTopics: available.length });
}
