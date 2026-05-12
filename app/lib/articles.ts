import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  readingTime: number;
  type?: "magazine" | "themenwelt";
}

// Artikel-Verzeichnis: shared überlebt Deploys
const ARTICLES_DIR =
  process.env.ARTICLES_DIR || "/var/www/myfly24.com/shared/articles";

function ensureDir() {
  if (!existsSync(ARTICLES_DIR)) {
    mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

export function getAllArticles(): Article[] {
  ensureDir();
  try {
    const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".json"));
    return files
      .map((f) => {
        try {
          const data = readFileSync(join(ARTICLES_DIR, f), "utf-8");
          return JSON.parse(data) as Article;
        } catch {
          return null;
        }
      })
      .filter((a): a is Article => a !== null)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  } catch {
    return [];
  }
}

export function getArticleBySlug(slug: string): Article | null {
  ensureDir();
  const filepath = join(ARTICLES_DIR, `${slug}.json`);
  if (!existsSync(filepath)) return null;
  try {
    return JSON.parse(readFileSync(filepath, "utf-8")) as Article;
  } catch {
    return null;
  }
}

export function getMagazineArticles(): Article[] {
  return getAllArticles().filter((a) => a.type !== "themenwelt");
}

export function getThemenweltArticles(): Article[] {
  return getAllArticles().filter((a) => a.type === "themenwelt");
}

export function saveArticle(article: Article): void {
  ensureDir();
  const filepath = join(ARTICLES_DIR, `${article.slug}.json`);
  writeFileSync(filepath, JSON.stringify(article, null, 2), "utf-8");
}

export function deleteArticle(slug: string): boolean {
  const filepath = join(ARTICLES_DIR, `${slug}.json`);
  if (!existsSync(filepath)) return false;
  const { unlinkSync } = require("fs");
  unlinkSync(filepath);
  return true;
}

// Bild-Zuordnung nach Kategorie
export const CATEGORY_IMAGES: Record<string, string[]> = {
  "Geheimtipps": ["/images/articles/tropical-boat.jpg", "/images/articles/convertible-coast.jpg"],
  "Reiseziele": ["/images/articles/tropical-boat.jpg", "/images/articles/roadtrip-coast.jpg", "/images/articles/convertible-coast.jpg"],
  "Richtig fliegen": ["/images/articles/airport-luggage.jpg", "/images/articles/couple-lounge.jpg"],
  "Familienreisen": ["/images/articles/family-beach.jpg"],
  "Sicherheit": ["/images/articles/creditcard-airport.jpg", "/images/articles/safety-hiker.jpg"],
  "Spar-Strategien": ["/images/articles/couple-lounge.jpg", "/images/articles/banking-app.jpg"],
  "Handgepäck": ["/images/articles/packing-checklist.jpg", "/images/articles/airport-luggage.jpg"],
};

const FALLBACK_IMAGES = [
  "/images/articles/tropical-boat.jpg",
  "/images/articles/airport-luggage.jpg",
  "/images/articles/roadtrip-coast.jpg",
  "/images/articles/convertible-coast.jpg",
  "/images/articles/couple-lounge.jpg",
  "/images/articles/creditcard-airport.jpg",
  "/images/articles/family-beach.jpg",
  "/images/articles/packing-checklist.jpg",
  "/images/articles/contactless-pay.jpg",
  "/images/articles/banking-app.jpg",
  "/images/articles/safety-hiker.jpg",
  "/images/themenwelt/packtipps.jpg",
];

export function getImageForCategory(category: string, usedImages: string[] = []): string {
  const pool = CATEGORY_IMAGES[category] || FALLBACK_IMAGES;
  // Vermeide Duplikate
  const available = pool.filter((img) => !usedImages.includes(img));
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }
  // Fallback: beliebiges ungenutztes Bild
  const fallbackAvailable = FALLBACK_IMAGES.filter((img) => !usedImages.includes(img));
  if (fallbackAvailable.length > 0) {
    return fallbackAvailable[Math.floor(Math.random() * fallbackAvailable.length)];
  }
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
}

// Verfügbare Bilder für Artikel (Legacy-Kompatibilität)
export const ARTICLE_IMAGES = FALLBACK_IMAGES;

// Themen-Rotation für automatische Generierung
export const TOPIC_POOL = [
  { category: "Geheimtipps", topic: "Unbekannte Inseln im Mittelmeer, die noch nicht überlaufen sind" },
  { category: "Geheimtipps", topic: "Die schönsten Bergdörfer Europas abseits der Touristenpfade" },
  { category: "Geheimtipps", topic: "Osteuropa-Geheimtipps: Günstig reisen mit Stil" },
  { category: "Richtig fliegen", topic: "Business Class zum Economy-Preis: So geht Upgrade-Hacking" },
  { category: "Richtig fliegen", topic: "Die besten Fehlerpreise finden: Tools und Timing" },
  { category: "Richtig fliegen", topic: "Handgepäck-Hacks: Alles in einem Rucksack für 2 Wochen" },
  { category: "Familienreisen", topic: "Strandurlaub mit Kindern: Die 5 besten Hotels mit Kinderclub" },
  { category: "Familienreisen", topic: "Roadtrip mit Teenagern: Routen, die wirklich Spaß machen" },
  { category: "Familienreisen", topic: "Fliegen mit Baby: Was Eltern wirklich wissen müssen" },
  { category: "Sicherheit", topic: "Reiseversicherung im Vergleich: Was man wirklich braucht" },
  { category: "Sicherheit", topic: "Allein reisen als Frau: Die sichersten Länder 2026" },
  { category: "Sicherheit", topic: "Kreditkarten im Ausland: Gebühren, Sicherheit, Tipps" },
  { category: "Spar-Strategien", topic: "Wann ist der beste Zeitpunkt zum Flug-Buchen? Datenanalyse 2026" },
  { category: "Spar-Strategien", topic: "All-Inclusive vs. Selbstversorger: Wann lohnt sich was?" },
  { category: "Spar-Strategien", topic: "Luxusurlaub unter 1.000€: 5 Reisen, die es wirklich gibt" },
  { category: "Reiseziele", topic: "Kroatien jenseits von Dubrovnik: Die ruhige Küste" },
  { category: "Reiseziele", topic: "Kappadokien: Mehr als nur Heißluftballons" },
  { category: "Reiseziele", topic: "Andalusien im Herbst: Warum September die beste Reisezeit ist" },
  { category: "Reiseziele", topic: "Norwegens Fjorde mit dem Mietwagen: Route und Budget" },
  { category: "Reiseziele", topic: "Thailand für Einsteiger: 2 Wochen, 1 perfekte Route" },
];
