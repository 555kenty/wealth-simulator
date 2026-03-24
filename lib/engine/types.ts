export interface SimulationParams {
  initialPatrimony: number;
  patrimonyType: "real_estate" | "mixed" | "financial";
  appreciationRate: number;
  monthlyIncome: number;
  incomeGrowthRate: number;
  reinvestmentRate: number;
  investmentReturnRate: number;
  monthlyExpenses?: number;
  expenseGrowthRate?: number;
  targetWealth: number;
  maxYears: number;
}

export interface YearlySnapshot {
  year: number;
  patrimonyValue: number;
  investmentPortfolio: number;
  totalWealth: number;
  yearlyIncome: number;
  yearlyReinvested: number;
  yearlyExpenses: number;
}

export interface SimulationResult {
  yearlySnapshots: YearlySnapshot[];
  targetReachedYear: number | null;
  finalWealth: number;
  breakdown: {
    fromAppreciation: number;
    fromInvestments: number;
    fromIncome: number;
  };
}
