import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "L'argent des Parisiens | Budget Paris 2025",
  description: "Comprendre le budget de la Ville de Paris en toute transparence. Visualisez où vont vos impôts et comment la Mairie gère l'argent des Parisiens.",
  keywords: "budget Paris, finances Paris, taxe foncière, dette Paris, Sarah Knafo, municipales 2026",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "L'argent des Parisiens | Budget Paris 2025",
    description: "Comprendre le budget de la Ville de Paris en toute transparence",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
