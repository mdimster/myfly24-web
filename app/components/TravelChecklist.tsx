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

const LINKS = {
  tarifcheckKreditkarte:
    "https://www.awin1.com/cread.php?awinmid=11202&awinaffid=396279&ued=https%3A%2F%2Fwww.tarifcheck.de%2Fkreditkarten%2F",
  wow: "https://www.awin1.com/cread.php?awinmid=23467&awinaffid=396279",
  ltur: "https://www.awin1.com/cread.php?awinmid=9139&awinaffid=396279",
};

function detectContext(messages: string[]) {
  const text = messages.join(" ").toLowerCase();
  const check = (words: string[]) => words.some((w) => text.includes(w));
  return {
    isFernreise: check(["thailand","asien","usa","amerika","kanada","mexiko","australien","neuseeland","japan","bali","indonesien","vietnam","kambodscha","indien","sri lanka","malediven","dubai","vae","ägypten","afrika","südafrika","brasilien","kolumbien","peru","chile","kuba","karibik","weltweit","fernreise","langstrecke"]),
    isFamily: check(["familie","kinder","kids","baby","kleinkind","familienurlaub","kinderclub"]),
    isLong: check(["3 wochen","4 wochen","monat","langzeit","mehrere wochen","rundreise"]),
    isRoadtrip: check(["roadtrip","mietwagen","road trip","camper","wohnmobil"]),
    isDigitalNomad: check(["arbeiten","remote","digital nomad","coworking","laptop"]),
  };
}

function getItems(ctx: ReturnType<typeof detectContext>): ChecklistItem[] {
  const items: ChecklistItem[] = [];
  if (ctx.isFernreise) items.push({ id: "kreditkarte", icon: "💳", title: "Kreditkarte ohne Auslandsgebühren", description: "Spart 1,5–2 % bei jeder Zahlung im Ausland.", link: LINKS.tarifcheckKreditkarte, linkLabel: "Kreditkarten vergleichen", sponsored: true });
  items.push({ id: "versicherung", icon: "🏥", title: "Auslandskrankenversicherung", description: ctx.isFernreise ? "Pflicht bei Fernreisen – Rücktransport kann 30.000–80.000 € kosten." : "Auch in Europa empfohlen. Jahresverträge ab 12 €.", link: "/versicherung", linkLabel: "Zum Bedarfsrechner" });
  if (ctx.isFamily || ctx.isLong) items.push({ id: "ruecktritt", icon: "🔄", title: "Reiserücktrittsversicherung", description: ctx.isFamily ? "Mit Kindern höheres Ausfallrisiko." : "Bei teuren Buchungen den Stornoschutz nicht vergessen.", link: "/versicherung", linkLabel: "Mehr erfahren" });
  if (ctx.isFernreise) items.push({ id: "esim", icon: "📱", title: "eSIM fürs Reiseland", description: "Günstiger als Roaming, sofort aktiv. Ab 5 € bei Airalo oder Holafly." });
  if (ctx.isFernreise || ctx.isDigitalNomad) items.push({ id: "vpn", icon: "🔒", title: "VPN für sicheres Surfen", description: "Schützt deine Daten in öffentlichen WLANs." });
  if (ctx.isFernreise) items.push({ id: "streaming", icon: "🎬", title: "Streaming für den Flug", description: "Serien vorab herunterladen – Offline-Modus nutzen.", link: LINKS.wow, linkLabel: "WOW entdecken", sponsored: true });
  if (ctx.isRoadtrip) items.push({ id: "mietwagen", icon: "🚗", title: "Mietwagen vergleichen", description: "Frühbucher-Preise sichern, Vollkasko ohne Selbstbeteiligung." });
  items.push({ id: "deals", icon: "✈️", title: "Flüge & Last-Minute-Deals", description: "Preise vergleichen und flexibel bleiben.", link: LINKS.ltur, linkLabel: "l'tur Deals ansehen", sponsored: true });
  return items;
}

export default function TravelChecklist({ messages }: { messages: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const ctx = detectContext(messages);
  const items = getItems(ctx);

  return (
    <div style={{ marginTop: 12, borderRadius: 16, overflow: "hidden", border: "1px solid #E5E0D8", background: "#fff" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          padding: "14px 16px", background: "linear-gradient(135deg, #1A2847, #2A3B5C)",
          border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontSize: 18 }}>🎒</span>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#fff" }}>
          Deine Reise-Checkliste
          <span style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 9999, background: "rgba(255,255,255,0.15)", fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
            {items.length} Tipps
          </span>
        </span>
        <span style={{ color: "#fff", fontSize: 18, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
      </button>

      {isOpen && (
        <div style={{ padding: "8px 0" }}>
          {items.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px" }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1A2847", marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "#6B6B6B", lineHeight: 1.4 }}>{item.description}</div>
                {item.link && (
                  <a
                    href={item.link}
                    target={item.link.startsWith("/") ? undefined : "_blank"}
                    rel={item.sponsored ? "noopener noreferrer sponsored" : undefined}
                    style={{ display: "inline-block", marginTop: 4, fontSize: 12, fontWeight: 500, color: "#E89B3A", textDecoration: "none" }}
                  >
                    {item.linkLabel} →
                  </a>
                )}
              </div>
            </div>
          ))}
          <p style={{ padding: "8px 16px 12px", fontSize: 10, color: "#9A9A9A", lineHeight: 1.4 }}>
            * Bei mit → gekennzeichneten Links erhalten wir ggf. eine Provision. Keine Mehrkosten für dich.
          </p>
        </div>
      )}
    </div>
  );
}
