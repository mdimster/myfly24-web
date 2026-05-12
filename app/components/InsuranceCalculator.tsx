"use client";

import { useState } from "react";

interface Result {
  recommendation: string;
  products: { name: string; reason: string; priceRange: string; priority: "must" | "recommended" | "optional" }[];
  totalRange: string;
}

function calculate(region: string, duration: string, travelers: string): Result {
  const products: Result["products"] = [];

  // Auslandskrankenversicherung - immer empfohlen
  products.push({
    name: "Auslandskrankenversicherung",
    reason: region === "worldwide"
      ? "Außerhalb der EU ist ein Krankenrücktransport ohne Versicherung extrem teuer (ab 30.000 €)."
      : "Auch in Europa können Behandlungskosten anfallen, die die Krankenkasse nicht übernimmt.",
    priceRange: duration === "annual" ? "12–25 € / Jahr" : "1–3 € / Tag",
    priority: "must",
  });

  // Reiserücktrittsversicherung
  if (duration !== "short" || travelers === "family") {
    products.push({
      name: "Reiserücktrittsversicherung",
      reason: travelers === "family"
        ? "Mit Kindern steigt das Risiko für kurzfristige Erkrankungen. Schützt die Anzahlung."
        : "Bei längeren Reisen oder teuren Buchungen lohnt sich der Stornoschutz.",
      priceRange: "3–5 % des Reisepreises",
      priority: duration === "long" || travelers === "family" ? "must" : "recommended",
    });
  }

  // Reiseabbruchversicherung
  if (duration === "long") {
    products.push({
      name: "Reiseabbruchversicherung",
      reason: "Bei langen Reisen: Erstattet Mehrkosten für vorzeitige Rückreise und nicht genutzte Leistungen.",
      priceRange: "Oft im Kombi-Paket mit Rücktritt",
      priority: "recommended",
    });
  }

  // Gepäckversicherung
  if (region === "worldwide") {
    products.push({
      name: "Gepäckversicherung",
      reason: "Bei Langstreckenflügen mit Umstieg höheres Verlustrisiko. Deckt Diebstahl und Beschädigung.",
      priceRange: "15–40 € / Reise",
      priority: "optional",
    });
  }

  // Jahresvertrag-Hinweis
  const recommendation = duration === "annual"
    ? "Ein Jahresvertrag lohnt sich ab 2 Reisen pro Jahr und ist deutlich günstiger als Einzelpolicen."
    : travelers === "family"
    ? "Familientarife sind günstiger als Einzelversicherungen – achte auf Kombi-Pakete."
    : "Für deine Reise reicht eine Einzelpolice. Vergleiche vor Abschluss 2-3 Anbieter.";

  const totalRange = duration === "annual"
    ? "ca. 30–90 € / Jahr"
    : duration === "long"
    ? "ca. 80–200 € je nach Reisepreis"
    : "ca. 15–50 € für die Reise";

  return { recommendation, products, totalRange };
}

export default function InsuranceCalculator() {
  const [region, setRegion] = useState("");
  const [duration, setDuration] = useState("");
  const [travelers, setTravelers] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const canCalculate = region && duration && travelers;

  const handleCalculate = () => {
    if (canCalculate) {
      setResult(calculate(region, duration, travelers));
    }
  };

  return (
    <div className="insurance-calc">
      <h3 className="font-display text-xl sm:text-2xl font-medium text-navy mb-2">
        Welche Versicherung brauchst du?
      </h3>
      <p className="text-sm text-ink-muted mb-6">
        Beantworte drei Fragen – du bekommst eine persönliche Empfehlung.
      </p>

      <div className="insurance-calc-grid">
        {/* Region */}
        <div className="insurance-calc-field">
          <label>Wohin geht die Reise?</label>
          <div className="insurance-calc-options">
            <button className={`insurance-opt ${region === "europe" ? "active" : ""}`} onClick={() => setRegion("europe")}>
              🇪🇺 Europa
            </button>
            <button className={`insurance-opt ${region === "worldwide" ? "active" : ""}`} onClick={() => setRegion("worldwide")}>
              🌍 Weltweit
            </button>
          </div>
        </div>

        {/* Dauer */}
        <div className="insurance-calc-field">
          <label>Wie lange?</label>
          <div className="insurance-calc-options">
            <button className={`insurance-opt ${duration === "short" ? "active" : ""}`} onClick={() => setDuration("short")}>
              1–7 Tage
            </button>
            <button className={`insurance-opt ${duration === "long" ? "active" : ""}`} onClick={() => setDuration("long")}>
              8–30 Tage
            </button>
            <button className={`insurance-opt ${duration === "annual" ? "active" : ""}`} onClick={() => setDuration("annual")}>
              Jahresschutz
            </button>
          </div>
        </div>

        {/* Reisende */}
        <div className="insurance-calc-field">
          <label>Wer reist mit?</label>
          <div className="insurance-calc-options">
            <button className={`insurance-opt ${travelers === "solo" ? "active" : ""}`} onClick={() => setTravelers("solo")}>
              👤 Allein
            </button>
            <button className={`insurance-opt ${travelers === "couple" ? "active" : ""}`} onClick={() => setTravelers("couple")}>
              👫 Zu zweit
            </button>
            <button className={`insurance-opt ${travelers === "family" ? "active" : ""}`} onClick={() => setTravelers("family")}>
              👨‍👩‍👧 Familie
            </button>
          </div>
        </div>
      </div>

      <button
        className="insurance-calc-btn"
        onClick={handleCalculate}
        disabled={!canCalculate}
      >
        Empfehlung berechnen
      </button>

      {/* Ergebnis */}
      {result && (
        <div className="insurance-result">
          <div className="insurance-result-header">
            <span className="insurance-result-total">{result.totalRange}</span>
            <span className="insurance-result-label">geschätzte Kosten</span>
          </div>

          <p className="insurance-result-tip">{result.recommendation}</p>

          <div className="insurance-result-list">
            {result.products.map((p) => (
              <div key={p.name} className={`insurance-product ${p.priority}`}>
                <div className="insurance-product-header">
                  <span className="insurance-product-badge">
                    {p.priority === "must" ? "✅ Pflicht" : p.priority === "recommended" ? "👍 Empfohlen" : "💡 Optional"}
                  </span>
                  <span className="insurance-product-price">{p.priceRange}</span>
                </div>
                <h4>{p.name}</h4>
                <p>{p.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
