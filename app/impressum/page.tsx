import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Impressum – myFly24",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
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

      <main className="mt-20 sm:mt-24 px-5 sm:px-16 pb-20 max-w-[720px] mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-navy mb-8">
          Impressum
        </h1>

        <div className="prose-legal">
          <p>
            myFly24.com ist ein Service der
          </p>

          <p>
            <strong>performance werk GmbH</strong><br />
            Flugplatzstraße 100<br />
            90768 Fürth
          </p>

          <p>
            <strong>Geschäftsführer:</strong> Mark Dimster
          </p>

          <p>
            <strong>Registergericht:</strong> Amtsgericht Fürth, HRB 13412<br />
            <strong>USt-IdNr:</strong> DE 282185353
          </p>

          <p>
            <strong>Kontakt:</strong><br />
            E-Mail: service [at] performance-werk.de
          </p>

          <h2>Haftungsausschluss</h2>

          <h3>Haftung für Inhalte</h3>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>

          <h3>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>

          <h3>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>

          <h2>Hinweis zur KI-Reiseberatung</h2>
          <p>
            Der auf myFly24 angebotene KI-Reiseberater basiert auf künstlicher Intelligenz und dient ausschließlich der unverbindlichen Orientierung. Die generierten Empfehlungen stellen keine verbindliche Reiseberatung dar und können Fehler enthalten. Für verbindliche Reiseinformationen und -warnungen verweisen wir auf das{" "}
            <a href="https://www.auswaertiges-amt.de" target="_blank" rel="noopener noreferrer">
              Auswärtige Amt
            </a>.
          </p>
        </div>
      </main>

      <footer className="py-8 px-5 sm:px-16 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[13px] text-ink-subtle">© 2026 myFly24 · performance werk GmbH</span>
        <div className="flex gap-6">
          <Link href="/impressum" className="text-[13px] text-navy font-medium no-underline">Impressum</Link>
          <Link href="/datenschutz" className="text-[13px] text-ink-subtle no-underline hover:text-navy transition-colors">Datenschutz</Link>
        </div>
      </footer>
    </>
  );
}
