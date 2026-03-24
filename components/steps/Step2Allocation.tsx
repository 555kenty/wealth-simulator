"use client";

import { useSimulationContext } from "@/contexts/SimulationContext";
import { TrendingUp, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { formatPercent } from "@/lib/utils";
import { calculatePortfolioMetrics } from "@/lib/market-data/monte-carlo";
import { HISTORICAL_RETURNS } from "@/lib/market-data/historical-returns";
import { useMemo } from "react";

const ASSETS = [
  { key: "stocks", label: "Actions", bg: "bg-indigo-500", return: HISTORICAL_RETURNS.sp500.mean, volatility: HISTORICAL_RETURNS.sp500.stdDev },
  { key: "realEstate", label: "Immobilier", bg: "bg-emerald-500", return: HISTORICAL_RETURNS.realEstate.mean, volatility: HISTORICAL_RETURNS.realEstate.stdDev },
  { key: "crypto", label: "Crypto", bg: "bg-purple-500", return: HISTORICAL_RETURNS.bitcoin.mean, volatility: HISTORICAL_RETURNS.bitcoin.stdDev },
  { key: "bonds", label: "Obligations", bg: "bg-amber-500", return: HISTORICAL_RETURNS.bonds.mean, volatility: HISTORICAL_RETURNS.bonds.stdDev },
  { key: "gold", label: "Or", bg: "bg-yellow-500", return: HISTORICAL_RETURNS.gold.mean, volatility: HISTORICAL_RETURNS.gold.stdDev },
];

const PRESETS = {
  conservative: { stocks: 20, realEstate: 40, crypto: 0, bonds: 30, gold: 10 },
  balanced: { stocks: 40, realEstate: 30, crypto: 10, bonds: 15, gold: 5 },
  growth: { stocks: 60, realEstate: 20, crypto: 15, bonds: 3, gold: 2 },
  aggressive: { stocks: 50, realEstate: 15, crypto: 30, bonds: 3, gold: 2 },
};

export function Step2Allocation() {
  const { allocation, updateAllocation, params, updateParams, goToNextStep, goToPrevStep } = useSimulationContext();
  const portfolio = useMemo(() => calculatePortfolioMetrics(ASSETS.map(a => ({ asset: a.key, weight: allocation[a.key as keyof typeof allocation] / 100, return: a.return, volatility: a.volatility }))), [allocation]);
  const total = Object.values(allocation).reduce((a, b) => a + b, 0);
  const isValid = total === 100;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-cabinet font-bold">Allocation du portefeuille</h1>
        <p className="text-nm-text-muted">Répartissez vos investissements</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.keys(PRESETS).map((key) => (
          <button key={key} onClick={() => updateAllocation(PRESETS[key as keyof typeof PRESETS])} className="nm-flat-hover p-4 text-sm"><span className="font-medium capitalize">{key}</span></button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="nm-flat p-8 flex flex-col items-center">
          <h3 className="font-semibold mb-6">Répartition: {total}%</h3>
          <div className="w-48 h-48 rounded-full nm-inset flex items-center justify-center"><div className="text-center"><div className="text-4xl font-bold">{total}%</div><div className="text-sm text-nm-text-muted">Total</div></div></div>
          <div className="grid grid-cols-2 gap-3 mt-6 w-full">{ASSETS.map((a) => (
            <div key={a.key} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${a.bg}`} /><span className="text-sm">{a.label}</span></div>
          ))}</div>
        </div>

        <div className="space-y-4">{ASSETS.map((a) => (
          <div key={a.key} className="nm-flat p-4">
            <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><div className={`w-4 h-4 rounded ${a.bg}`} /><span className="font-medium">{a.label}</span></div><span className="font-mono font-bold">{allocation[a.key as keyof typeof allocation]}%</span></div>
            <input type="range" min="0" max="100" step="5" value={allocation[a.key as keyof typeof allocation]} onChange={(e) => updateAllocation({ [a.key]: parseInt(e.target.value) })} className="w-full" />
          </div>
        ))}
        {!isValid && (
          <div className="flex items-center gap-2 p-4 bg-rose-500/10 rounded-xl text-rose-600"><AlertCircle className="w-5 h-5" /><span>Le total doit être 100% (actuellement {total}%)</span></div>
        )}</div>
      </div>

      <div className="nm-flat p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Métriques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="nm-inset p-4 rounded-xl"><div className="text-sm text-nm-text-muted">Rendement</div><div className="text-2xl font-mono font-bold text-emerald-500">{formatPercent(portfolio.expectedReturn)}</div></div>
          <div className="nm-inset p-4 rounded-xl"><div className="text-sm text-nm-text-muted">Volatilité</div><div className="text-2xl font-mono font-bold text-amber-500">{formatPercent(portfolio.volatility)}</div></div>
          <div className="nm-inset p-4 rounded-xl"><div className="text-sm text-nm-text-muted">Ratio</div><div className="text-2xl font-mono font-bold text-blue-500">{(portfolio.expectedReturn / portfolio.volatility).toFixed(2)}</div></div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={goToPrevStep} className="nm-button px-6 py-3 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Retour</button>
        <button onClick={() => { updateParams({ investmentReturnRate: portfolio.expectedReturn }); goToNextStep(); }} disabled={!isValid} className={`nm-button px-8 py-3 flex items-center gap-2 ${!isValid ? 'opacity-50' : ''}`}>Simuler <ArrowRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
}
