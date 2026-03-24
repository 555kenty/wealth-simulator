import { describe, it, expect } from "vitest";
import { simulate } from "../simulate";
import { SimulationParams } from "../types";

const defaultParams: SimulationParams = {
  initialPatrimony: 50_000_000,
  patrimonyType: "mixed",
  appreciationRate: 0.03,
  monthlyIncome: 25_000,
  incomeGrowthRate: 0.02,
  reinvestmentRate: 0.5,
  investmentReturnRate: 0.07,
  monthlyExpenses: 0,
  expenseGrowthRate: 0.02,
  targetWealth: 1_000_000_000,
  maxYears: 100,
};

describe("simulate", () => {
  it("should return correct structure", () => {
    const result = simulate(defaultParams);
    
    expect(result).toHaveProperty("yearlySnapshots");
    expect(result).toHaveProperty("targetReachedYear");
    expect(result).toHaveProperty("finalWealth");
    expect(result).toHaveProperty("breakdown");
    expect(Array.isArray(result.yearlySnapshots)).toBe(true);
  });

  it("should have correct number of snapshots", () => {
    const result = simulate(defaultParams);
    expect(result.yearlySnapshots.length).toBe(defaultParams.maxYears + 1);
  });

  it("should start with correct initial values", () => {
    const result = simulate(defaultParams);
    const firstSnapshot = result.yearlySnapshots[0];
    
    expect(firstSnapshot.year).toBe(0);
    expect(firstSnapshot.patrimonyValue).toBe(defaultParams.initialPatrimony);
    expect(firstSnapshot.investmentPortfolio).toBe(0);
  });

  it("should handle 0% reinvestment correctly", () => {
    const params = { ...defaultParams, reinvestmentRate: 0 };
    const result = simulate(params);
    
    const finalSnapshot = result.yearlySnapshots[result.yearlySnapshots.length - 1];
    expect(finalSnapshot.investmentPortfolio).toBe(0);
  });

  it("should handle 100% reinvestment correctly", () => {
    const params = { ...defaultParams, reinvestmentRate: 1 };
    const result = simulate(params);
    
    const finalSnapshot = result.yearlySnapshots[result.yearlySnapshots.length - 1];
    expect(finalSnapshot.investmentPortfolio).toBeGreaterThan(0);
  });

  it("should never produce NaN or Infinity", () => {
    const result = simulate(defaultParams);
    
    for (const snapshot of result.yearlySnapshots) {
      expect(Number.isFinite(snapshot.patrimonyValue)).toBe(true);
      expect(Number.isFinite(snapshot.investmentPortfolio)).toBe(true);
      expect(Number.isFinite(snapshot.totalWealth)).toBe(true);
      expect(Number.isNaN(snapshot.patrimonyValue)).toBe(false);
    }
  });

  it("should never produce negative values", () => {
    const result = simulate(defaultParams);
    
    for (const snapshot of result.yearlySnapshots) {
      expect(snapshot.patrimonyValue).toBeGreaterThanOrEqual(0);
      expect(snapshot.investmentPortfolio).toBeGreaterThanOrEqual(0);
      expect(snapshot.totalWealth).toBeGreaterThanOrEqual(0);
    }
  });

  it("should reach target with high reinvestment", () => {
    const params = { 
      ...defaultParams, 
      reinvestmentRate: 1,
      investmentReturnRate: 0.1,
      targetWealth: 100_000_000
    };
    const result = simulate(params);
    
    expect(result.targetReachedYear).not.toBeNull();
    expect(result.targetReachedYear).toBeLessThan(params.maxYears);
  });

  it("should handle case where target is never reached", () => {
    const params = { 
      ...defaultParams, 
      reinvestmentRate: 0,
      appreciationRate: 0,
      targetWealth: 1_000_000_000_000
    };
    const result = simulate(params);
    
    expect(result.targetReachedYear).toBeNull();
  });

  it("should calculate breakdown correctly", () => {
    const result = simulate(defaultParams);
    
    expect(result.breakdown.fromAppreciation).toBeGreaterThanOrEqual(0);
    expect(result.breakdown.fromInvestments).toBeGreaterThanOrEqual(0);
    expect(result.breakdown.fromIncome).toBeGreaterThanOrEqual(0);
  });
});
