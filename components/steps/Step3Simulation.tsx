"use client";

import { useSimulationContext } from "@/contexts/SimulationContext";
import { useEffect, useMemo, useState } from "react";
import { simulate } from "@/lib/engine";
import { monteCarloSimulation } from "@/lib/market-data/monte-carlo";
import { ArrowRight, ArrowLeft, Loader2, TrendingUp, Target, Activity } from "lucide-react";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export function Step3Simulation() {
  const { params, setSimulationResult, setMonteCarloResult, simulationResult, monteCarloResult, goToNextStep, goToPrevStep, isLoading, setIsLoading } = useSimulationContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const runSimulations = async () => {
      setIsLoading(true);
      setProgress(0);
      const deterministicResult = simulate(params);
      setSimulationResult(deterministicResult);
      setProgress(30);
      await new Promise(r => setTimeout(r, 100));
      setProgress(50);
      const mcResult = monteCarloSimulation(params, params.investmentReturnRate, 0.16, 1000);
      setMonteCarloResult(mcResult);
      setProgress(100);
      await new Promise(r => setTimeout(r, 300));
      setIsLoading(false);
    };
    runSimulations();
  }, [params, setSimulationResult, setMonteCarloResult, setIsLoading]);

  const chartData = useMemo(() => {
    if (!simulationResult) return [];
    return simulationResult.yearlySnapshots.map((s) => ({ year: s.year, total: s.totalWealth, investments: s.investmentPortfolio }));
  }, [simulationResult]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="nm-inset w-24 h-24 rounded-full flex items-center justify-center mb-6"><Loader2 className="w-10 h-10 text-nm-accent animate-spin" /></div>
        <h2 className="text-2xl font-semibold mb-2">Calcul en cours...</h2>
        <p className="text-nm-text-muted mb-6">Génération de 1000 scénarios Monte Carlo</p>
        <div className="w-64 h-2 bg-nm-shadow/30 rounded-full"><div className="h-full bg-gradient-to-r from-nm-accent to-emerald-500 transition-all" style={{ width: `${progress}%` }} /></div>
        <span className="text-sm text-nm-text-muted mt-2">{progress}%</span>
      </div>
    );
  }

  if (!simulationResult || !monteCarloResult) return <div className="text-center py-20"><p>Erreur.</p></div>;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-cabinet font-bold">Résultats</h1>
        <p className="text-nm-text-muted">{params.maxYears} ans, {monteCarloResult.iterations} scénarios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="nm-flat p-6"><div className="flex items-center gap-2 text-nm-text-muted mb-2"><TrendingUp className="w-4 h-4" /><span className="text-sm">Final</span></div><div className="text-2xl font-mono font-bold">{formatCompactNumber(simulationResult.finalWealth)}</div></div>
        <div className="nm-flat p-6"><div className="flex items-center gap-2 text-nm-text-muted mb-2"><Target className="w-4 h-4" /><span className="text-sm">Objectif</span></div><div className="text-2xl font-mono font-bold">{simulationResult.targetReachedYear || 'Non'} ans</div></div>
        <div className="nm-flat p-6"><div className="flex items-center gap-2 text-nm-text-muted mb-2"><Activity className="w-4 h-4" /><span className="text-sm">Réussite</span></div><div className="text-2xl font-mono font-bold text-emerald-500">{monteCarloResult.successRate.toFixed(1)}%</div></div>
        <div className="nm-flat p-6"><div className="flex items-center gap-2 text-nm-text-muted mb-2"><TrendingUp className="w-4 h-4" /><span className="text-sm">Intervalle</span></div><div className="text-lg font-mono font-bold">{formatCompactNumber(monteCarloResult.percentile5)}-{formatCompactNumber(monteCarloResult.percentile95)}</div></div>
      </div>

      <div className="nm-flat p-6">
        <h3 className="font-semibold mb-4">Évolution</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="year" tickFormatter={(v) => `${v}a`} stroke="#64748b" />
              <YAxis tickFormatter={(v) => formatCompactNumber(v)} stroke="#64748b" />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(l) => `Année ${l}`} />
              <ReferenceLine y={params.targetWealth} stroke="#10b981" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="investments" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={goToPrevStep} className="nm-button px-6 py-3 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Retour</button>
        <button onClick={goToNextStep} className="nm-button px-8 py-3 flex items-center gap-2 text-lg font-semibold">Résultats détaillés <ArrowRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
}
