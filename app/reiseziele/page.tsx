import Link from "next/link";
import { DESTINATIONS } from "../data";

export default function DestinationsPage() {
  return (
    <div className="bg-bg min-h-screen">
      <header className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <span>✈</span>
          <span className="font-display text-[17px] font-semibold text-navy">
            my<span className="text-blue">Fly</span>24
          </span>
        </Link>
      </header>

      <div className="px-5 pt-7 pb-6 max-w-xl mx-auto">
        <p className="font-display text-[11px] tracking-[0.18em] uppercase text-navy mb-2 font-semibold">
          Reiseziele
        </p>
        <h1 className="font-display text-3xl font-medium text-navy mb-2 tracking-tight leading-tight">
          Wohin als Nächstes?
        </h1>
        <p className="text-[14px] text-ink-muted mb-6">
          Klick auf ein Ziel und der Berater startet mit Vorbelegung.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.slug}
              href={`/advisor?destination=${d.slug}`}
              className="rounded-lg overflow-hidden bg-white border border-border hover:border-navy hover:-translate-y-0.5 transition-all duration-150"
            >
              <div
                className="h-[120px] relative"
                style={{ background: d.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/50" />
                <span className="absolute left-2 bottom-2 bg-navy/90 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
                  ab {d.price_from} €
                </span>
              </div>
              <div className="px-3 py-2.5">
                <p className="font-display text-[14px] font-semibold text-navy">{d.name}</p>
                <p className="text-[11px] text-ink-muted mt-0.5">{d.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}