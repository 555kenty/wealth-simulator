import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wealth Simulator - Projection Patrimoniale",
  description: "Simulez l'évolution de votre patrimoine avec des données de marché réelles et des projections Monte Carlo.",
  openGraph: {
    title: "Wealth Simulator",
    description: "Projection patrimoniale avancée",
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
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600,500,400&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,400,300,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@600,500,400&display=swap"
        />
      </head>
      <body className="font-satoshi antialiased min-h-screen overflow-x-hidden bg-nm-bg text-nm-text">
        {children}
      </body>
    </html>
  );
}
