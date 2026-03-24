"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TrendingUp, Moon, Sun, ArrowRight, ArrowLeft, Home, PieChart, Calculator, BarChart3 } from "lucide-react";

// Types
interface Asset {
  id: string;
  type: 'realEstate' | 'stocks' | 'crypto' | 'gold' | 'bonds' | 'cash';
  amount: number;
  return: number;
}

interface SimulationData {
  totalWealth: number;
  monthlyIncome: number;
  targetWealth: number;
  horizon: number;
  reinvestmentRate: number;
  assets: Asset[];
}

// Icons mapping
const assetIcons: Record<string, string> = {
  realEstate: "🏠",
  stocks: "📈",
  crypto: "₿",
  gold: "🪙",
  bonds: "📋",
  cash: "💶",
};

const assetNames: Record<string, string> = {
  realEstate: "Immobilier",
  stocks: "Actions/ETF",
  crypto: "Crypto",
  gold: "Or",
  bonds: "Obligations",
  cash: "Cash",
};

const assetDefaults: Record<string, number> = {
  realEstate: 4.5,
  stocks: 10,
  crypto: 85,
  gold: 6,
  bonds: 4,
  cash: 2.5,
};

export default function SimulatorPage() {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  
  // Data state
  const [data, setData] = useState<SimulationData>({
    totalWealth: 500000,
    monthlyIncome: 5000,
    targetWealth: 1000000,
    horizon: 20,
    reinvestmentRate: 30,
    assets: [],
  });

  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState("");
  const [tempReturn, setTempReturn] = useState("");

  // Calculate weighted return
  const totalAssets = data.assets.reduce((sum, a) => sum + a.amount, 0);
  const weightedReturn = totalAssets > 0 
    ? data.assets.reduce((sum, a) => sum + (a.amount / totalAssets) * a.return, 0)
    : 0;

  // Add asset
  const addAsset = (type: string) => {
    if (!tempAmount || parseFloat(tempAmount) <= 0) return;
    
    const newAsset: Asset = {
      id: Date.now().toString(),
      type: type as any,
      amount: parseFloat(tempAmount),
      return: parseFloat(tempReturn) || assetDefaults[type],
    };
    
    setData(prev => ({
      ...prev,
      assets: [...prev.assets, newAsset],
      totalWealth: prev.totalWealth + newAsset.amount,
    }));
    
    setSelectedAsset(null);
    setTempAmount("");
    setTempReturn("");
  };

  // Remove asset
  const removeAsset = (id: string) => {
    const asset = data.assets.find(a => a.id === id);
    if (!asset) return;
    
    setData(prev => ({
      ...prev,
      assets: prev.assets.filter(a => a.id !== id),
      totalWealth: prev.totalWealth - asset.amount,
    }));
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Navigation
  const canProceed = () => {
    switch (step) {
      case 1: return data.totalWealth > 0;
      case 2: return data.assets.length > 0;
      case 3: return data.targetWealth > 0 && data.monthlyIncome > 0;
      default: return true;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#020617]' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Navigation flottante - style landing */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="font-cabinet font-bold text-sm tracking-wider text-white">WEALTH</span>
          </Link>

          {/* Steps */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { num: 1, label: "Patrimoine", icon: Home },
              { num: 2, label: "Allocation", icon: PieChart },
              { num: 3, label: "Projection", icon: Calculator },
              { num: 4, label: "Résultats", icon: BarChart3 },
            ].map(({ num, label, icon: Icon }) => (
              <button
                key={num}
                onClick={() => setStep(num)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                  step === num 
                    ? 'bg-white/10 text-white' 
                    : step > num 
                      ? 'text-emerald-400' 
                      : 'text-slate-400 hover:text-white'
                }`}
              >
                {step > num ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">✓</span>
                ) : (
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    step === num ? 'bg-indigo-500' : 'bg-white/10'
                  }`}>{num}</span>
                )}
                <span className="hidden lg:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* STEP 1: PATRIMOINE */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h1 className="font-cabinet font-extrabold text-4xl sm:text-5xl text-metallic mb-4">
                Où en êtes-vous ?
              </h1>
              <p className="text-slate-400 text-lg">
                Commencez par renseigner votre patrimoine actuel
              </p>
            </div>

            {/* Total Wealth Input */}
            <div className="glass rounded-3xl p-8 text-center">
              <label className="text-slate-400 text-sm uppercase tracking-widest mb-4 block">
                Votre patrimoine total
              </label>
              <input
                type="text"
                value={formatCurrency(data.totalWealth).replace("€", "").trim()}
                onChange={(e) => {
                  const val = parseFloat(e.target.value.replace(/\s/g, "").replace(/[^\d]/g, "")) || 0;
                  setData(prev => ({ ...prev, totalWealth: val }));
                }}
                className="bg-transparent text-5xl sm:text-6xl font-cabinet font-bold text-center text-white outline-none w-full"
              />
              <span className="text-2xl text-slate-500">€</span>
            </div>

            {/* Add Assets Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(assetNames).map(([type, name]) => (
                <div key={type} className="relative">
                  {selectedAsset === type ? (
                    <div className="glass rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-2xl">{assetIcons[type]}</span>
                        <span className="font-medium">{name}</span>
                      </div>
                      <input
                        type="number"
                        placeholder="Montant"
                        value={tempAmount}
                        onChange={(e) => setTempAmount(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500"
                        autoFocus
                      />
                      <input
                        type="number"
                        placeholder={`Rendement % (défaut: ${assetDefaults[type]}%)`}
                        value={tempReturn}
                        onChange={(e) => setTempReturn(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => addAsset(type)}
                          className="flex-1 py-2 bg-indigo-500 rounded-xl text-white font-medium hover:bg-indigo-600 transition-colors"
                        >
                          Ajouter
                        </button>
                        <button
                          onClick={() => { setSelectedAsset(null); setTempAmount(""); setTempReturn(""); }}
                          className="px-4 py-2 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedAsset(type)}
                      className="w-full glass rounded-2xl p-4 text-left hover:bg-white/10 transition-all group"
                    >
                      <span className="text-3xl block mb-2">{assetIcons[type]}</span>
                      <span className="text-white font-medium group-hover:text-indigo-400 transition-colors">{name}</span>
                      <span className="text-slate-500 text-sm block">+{assetDefaults[type]}%</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Added Assets List */}
            {data.assets.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-medium mb-4">Actifs ajoutés</h3>
                <div className="space-y-2">
                  {data.assets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{assetIcons[asset.type]}</span>
                        <span className="text-white">{assetNames[asset.type]}</span>
                        <span className="text-slate-400 text-sm">{asset.return}%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white font-medium">{formatCurrency(asset.amount)}</span>
                        <button
                          onClick={() => removeAsset(asset.id)}
                          className="text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-slate-400 text-sm">Patrimoine total</div>
                <div className="text-2xl font-cabinet font-bold text-white">{formatCurrency(data.totalWealth)}</div>
              </div>
              {data.assets.length > 0 && (
                <div>
                  <div className="text-slate-400 text-sm">Rendement moyen</div>
                  <div className="text-2xl font-cabinet font-bold text-emerald-400">{weightedReturn.toFixed(1)}%</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: ALLOCATION - Simplified placeholder */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h1 className="font-cabinet font-extrabold text-4xl sm:text-5xl text-metallic mb-4">
                Allocation
              </h1>
              <p className="text-slate-400 text-lg">
                Ajustez la répartition de votre portefeuille
              </p>
            </div>
            
            <div className="glass rounded-3xl p-8 text-center">
              <p className="text-slate-400 mb-4">Distribution actuelle basée sur vos actifs</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data.assets.map((asset) => (
                  <div key={asset.id} className="glass rounded-xl p-4">
                    <div className="text-2xl mb-2">{assetIcons[asset.type]}</div>
                    <div className="text-white font-medium">{assetNames[asset.type]}</div>
                    <div className="text-slate-400 text-sm">{formatCurrency(asset.amount)}</div>
                    <div className="text-indigo-400 text-sm">{((asset.amount / data.totalWealth) * 100).toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PROJECTION - Simplified */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h1 className="font-cabinet font-extrabold text-4xl sm:text-5xl text-metallic mb-4">
                Votre objectif
              </h1>
            </div>

            <div className="glass rounded-3xl p-8 space-y-6">
              <div>
                <label className="text-slate-400 text-sm uppercase tracking-widest mb-4 block">
                  Objectif patrimonial
                </label>
                <input
                  type="text"
                  value={formatCurrency(data.targetWealth).replace("€", "").trim()}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value.replace(/\s/g, "").replace(/[^\d]/g, "")) || 0;
                    setData(prev => ({ ...prev, targetWealth: val }));
                  }}
                  className="bg-transparent text-4xl font-cabinet font-bold text-center text-white outline-none w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">Revenus mensuels</label>
                  <input
                    type="number"
                    value={data.monthlyIncome}
                    onChange={(e) => setData(prev => ({ ...prev, monthlyIncome: parseFloat(e.target.value) || 0 }))}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Horizon (années)</label>
                  <input
                    type="number"
                    value={data.horizon}
                    onChange={(e) => setData(prev => ({ ...prev, horizon: parseInt(e.target.value) || 20 }))}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS - Simplified */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h1 className="font-cabinet font-extrabold text-4xl sm:text-5xl text-metallic mb-4">
                Vos résultats
              </h1>
            </div>

            <div className="glass rounded-3xl p-8 text-center">
              <div className="text-slate-400 mb-2">Patrimoine projeté dans {data.horizon} ans</div>
              <div className="text-5xl sm:text-6xl font-cabinet font-bold text-white mb-4">
                {formatCurrency(data.totalWealth * Math.pow(1 + weightedReturn / 100, data.horizon))}
              </div>
              <div className="text-emerald-400">
                Objectif: {formatCurrency(data.targetWealth)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-slate-400 text-sm">Rendement moyen</div>
                <div className="text-2xl font-cabinet font-bold text-white">{weightedReturn.toFixed(1)}%</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-slate-400 text-sm">Actifs déclarés</div>
                <div className="text-2xl font-cabinet font-bold text-white">{data.assets.length}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-3 glass rounded-full text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </button>
          )}
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-white text-[#020617] rounded-full font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors"
            >
              Retour à l'accueil
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
