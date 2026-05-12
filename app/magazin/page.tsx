import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/app/lib/articles";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Magazin – myFly24",
  description: "Reisewissen, Geheimtipps und Spar-Strategien aus dem myFly24 Magazin.",
};

export default function MagazinPage() {
  const articles = getAllArticles();

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

      <main className="mt-20 sm:mt-24 px-5 sm:px-16 pb-20 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle font-semibold mb-2.5">
            Magazin
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-navy mb-3">
            <em className="italic text-amber">Reisewissen,</em> das ankommt.
          </h1>
          <p className="text-base text-ink-muted">
            Geheimtipps, Spar-Strategien und Geschichten für deine nächste Reise.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-muted text-lg mb-4">Noch keine Artikel veröffentlicht.</p>
            <Link href="/" className="text-amber font-medium no-underline hover:underline">
              Zurück zur Startseite →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/magazin/${article.slug}`}
                className="magazine-card no-underline"
              >
                <div className="relative h-[200px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-5 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-amber font-semibold">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-ink-subtle">
                      {article.readingTime} Min. Lesezeit
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-medium leading-snug text-navy mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
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
