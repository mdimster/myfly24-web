import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import CookieBanner from "./components/CookieBanner";

export const metadata: Metadata = {
  title: "myFly24 – Dein KI-Reiseberater",
  description:
    "Drei Fragen, eine klare Empfehlung. myFly24 findet die beste Reise für dich – persönlich, transparent, ohne endlose Suche.",
  metadataBase: new URL("https://beta.myfly24.com"),
  openGraph: {
    title: "myFly24 – Dein KI-Reiseberater",
    description:
      "Drei Fragen, eine klare Empfehlung. Persönlich, transparent, ohne endlose Suche.",
    url: "https://beta.myfly24.com",
    siteName: "myFly24",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {children}
        <CookieBanner />
        <Script
          defer
          data-domain="beta.myfly24.com"
          src="https://analytics.preissturz.com/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
