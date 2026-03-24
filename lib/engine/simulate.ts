import { SimulationParams, SimulationResult, YearlySnapshot } from "./types";

export function simulate(params: SimulationParams): SimulationResult {
  const {
    initialPatrimony,
    appreciationRate,
    monthlyIncome,
    incomeGrowthRate,
    reinvestmentRate,
    investmentReturnRate,
    monthlyExpenses = 0,
    expenseGrowthRate = 0.02,
    targetWealth,
    maxYears,
  } = params;

  const yearlySnapshots: YearlySnapshot[] = [];
  let patrimonyValue = initialPatrimony;
  let investmentPortfolio = 0;
  let currentMonthlyIncome = monthlyIncome;
  let currentMonthlyExpenses = monthlyExpenses;
  let targetReachedYear: number | null = null;

  const initialPatrimonyValue = initialPatrimony;
  let totalReinvested = 0;

  for (let year = 0; year <= maxYears; year++) {
    const yearlyIncome = currentMonthlyIncome * 12;
    const yearlyExpenses = currentMonthlyExpenses * 12;
    const reinvestable = Math.max(0, yearlyIncome - yearlyExpenses);
    const yearlyReinvested = reinvestable * reinvestmentRate;

    const snapshot: YearlySnapshot = {
      year,
      patrimonyValue,
      investmentPortfolio,
      totalWealth: patrimonyValue + investmentPortfolio,
      yearlyIncome,
      yearlyReinvested,
      yearlyExpenses,
    };

    yearlySnapshots.push(snapshot);

    if (snapshot.totalWealth >= targetWealth && targetReachedYear === null) {
      targetReachedYear = year;
    }

    investmentPortfolio =
      investmentPortfolio * (1 + investmentReturnRate) + yearlyReinvested;

    patrimonyValue = patrimonyValue * (1 + appreciationRate);

    totalReinvested += yearlyReinvested;

    currentMonthlyIncome = currentMonthlyIncome * (1 + incomeGrowthRate);
    currentMonthlyExpenses = currentMonthlyExpenses * (1 + expenseGrowthRate);
  }

  const finalSnapshot = yearlySnapshots[yearlySnapshots.length - 1];
  const finalWealth = finalSnapshot.totalWealth;

  const fromAppreciation = initialPatrimonyValue * Math.pow(1 + appreciationRate, maxYears) - initialPatrimonyValue;
  const fromIncome = totalReinvested;
  const fromInvestments = finalWealth - initialPatrimonyValue - fromIncome - fromAppreciation + totalReinvested;

  return {
    yearlySnapshots,
    targetReachedYear,
    finalWealth,
    breakdown: {
      fromAppreciation: Math.max(0, fromAppreciation),
      fromInvestments: Math.max(0, fromInvestments),
      fromIncome,
    },
  };
}
