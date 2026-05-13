"use client";

import { useState } from "react";

const TARIFCHECK_DEEPLINK =
  "https://www.awin1.com/cread.php?awinmid=11202&awinaffid=396279&ued=https%3A%2F%2Fwww.tarifcheck.de%2Freiseversicherung%2F";

interface Product {
  name: string;
  reason: string;
  priceRange: string;
  priority: "must" | "recommended" | "optional";
}

interface Result {
  recommendation: string;
  products: Product[];
  totalRange: string;
}

function calculate(region: string, duration: string, travelers: string): Result {
  const products: Product[] = [];

  products.push({
    name: "Auslandskrankenversicherung",
    reason:
      region === "worldwide"
        ? "Außerhalb der EU ist ein Krankenrücktransport ohne Versicherung extrem teuer (ab 30.000 €)."
        : "Auch in Europa können Behandlungskosten anfallen, die die Krankenkasse nicht übernimmt.",
    priceRange: duration === "annual" ? "12–25 € / Jahr" : "1–3 € / Tag",
    priority: "must",
  });

  if (duration !== "short" || travelers === "family") {
    products.push({
      name: "Reiserücktrittsversicherung",
      reason:
        travelers === "family"
          ? "Mit Kindern steigt das Risiko für kurzfristige Erkrankungen. Schützt die Anzahlung."
          : "Bei längeren Reisen oder teuren Buchungen lohnt sich der Stornoschutz.",
      priceRange: "3–5 % des Reisepreises",
      priority: duration === "long" || travelers === "family" ? "must" : "recommended",
    });
  }

  if (duration === "long") {
    products.push({
      name: "Reiseabbruchversicherung",
      reason: "Bei langen Reisen: Erstattet Mehrkosten für vorzeitige Rückreise und nicht genutzte Leistungen.",
      priceRange: "Oft im Kombi-Paket mit Rücktritt",
      priority: "recommended",
    });
  }

  if (region === "worldwide") {
    products.push({
      name: "Gepäckversicherung",
      reason: "Bei Langstreckenflügen mit Umstieg höheres Verlustrisiko. Deckt Diebstahl und Beschädigung.",
      priceRange: "15–40 € / Reise",
      priority: "optional",
    });
  }

  const recommendation =
    duration === "annual"
      ? "Ein Jahresvertrag lohnt sich ab 2 Reisen pro Jahr und ist deutlich günstiger als Einzelpolicen."
      : travelers === "family"
      ? "Familientarife sind günstiger als Einzelversicherungen – achte auf Kombi-Pakete."
      : "Für deine Reise reicht eine Einzelpolice. Vergleiche vor Abschluss 2-3 Anbieter.";

  const totalRange =
    duration === "annual"
      ? "ca. 30–90 € / Jahr"
      : duration === "long"
      ? "ca. 80–200 € je nach Reisepreis"
      : "ca. 15–50 € für die Reise";

  return { recommendation, products, totalRange };
}

const STEPS = [
  {
    question: "Wohin geht die Reise?",
    subtitle: "Das bestimmt den Versicherungsumfang",
    key: "region" as const,
    options: [
      { value: "europe", label: "Europa", sub: "EU + Schengen", icon: "🇪🇺" },
      { value: "worldwide", label: "Weltweit", sub: "Fernreise, USA, Asien", icon: "🌍" },
    ],
  },
  {
    question: "Wie lange bist du unterwegs?",
    subtitle: "Beeinflusst Tarif und Empfehlung",
    key: "duration" as const,
    options: [
      { value: "short", label: "1–7 Tage", sub: "Kurztrip", icon: "⚡" },
      { value: "long", label: "8–30 Tage", sub: "Längere Reise", icon: "📅" },
      { value: "annual", label: "Jahresschutz", sub: "Mehrere Reisen", icon: "🔄" },
    ],
  },
  {
    question: "Wer reist mit?",
    subtitle: "Familientarife sind oft günstiger",
    key: "travelers" as const,
    options: [
      { value: "solo", label: "Allein", sub: "", icon: "👤" },
      { value: "couple", label: "Zu zweit", sub: "", icon: "👫" },
      { value: "family", label: "Familie", sub: "", icon: "👨‍👩‍👧" },
    ],
  },
];

export default function InsuranceCalculator() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);

  const handlePick = (key: string, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);

    setTimeout(() => {
      if (step < 2) {
        setStep(step + 1);
      } else {
        setResult(calculate(next.region, next.duration, next.travelers));
        setStep(3);
      }
    }, 250);
  };

  const handleBack = () => {
    if (step > 0 && step < 3) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setValues({});
    setResult(null);
  };

  return (
    <div className="wizard-wrap">
      {/* Progress Dots */}
      <div className="wizard-progress">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`wizard-dot ${
              i < step || result ? "done" : i === step && !result ? "current" : ""
            }`}
          />
        ))}
      </div>

      <h3 className="font-display text-xl sm:text-2xl font-medium text-navy mb-1">
        Welche Versicherung brauchst du?
      </h3>
      <p className="text-sm text-ink-muted mb-6">
        Drei Fragen – eine persönliche Empfehlung.
      </p>

      {/* Steps */}
      {!result && step < 3 && (
        <div className="wizard-step">
          <div className="wizard-question">{STEPS[step].question}</div>
          <div className="wizard-subtitle">{STEPS[step].subtitle}</div>
          <div className="wizard-options">
            {STEPS[step].options.map((opt) => (
              <button
                key={opt.value}
                className={`wizard-option ${
                  values[STEPS[step].key] === opt.value ? "selected" : ""
                }`}
                onClick={() => handlePick(STEPS[step].key, opt.value)}
              >
                <span className="wizard-option-icon">{opt.icon}</span>
                <div>
                  <div className="wizard-option-label">{opt.label}</div>
                  {opt.sub && (
                    <div className="wizard-option-sub">{opt.sub}</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {step > 0 && (
            <button className="wizard-back" onClick={handleBack}>
              ← Zurück
            </button>
          )}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="wizard-result">
          <div className="wizard-result-header">
            <span className="wizard-result-total">{result.totalRange}</span>
            <span className="wizard-result-label">geschätzte Kosten</span>
          </div>

          <p className="wizard-result-tip">{result.recommendation}</p>

          <div className="wizard-result-list">
            {result.products.map((p) => (
              <div key={p.name} className="wizard-product">
                <div className="wizard-product-top">
                  <span
                    className={`wizard-badge ${
                      p.priority === "must"
                        ? "badge-must"
                        : p.priority === "recommended"
                        ? "badge-rec"
                        : "badge-opt"
                    }`}
                  >
                    {p.priority === "must"
                      ? "Pflicht"
                      : p.priority === "recommended"
                      ? "Empfohlen"
                      : "Optional"}
                  </span>
                  <span className="wizard-product-price">{p.priceRange}</span>
                </div>
                <h4 className="wizard-product-name">{p.name}</h4>
                <p className="wizard-product-reason">{p.reason}</p>
              </div>
            ))}
          </div>

          {/* Affiliate CTA */}
          <div className="wizard-cta">
            <p className="wizard-cta-text">
              Finde jetzt den passenden Tarif – unabhängig verglichen:
            </p>
            <a
              href={TARIFCHECK_DEEPLINK}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="wizard-cta-btn"
            >
              Reiseversicherungen vergleichen →
            </a>
            <p className="wizard-cta-note">
              * Wir erhalten eine kleine Provision bei Abschluss. Für dich entstehen keine Mehrkosten.
            </p>
          </div>

          <button className="wizard-reset" onClick={handleReset}>
            Neue Berechnung starten
          </button>
        </div>
      )}
    </div>
  );
}
