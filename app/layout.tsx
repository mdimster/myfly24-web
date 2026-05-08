import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "myFly24 – KI-Reiseberater",
  description:
    "Drei Fragen, eine klare Empfehlung. myFly24 findet die Reise, die wirklich zu dir passt.",
  robots: { index: false, follow: false }, // Beta: nicht crawlen
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-bg text-navy">{children}</body>
    </html>
  );
}