"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES, CATEGORIES } from "../data";

export default function MagazinePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory);

  const featured = filtered[0];
  const grid = filtered.slice(1);

  return (
    <div className="bg-cream min-h-screen">
      <div className="px-5 pt-8 pb-6 text-center">
        <p className="font-display text-[11px] tracking-[0.18em] uppercase text-navy mb-2 font-semibold">
          myFly24 · Magazin
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-normal text-navy mb-3 tracking-tight leading-[1.05]">
          <em className="italic">Geschichten,</em>
          <br />
          die Reisen verändern.
        </h1>
        <p className="font-display text-[14px] text-ink-muted max-w-xs mx-auto leading-relaxed italic">
          Saisonale Kuratierung, ehrliche Tipps und Reisetypen-Stories – wöchentlich neu.
        </p>
      </div>

      <div className="px-5 pb-4 overflow-x-auto">
        <div className="flex gap-1.5 max-w-xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-colors ${
                activeCategory === cat.key
                  ? "bg-navy text-white font-medium"
                  : "bg-transparent text-navy border border-navy/30 hover:border-navy"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {featured && (
        <Link
          href={`/magazin/${featured.slug}`}
          className="block px-5 pb-7 pt-1 max-w-xl mx-auto"
        >
          <div
            className="h-[240px] rounded-sm relative overflow-hidden"
            style={{ background: featured.gradient }}
          >
            <span className="absolute top-3.5 left-3.5 bg-cream/95 text-navy px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
              Lesetipp der Woche
            </span>
          </div>
          <div className="pt-4">
            <div className="flex gap-2.5 items-center mb-2">
              <span className="font-display text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                {featured.tag}
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-ink-muted" />
              <span className="text-[11px] text-ink-muted">{featured.reading_time}</span>
            </div>
            <h2 className="font-display text-[28px] font-medium text-navy mb-2 leading-tight tracking-tight">
              {featured.title}
            </h2>
            <p className="font-display text-[15px] text-navy/85 mb-3 leading-relaxed">
              {featured.teaser}
            </p>
            <span className="text-[12px] text-blue tracking-wide font-medium">
              Weiterlesen →
            </span>
          </div>
        </Link>
      )}

      <div className="h-px bg-navy/20 mx-5" />

      <div className="px-5 pt-6 pb-4 max-w-xl mx-auto">
        <div className="flex items-baseline justify-between mb-4">
          <p className="font-display text-[11px] tracking-[0.14em] uppercase text-navy font-semibold">
            Aktuelle Stories
          </p>
          <span className="text-[11px] text-ink-muted italic">Mai 2026</span>
        </div>

        {grid.length === 0 ? (
          <p className="text-[13px] text-ink-muted text-center py-5">
            Bald mehr in dieser Kategorie.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {grid.map((article) => (
              <Link key={article.slug} href={`/magazin/${article.slug}`} className="block">
                <div
                  className="h-[130px] rounded-sm mb-2"
                  style={{ background: article.gradient }}
                />
                <span className="font-display text-[9px] tracking-[0.1em] uppercase text-ink-muted">
                  {article.tag}
                </span>
                <p className="font-display text-[14px] font-medium text-navy my-1 leading-tight">
                  {article.title}
                </p>
                <span className="text-[11px] text-ink-muted">{article.reading_time}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="bg-navy text-white px-5 py-6 mt-6">
        <div className="max-w-xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.14em] uppercase text-amber mb-2 font-semibold">
            Der Brief
          </p>
          <p className="font-display text-[19px] mb-1.5 leading-tight">
            Eine Geschichte, eine Empfehlung – jeden Sonntag.
          </p>
          <p className="text-[13px] opacity-85 mb-3.5 leading-relaxed">
            Kein Spam, keine Newsletter-Floskeln. Nur was zu deiner Reiseart passt.
          </p>
          <div className="flex gap-1.5">
            <input
              type="email"
              placeholder="deine@email.de"
              className="flex-1 min-w-0 px-3.5 py-2.5 text-[13px] rounded-lg outline-none text-navy"
            />
            <button className="bg-amber hover:bg-amber-hover transition-colors text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold whitespace-nowrap">
              Anmelden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}