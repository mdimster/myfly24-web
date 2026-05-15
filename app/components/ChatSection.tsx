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
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState<"rate" | "message" | null>(null);
  const [checklistVisible, setChecklistVisible] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function renderMarkdown(text: string) {
    return text
      .split("\n")
      .map((line) => {
        line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        line = line.replace(/\*(.+?)\*/g, "<em>$1</em>");
        if (line.match(/^[-–•]\s/)) {
          line = "<li>" + line.replace(/^[-–•]\s/, "") + "</li>";
        }
        if (line.match(/^\d+\.\s/)) {
          line = "<li>" + line.replace(/^\d+\.\s/, "") + "</li>";
        }
        return line;
      })
      .join("<br />")
      .replace(/(<li>.*?<\/li>(<br \/>)?)+/g, (match) =>
        "<ul>" + match.replace(/<br \/>/g, "") + "</ul>"
      );
  }

  useEffect(() => {
    if (isActive) {
      chatRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isActive]);

  // Checkliste einmalig aktivieren wenn Empfehlung da ist
  const userCount = messages.filter((m) => m.role === "user").length;
  useEffect(() => {
    if (
      !checklistVisible &&
      userCount >= 3 &&
      !isLoading &&
      messages[messages.length - 1]?.role === "assistant"
    ) {
      setChecklistVisible(true);
    }
  }, [messages, isLoading, userCount, checklistVisible]);

  // ESC schließt Expanded-Modus
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) setIsExpanded(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isExpanded]);

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
        if (data.type === "rate_limit") {
          setLimitReached("rate");
        } else if (data.type === "message_limit") {
          setLimitReached("message");
        } else {
          setError(data.error || "Etwas ist schiefgelaufen.");
        }
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

  const handleNewChat = () => {
    setMessages([GREETING]);
    setInput("");
    setError(null);
    setLimitReached(null);
    setChecklistVisible(false);
  };

  // ─── Active: Inline Chat ───
  if (isActive) {
    return (
      <>
        {isExpanded && (
          <div className="chat-backdrop" onClick={() => setIsExpanded(false)} />
        )}

        <div ref={chatRef} className={`chat-inline ${isExpanded ? "chat-expanded" : ""}`}>
          <div className="chat-inline-progress">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`chat-dot ${userCount >= step ? "done" : ""} ${userCount === step - 1 ? "now" : ""}`} />
            ))}
            <span className="chat-inline-label">
              {userCount < 3 ? `Frage ${Math.min(userCount + 1, 3)} von 3` : userCount === 3 ? "Empfehlung …" : "Deine Empfehlung"}
            </span>

            <button
              className="chat-expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Verkleinern" : "Vergrößern"}
              title={isExpanded ? "Verkleinern (Esc)" : "Größere Ansicht"}
            >
              {isExpanded ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              )}
            </button>
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

            {/* Sanftes Limit – Rate oder Message */}
            {limitReached && (
              <div className="chat-rate-limit">
                <div className="chat-rate-limit-icon">
                  {limitReached === "rate" ? "☕" : "✨"}
                </div>
                <div className="chat-rate-limit-text">
                  <strong>
                    {limitReached === "rate"
                      ? "Genug für heute – gönn dir eine Pause!"
                      : "Das war eine ausführliche Beratung!"}
                  </strong>
                  <p>
                    {limitReached === "rate"
                      ? "Du hast schon viele Beratungen gestartet. Morgen bin ich wieder für dich da."
                      : "Starte eine neue Beratung für frische Empfehlungen – oder stöbere weiter:"}
                  </p>
                </div>
                <div className="chat-rate-limit-links">
                  {limitReached === "message" && (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNewChat(); }}>🔄 Neue Beratung</a>
                  )}
                  <a href="/magazin">📖 Magazin</a>
                  <a href="/versicherung">🛡️ Versicherungscheck</a>
                  <a href="#themenwelten">🗺️ Themenwelten</a>
                </div>
              </div>
            )}

            {error && !limitReached && <div className="chat-error">{error}</div>}

            {/* Reise-Checkliste – bleibt sichtbar sobald einmal aktiviert */}
            {checklistVisible && (
              <TravelChecklist messages={messages.map((m) => m.content)} />
            )}

            <div ref={messagesEndRef} />
          </div>

          {!limitReached && (
            <div className="chat-input-row">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown} placeholder={isLoading ? "Einen Moment …" : "Antwort eingeben …"} disabled={isLoading} />
              <button className="chat-send-btn" onClick={sendMessage} disabled={isLoading || !input.trim()} aria-label="Absenden">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </>
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
