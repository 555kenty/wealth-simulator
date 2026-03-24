"use client";

import { useState } from "react";
import { SimulationParams } from "@/lib/engine";
import { SimulatorForm } from "@/components/simulator/SimulatorForm";
import { WealthChart } from "@/components/simulator/WealthChart";
import { ScenarioCards } from "@/components/simulator/ScenarioCards";
import { useSimulation } from "@/hooks/useSimulation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";

const DEFAULT_PARAMS: SimulationParams = {
  initialPatrimony: 500_000,
  patrimonyType: "mixed",
  appreciationRate: 0.03,
  monthlyIncome: 8_000,
  incomeGrowthRate: 0.02,
  reinvestmentRate: 0.5,
  investmentReturnRate: 0.07,
  targetWealth: 10_000_000,
  maxYears: 50,
};

export default function SimulatorPage() {
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const result = useSimulation(params);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <Link href="/" className="font-bold text-xl hover:text-primary transition-colors">
              Wealth Simulator
            </Link>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Paramètres</h1>
            </div>
            
            <SimulatorForm onParamsChange={setParams} />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Résultats</h1>
            </div>

            {/* Scenario Cards */}
            <ScenarioCards 
              result={result} 
              reinvestmentRate={params.reinvestmentRate} 
            />

            {/* Chart */}
            <WealthChart 
              result={result} 
              targetWealth={params.targetWealth}
            />

            {/* Breakdown */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-3">Décomposition du patrimoine final</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Appréciation patrimoine</span>
                  <span className="font-mono">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 0,
                    }).format(result.breakdown.fromAppreciation)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenus réinvestis</span>
                  <span className="font-mono">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 0,
                    }).format(result.breakdown.fromIncome)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rendement investissements</span>
                  <span className="font-mono">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 0,
                    }).format(result.breakdown.fromInvestments)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> Cette simulation est indicative et ne constitue 
            pas un conseil financier. Les projections sont basées sur des hypothèses 
            et ne garantissent pas les résultats futurs.
          </p>
        </div>
      </main>
    </div>
  );
}
