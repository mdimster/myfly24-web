export interface Themenwelt {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  categories: string[]; // Matching article categories
}

export const THEMENWELTEN: Themenwelt[] = [
  {
    slug: "sicherheit",
    title: "Sicherheit & Versicherungen",
    subtitle: "Gut abgesichert, sorgenfrei reisen",
    image: "/images/themenwelt/sicherheit.jpg",
    categories: ["Sicherheit", "Versicherungen"],
  },
  {
    slug: "reisebudget",
    title: "Reisebudget & Spar-Tipps",
    subtitle: "Mehr erleben, weniger ausgeben",
    image: "/images/themenwelt/reisebudget.jpg",
    categories: ["Spar-Strategien", "Budget"],
  },
  {
    slug: "staedtereisen",
    title: "Städtereisen & City-Guides",
    subtitle: "Die besten Städte für jeden Reisetyp",
    image: "/images/themenwelt/staedtereisen.jpg",
    categories: ["Städtereisen", "City-Guide"],
  },
  {
    slug: "lounge-zugang",
    title: "Flughäfen & Lounge-Zugang",
    subtitle: "Komfort vor dem Abflug genießen",
    image: "/images/themenwelt/lounge-zugang.jpg",
    categories: ["Richtig fliegen", "Lounge"],
  },
  {
    slug: "abenteuer",
    title: "Abenteuer & Outdoor-Erlebnisse",
    subtitle: "Wandern, Trekking, Wassersport und mehr",
    image: "/images/themenwelt/abenteuer-outdoor.jpg",
    categories: ["Abenteuer", "Outdoor"],
  },
  {
    slug: "digital-nomad",
    title: "Digital Nomad & Arbeiten im Ausland",
    subtitle: "Die besten Länder für Remote Work",
    image: "/images/themenwelt/digital-nomad.jpg",
    categories: ["Digital Nomad", "Remote Work"],
  },
  {
    slug: "nachhaltig",
    title: "Nachhaltig reisen",
    subtitle: "Die Welt entdecken. Für heute. Für morgen.",
    image: "/images/themenwelt/nachhaltig.jpg",
    categories: ["Nachhaltigkeit", "Green Travel"],
  },
  {
    slug: "reise-apps",
    title: "Reise-Apps & Tools",
    subtitle: "Clever planen, smarter reisen",
    image: "/images/themenwelt/reise-apps.jpg",
    categories: ["Apps", "Tools"],
  },
  {
    slug: "packtipps",
    title: "Packtipps & Reise-Checklisten",
    subtitle: "Nichts vergessen – stressfrei reisen",
    image: "/images/themenwelt/packtipps.jpg",
    categories: ["Packtipps", "Handgepäck"],
  },
  {
    slug: "reiseversicherung",
    title: "Reiseversicherungen im Vergleich",
    subtitle: "Umfassender Schutz auf Reisen",
    image: "/images/themenwelt/reiseversicherung.jpg",
    categories: ["Versicherungen", "Reiseversicherung"],
  },
];

export function getThemenweltBySlug(slug: string): Themenwelt | undefined {
  return THEMENWELTEN.find((t) => t.slug === slug);
}
