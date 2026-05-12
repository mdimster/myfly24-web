import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Datenschutzerklärung – myFly24",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
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
        <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-navy mb-2">
          Datenschutzerklärung
        </h1>
        <p className="text-sm text-ink-subtle mb-8">Stand: Mai 2026</p>

        <div className="prose-legal">

          <h2>1. Verantwortlicher</h2>
          <p>
            <strong>performance werk GmbH</strong><br />
            Flugplatzstraße 100, 90768 Fürth<br />
            E-Mail: service [at] performance-werk.de<br />
            Geschäftsführer: Mark Dimster
          </p>

          <h2>2. Hosting</h2>
          <p>
            Diese Website wird bei der Hetzner Online GmbH (Industriestr. 25, 91710 Gunzenhausen) gehostet. Beim Besuch unserer Website erfasst der Server automatisch technische Zugriffsdaten (sog. Server-Logfiles): IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit der Anfrage. Diese Daten sind für den technischen Betrieb erforderlich und werden nach 14 Tagen gelöscht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb).
          </p>

          <h2>3. SSL-Verschlüsselung</h2>
          <p>
            Aus Sicherheitsgründen nutzt diese Seite eine SSL-Verschlüsselung (HTTPS). Eine verschlüsselte Verbindung erkennen Sie an dem Schloss-Symbol in der Adressleiste Ihres Browsers.
          </p>

          <h2>4. KI-Reiseberater</h2>
          <p>
            Unser KI-Reiseberater basiert auf der API von Anthropic (Anthropic, PBC, San Francisco, USA). Wenn Sie den Reiseberater nutzen, werden Ihre Eingaben (Textnachrichten) an die Server von Anthropic übertragen und dort verarbeitet, um Ihnen eine Reiseempfehlung zu generieren.
          </p>
          <p>
            <strong>Verarbeitete Daten:</strong> Ausschließlich die von Ihnen eingegebenen Textnachrichten. Es werden keine personenbezogenen Daten wie Name, E-Mail oder IP-Adresse an Anthropic übermittelt.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Nutzung des Reiseberaters ist freiwillig. Mit der Eingabe Ihrer ersten Nachricht willigen Sie in die Verarbeitung ein.
          </p>
          <p>
            <strong>Drittlandtransfer:</strong> Anthropic verarbeitet Daten in den USA. Ein angemessenes Datenschutzniveau wird durch die Standardvertragsklauseln der EU-Kommission gewährleistet.
          </p>
          <p>
            <strong>Speicherdauer:</strong> Ihre Chat-Nachrichten werden nicht dauerhaft gespeichert. Nach Abschluss der Sitzung werden die Daten verworfen. Anthropic speichert Eingaben gemäß ihrer eigenen{" "}
            <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzrichtlinie</a>.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Es werden keine Tracking-, Analyse- oder Marketing-Cookies eingesetzt.
          </p>
          <p>
            Technisch notwendige Cookies können nicht deaktiviert werden, da die Website sonst nicht korrekt funktionieren würde. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h2>6. Analyse</h2>
          <p>
            Für die statistische Auswertung der Websitenutzung setzen wir Plausible Analytics ein – eine datenschutzfreundliche, cookiefreie Analyselösung. Plausible wird von uns selbst gehostet (Self-Hosted), es werden keine Daten an Dritte übermittelt. Es werden keine Cookies gesetzt und keine personenbezogenen Daten erhoben. Die Auswertung erfolgt vollständig anonymisiert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h2>7. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht auf:</p>
          <ul>
            <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
            <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
            <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
            <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
            <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p>
            Zur Wahrnehmung Ihrer Rechte wenden Sie sich bitte an: service [at] performance-werk.de
          </p>
          <p>
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständige Aufsichtsbehörde ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.
          </p>

          <h2>8. Änderungen</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht. Die jeweils aktuelle Fassung gilt bei Ihrem erneuten Besuch.
          </p>

        </div>
      </main>

      <footer className="py-8 px-5 sm:px-16 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[13px] text-ink-subtle">© 2026 myFly24 · performance werk GmbH</span>
        <div className="flex gap-6">
          <Link href="/impressum" className="text-[13px] text-ink-subtle no-underline hover:text-navy transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="text-[13px] text-navy font-medium no-underline">Datenschutz</Link>
        </div>
      </footer>
    </>
  );
}
