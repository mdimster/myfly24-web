import Image from "next/image";
import Link from "next/link";
import ChatSection from "./components/ChatSection";

/* ─── SVG Icon Components ─── */

function UserIcon() {
  return (
    <svg className="w-[26px] h-[26px] text-navy opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-[26px] h-[26px] text-navy opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-[26px] h-[26px] text-navy opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-[26px] h-[26px] text-navy opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ─── Data ─── */

const magazineArticles = [
  {
    slug: "schoenheit-suedeuropas",
    image: "/images/stone-village.jpg",
    tag: "Geheimtipps",
    title: "Die unerwartete Schönheit Südeuropas",
    excerpt:
      "Abseits der Touristenströme warten Dörfer, die sich anfühlen wie eine Zeitreise.",
  },
  {
    slug: "business-class-guenstig",
    image: "/images/airplane-window.jpg",
    tag: "Richtig fliegen",
    title: "Business Class unter 800\u202F€? So geht\u2019s.",
    excerpt:
      "Die besten Strategien für Premium-Flüge zum Bruchteil des regulären Preises.",
  },
  {
    slug: "mit-kindern-reisen",
    image: "/images/family-coast.jpg",
    tag: "Familienreisen",
    title: "Mit Kindern reisen, ohne den Verstand zu verlieren",
    excerpt:
      "Fünf Familien verraten, warum ihre besten Urlaube die ungeplanten waren.",
  },
];

const destinations = [
  {
    name: "Kroatien",
    tagline: "Küste, Kultur, Klarheit",
    image: "/images/coast-sunset.jpg",
  },
  {
    name: "Österreich",
    tagline: "Berge, die den Kopf frei machen",
    image: "/images/alpine-lake.jpg",
  },
  {
    name: "Griechenland",
    tagline: "Türkis, Tavernen, Tiefenentspannung",
    image: "/images/turquoise-bay.jpg",
  },
  {
    name: "Mallorca",
    tagline: "Mehr als nur Ballermann",
    image: "/images/family-beach.jpg",
  },
];

const trustItems = [
  {
    icon: <UserIcon />,
    title: "Persönliche Empfehlungen",
    desc: "statt endloser Suche",
  },
  {
    icon: <ClockIcon />,
    title: "Transparente Optionen",
    desc: "für jedes Budget",
  },
  {
    icon: <CheckCircleIcon />,
    title: "Smarte Entscheidungen",
    desc: "auf einen Blick",
  },
  {
    icon: <HeartIcon />,
    title: "Mehr Zeit für das,",
    desc: "was wirklich zählt",
  },
];

/* ─── Page ─── */

export default function HomePage() {
  return (
    <>
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 px-4 sm:px-12 flex items-center justify-between bg-[rgba(250,247,242,0.85)] backdrop-blur-lg border-b border-[rgba(229,224,216,0.5)]">
        <Link href="/" className="block flex-shrink-0">
          <Image
            src="/images/logo-myfly24.png"
            alt="myFly24"
            width={93}
            height={40}
            priority
            style={{ height: "28px", width: "auto" }}
          />
        </Link>
        <div className="flex gap-4 sm:gap-8">
          <Link href="#magazin" className="text-xs sm:text-sm font-medium text-ink-muted no-underline hover:text-navy transition-colors">
            Magazin
          </Link>
          <Link href="#reiseziele" className="text-xs sm:text-sm font-medium text-ink-muted no-underline hover:text-navy transition-colors">
            Reiseziele
          </Link>
          <Link href="#so-funktionierts" className="text-xs sm:text-sm font-medium text-ink-muted no-underline hover:text-navy transition-colors whitespace-nowrap">
            So geht&apos;s
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero mt-14 sm:mt-16">
        <div className="hero-bg">
          <Image
            src="/images/hero-cappadocia.jpg"
            alt="Reisende blickt auf Heißluftballons in Kappadokien bei Sonnenuntergang"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "70% center" }}
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-border text-[12px] sm:text-[13px] font-medium text-navy mb-5 sm:mb-7 shadow-[0_2px_8px_rgba(26,40,71,0.06)]">
            <span className="text-sm">✨</span>
            Dein KI-Reiseberater
          </div>

          {/* Headline */}
          <h1 className="font-display text-[34px] sm:text-[44px] lg:text-[56px] font-semibold leading-[1.1] tracking-tight text-navy mb-2 sm:mb-3.5">
            <em className="italic">Erzähl mir von</em>
            <br />
            deiner Reise.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-ink-muted mb-6 sm:mb-9 leading-relaxed">
            Drei Fragen, eine klare Empfehlung.
          </p>

          {/* Chat */}
          <ChatSection />
        </div>

        {/* Trust Strip */}
        <div className="trust-strip">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-start gap-2.5">
              {item.icon}
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-navy leading-tight">
                  {item.title}
                </span>
                <span className="text-[12px] text-ink-muted leading-tight">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MAGAZIN ─── */}
      <div id="magazin" className="text-center pt-12 sm:pt-16 px-5 sm:px-16">
        <div className="w-12 h-px bg-border mx-auto mb-5" />
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle font-semibold mb-2.5">
          Magazin
        </p>
        <h2 className="font-display text-4xl font-medium tracking-tight text-navy mb-2">
          <em className="italic text-amber">Noch</em> unentschlossen?
        </h2>
        <p className="text-base text-ink-muted mb-12 leading-relaxed">
          Geschichten, Inspiration und Tipps aus unserem Magazin.
        </p>
      </div>

      <section className="px-5 sm:px-16 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-[1200px] mx-auto">
          {magazineArticles.map((article) => (
            <article key={article.slug} className="magazine-card">
              <div className="relative h-[180px] sm:h-[220px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-5 pb-6">
                <p className="text-[11px] uppercase tracking-[0.14em] text-amber font-semibold mb-2">
                  {article.tag}
                </p>
                <h3 className="font-display text-xl font-medium leading-snug text-navy mb-2.5">
                  {article.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── REISEZIELE ─── */}
      <div id="reiseziele" className="text-center pt-12 sm:pt-16 px-5 sm:px-16">
        <div className="w-12 h-px bg-border mx-auto mb-5" />
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle font-semibold mb-2.5">
          Reiseziele
        </p>
        <h2 className="font-display text-4xl font-medium tracking-tight text-navy mb-2">
          <em className="italic text-amber">Wohin</em> soll&apos;s gehen?
        </h2>
        <p className="text-base text-ink-muted mb-12 leading-relaxed">
          Unsere beliebtesten Ziele – handverlesen, nicht algorithmisch.
        </p>
      </div>

      <section className="px-5 sm:px-16 pb-16 sm:pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-[1200px] mx-auto">
          {destinations.map((dest) => (
            <div key={dest.name} className="dest-card">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <div className="dest-overlay">
                <p className="font-display text-base sm:text-xl font-medium text-white mb-0.5">
                  {dest.name}
                </p>
                <p className="text-[11px] sm:text-[13px] text-white/75 leading-snug">{dest.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SO FUNKTIONIERT'S ─── */}
      <section
        id="so-funktionierts"
        className="py-16 sm:py-20 px-5 sm:px-16 bg-white border-t border-b border-border"
      >
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle font-semibold mb-2.5">
            So funktioniert&apos;s
          </p>
          <h2 className="font-display text-4xl font-medium tracking-tight text-navy">
            <em className="italic text-amber">Drei Schritte</em> zur perfekten
            Reise
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[960px] mx-auto text-center">
          {[
            {
              n: "1",
              title: "Erzähl uns davon",
              desc: "Beantworte drei kurze Fragen – zu Ziel, Budget und was dir wichtig ist.",
            },
            {
              n: "2",
              title: "Wir analysieren",
              desc: "Unsere KI vergleicht tausende Optionen und findet die beste Kombination.",
            },
            {
              n: "3",
              title: "Du entscheidest",
              desc: "Eine Hauptempfehlung, transparent begründet. Keine endlosen Listen.",
            },
          ].map((step) => (
            <div key={step.n}>
              <div className="step-number">{step.n}</div>
              <p className="text-base font-semibold text-navy mb-2">
                {step.title}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="bg-navy py-16 sm:py-20 px-5 sm:px-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold mb-2.5">
          Der Brief
        </p>
        <h2 className="font-display text-[32px] font-medium text-white mb-2 tracking-tight">
          <em className="italic text-amber">Reisewissen,</em> das ankommt.
        </h2>
        <p className="text-[15px] text-white/60 mb-8 leading-relaxed">
          Einmal pro Woche: Deals, Geheimtipps und Entscheidungshilfen. Kein
          Spam.
        </p>
        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Deine E-Mail-Adresse"
            readOnly
            tabIndex={-1}
          />
          <button className="newsletter-btn">Anmelden</button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 sm:py-10 px-5 sm:px-16 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[13px] text-ink-subtle">
          © 2026 myFly24 · performance werk Media GmbH
        </span>
        <div className="flex gap-6">
          <Link href="#" className="text-[13px] text-ink-subtle no-underline hover:text-navy transition-colors">
            Impressum
          </Link>
          <Link href="#" className="text-[13px] text-ink-subtle no-underline hover:text-navy transition-colors">
            Datenschutz
          </Link>
          <Link href="#" className="text-[13px] text-ink-subtle no-underline hover:text-navy transition-colors">
            AGB
          </Link>
        </div>
      </footer>
    </>
  );
}
