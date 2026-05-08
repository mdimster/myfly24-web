"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function AdvisorContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const priority = searchParams.get("priority");

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="px-5 py-3.5 border-b border-border bg-white">
        <Link href="/" className="flex items-center gap-2">
          <span>✈</span>
          <span className="font-display text-[17px] font-semibold text-navy">
            my<span className="text-blue">Fly</span>24
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="max-w-md text-center">
          <span className="inline-flex items-center gap-1.5 bg-blue-soft text-navy px-3 py-1 rounded-full text-[11px] font-medium mb-4">
            <span>✨</span>
            Beratung
          </span>
          <h1 className="font-display text-3xl font-medium text-navy mb-3 tracking-tight leading-tight">
            <em className="italic text-amber">Hier baut sich</em> der Berater auf.
          </h1>
          <p className="text-[14px] text-ink-muted leading-relaxed mb-6">
            Der vollständige KI-Beratungs-Dialog kommt mit der Anthropic-API-Anbindung im
            nächsten Schritt. Vorausgewählt:
          </p>

          <div className="bg-white border border-border rounded-lg p-4 text-left mb-6 inline-block">
            {destination && (
              <p className="text-[13px] text-navy mb-1">
                <span className="text-ink-muted">Ziel:</span>{" "}
                <span className="font-semibold capitalize">{destination}</span>
              </p>
            )}
            {priority && (
              <p className="text-[13px] text-navy">
                <span className="text-ink-muted">Priorität:</span>{" "}
                <span className="font-semibold capitalize">{priority}</span>
              </p>
            )}
            {!destination && !priority && (
              <p className="text-[13px] text-ink-muted italic">Keine Vorauswahl</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/result"
              className="bg-amber hover:bg-amber-hover transition-colors text-white px-5 py-3 rounded text-[14px] font-semibold"
            >
              Demo-Empfehlung anzeigen →
            </Link>
            <Link href="/" className="text-[13px] text-blue py-2">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdvisorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <AdvisorContent />
    </Suspense>
  );
}