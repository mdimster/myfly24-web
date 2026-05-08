"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES, DESTINATIONS } from "./data";

const INITIAL_CONVERSATION = [
  { role: "ai" as const, text: "Hi 👋 Wo zieht es dich hin – und was ist dir wichtig?" },
];

const PRIORITY_OPTIONS = [
  { key: "comfort", label: "Bequem" },
  { key: "price", label: "Günstig" },
  { key: "family", label: "Familienfreundlich" },
  { key: "flexibility", label: "Flexibel" },
];

type Message = { role: "ai" | "user"; text: string };

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>(INITIAL_CONVERSATION);
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);

  const sendUserMessage = (text: string) => {
    if (!text.trim()) return;
    setConversation([
      ...conversation,
      { role: "user", text },
      { role: "ai", text: "Klingt nach Strand und Direktflug. Was zählt am meisten?" },
    ]);
    setInput("");
    setShowQuickReplies(true);
  };

  const featured = ARTICLES[0];
  const list = ARTICLES.slice(1, 4);

  return (
    <div>
      {/* ─── HEADER ─── */}
      <header className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-[#F0EDE6]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[18px]">✈</span>
          <span className="font-display text-[17px] font-semibold text-navy">
            my<span className="text-blue">Fly</span>24
          </span>
        </Link>
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[11px] text-ink-muted">Online</span>
          </div>
        </div>
      </header>

      {/* ─── CHAT-HERO ─── */}
      <section className="bg-[#FAFAF7] px-5 pt-6 pb-4 border-b border-border">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-1.5 bg-blue-soft text-navy px-3 py-1 rounded-full text-[11px] font-medium">
              <span>✨</span>
              Dein KI-Reiseberater
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-medium text-navy mt-3 mb-1 tracking-tight leading-tight">
              Erzähl mir von deiner Reise.
            </h1>
            <p className="text-[13px] text-ink-muted">Drei Fragen, eine klare Empfehlung.</p>
          </div>

          {/* Bubble-Stream */}
          <div className="mb-3.5">
            {conversation.map((msg, i) =>
              msg.role === "ai" ? (
                <div key={i} className="flex gap-2 mb-3 items-start">
                  <div className="w-[26px] h-[26px] flex-shrink-0 rounded-full bg-gradient-to-br from-blue to-navy flex items-center justify-center text-white text-[13px]">
                    ✨
                  </div>
                  <div className="bg-white border border-border rounded-[14px] rounded-bl-[4px] px-3 py-2.5 max-w-[82%]">
                    <p className="text-[13px] text-navy leading-relaxed m-0">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end mb-3">
                  <div className="bg-navy text-white rounded-[14px] rounded-br-[4px] px-3 py-2.5 max-w-[82%]">
                    <p className="text-[13px] leading-relaxed m-0">{msg.text}</p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Quick-Replies */}
          {showQuickReplies && (
            <div className="flex flex-wrap gap-1.5 pl-9 mb-3.5">
              {PRIORITY_OPTIONS.map((opt) => (
                <Link
                  key={opt.key}
                  href={`/advisor?priority=${opt.key}`}
                  className="bg-white border border-border text-navy hover:border-navy hover:bg-blue-soft transition-colors px-3 py-1.5 rounded-full text-[12px]"
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          )}

          {/* Input-Pill */}
          <div className="flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 bg-white border border-border rounded-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendUserMessage(input)}
              placeholder="Antwort eingeben oder oben antippen …"
              className="flex-1 py-1.5 text-[13px] bg-transparent outline-none text-navy"
            />
            <button
              onClick={() => sendUserMessage(input)}
              disabled={!input.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                input.trim() ? "bg-navy text-white cursor-pointer" : "bg-border text-white cursor-not-allowed"
              }`}
            >
              ↑
            </button>
          </div>
        </div>
      </section>

      {/* ─── ÜBERGANG ─── */}
      <section className="bg-cream pt-7 pb-3.5 border-t border-border text-center">
        <div className="max-w-xs mx-auto">
          <div className="flex items-center justify-center gap-3.5">
            <span className="h-px w-10 bg-navy/30" />
            <span className="font-display text-[13px] italic text-ink-muted">Noch unentschlossen?</span>
            <span className="h-px w-10 bg-navy/30" />
          </div>
          <p className="text-[12px] text-ink-muted mt-2">
            Geschichten und Tipps für jeden Reisetyp – aus unserem Magazin.
          </p>
        </div>
      </section>

      {/* ─── MAGAZIN-FEATURED ─── */}
      <section className="bg-cream px-5 pb-7 pt-2">
        <div className="max-w-xl mx-auto">
          <Link href={`/magazin/${featured.slug}`} className="block mb-5">
            <div
              className="h-[220px] rounded-sm relative overflow-hidden"
              style={{ background: featured.gradient }}
            >
              <span className="absolute top-3.5 left-3.5 bg-cream/95 text-navy px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
                Lesetipp der Woche
              </span>
            </div>
            <div className="pt-3.5">
              <p className="font-display text-[11px] tracking-[0.1em] uppercase text-navy mb-1.5 font-semibold">
                Aus dem Magazin
              </p>
              <h2 className="font-display text-2xl font-medium text-navy mb-2 leading-tight tracking-tight">
                {featured.title}
              </h2>
              <p className="font-display text-[14px] text-navy/85 leading-relaxed">
                {featured.teaser}{" "}
                <span className="text-blue font-medium">Lesen →</span>
              </p>
            </div>
          </Link>

          {/* Magazin-Liste */}
          <div className="border-t border-navy/15 pt-3.5">
            {list.map((article, i) => (
              <Link
                key={article.slug}
                href={`/magazin/${article.slug}`}
                className={`flex gap-3.5 py-3 ${
                  i < list.length - 1 ? "border-b border-navy/10" : ""
                }`}
              >
                <div
                  className="w-[72px] h-[72px] flex-shrink-0 rounded-sm"
                  style={{ background: article.gradient }}
                />
                <div className="flex-1">
                  <p className="font-display text-[10px] tracking-[0.1em] uppercase text-ink-muted mb-0.5">
                    {article.tag}
                  </p>
                  <p className="font-display text-[15px] font-medium text-navy mb-0.5 leading-snug">
                    {article.title}
                  </p>
                  <p className="text-[12px] text-ink-muted leading-relaxed">{article.teaser}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/magazin"
            className="block text-center mt-4 text-[13px] text-blue font-medium"
          >
            Mehr im Magazin →
          </Link>
        </div>
      </section>

      {/* ─── REISEZIEL-BRIDGE ─── */}
      <section className="bg-white px-5 py-6 border-t border-border">
        <div className="max-w-xl mx-auto">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="font-display text-[19px] font-medium text-navy">Beliebte Reiseziele</h2>
            <Link href="/reiseziele" className="text-[13px] text-blue">
              Alle →
            </Link>
          </div>
          <p className="text-[12px] text-ink-subtle mb-3.5">Direkt zur Beratung mit Vorbelegung</p>

          <div className="grid grid-cols-2 gap-2.5">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.slug}
                href={`/advisor?destination=${d.slug}`}
                className="rounded-lg overflow-hidden bg-white border border-border hover:border-navy hover:-translate-y-0.5 transition-all duration-150"
              >
                <div
                  className="h-[95px] relative"
                  style={{ background: d.gradient }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/50" />
                  <span className="absolute left-2 bottom-2 bg-navy/90 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
                    ab {d.price_from} €
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <p className="font-display text-[13px] font-semibold text-navy m-0">{d.name}</p>
                  <p className="text-[11px] text-ink-muted mt-0.5">{d.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="bg-navy text-white px-5 py-6">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 mb-1.5">
            <span>✉</span>
            <p className="text-[14px] font-semibold m-0">Reise-Tipps die wirklich passen</p>
          </div>
          <p className="text-[13px] opacity-85 mb-3.5 leading-relaxed">
            Saisonale Deals und Magazin-Stories – nur was zu deinem Profil passt.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="deine@email.de"
              className="flex-1 min-w-0 px-3.5 py-2.5 text-[14px] rounded-lg outline-none text-navy"
            />
            <button className="bg-amber hover:bg-amber-hover transition-colors text-white px-4.5 py-2.5 rounded-lg text-[14px] font-semibold whitespace-nowrap">
              Anmelden
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER-DISCLAIMER ─── */}
      <p className="text-[11px] text-ink-subtle text-center py-5 px-5 leading-relaxed bg-white">
        myFly24 ist ein Service der performance werk GmbH. Bei Buchungen über
        Partner-Links erhalten wir eine Provision – für dich entstehen keine
        Mehrkosten.
      </p>
    </div>
  );
}