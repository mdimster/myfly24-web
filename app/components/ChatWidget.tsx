"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi 👋 Wo zieht es dich hin – und was ist dir wichtig?",
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      // Nur user/assistant Messages an API senden (ohne initiale Begrüßung falls nötig)
      const apiMessages = newMessages.filter(
        (_, i) => !(i === 0 && newMessages[0].role === "assistant")
      );

      // Initiale Begrüßung als erste assistant-Message behalten
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Etwas ist schiefgelaufen.");
        setIsLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte prüfe deine Internetverbindung.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const phase =
    userMessageCount < 3 ? "qualify" : userMessageCount === 3 ? "recommend" : "chat";

  return (
    <div className="chat-widget">
      {/* Progress Indicator */}
      <div className="chat-progress">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`chat-progress-dot ${
              userMessageCount >= step ? "active" : ""
            } ${userMessageCount === step - 1 && phase === "qualify" ? "current" : ""}`}
          />
        ))}
        <span className="chat-progress-label">
          {phase === "qualify"
            ? `Frage ${Math.min(userMessageCount + 1, 3)} von 3`
            : phase === "recommend"
            ? "Empfehlung wird erstellt …"
            : "Deine Empfehlung"}
        </span>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-msg ${msg.role === "user" ? "chat-msg-user" : "chat-msg-ai"}`}
          >
            {msg.role === "assistant" && (
              <div className="chat-msg-avatar">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                  <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
                </svg>
              </div>
            )}
            <div className={`chat-msg-bubble ${msg.role}`}>
              {msg.content.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j < msg.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-msg chat-msg-ai">
            <div className="chat-msg-avatar">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
              </svg>
            </div>
            <div className="chat-msg-bubble assistant chat-typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        {error && (
          <div className="chat-error">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <div className="chat-input-row">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isLoading
                ? "Einen Moment …"
                : "Antwort eingeben …"
            }
            disabled={isLoading}
          />
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            aria-label="Absenden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
