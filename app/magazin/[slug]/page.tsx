import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/app/lib/articles";

export const dynamic = "force-dynamic";

function renderArticleMarkdown(content: string): string {
  return content
    .split("\n")
    .map((line) => {
      // H2: ## Heading
      if (line.startsWith("## ")) {
        return `<h2>${line.slice(3)}</h2>`;
      }
      // H3: ### Heading
      if (line.startsWith("### ")) {
        return `<h3>${line.slice(4)}</h3>`;
      }
      // Bold
      line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      // Italic
      line = line.replace(/\*(.+?)\*/g, "<em>$1</em>");
      // List items
      if (line.match(/^[-–•]\s/)) {
        return "<li>" + line.replace(/^[-–•]\s/, "") + "</li>";
      }
      // Numbered list
      if (line.match(/^\d+\.\s/)) {
        return "<li>" + line.replace(/^\d+\.\s/, "") + "</li>";
      }
      // Empty line = paragraph break
      if (line.trim() === "") return "<br />";
      // Regular paragraph
      return `<p>${line}</p>`;
    })
    .join("\n")
    .replace(/(<li>.*?<\/li>\n?)+/g, (match) =>
      "<ul>" + match.replace(/<br \/>/g, "") + "</ul>"
    );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const allArticles = getAllArticles().filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 px-4 sm:px-12 flex items-center justify-between bg-[rgba(250,247,242,0.85)] backdrop-blur-lg border-b border-[rgba(229,224,216,0.5)]">
        <Link href="/" className="block flex-shrink-0">
          <Image src="/images/logo-myfly24.png" alt="myFly24" width={93} height={40} priority style={{ height: "28px", width: "auto" }} />
        </Link>
        <Link href="/magazin" className="text-sm font-medium text-ink-muted no-underline hover:text-navy transition-colors">
          ← Magazin
        </Link>
      </nav>

      <main className="mt-20 sm:mt-24 px-5 sm:px-16 pb-20">
        <article className="max-w-[720px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] uppercase tracking-[0.14em] text-amber font-semibold">
                {article.category}
              </span>
              <span className="text-[11px] text-ink-subtle">
                {new Date(article.publishedAt).toLocaleDateString("de-DE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-[11px] text-ink-subtle">
                {article.readingTime} Min. Lesezeit
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-navy mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-ink-muted leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden mb-10">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Content */}
          <div
            className="prose-legal"
            dangerouslySetInnerHTML={{ __html: renderArticleMarkdown(article.content) }}
          />
        </article>

        {/* Weitere Artikel */}
        {allArticles.length > 0 && (
          <div className="max-w-[1200px] mx-auto mt-20">
            <div className="w-12 h-px bg-border mx-auto mb-5" />
            <h2 className="font-display text-2xl font-medium text-navy text-center mb-8">
              Weitere Artikel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allArticles.map((a) => (
                <Link key={a.slug} href={`/magazin/${a.slug}`} className="magazine-card no-underline">
                  <div className="relative h-[180px]">
                    <Image src={a.image} alt={a.title} fill sizes="33vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-amber font-semibold">{a.category}</span>
                    <h3 className="font-display text-lg font-medium text-navy mt-1">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
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
