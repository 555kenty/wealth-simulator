import { SimulationParams, YearlySnapshot } from "../engine/types";

export interface MonteCarloScenario {
  yearlySnapshots: YearlySnapshot[];
  finalWealth: number;
  targetReachedYear: number | null;
}

export interface MonteCarloResult {
  scenarios: MonteCarloScenario[];
  iterations: number;
  successRate: number; // % de scénarios qui atteignent l'objectif
  averageYearsToTarget: number | null;
  medianFinalWealth: number;
  percentile95: number;
  percentile5: number;
  worstCase: MonteCarloScenario;
  bestCase: MonteCarloScenario;
}

/**
 * Génère un rendement aléatoire selon une distribution normale
 * basée sur le rendement attendu et la volatilité
 */
function generateRandomReturn(expectedReturn: number, volatility: number): number {
  // Box-Muller transform pour générer une distribution normale
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  
  // Appliquer la volatilité
  return expectedReturn + volatility * z0;
}

/**
 * Simule un scénario individuel avec rendements aléatoires
 */
function simulateScenario(
  params: SimulationParams,
  expectedReturn: number,
  volatility: number
): MonteCarloScenario {
  const {
    initialPatrimony,
    monthlyIncome,
    incomeGrowthRate,
    reinvestmentRate,
    targetWealth,
    maxYears,
  } = params;

  const yearlySnapshots: YearlySnapshot[] = [];
  let patrimonyValue = initialPatrimony;
  let investmentPortfolio = 0;
  let currentMonthlyIncome = monthlyIncome;
  let targetReachedYear: number | null = null;

  for (let year = 0; year <= maxYears; year++) {
    // Générer un rendement aléatoire pour cette année
    const yearlyReturn = generateRandomReturn(expectedReturn, volatility);
    const yearlyIncome = currentMonthlyIncome * 12;
    const yearlyReinvested = yearlyIncome * reinvestmentRate;

    const snapshot: YearlySnapshot = {
      year,
      patrimonyValue,
      investmentPortfolio,
      totalWealth: patrimonyValue + investmentPortfolio,
      yearlyIncome,
      yearlyReinvested,
      yearlyExpenses: 0,
    };

    yearlySnapshots.push(snapshot);

    if (snapshot.totalWealth >= targetWealth && targetReachedYear === null) {
      targetReachedYear = year;
    }

    // Appliquer le rendement aléatoire
    investmentPortfolio = investmentPortfolio * (1 + yearlyReturn) + yearlyReinvested;
    
    // Appréciation du patrimoine (aussi avec volatilité)
    const appreciationReturn = generateRandomReturn(0.03, 0.02);
    patrimonyValue = patrimonyValue * (1 + appreciationReturn);

    currentMonthlyIncome = currentMonthlyIncome * (1 + incomeGrowthRate);
  }

  return {
    yearlySnapshots,
    finalWealth: yearlySnapshots[yearlySnapshots.length - 1].totalWealth,
    targetReachedYear,
  };
}

/**
 * Simulation Monte Carlo complète
 * Génère N scénarios et calcule les statistiques
 */
export function monteCarloSimulation(
  params: SimulationParams,
  expectedReturn: number,
  volatility: number,
  iterations: number = 1000
): MonteCarloResult {
  const scenarios: MonteCarloScenario[] = [];

  for (let i = 0; i < iterations; i++) {
    scenarios.push(simulateScenario(params, expectedReturn, volatility));
  }

  // Calculer les statistiques
  const successfulScenarios = scenarios.filter(s => s.targetReachedYear !== null);
  const successRate = (successfulScenarios.length / iterations) * 100;
  
  const yearsToTarget = successfulScenarios
    .map(s => s.targetReachedYear!)
    .filter(y => y !== null);
  
  const averageYearsToTarget = yearsToTarget.length > 0
    ? yearsToTarget.reduce((a, b) => a + b, 0) / yearsToTarget.length
    : null;

  // Trier par wealth finale pour les percentiles
  const sortedByWealth = [...scenarios].sort((a, b) => a.finalWealth - b.finalWealth);
  
  const medianFinalWealth = sortedByWealth[Math.floor(iterations / 2)].finalWealth;
  const percentile95 = sortedByWealth[Math.floor(iterations * 0.95)].finalWealth;
  const percentile5 = sortedByWealth[Math.floor(iterations * 0.05)].finalWealth;

  return {
    scenarios,
    iterations,
    successRate,
    averageYearsToTarget,
    medianFinalWealth,
    percentile95,
    percentile5,
    worstCase: sortedByWealth[0],
    bestCase: sortedByWealth[iterations - 1],
  };
}

/**
 * Calcule le rendement et la volatilité d'un portefeuille multi-actifs
 */
export function calculatePortfolioMetrics(
  allocations: { asset: string; weight: number; return: number; volatility: number }[]
): { expectedReturn: number; volatility: number } {
  // Rendement attendu = somme pondérée
  const expectedReturn = allocations.reduce(
    (sum, alloc) => sum + alloc.weight * alloc.return,
    0
  );

  // Volatilité du portefeuille (simplifié - sans corrélation)
  const variance = allocations.reduce(
    (sum, alloc) => sum + Math.pow(alloc.weight * alloc.volatility, 2),
    0
  );

  return {
    expectedReturn,
    volatility: Math.sqrt(variance),
  };
}
