import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wealth Simulator - Projection Patrimoniale",
  description: "Simulez l'évolution de votre patrimoine et découvrez quand vous atteindrez vos objectifs financiers.",
  openGraph: {
    title: "Wealth Simulator",
    description: "Projection patrimoniale interactive",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
