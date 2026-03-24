import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wealth Simulator - Projection Patrimoniale",
  description: "Simulez l'évolution de votre patrimoine avec des données de marché réelles et des projections Monte Carlo.",
  openGraph: {
    title: "Wealth Simulator",
    description: "Projection patrimoniale avancée avec multi-actifs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter antialiased min-h-screen bg-nm-bg dark transition-colors duration-300">
        {/* Noise overlay */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
