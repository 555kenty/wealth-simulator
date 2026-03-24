"use client";

import { useSimulationContext } from "@/contexts/SimulationContext";
import { ArrowLeft, Share2, Link2, CheckCircle, Printer } from "lucide-react";
import { formatCurrency, formatCompactNumber, formatPercent } from "@/lib/utils";
import { useState } from "react";

export function Step4Results() {
  const { params, simulationResult, monteCarloResult, goToPrevStep, generateShareUrl } = useSimulationContext();
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  if (!simulationResult || !monteCarloResult) {
    return <div className="text-center py-20"><p>Aucun résultat disponible.</p></div>;
  }

  const handleShare = () => {
    const url = generateShareUrl();
    setShareUrl(url);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => window.print();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-cabinet font-bold">Résultats détaillés</h1>
        <p className="text-nm-text-muted">Résumé complet et options d'export</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center print:hidden">
        <button onClick={handlePrint} className="nm-button px-4 py-2 flex items-center gap-2">
          <Printer className="w-4 h-4" /> Imprimer
        </button>
        <button onClick={handleShare} className="nm-button px-4 py-2 flex items-center gap-2">
          {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          {copied ? "Lien copié !" : "Partager"}
        </button>
      </div>

      {shareUrl && (
        <div className="nm-inset p-4 rounded-xl print:hidden">
          <div className="flex items-center gap-2 text-sm text-nm-text-muted mb-2"><Link2 className="w-4 h-4" /> Lien de partage</div>
          <div className="flex gap-2">
            <input type="text" value={shareUrl} readOnly className="flex-1 bg-transparent font-mono text-sm outline-none" />
            <button onClick={() => { navigator.clipboard.writeText(shareUrl); setCopied(true); }} className="nm-button px-3 py-1 text-sm">
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6 print:space-y-4">
        <div className="nm-flat p-8">
          <h2 className="text-2xl font-bold mb-6">Rapport de simulation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="nm-inset p-4 rounded-xl"><div className="text-sm text-nm-text-muted">Patrimoine initial</div><div className="text-xl font-mono font-bold">{formatCurrency(params.initialPatrimony)}</div></div>
            <div className="nm-inset p-4 rounded-xl"><div className="text-sm text-nm-text-muted">Patrimoine final</div><div className="text-xl font-mono font-bold text-emerald-500">{formatCurrency(simulationResult.finalWealth)}</div></div>
            <div className="nm-inset p-4 rounded-xl"><div className="text-sm text-nm-text-muted">Croissance</div><div className="text-xl font-mono font-bold">{formatPercent(simulationResult.finalWealth / params.initialPatrimony - 1)}</div></div>
          </div>
        </div>

        <div className="nm-flat p-6">
          <h3 className="font-semibold text-lg mb-4">Analyse Monte Carlo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="nm-inset p-4 rounded-xl"><div className="text-xs text-nm-text-muted">Scénarios</div><div className="text-lg font-mono font-bold">{monteCarloResult.iterations.toLocaleString()}</div></div>
            <div className="nm-inset p-4 rounded-xl"><div className="text-xs text-nm-text-muted">Taux de réussite</div><div className="text-lg font-mono font-bold text-emerald-500">{monteCarloResult.successRate.toFixed(1)}%</div></div>
            <div className="nm-inset p-4 rounded-xl"><div className="text-xs text-nm-text-muted">Médiane</div><div className="text-lg font-mono font-bold">{formatCompactNumber(monteCarloResult.medianFinalWealth)}</div></div>
            <div className="nm-inset p-4 rounded-xl"><div className="text-xs text-nm-text-muted">Années moy.</div><div className="text-lg font-mono font-bold">{monteCarloResult.averageYearsToTarget?.toFixed(1) || "N/A"}</div></div>
          </div>
        </div>

        <div className="nm-flat p-6">
          <h3 className="font-semibold text-lg mb-4">Paramètres</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-nm-shadow/20"><span className="text-nm-text-muted">Patrimoine initial</span><span className="font-mono">{formatCurrency(params.initialPatrimony)}</span></div>
              <div className="flex justify-between py-2 border-b border-nm-shadow/20"><span className="text-nm-text-muted">Revenu mensuel</span><span className="font-mono">{formatCurrency(params.monthlyIncome)}</span></div>
              <div className="flex justify-between py-2 border-b border-nm-shadow/20"><span className="text-nm-text-muted">Réinvestissement</span><span className="font-mono">{formatPercent(params.reinvestmentRate)}</span></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-nm-shadow/20"><span className="text-nm-text-muted">Objectif</span><span className="font-mono">{formatCurrency(params.targetWealth)}</span></div>
              <div className="flex justify-between py-2 border-b border-nm-shadow/20"><span className="text-nm-text-muted">Horizon</span><span className="font-mono">{params.maxYears} ans</span></div>
              <div className="flex justify-between py-2 border-b border-nm-shadow/20"><span className="text-nm-text-muted">Rendement</span><span className="font-mono">{formatPercent(params.investmentReturnRate)}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between print:hidden">
        <button onClick={goToPrevStep} className="nm-button px-6 py-3 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Retour</button>
        <button onClick={() => window.location.href = "/"} className="nm-button px-6 py-3">Nouvelle simulation</button>
      </div>
    </div>
  );
}
