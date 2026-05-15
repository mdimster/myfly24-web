"use client";

import { useState, useRef, useEffect } from "react";
import TravelChecklist from "./TravelChecklist";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content: "Hi 👋 Wo zieht es dich hin – und was ist dir wichtig?",
};

export default function ChatSection() {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simple Markdown → HTML
  function renderMarkdown(text: string) {
    return text
      .split("\n")
      .map((line) => {
        // Bold: **text**
        line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        // Italic: *text*
        line = line.replace(/\*(.+?)\*/g, "<em>$1</em>");
        // List items: - text
        if (line.match(/^[-–•]\s/)) {
          line = "<li>" + line.replace(/^[-–•]\s/, "") + "</li>";
        }
        // Numbered list: 1. text
        if (line.match(/^\d+\.\s/)) {
          line = "<li>" + line.replace(/^\d+\.\s/, "") + "</li>";
        }
        return line;
      })
      .join("<br />")
      // Clean up: wrap consecutive <li> in <ul>
      .replace(/(<li>.*?<\/li>(<br \/>)?)+/g, (match) =>
        "<ul>" + match.replace(/<br \/>/g, "") + "</ul>"
      );
  }

  useEffect(() => {
    if (isActive) {
      // Chat-Container ins Sichtfeld scrollen
      chatRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    // Neue Nachrichten: nur innerhalb des Chat-Containers scrollen
    if (isActive && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isActive]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Etwas ist schiefgelaufen.");
        setIsLoading(false);
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const userCount = messages.filter((m) => m.role === "user").length;
  const lastMessage = messages[messages.length - 1];
  const showChecklist = userCount >= 3 && !isLoading && lastMessage?.role === "assistant";

  // ─── Active: Inline Chat ───
  if (isActive) {
    return (
      <div ref={chatRef} className="chat-inline">
        <div className="chat-inline-progress">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`chat-dot ${userCount >= step ? "done" : ""} ${userCount === step - 1 ? "now" : ""}`} />
          ))}
          <span className="chat-inline-label">
            {userCount < 3 ? `Frage ${Math.min(userCount + 1, 3)} von 3` : userCount === 3 ? "Empfehlung …" : "Deine Empfehlung"}
          </span>
        </div>

        <div className="chat-inline-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role === "user" ? "chat-msg-user" : "chat-msg-ai"}`}>
              {msg.role === "assistant" && (
                <div className="chat-msg-avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                  </svg>
                </div>
              )}
              <div className={`chat-msg-bubble ${msg.role}`}>
                {msg.role === "assistant" ? (
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-msg chat-msg-ai">
              <div className="chat-msg-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                </svg>
              </div>
              <div className="chat-msg-bubble assistant chat-typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}
          {error && <div className="chat-error">{error}</div>}

          {/* Reise-Checkliste nach Empfehlung */}
          {showChecklist && (
            <TravelChecklist
              messages={messages.map((m) => m.content)}
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-row">
          <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} placeholder={isLoading ? "Einen Moment …" : "Antwort eingeben …"} disabled={isLoading} />
          <button className="chat-send-btn" onClick={sendMessage} disabled={isLoading || !input.trim()} aria-label="Absenden">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // ─── Static: Mockup ───
  return (
    <div className="mb-0">
      <div className="flex items-start gap-3 mb-4">
        <div className="chat-avatar">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
          </svg>
        </div>
        <div className="chat-message">Hi 👋 Wo zieht es dich hin –<br />und was ist dir wichtig?</div>
      </div>
      <div className="chat-input-row cursor-pointer" onClick={() => setIsActive(true)}
        role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setIsActive(true)}>
        <input type="text" placeholder="Antwort eingeben oder oben antippen ..." readOnly tabIndex={-1}
          className="cursor-pointer" onClick={() => setIsActive(true)} />
        <button className="chat-send-btn" onClick={(e) => { e.stopPropagation(); setIsActive(true); }} aria-label="Chat starten">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
