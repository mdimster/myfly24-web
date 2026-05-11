"use client";

import { useState } from "react";

const warnings = [
  { region: "Dubai & VAE", text: "Verschärfte Einreisekontrollen und strenge Social-Media-Regeln.", level: "info" },
  { region: "Kerosin-Versorgung", text: "Vereinzelte Engpässe an europäischen Regionalflughäfen. Große Hubs nicht betroffen.", level: "warning" },
  { region: "Griechenland", text: "Hohe Waldbrandgefahr Juli–September. Reiseversicherung empfohlen.", level: "info" },
  { region: "Flugstreiks", text: "Air France/KLM-Streiks möglich im Sommer 2026. Alternative Airlines einplanen.", level: "warning" },
  { region: "Türkei Ostküste", text: "Erhöhte Erdbebengefahr. Westküste und Istanbul normal buchbar.", level: "alert" },
];

export default function TravelBanner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="travel-banner-wrap">
      <button
        className="travel-banner"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="travel-banner-icon">⚠️</span>
        <span className="travel-banner-text">
          <strong>{warnings.length} aktuelle Reisehinweise</strong>
          <span className="travel-banner-regions">
            {" "}– {warnings.map((w) => w.region).join(", ")}
          </span>
        </span>
        <svg
          className={`travel-banner-chevron ${open ? "open" : ""}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="travel-banner-details">
          {warnings.map((w) => (
            <div key={w.region} className="travel-banner-item">
              <span className="travel-banner-badge">
                {w.level === "alert" ? "⚠️" : w.level === "warning" ? "🔶" : "ℹ️"}
              </span>
              <div>
                <span className="travel-banner-region">{w.region}</span>
                <span className="travel-banner-desc">{w.text}</span>
              </div>
            </div>
          ))}
          <p className="travel-banner-disclaimer">
            Quelle:{" "}
            <a href="https://www.auswaertiges-amt.de" target="_blank" rel="noopener noreferrer">
              Auswärtiges Amt
            </a>{" "}
            · Stand Mai 2026
          </p>
        </div>
      )}
    </div>
  );
}
