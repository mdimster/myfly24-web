"use client";

import { useEffect, useRef } from "react";

export default function Check24Widget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;
    loaded.current = true;

    // Create the widget container
    const widgetDiv = document.createElement("div");
    widgetDiv.style.width = "100%";
    widgetDiv.id = "c24pp-package-iframe";
    widgetDiv.setAttribute("data-offer", "allgemein");
    widgetDiv.setAttribute("data-scrollto", "begin");
    widgetDiv.setAttribute("data-forward-url", "no");
    containerRef.current.appendChild(widgetDiv);

    // Load the Check24 script
    const script = document.createElement("script");
    script.src =
      "https://files.check24.net/widgets/auto/287879/c24pp-package-iframe/package-iframe.js";
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} className="check24-widget" />;
}
