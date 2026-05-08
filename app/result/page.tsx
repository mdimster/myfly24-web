import Link from "next/link";

export default function ResultPage() {
  return (
    <div className="bg-cream min-h-screen">
      <header className="flex items-center justify-between px-5 py-3 bg-cream/95 backdrop-blur border-b border-navy/15">
        <Link href="/advisor" className="flex items-center gap-1.5 text-navy">
          <span className="text-sm">←</span>
          <span className="text-[12px] tracking-wide">Beratung</span>
        </Link>
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-sm">✈</span>
          <span className="font-display text-[13px] font-semibold text-navy">
            my<span className="text-blue">Fly</span>24
          </span>
        </Link>
        <span className="text-navy">🔖</span>
      </header>

      <div
        className="h-[200px] relative overflow-hidden"
        style={{
          background:
            "linear-gradient(170deg, #1A2847 0%, #3454A1 25%, #B8845A 60%, #E89B3A 90%)",
        }}
      />

      <div className="px-5 pt-6 max-w-xl mx-auto">
        <p className="font-display text-[11px] tracking-[0.14em] uppercase text-navy mb-1.5 font-semibold">
          Deine Reise · Mai 2026
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-normal text-navy mb-2.5 tracking-tight leading-[1.05]">
          <em className="italic">Mallorca,</em>
          <br />
          im August.
        </h1>
        <p className="font-display text-[14px] text-ink-muted mb-3.5 italic">
          Frankfurt · 1.–8. August 2026 · 2 Erwachsene, 2 Kinder
        </p>
        <div className="flex gap-1.5 flex-wrap">
          <span className="bg-white border border-navy/20 px-2.5 py-0.5 rounded-full text-[11px] text-navy">
            Bequem
          </span>
          <span className="bg-white border border-navy/20 px-2.5 py-0.5 rounded-full text-[11px] text-navy">
            Familienfreundlich
          </span>
        </div>
      </div>

      <div className="h-px bg-navy/20 mx-5 my-5" />

      <div className="px-5 pb-5 max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="bg-navy text-white px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
            Empfehlung
          </span>
          <span className="font-display text-[11px] text-ink-muted italic">
            deine beste Wahl
          </span>
        </div>

        <h2 className="font-display text-[28px] font-medium text-navy mb-1 tracking-tight">
          Lufthansa
        </h2>
        <p className="font-display text-[14px] text-ink-muted mb-4 italic">
          Direktflug · Abflug 08:30 · 2h 25min · 23 kg Gepäck inkl. · umbuchbar
        </p>

        <div className="bg-white border-l-[3px] border-amber px-5 py-4 mb-5">
          <p className="font-display text-[11px] tracking-[0.14em] uppercase text-navy mb-2 font-semibold">
            Warum dieser Flug
          </p>
          <p className="font-display text-[16px] text-navy leading-loose">
            <span className="font-display float-left text-[44px] leading-[0.85] pr-2 pt-1 text-navy font-medium">
              F
            </span>
            ür eine Familienreise mit zwei Kindern (4 und 8 Jahre) ist der Direktflug die
            wichtigste Entscheidung. Die Abflugzeit 08:30 vermeidet das Frühaufstehen mit
            Kindern. Das aufgegebene Gepäck (23 kg) ist enthalten, was bei einer Woche
            Strandurlaub Sinn ergibt.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <p className="font-display text-[10px] tracking-[0.14em] uppercase text-ink-muted mb-1">
              Preisspanne
            </p>
            <p className="font-display text-[24px] font-medium text-navy tracking-tight">
              289–340 €
            </p>
            <p className="text-[10px] text-ink-subtle mt-0.5">pro Person, hin & zurück</p>
          </div>
          <div>
            <p className="font-display text-[10px] tracking-[0.14em] uppercase text-ink-muted mb-1">
              Match-Score
            </p>
            <p className="font-display text-[24px] font-medium text-amber tracking-tight">
              92<span className="text-[14px] text-ink-muted font-normal"> /100</span>
            </p>
            <p className="text-[10px] text-ink-subtle mt-0.5">deine Priorität: bequem</p>
          </div>
        </div>

        <button className="w-full bg-amber hover:bg-amber-hover transition-colors text-white py-3 rounded text-[14px] font-semibold flex items-center justify-center gap-2">
          Zum Angebot bei Lufthansa →
        </button>
        <p className="text-[10px] text-ink-subtle text-center mt-2">
          Werbe-Link · myFly24 erhält bei Abschluss Provision
        </p>
      </div>

      <div className="bg-white border-t border-b border-navy/15 px-5 py-5">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[13px] text-ink-muted mb-2.5 italic font-display">
            Demo-Daten · echte Flugdaten kommen mit Travelpayouts-Anbindung
          </p>
          <Link href="/" className="text-[13px] text-blue font-medium">
            Zurück zur Startseite →
          </Link>
        </div>
      </div>
    </div>
  );
}