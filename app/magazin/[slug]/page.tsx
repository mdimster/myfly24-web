"use client";

import { use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ARTICLES } from "../../data";

export default function MagazineArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  const startConsultation = () => {
    const dest = article.bridge_destination
      ? `?destination=${encodeURIComponent(article.bridge_destination)}`
      : "";
    router.push(`/advisor${dest}`);
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Sticky Header */}
      <header className="flex items-center justify-between px-5 py-3 bg-cream/95 backdrop-blur border-b border-navy/15 sticky top-0 z-10">
        <Link href="/magazin" className="flex items-center gap-1.5 text-navy">
          <span className="text-sm">←</span>
          <span className="text-[12px] tracking-wide">Magazin</span>
        </Link>
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-sm">✈</span>
          <span className="font-display text-[13px] font-semibold text-navy">
            my<span className="text-blue">Fly</span>24
          </span>
        </Link>
        <div className="flex gap-3 text-navy">
          <span>🔖</span>
          <span>↗</span>
        </div>
      </header>

      {/* Hero-Bild */}
      <div className="h-[280px] relative overflow-hidden" style={{ background: article.gradient }} />

      {/* Header / Meta */}
      <div className="px-5 pt-7 max-w-xl mx-auto">
        <div className="mb-4">
          <span className="font-display text-[10px] tracking-[0.14em] uppercase text-navy font-semibold border-b border-navy pb-px">
            {article.tag}
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-normal text-navy mb-3.5 tracking-tight leading-[1.05]">
          <em className="italic">{article.title_italic}</em>
          <br />
          {article.title_rest}
        </h1>

        <p className="font-display text-lg text-navy/85 mb-5 leading-relaxed italic">
          {article.teaser}
        </p>

        <div className="flex items-center gap-3 py-3.5 border-t border-b border-navy/20 mb-7">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber to-navy flex items-center justify-center text-white text-[11px] font-semibold font-display">
            {article.author.initials}
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-navy">{article.author.name}</p>
            <p className="text-[11px] text-ink-muted mt-px">
              {article.date} · {article.reading_time} Lesezeit
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 max-w-xl mx-auto">
        {article.body.map((block, i) => {
          if (block.type === "lead") {
            return (
              <p key={i} className="font-display text-[19px] leading-relaxed text-navy mb-5">
                <span className="font-display float-left text-[64px] leading-[0.9] pr-2 pt-1.5 text-navy font-medium">
                  {block.text.charAt(0)}
                </span>
                {block.text.slice(1)}
              </p>
            );
          }
          if (block.type === "p") {
            return (
              <p key={i} className="font-display text-[16px] leading-loose text-navy mb-5">
                {block.text}
              </p>
            );
          }
          if (block.type === "h2") {
            return (
              <h3
                key={i}
                className="font-display text-[24px] font-medium text-navy mt-3 mb-3.5 tracking-tight"
              >
                {block.text}
              </h3>
            );
          }
          if (block.type === "quote") {
            return (
              <div key={i} className="border-l-[3px] border-amber pl-5 py-3.5 my-7">
                <p className="font-display text-[22px] italic text-navy leading-snug tracking-tight">
                  „{block.text}"
                </p>
                {block.source && (
                  <p className="font-display text-[11px] tracking-[0.1em] uppercase text-ink-muted mt-2.5">
                    — {block.source}
                  </p>
                )}
              </div>
            );
          }
          if (block.type === "bridge") {
            return (
              <div key={i} className="my-7 p-5 bg-white border border-navy/30 rounded-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-br from-blue to-navy flex items-center justify-center text-white">
                    ✨
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-[15px] font-medium text-navy mb-1 leading-snug">
                      Klingt nach deiner Reise?
                    </p>
                    <p className="text-[12px] text-ink-muted mb-3 leading-relaxed">
                      Lass dich in drei Fragen zur passenden{" "}
                      {article.bridge_destination ?? "Reise"} beraten.
                    </p>
                    <button
                      onClick={startConsultation}
                      className="inline-flex items-center gap-1.5 bg-navy text-white px-4 py-2 rounded text-[12px] font-semibold cursor-pointer"
                    >
                      Beratung starten →
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Author-Bio */}
      <div className="border-t border-navy/20 px-5 py-5 mt-7">
        <div className="max-w-xl mx-auto flex gap-3.5 items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber to-navy flex items-center justify-center text-white text-[16px] font-semibold font-display flex-shrink-0">
            {article.author.initials}
          </div>
          <div className="flex-1">
            <p className="font-display text-[14px] font-semibold text-navy m-0">
              {article.author.name}
            </p>
            <p className="text-[11px] text-ink-muted mt-0.5 leading-relaxed">{article.author.bio}</p>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="px-5 py-5 border-t border-navy/20">
        <div className="max-w-xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.14em] uppercase text-navy mb-3.5 font-semibold">
            Auch lesenswert
          </p>
          {related.map((r, i) => (
            <Link
              key={r.slug}
              href={`/magazin/${r.slug}`}
              className={`flex gap-3 py-2.5 ${
                i < related.length - 1 ? "border-b border-navy/10" : ""
              }`}
            >
              <div
                className="w-[72px] h-[72px] flex-shrink-0 rounded-sm"
                style={{ background: r.gradient }}
              />
              <div className="flex-1">
                <p className="font-display text-[10px] tracking-[0.1em] uppercase text-ink-muted mb-1">
                  {r.tag}
                </p>
                <p className="font-display text-[14px] font-medium text-navy leading-snug">
                  {r.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-navy text-white px-5 py-5">
        <div className="max-w-xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.14em] uppercase text-amber mb-2 font-semibold">
            Der Brief
          </p>
          <p className="font-display text-[18px] mb-1.5 leading-tight">
            Mehr Geschichten wie diese?
          </p>
          <p className="text-[12px] opacity-85 mb-3 leading-relaxed">
            Sonntags eine kuratierte Reisestory plus passende Empfehlung.
          </p>
          <div className="flex gap-1.5">
            <input
              type="email"
              placeholder="deine@email.de"
              className="flex-1 min-w-0 px-3 py-2.5 text-[13px] rounded-lg outline-none text-navy"
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