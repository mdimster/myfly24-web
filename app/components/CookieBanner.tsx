"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Nur zeigen wenn noch nicht entschieden
    const consent = localStorage.getItem("myfly24-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("myfly24-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("myfly24-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          Wir verwenden nur technisch notwendige Cookies. Keine Tracker, kein Marketing.{" "}
          <a href="/datenschutz">Mehr erfahren</a>
        </p>
        <div className="cookie-banner-actions">
          <button onClick={decline} className="cookie-btn-decline">
            Ablehnen
          </button>
          <button onClick={accept} className="cookie-btn-accept">
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
