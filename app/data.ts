// Demo-Daten für myFly24 – später aus Sanity / API

export type Article = {
  slug: string;
  tag: string;
  category: string;
  title: string;
  title_italic: string;
  title_rest: string;
  teaser: string;
  gradient: string;
  author: { name: string; initials: string; bio: string };
  date: string;
  reading_time: string;
  bridge_destination: string | null;
  body: ArticleBlock[];
};

export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; source?: string }
  | { type: "bridge" };

export const ARTICLES: Article[] = [
  {
    slug: "mallorca-im-herbst",
    tag: "Saison · Mallorca",
    category: "saison",
    title: "Die unerwartete Saison",
    title_italic: "Die unerwartete",
    title_rest: "Saison",
    teaser:
      "Warum der Oktober auf Mallorca der bessere August ist – und welche Buchten dann fast leer sind.",
    gradient:
      "linear-gradient(170deg, #1A2847 0%, #3454A1 25%, #B8845A 60%, #E89B3A 85%, #F4D27A 100%)",
    author: {
      name: "Julia Kessler",
      initials: "JK",
      bio: "Reisejournalistin, lebt in Hamburg und Palma. Schreibt für myFly24 über die Mittelmeerinseln.",
    },
    date: "5. Mai 2026",
    reading_time: "7 Min",
    bridge_destination: "Mallorca",
    body: [
      {
        type: "lead",
        text: "Der August auf Mallorca ist eine ehrliche Erfahrung. Volle Strände, ausverkaufte Hotels, Mietwagen ab 95 Euro pro Tag, Restaurants mit zwei Wochen Vorlaufzeit. Wer dann hinfliegt, weiß, was er bekommt.",
      },
      {
        type: "p",
        text: "Nur kennt fast keiner die Variante drei Wochen später: gleiche Insel, halbe Menschenmenge, 22 Grad im Wasser, Direktflüge ab 198 Euro. Der Oktober auf Mallorca ist das, was der August einmal war – und niemand spricht darüber.",
      },
      {
        type: "quote",
        text: "Es fühlt sich an wie Vorsaison – nur mit echter Sonne.",
        source: "Familie Becker, vier Mallorca-Reisen",
      },
      {
        type: "p",
        text: "Drei Punkte machen Oktober besser. Erstens das Wetter: 23 bis 26 Grad tagsüber, abends ein Pullover, der Wind ist warm. Zweitens die Preise: Hotels fallen um 30 bis 40 Prozent, Mietwagen liegen in der Vorsaison-Tabelle. Drittens, und das überrascht am meisten, die Stille.",
      },
      { type: "bridge" },
      { type: "h2", text: "Welche Buchten dann leer sind" },
      {
        type: "p",
        text: "Im Süden ist es Cala Llombards, im Osten Cala Varques, im Norden die kleine Cala Figuera. Alle drei haben im August Wartezeiten an der Zufahrtsstraße – im Oktober findet man Parkplätze drei Schritte vom Sand.",
      },
    ],
  },
  {
    slug: "sieben-buchten",
    tag: "Roadtrip",
    category: "roadtrip",
    title: "Sieben Buchten, sieben Stille",
    title_italic: "Sieben Buchten,",
    title_rest: "sieben Stille",
    teaser:
      "Eine Auswahl jenseits der Touristenrouten – mit Karte, Mietwagen-Tipps und ehrlichen Strandbewertungen.",
    gradient: "linear-gradient(135deg, #2E5C8A 0%, #C7B89A 100%)",
    author: { name: "Tomás Ruiz", initials: "TR", bio: "Schreibt seit 12 Jahren über Mittelmeer-Roadtrips." },
    date: "28. April 2026",
    reading_time: "5 Min",
    bridge_destination: "Mallorca",
    body: [
      {
        type: "lead",
        text: "Sie liegen alle im Süden, alle innerhalb von 90 Minuten Fahrt – und doch kennt sie kaum jemand außerhalb der lokalen Familien.",
      },
    ],
  },
  {
    slug: "kindergerecht",
    tag: "Familie",
    category: "familie",
    title: "Kindergerecht heißt nicht langweilig",
    title_italic: "Kindergerecht heißt",
    title_rest: "nicht langweilig",
    teaser:
      "Vier Reiseziele, an denen sich Eltern wie Kinder wohlfühlen – ohne All-Inclusive-Falle.",
    gradient: "linear-gradient(135deg, #D4C0AE 0%, #E89B3A 100%)",
    author: { name: "Anna Werner", initials: "AW", bio: "Mutter von zwei Kindern und Reisejournalistin." },
    date: "21. April 2026",
    reading_time: "6 Min",
    bridge_destination: "Familie",
    body: [
      {
        type: "lead",
        text: "Familienreise ist nicht gleich Bettenburg. Es gibt einen Mittelweg – und der ist günstiger als gedacht.",
      },
    ],
  },
  {
    slug: "thailand-budget",
    tag: "Fernreise",
    category: "fernreise",
    title: "Thailand im Februar: Was es kostet",
    title_italic: "Thailand im Februar:",
    title_rest: "Was es kostet",
    teaser: "Zwei Wochen, drei Inseln, ein realistisches Budget.",
    gradient: "linear-gradient(135deg, #1F8B7A 0%, #D5C9B0 100%)",
    author: { name: "Julia Kessler", initials: "JK", bio: "Reisejournalistin." },
    date: "14. April 2026",
    reading_time: "9 Min",
    bridge_destination: "Thailand",
    body: [
      {
        type: "lead",
        text: "1.800 Euro pro Person für zwei Wochen Thailand klingt zu schön, um wahr zu sein. Es ist trotzdem realistisch – wenn man drei Dinge weiß.",
      },
    ],
  },
];

export const CATEGORIES = [
  { key: "all", label: "Alle" },
  { key: "saison", label: "Saison" },
  { key: "familie", label: "Familie" },
  { key: "roadtrip", label: "Roadtrip" },
  { key: "fernreise", label: "Fernreise" },
];

export const DESTINATIONS = [
  { slug: "mallorca", name: "Mallorca", tagline: "Strand · Direkt", price_from: 198, gradient: "linear-gradient(135deg, #C5D5DE 0%, #DDD3BE 100%)" },
  { slug: "kreta", name: "Kreta", tagline: "Insel · Buchten", price_from: 215, gradient: "linear-gradient(135deg, #C8C5C2 0%, #D5CFB8 100%)" },
  { slug: "barcelona", name: "Barcelona", tagline: "Stadt · Wochenende", price_from: 89, gradient: "linear-gradient(135deg, #D4C0AE 0%, #DCC9A8 100%)" },
  { slug: "thailand", name: "Thailand", tagline: "Fern · Winter", price_from: 549, gradient: "linear-gradient(135deg, #BFC9C0 0%, #D5C9B0 100%)" },
];