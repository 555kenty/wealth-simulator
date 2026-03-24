"use client";

import { useState } from "react";
import { SimulationParams } from "@/lib/engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { usePersistedState } from "@/hooks/useFormattedNumber";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface SimulatorFormProps {
  onParamsChange: (params: SimulationParams) => void;
}

const PRESETS = {
  conservative: {
    initialPatrimony: 1_000_000,
    appreciationRate: 0.02,
    monthlyIncome: 5_000,
    investmentReturnRate: 0.04,
  },
  moderate: {
    initialPatrimony: 500_000,
    appreciationRate: 0.03,
    monthlyIncome: 8_000,
    investmentReturnRate: 0.06,
  },
  aggressive: {
    initialPatrimony: 100_000,
    appreciationRate: 0.05,
    monthlyIncome: 15_000,
    investmentReturnRate: 0.10,
  },
};

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

export function SimulatorForm({ onParamsChange }: SimulatorFormProps) {
  const [params, setParams] = usePersistedState<SimulationParams>(
    "wealth-simulator-params",
    DEFAULT_PARAMS
  );

  const updateParam = <K extends keyof SimulationParams>(
    key: K,
    value: SimulationParams[K]
  ) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);
    onParamsChange(newParams);
  };

  const applyPreset = (preset: keyof typeof PRESETS) => {
    const newParams = { ...params, ...PRESETS[preset] };
    setParams(newParams);
    onParamsChange(newParams);
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Profils rapides:</span>
        {Object.keys(PRESETS).map((preset) => (
          <button
            key={preset}
            onClick={() => applyPreset(preset as keyof typeof PRESETS)}
            className="text-xs px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
          >
            {preset === "conservative" && "Prudent"}
            {preset === "moderate" && "Modéré"}
            {preset === "aggressive" && "Agressif"}
          </button>
        ))}
      </div>

      {/* Patrimoine */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mon Patrimoine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Patrimoine initial</label>
            <Input
              type="text"
              value={formatCurrency(params.initialPatrimony).replace("€", "").trim()}
              onChange={(e) => {
                const value = parseInt(e.target.value.replace(/\s/g, ""), 10) || 0;
                updateParam("initialPatrimony", value);
              }}
              className="mt-1 font-mono"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Appréciation annuelle: {formatPercent(params.appreciationRate)}
            </label>
            <Slider
              value={params.appreciationRate}
              onChange={(v) => updateParam("appreciationRate", v)}
              min={0}
              max={0.1}
              step={0.005}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Revenus */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mes Revenus</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Revenu mensuel net</label>
            <Input
              type="text"
              value={formatCurrency(params.monthlyIncome).replace("€", "").trim()}
              onChange={(e) => {
                const value = parseInt(e.target.value.replace(/\s/g, ""), 10) || 0;
                updateParam("monthlyIncome", value);
              }}
              className="mt-1 font-mono"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Croissance revenus: {formatPercent(params.incomeGrowthRate)}
            </label>
            <Slider
              value={params.incomeGrowthRate}
              onChange={(v) => updateParam("incomeGrowthRate", v)}
              min={0}
              max={0.05}
              step={0.005}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stratégie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ma Stratégie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Taux de réinvestissement: {formatPercent(params.reinvestmentRate)}
            </label>
            <Slider
              value={params.reinvestmentRate}
              onChange={(v) => updateParam("reinvestmentRate", v)}
              min={0}
              max={1}
              step={0.05}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Rendement investissements: {formatPercent(params.investmentReturnRate)}
            </label>
            <Slider
              value={params.investmentReturnRate}
              onChange={(v) => updateParam("investmentReturnRate", v)}
              min={0.03}
              max={0.15}
              step={0.005}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Objectif */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mon Objectif</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Objectif patrimonial</label>
            <div className="flex gap-2 mt-1">
              <Input
                type="text"
                value={formatCurrency(params.targetWealth).replace("€", "").trim()}
                onChange={(e) => {
                  const value = parseInt(e.target.value.replace(/\s/g, ""), 10) || 0;
                  updateParam("targetWealth", value);
                }}
                className="font-mono flex-1"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[1_000_000, 5_000_000, 10_000_000, 50_000_000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => updateParam("targetWealth", amount)}
                  className="text-xs px-2 py-1 bg-secondary hover:bg-secondary/80 rounded transition-colors"
                >
                  {formatCompactNumber(amount)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Horizon: {params.maxYears} ans
            </label>
            <Slider
              value={params.maxYears}
              onChange={(v) => updateParam("maxYears", Math.round(v))}
              min={10}
              max={100}
              step={5}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { formatCompactNumber } from "@/lib/utils";
