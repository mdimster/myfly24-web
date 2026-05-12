import Link from "next/link";
import Image from "next/image";
import InsuranceCalculator from "@/app/components/InsuranceCalculator";

export const metadata = {
  title: "Reiseversicherungen im Vergleich – myFly24",
  description: "Welche Reiseversicherung brauchst du wirklich? Vergleich, Bedarfsrechner und ehrliche Empfehlungen.",
};

export default function VersicherungPage() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 px-4 sm:px-12 flex items-center justify-between bg-[rgba(250,247,242,0.85)] backdrop-blur-lg border-b border-[rgba(229,224,216,0.5)]">
        <Link href="/" className="block flex-shrink-0">
          <Image src="/images/logo-myfly24.png" alt="myFly24" width={93} height={40} priority style={{ height: "28px", width: "auto" }} />
        </Link>
        <Link href="/" className="text-sm font-medium text-ink-muted no-underline hover:text-navy transition-colors">
          ← Zurück
        </Link>
      </nav>

      <main className="mt-14 sm:mt-16">
        {/* Hero: 60/40 Split */}
        <div className="px-5 sm:px-16 pt-6 max-w-[1200px] mx-auto">
          <div className="themenwelt-split">
            <div className="themenwelt-split-img">
              <Image
                src="/images/themenwelt/reiseversicherung.jpg"
                alt="Reiseversicherungen im Vergleich"
                width={1200}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="themenwelt-split-text">
              <p className="text-[11px] uppercase tracking-[0.14em] text-amber font-semibold mb-3">
                Versicherungen
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-navy mb-3 leading-tight">
                Reiseversicherungen im Vergleich
              </h1>
              <p className="text-[15px] text-ink-muted leading-relaxed mb-6">
                Welche Versicherung brauchst du wirklich? Wir erklären die wichtigsten Typen – ehrlich, ohne Verkaufsdruck.
              </p>
              <a
                href="#rechner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber text-white text-sm font-semibold no-underline hover:opacity-90 transition-opacity"
              >
                → Zum Bedarfsrechner
              </a>
            </div>
          </div>
        </div>

        {/* Editorial Content */}
        <section className="px-5 sm:px-16 py-12 sm:py-16 max-w-[800px] mx-auto">
          <div className="prose-legal">

            <h2>Die wichtigsten Reiseversicherungen auf einen Blick</h2>

            <p>
              Nicht jede Versicherung ist für jede Reise sinnvoll. Aber manche solltest du auf keinen Fall weglassen. Hier eine ehrliche Einordnung:
            </p>

            <h3>🏥 Auslandskrankenversicherung</h3>
            <p>
              <strong>Unsere Bewertung: Pflicht.</strong> Die gesetzliche Krankenversicherung zahlt im Ausland nur eingeschränkt – und einen Krankenrücktransport nach Deutschland übernimmt sie gar nicht. Allein der Rückflug mit medizinischer Begleitung kann 30.000–80.000 € kosten.
            </p>
            <p>
              Eine Auslandskrankenversicherung kostet als Jahresvertrag oft nur 12–25 € pro Person. Das ist das beste Preis-Leistungs-Verhältnis aller Reiseversicherungen.
            </p>

            <h3>🔄 Reiserücktrittsversicherung</h3>
            <p>
              <strong>Unsere Bewertung: Sinnvoll bei teuren Buchungen.</strong> Wenn du eine Pauschalreise für 3.000 € buchst und drei Wochen vorher krank wirst, bleibst du ohne Versicherung auf den Stornokosten sitzen. Die Rücktrittsversicherung erstattet dir den größten Teil.
            </p>
            <p>
              Kosten: Meist 3–5 % des Reisepreises. Lohnt sich besonders bei Frühbucherangeboten, Familienurlauben und Fernreisen.
            </p>

            <h3>🧳 Reiseabbruchversicherung</h3>
            <p>
              <strong>Unsere Bewertung: Empfohlen bei längeren Reisen.</strong> Deckt die Mehrkosten, wenn du eine Reise vorzeitig abbrechen musst – z.B. den Rückflug oder nicht genutzte Hotelübernachtungen. Oft als Kombi-Paket mit der Rücktrittsversicherung erhältlich.
            </p>

            <h3>💼 Gepäckversicherung</h3>
            <p>
              <strong>Unsere Bewertung: Optional.</strong> Klingt sinnvoll, ist aber oft limitiert: Wertgegenstände wie Laptops oder Kameras sind häufig ausgeschlossen oder nur bis zu niedrigen Summen versichert. Prüfe zuerst, ob deine Hausratversicherung Reisegepäck abdeckt – bei vielen Tarifen ist das bereits enthalten.
            </p>

            <h3>✈️ Reisehaftpflichtversicherung</h3>
            <p>
              <strong>Unsere Bewertung: Check deine Privathaftpflicht.</strong> Die meisten privaten Haftpflichtversicherungen gelten weltweit. Eine separate Reisehaftpflicht brauchst du nur, wenn du keine private Haftpflicht hast (was du dringend ändern solltest).
            </p>

            <h2>Wann lohnt sich ein Jahresvertrag?</h2>
            <p>
              Faustregel: Ab zwei Reisen pro Jahr ist ein Jahresvertrag für die Auslandskrankenversicherung günstiger. Für die Rücktrittsversicherung lohnt sich der Jahresvertrag ab etwa 2.000 € Gesamtreisekosten pro Jahr.
            </p>
            <p>
              <strong>Familientipp:</strong> Die meisten Anbieter bieten Familientarife an, die deutlich günstiger sind als Einzelpolicen. Kinder bis 18 Jahre sind oft kostenlos mitversichert.
            </p>

            <h2>Häufige Fehler bei Reiseversicherungen</h2>

            <ul>
              <li><strong>Zu spät abschließen:</strong> Die Rücktrittsversicherung muss meist innerhalb von 14 Tagen nach Buchung abgeschlossen werden.</li>
              <li><strong>Doppelt versichert:</strong> Prüfe vorher, was deine Kreditkarte, Hausrat oder Privathaftpflicht bereits abdeckt.</li>
              <li><strong>Vorerkrankungen vergessen:</strong> Verschweige keine Vorerkrankungen – im Ernstfall zahlt die Versicherung sonst nicht.</li>
              <li><strong>Billigstes Angebot wählen:</strong> Achte auf die Leistungen, nicht nur den Preis. Besonders wichtig: Rücktransport „medizinisch sinnvoll" vs. „medizinisch notwendig".</li>
            </ul>

          </div>
        </section>

        {/* Bedarfsrechner */}
        <section id="rechner" className="px-5 sm:px-16 pb-16 sm:pb-20 max-w-[800px] mx-auto">
          <div className="w-12 h-px bg-border mx-auto mb-8" />
          <InsuranceCalculator />
        </section>

        {/* Disclaimer */}
        <section className="px-5 sm:px-16 pb-12 max-w-[800px] mx-auto">
          <p className="text-xs text-ink-subtle text-center leading-relaxed">
            Die Informationen auf dieser Seite dienen der allgemeinen Orientierung und ersetzen keine individuelle Versicherungsberatung.
            Preisangaben sind Richtwerte und können je nach Anbieter, Reiseziel und persönlicher Situation abweichen.
            Vor Abschluss einer Versicherung empfehlen wir den Vergleich mehrerer Anbieter.
          </p>
        </section>
      </main>

      <footer className="py-8 px-5 sm:px-16 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[13px] text-ink-subtle">© 2026 myFly24 · performance werk GmbH</span>
        <div className="flex gap-6">
          <Link href="/impressum" className="text-[13px] text-ink-subtle no-underline hover:text-navy">Impressum</Link>
          <Link href="/datenschutz" className="text-[13px] text-ink-subtle no-underline hover:text-navy">Datenschutz</Link>
        </div>
      </footer>
    </>
  );
}
