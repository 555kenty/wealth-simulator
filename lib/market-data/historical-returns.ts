// Rendements historiques réels (1928-2024, source: Aswath Damodaran NYU)
export const HISTORICAL_RETURNS = {
  // Pour compatibilité avec les composants (format simplifié)
  sp500: { 
    name: "S&P 500",
    mean: 0.10, 
    stdDev: 0.16,
    avgReturn: 0.10, 
    volatility: 0.16, 
    minReturn: -0.38, 
    maxReturn: 0.47,
    description: "Actions américaines large cap"
  },
  realEstate: { 
    name: "Immobilier France",
    mean: 0.045, 
    stdDev: 0.05,
    avgReturn: 0.045, 
    volatility: 0.05,
    description: "Prix immobilier résidentiel"
  },
  bitcoin: { 
    name: "Bitcoin",
    mean: 0.85, 
    stdDev: 0.80,
    avgReturn: 0.85, 
    volatility: 0.80,
    description: "BTC/USD"
  },
  bonds: { 
    name: "Obligations d'État",
    mean: 0.04, 
    stdDev: 0.03,
    avgReturn: 0.04, 
    volatility: 0.03,
    description: "OAT, Bunds, Treasuries"
  },
  gold: { 
    name: "Or",
    mean: 0.06, 
    stdDev: 0.15,
    avgReturn: 0.06, 
    volatility: 0.15,
    description: "XAU/USD"
  },
  // Détails complets par catégorie
  stocks: {
    sp500: { 
      name: "S&P 500",
      avgReturn: 0.10, 
      volatility: 0.16, 
      minReturn: -0.38, 
      maxReturn: 0.47,
      description: "Actions américaines large cap"
    },
    cac40: { 
      name: "CAC 40",
      avgReturn: 0.08, 
      volatility: 0.18, 
      minReturn: -0.42, 
      maxReturn: 0.38,
      description: "Actions françaises"
    },
    nasdaq: { 
      name: "NASDAQ",
      avgReturn: 0.12, 
      volatility: 0.22, 
      minReturn: -0.43, 
      maxReturn: 0.58,
      description: "Tech américain"
    },
    emerging: {
      name: "Marchés émergents",
      avgReturn: 0.09,
      volatility: 0.24,
      minReturn: -0.50,
      maxReturn: 0.65,
      description: "Actions émergentes"
    },
  },
  realEstateDetails: {
    france: { 
      name: "Immobilier France",
      avgReturn: 0.045, 
      volatility: 0.05,
      description: "Prix immobilier résidentiel"
    },
    usa: { 
      name: "Immobilier US",
      avgReturn: 0.055, 
      volatility: 0.06,
      description: "Real Estate Investment Trusts"
    },
    commercial: {
      name: "Immobilier Commercial",
      avgReturn: 0.06,
      volatility: 0.12,
      description: "Bureaux, retail, industriel"
    },
  },
  cryptoDetails: {
    bitcoin: { 
      name: "Bitcoin",
      avgReturn: 0.85, 
      volatility: 0.80,
      description: "BTC/USD"
    },
    ethereum: { 
      name: "Ethereum",
      avgReturn: 0.95, 
      volatility: 0.90,
      description: "ETH/USD"
    },
    altcoins: {
      name: "Altcoins",
      avgReturn: 0.60,
      volatility: 1.20,
      description: "Top 50 cryptos excluant BTC/ETH"
    },
  },
  bondsDetails: {
    government: { 
      name: "Obligations d'État",
      avgReturn: 0.04, 
      volatility: 0.03,
      description: "OAT, Bunds, Treasuries"
    },
    corporate: { 
      name: "Obligations corporate",
      avgReturn: 0.055, 
      volatility: 0.05,
      description: "Investment grade"
    },
    highYield: {
      name: "High Yield",
      avgReturn: 0.07,
      volatility: 0.10,
      description: "Junk bonds"
    },
  },
  commodities: {
    gold: { 
      name: "Or",
      avgReturn: 0.06, 
      volatility: 0.15,
      description: "XAU/USD"
    },
    silver: {
      name: "Argent",
      avgReturn: 0.05,
      volatility: 0.25,
      description: "XAG/USD"
    },
    oil: {
      name: "Pétrole",
      avgReturn: 0.04,
      volatility: 0.35,
      description: "WTI/USD"
    },
  },
  cash: {
    savings: {
      name: "Livret/Epargne",
      avgReturn: 0.025,
      volatility: 0.001,
      description: "Livret A, LEP, etc."
    },
    mmf: {
      name: "Fonds monétaires",
      avgReturn: 0.035,
      volatility: 0.005,
      description: "Marché monétaire"
    },
  },
} as const;

export type AssetClass = keyof typeof HISTORICAL_RETURNS;

export interface AssetAllocation {
  assetClass: AssetClass;
  assetType: string;
  percentage: number; // 0-1
}

export function getAssetReturn(assetClass: AssetClass, assetType: string): number {
  const assetData = HISTORICAL_RETURNS[assetClass] as Record<string, { avgReturn: number }>;
  return assetData[assetType]?.avgReturn ?? 0.05;
}

export function getAssetVolatility(assetClass: AssetClass, assetType: string): number {
  const assetData = HISTORICAL_RETURNS[assetClass] as Record<string, { volatility: number }>;
  return assetData[assetType]?.volatility ?? 0.15;
}

export function getAssetName(assetClass: AssetClass, assetType: string): string {
  const assetData = HISTORICAL_RETURNS[assetClass] as Record<string, { name: string }>;
  return assetData[assetType]?.name ?? "Inconnu";
}
