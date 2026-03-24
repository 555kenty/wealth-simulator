"use client";

import { useSimulationContext } from "@/contexts/SimulationContext";
import { Wallet, TrendingUp, Target, ArrowRight } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

const PRESETS = {
  conservative: { name: "Prudent", description: "Patrimoine élevé, faible risque", params: { initialPatrimony: 1_000_000, appreciationRate: 0.02, monthlyIncome: 5_000, investmentReturnRate: 0.04, reinvestmentRate: 0.3 } },
  moderate: { name: "Modéré", description: "Équilibre patrimoine et revenus", params: { initialPatrimony: 500_000, appreciationRate: 0.03, monthlyIncome: 8_000, investmentReturnRate: 0.06, reinvestmentRate: 0.5 } },
  aggressive: { name: "Agressif", description: "Revenus élevés, forte croissance", params: { initialPatrimony: 100_000, appreciationRate: 0.05, monthlyIncome: 15_000, investmentReturnRate: 0.10, reinvestmentRate: 0.7 } },
};

export function Step1Params() {
  const { params, updateParams, goToNextStep } = useSimulationContext();
  const applyPreset = (key: keyof typeof PRESETS) => updateParams(PRESETS[key].params);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-cabinet font-bold">Votre situation patrimoniale</h1>
        <p className="text-nm-text-muted">Commencez par définir vos paramètres financiers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(PRESETS).map(([key, preset]) => (
          <button key={key} onClick={() => applyPreset(key as keyof typeof PRESETS)} className="nm-flat-hover p-6 text-left">
            <h3 className="font-semibold text-lg mb-1">{preset.name}</h3>
            <p className="text-sm text-nm-text-muted">{preset.description}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="nm-flat p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><Wallet className="w-5 h-5 text-white" /></div>
            <h2 className="text-xl font-semibold">Votre Patrimoine</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Patrimoine initial</label>
              <input type="number" value={params.initialPatrimony} onChange={(e) => updateParams({ initialPatrimony: parseInt(e.target.value) || 0 })} className="w-full nm-inset rounded-lg p-3 text-2xl font-mono font-bold bg-transparent" />
              <input type="range" min="0" max="5000000" step="10000" value={params.initialPatrimony} onChange={(e) => updateParams({ initialPatrimony: parseInt(e.target.value) })} className="w-full mt-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Appréciation: {formatPercent(params.appreciationRate)}</label>
              <input type="range" min="0" max="0.1" step="0.005" value={params.appreciationRate} onChange={(e) => updateParams({ appreciationRate: parseFloat(e.target.value) })} className="w-full" />
            </div>
          </div>
        </div>

        <div className="nm-flat p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-white" /></div>
            <h2 className="text-xl font-semibold">Vos Revenus</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Revenu mensuel net</label>
              <input type="number" value={params.monthlyIncome} onChange={(e) => updateParams({ monthlyIncome: parseInt(e.target.value) || 0 })} className="w-full nm-inset rounded-lg p-3 text-2xl font-mono font-bold bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Réinvestissement: {formatPercent(params.reinvestmentRate)}</label>
              <input type="range" min="0" max="1" step="0.05" value={params.reinvestmentRate} onChange={(e) => updateParams({ reinvestmentRate: parseFloat(e.target.value) })} className="w-full" />
            </div>
          </div>
        </div>

        <div className="nm-flat p-6 space-y-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"><Target className="w-5 h-5 text-white" /></div>
            <h2 className="text-xl font-semibold">Votre Objectif</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Objectif patrimonial</label>
              <input type="number" value={params.targetWealth} onChange={(e) => updateParams({ targetWealth: parseInt(e.target.value) || 0 })} className="w-full nm-inset rounded-lg p-3 text-2xl font-mono font-bold bg-transparent" />
              <div className="flex gap-2 mt-2 flex-wrap">
                {[1_000_000, 2_000_000, 5_000_000, 10_000_000].map((amount) => (
                  <button key={amount} onClick={() => updateParams({ targetWealth: amount })} className="text-xs px-3 py-1 nm-button rounded-full">{formatCurrency(amount)}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Horizon: {params.maxYears} ans</label>
              <input type="range" min="10" max="50" step="5" value={params.maxYears} onChange={(e) => updateParams({ maxYears: parseInt(e.target.value) })} className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={goToNextStep} className="nm-button px-8 py-4 flex items-center gap-3 text-lg font-semibold">Continuer <ArrowRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
}
