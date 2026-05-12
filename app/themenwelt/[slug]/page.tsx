import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getThemenweltBySlug, THEMENWELTEN } from "@/app/lib/themenwelten";
import { getAllArticles } from "@/app/lib/articles";

export const dynamic = "force-dynamic";

export default async function ThemenweltPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const themenwelt = getThemenweltBySlug(slug);
  if (!themenwelt) notFound();

  // Artikel finden die zu dieser Themenwelt passen
  const allArticles = getAllArticles();
  const related = allArticles.filter((a) =>
    themenwelt.categories.some(
      (cat) => a.category.toLowerCase().includes(cat.toLowerCase()) ||
        cat.toLowerCase().includes(a.category.toLowerCase())
    )
  );

  // Andere Themenwelten für Navigation
  const others = THEMENWELTEN.filter((t) => t.slug !== slug).slice(0, 4);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 px-4 sm:px-12 flex items-center justify-between bg-[rgba(250,247,242,0.85)] backdrop-blur-lg border-b border-[rgba(229,224,216,0.5)]">
        <Link href="/" className="block flex-shrink-0">
          <Image src="/images/logo-myfly24.png" alt="myFly24" width={93} height={40} priority style={{ height: "28px", width: "auto" }} />
        </Link>
        <Link href="/#themenwelten" className="text-sm font-medium text-ink-muted no-underline hover:text-navy transition-colors">
          ← Themenwelten
        </Link>
      </nav>

      <main className="mt-14 sm:mt-16">
        {/* Hero: Großes Infografik-Bild */}
        <div className="relative w-full" style={{ aspectRatio: "3/2", maxHeight: "70vh" }}>
          <Image
            src={themenwelt.image}
            alt={themenwelt.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Zugehörige Artikel */}
        <section className="px-5 sm:px-16 py-12 sm:py-16 max-w-[1200px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-navy mb-2">
            Artikel zu {themenwelt.title}
          </h2>
          <p className="text-ink-muted mb-8">{themenwelt.subtitle}</p>

          {related.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-ink-muted text-lg mb-4">
                Hier entstehen bald Artikel zu diesem Thema.
              </p>
              <p className="text-sm text-ink-subtle">
                Unser KI-Redakteur arbeitet bereits daran – schau bald wieder vorbei!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((article) => (
                <Link
                  key={article.slug}
                  href={`/magazin/${article.slug}`}
                  className="magazine-card no-underline"
                >
                  <div className="relative h-[180px]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-amber font-semibold">
                      {article.category}
                    </span>
                    <h3 className="font-display text-lg font-medium text-navy mt-1 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Weitere Themenwelten */}
        <section className="px-5 sm:px-16 pb-16 max-w-[1200px] mx-auto">
          <div className="w-12 h-px bg-border mx-auto mb-5" />
          <h2 className="font-display text-2xl font-medium text-navy text-center mb-8">
            Weitere Themenwelten
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((t) => (
              <Link key={t.slug} href={`/themenwelt/${t.slug}`} className="dest-card no-underline">
                <Image src={t.image} alt={t.title} fill sizes="(max-width: 1024px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                <div className="dest-overlay">
                  <p className="font-display text-base sm:text-lg font-medium text-white leading-snug">{t.title}</p>
                </div>
              </Link>
            ))}
          </div>
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
