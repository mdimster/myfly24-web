"use client";

import { useState } from "react";

interface ChecklistItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
  sponsored?: boolean;
}

interface TravelContext {
  isFernreise: boolean;
  isFamily: boolean;
  isLong: boolean;
  isRoadtrip: boolean;
  isDigitalNomad: boolean;
}

// Awin-Deeplinks (Publisher-ID: 396279)
const LINKS = {
  tarifcheckKreditkarte:
    "https://www.awin1.com/cread.php?awinmid=11202&awinaffid=396279&ued=https%3A%2F%2Fwww.tarifcheck.de%2Fkreditkarten%2F",
  wow:
    "https://www.awin1.com/cread.php?awinmid=23467&awinaffid=396279",
  ltur:
    "https://www.awin1.com/cread.php?awinmid=9139&awinaffid=396279",
};

function detectContext(messages: string[]): TravelContext {
  const text = messages.join(" ").toLowerCase();

  const fernreiseKeywords = [
    "thailand", "asien", "usa", "amerika", "kanada", "mexiko", "australien",
    "neuseeland", "japan", "bali", "indonesien", "vietnam", "kambodscha",
    "indien", "sri lanka", "malediven", "dubai", "vae", "emirates",
    "ägypten", "afrika", "südafrika", "kenia", "tansania", "brasilien",
    "kolumbien", "peru", "chile", "argentinien", "kuba", "karibik",
    "dominikanische", "weltweit", "fernreise", "langstrecke", "interkontinental",
  ];
  const familyKeywords = ["familie", "kinder", "kids", "baby", "kleinkind", "familienurlaub", "kinderclub"];
  const longKeywords = ["3 wochen", "4 wochen", "monat", "langzeit", "länger", "mehrere wochen", "round trip", "rundreise"];
  const roadtripKeywords = ["roadtrip", "mietwagen", "road trip", "autofahren", "camper", "wohnmobil", "selbstfahrer"];
  const digitalNomadKeywords = ["arbeiten", "remote", "digital nomad", "coworking", "laptop", "homeoffice"];

  return {
    isFernreise: fernreiseKeywords.some((kw) => text.includes(kw)),
    isFamily: familyKeywords.some((kw) => text.includes(kw)),
    isLong: longKeywords.some((kw) => text.includes(kw)),
    isRoadtrip: roadtripKeywords.some((kw) => text.includes(kw)),
    isDigitalNomad: digitalNomadKeywords.some((kw) => text.includes(kw)),
  };
}

function getChecklistItems(ctx: TravelContext): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  // Kreditkarte – immer bei Fernreise, sonst optional
  if (ctx.isFernreise) {
    items.push({
      id: "kreditkarte",
      icon: "💳",
      title: "Kreditkarte ohne Auslandsgebühren",
      description: "Spart 1,5–2 % Gebühren bei jeder Zahlung im Ausland. Am besten Visa oder Mastercard.",
      link: LINKS.tarifcheckKreditkarte,
      linkLabel: "Kreditkarten vergleichen",
      sponsored: true,
    });
  }

  // Auslandskrankenversicherung – immer
  items.push({
    id: "versicherung",
    icon: "🏥",
    title: "Auslandskrankenversicherung",
    description: ctx.isFernreise
      ? "Pflicht bei Fernreisen. Rücktransport allein kann 30.000–80.000 € kosten."
      : "Auch in Europa empfohlen. Jahresverträge ab 12 € pro Person.",
    link: "/versicherung",
    linkLabel: "Zum Bedarfsrechner",
  });

  // Reiserücktritt – bei Familie oder langer Reise
  if (ctx.isFamily || ctx.isLong) {
    items.push({
      id: "ruecktritt",
      icon: "🔄",
      title: "Reiserücktrittsversicherung",
      description: ctx.isFamily
        ? "Mit Kindern höheres Ausfallrisiko. Schützt die Anzahlung bei Stornierung."
        : "Bei teuren oder langfristig gebuchten Reisen besonders sinnvoll.",
      link: "/versicherung",
      linkLabel: "Mehr erfahren",
    });
  }

  // eSIM – bei Fernreise
  if (ctx.isFernreise) {
    items.push({
      id: "esim",
      icon: "📱",
      title: "eSIM fürs Reiseland",
      description: "Günstiger als Roaming, sofort aktiv. Anbieter wie Airalo oder Holafly bieten Datenpakete ab 5 €.",
    });
  }

  // VPN – bei Fernreise oder Digital Nomad
  if (ctx.isFernreise || ctx.isDigitalNomad) {
    items.push({
      id: "vpn",
      icon: "🔒",
      title: "VPN für sicheres Surfen",
      description: "Schützt deine Daten in öffentlichen WLANs. Auch nützlich für Streaming im Ausland.",
    });
  }

  // Streaming – bei Fernreise (Langstrecke)
  if (ctx.isFernreise) {
    items.push({
      id: "streaming",
      icon: "🎬",
      title: "Streaming für den Flug",
      description: "Serien und Filme vorab herunterladen. Offline-Modus bei Netflix, WOW oder Disney+ nutzen.",
      link: LINKS.wow,
      linkLabel: "WOW entdecken",
      sponsored: true,
    });
  }

  // Mietwagen – bei Roadtrip
  if (ctx.isRoadtrip) {
    items.push({
      id: "mietwagen",
      icon: "🚗",
      title: "Mietwagen vergleichen",
      description: "Frühbucher-Preise sichern und auf Vollkasko ohne Selbstbeteiligung achten.",
    });
  }

  // Last Minute – immer als Tipp
  items.push({
    id: "lastminute",
    icon: "✈️",
    title: "Flüge & Last-Minute-Deals",
    description: "Preise vergleichen und flexibel bleiben spart oft mehrere hundert Euro.",
    link: LINKS.ltur,
    linkLabel: "l'tur Deals ansehen",
    sponsored: true,
  });

  return items;
}

export default function TravelChecklist({ messages }: { messages: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const ctx = detectContext(messages);
  const items = getChecklistItems(ctx);

  return (
    <div className="checklist-wrap">
      <button className="checklist-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="checklist-toggle-icon">🎒</span>
        <span className="checklist-toggle-text">
          Deine Reise-Checkliste
          <span className="checklist-toggle-count">{items.length} Tipps</span>
        </span>
        <span className={`checklist-arrow ${isOpen ? "open" : ""}`}>›</span>
      </button>

      {isOpen && (
        <div className="checklist-items">
          {items.map((item) => (
            <div key={item.id} className="checklist-item">
              <span className="checklist-item-icon">{item.icon}</span>
              <div className="checklist-item-content">
                <div className="checklist-item-title">{item.title}</div>
                <div className="checklist-item-desc">{item.description}</div>
                {item.link && (
                  <a
                    href={item.link}
                    target={item.link.startsWith("/") ? undefined : "_blank"}
                    rel={item.sponsored ? "noopener noreferrer sponsored" : undefined}
                    className="checklist-item-link"
                  >
                    {item.linkLabel} →
                  </a>
                )}
              </div>
            </div>
          ))}
          <p className="checklist-note">
            * Bei mit → gekennzeichneten Links erhalten wir eine kleine Provision. Für dich entstehen keine Mehrkosten.
          </p>
        </div>
      )}
    </div>
  );
}
