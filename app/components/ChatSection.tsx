"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget"), {
  loading: () => (
    <div style={{ padding: "40px", textAlign: "center", color: "#9A9A9A" }}>
      Chat wird geladen …
    </div>
  ),
});

export default function ChatSection() {
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    return (
      <div className="chat-overlay" onClick={(e) => {
        if (e.target === e.currentTarget) setIsActive(false);
      }}>
        <div className="chat-panel">
          <div className="chat-panel-header">
            <div className="flex items-center gap-2">
              <div className="chat-msg-avatar" style={{ width: 28, height: 28 }}>
                <svg
                  width="14" height="14"
                  viewBox="0 0 24 24" fill="none" stroke="white"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-navy">myFly24 Reiseberater</span>
            </div>
            <button
              onClick={() => setIsActive(false)}
              className="chat-close-btn"
              aria-label="Chat schließen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <ChatWidget />
        </div>
      </div>
    );
  }

  // Static mockup – klick aktiviert den Chat
  return (
    <div className="mb-0">
      <div className="flex items-start gap-3 mb-4">
        <div className="chat-avatar">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
          </svg>
        </div>
        <div className="chat-message">
          Hi 👋 Wo zieht es dich hin –
          <br />
          und was ist dir wichtig?
        </div>
      </div>

      <div
        className="chat-input-row cursor-pointer"
        onClick={() => setIsActive(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsActive(true)}
      >
        <input
          type="text"
          placeholder="Antwort eingeben oder oben antippen ..."
          readOnly
          tabIndex={-1}
          className="cursor-pointer"
          onClick={() => setIsActive(true)}
        />
        <button
          className="chat-send-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsActive(true);
          }}
          aria-label="Chat starten"
        >
          <svg
            width="18" height="18"
            viewBox="0 0 24 24" fill="none" stroke="white"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
