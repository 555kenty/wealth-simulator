"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { SimulationParams, SimulationResult } from "@/lib/engine";
import { MonteCarloResult } from "@/lib/market-data/monte-carlo";

interface AssetAllocation {
  stocks: number;
  realEstate: number;
  crypto: number;
  bonds: number;
  gold: number;
}

interface SimulationContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  params: SimulationParams;
  updateParams: (updates: Partial<SimulationParams>) => void;
  allocation: AssetAllocation;
  updateAllocation: (updates: Partial<AssetAllocation>) => void;
  simulationResult: SimulationResult | null;
  setSimulationResult: (result: SimulationResult) => void;
  monteCarloResult: MonteCarloResult | null;
  setMonteCarloResult: (result: MonteCarloResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  generateShareUrl: () => string;
}

const DEFAULT_PARAMS: SimulationParams = {
  initialPatrimony: 500_000,
  patrimonyType: "mixed",
  appreciationRate: 0.03,
  monthlyIncome: 8_000,
  incomeGrowthRate: 0.02,
  reinvestmentRate: 0.5,
  investmentReturnRate: 0.07,
  monthlyExpenses: 4_000,
  expenseGrowthRate: 0.02,
  targetWealth: 10_000_000,
  maxYears: 30,
};

const DEFAULT_ALLOCATION: AssetAllocation = {
  stocks: 40,
  realEstate: 30,
  crypto: 15,
  bonds: 10,
  gold: 5,
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [allocation, setAllocation] = useState<AssetAllocation>(DEFAULT_ALLOCATION);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [monteCarloResult, setMonteCarloResult] = useState<MonteCarloResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("wealth-simulator-v2");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.params) setParams({ ...DEFAULT_PARAMS, ...data.params });
        if (data.allocation) setAllocation({ ...DEFAULT_ALLOCATION, ...data.allocation });
        if (data.currentStep) setCurrentStep(data.currentStep);
      } catch (e) {
        console.error("Failed to load simulation data", e);
      }
    }
    setIsHydrated(true);
  }, []);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  }, []);

  const goToPrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const updateParams = useCallback((updates: Partial<SimulationParams>) => {
    setParams((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateAllocation = useCallback((updates: Partial<AssetAllocation>) => {
    setAllocation((prev) => ({ ...prev, ...updates }));
  }, []);

  const generateShareUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    const data = { p: params, a: allocation };
    const encoded = btoa(JSON.stringify(data));
    return `${window.location.origin}/simulator?data=${encoded}`;
  }, [params, allocation]);

  useEffect(() => {
    if (isHydrated) {
      const data = { params, allocation, currentStep, timestamp: new Date().toISOString() };
      localStorage.setItem("wealth-simulator-v2", JSON.stringify(data));
    }
  }, [params, allocation, currentStep, isHydrated]);

  return (
    <SimulationContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToPrevStep,
        params,
        updateParams,
        allocation,
        updateAllocation,
        simulationResult,
        setSimulationResult,
        monteCarloResult,
        setMonteCarloResult,
        isLoading,
        setIsLoading,
        generateShareUrl,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulationContext() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulationContext must be used within a SimulationProvider");
  }
  return context;
}
