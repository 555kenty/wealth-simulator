"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Home, 
  PieChart, 
  Settings, 
  Bell, 
  Search,
  Moon,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  Clock,
  Activity
} from "lucide-react";
import { SimulationParams } from "@/lib/engine";
import { useSimulation } from "@/hooks/useSimulation";
import { HISTORICAL_RETURNS } from "@/lib/market-data/historical-returns";
import { monteCarloSimulation } from "@/lib/market-data/monte-carlo";

// Counter animation hook
function useCountUp(end: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo
      const easeProgress = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(end * easeProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return { count, isComplete };
}

// Ripple effect component
function RippleButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "nm-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 700);
    onClick?.();
  };

  return (
    <button ref={buttonRef} onClick={handleClick} className={`nm-button ${className}`}>
      {children}
    </button>
  );
}

// Stat Card with counter
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  prefix = "", 
  suffix = "", 
  trend,
  delay = 0 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: number; 
  prefix?: string;
  suffix?: string;
  trend?: { value: number; positive: boolean };
  delay?: number;
}) {
  const { count, isComplete } = useCountUp(value);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`nm-flat-hover p-6 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="nm-inset w-12 h-12 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-nm-accent animate-float" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div className={`text-3xl font-bold font-general transition-transform ${isComplete ? 'animate-count-pulse' : ''}`}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      
      <div className="text-sm text-nm-text-muted mt-1">{label}</div>
    </div>
  );
}

// Animated progress bar
function ProgressBar({ value, max, gradient = "from-indigo-500 via-purple-500 to-pink-500" }: { value: number; max: number; gradient?: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="nm-inset h-3 rounded-full overflow-hidden relative">
      <div 
        className={`h-full rounded-full bg-gradient-to-r ${gradient} shimmer relative animate-glow`}
        style={{ width: `${percentage}%`, transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />
    </div>
  );
}

// Terminal component
function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const commands = [
      "> Initialisation moteur de simulation...",
      "> Chargement données historiques...",
      "> S&P 500: μ=10.2%, σ=16%",
      "> Immobilier FR: μ=4.5%, σ=5%",
      "> Bitcoin: μ=85%, σ=80%",
      "> Simulation Monte Carlo: 1000 itérations",
      "> Calcul des percentiles...",
      "> Prêt.",
    ];
    
    commands.forEach((cmd, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, cmd]);
      }, i * 300);
    });
  }, []);

  return (
    <div className="nm-inset rounded-2xl p-4 font-mono text-xs">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-nm-shadow">
        <div className="w-3 h-3 rounded-full bg-rose-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="ml-2 text-nm-text-muted">system.log</span>
      </div>
      
      <div className="space-y-1 h-32 overflow-hidden">
        {lines.map((line, i) => (
          <div 
            key={i} 
            className="text-nm-text animate-in slide-in-from-left-2 fade-in duration-300"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {line}
          </div>
        ))}
        <div className="flex items-center text-emerald-500 mt-2">
          <span>&gt; _</span>
          <span className="w-2 h-4 bg-emerald-500 ml-0.5 animate-cursor" />
        </div>
      </div>
    </div>
  );
}

// Main Simulator Page
export default function SimulatorPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  
  const [params, setParams] = useState<SimulationParams>({
    initialPatrimony: 100000,
    patrimonyType: "mixed",
    appreciationRate: 0.03,
    monthlyIncome: 5000,
    incomeGrowthRate: 0.02,
    reinvestmentRate: 0.3,
    investmentReturnRate: 0.07,
    targetWealth: 1000000,
    maxYears: 30,
  });

  const result = useSimulation(params);
  const monteCarlo = monteCarloSimulation(params, 0.07, 0.16, 100);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-nm-bg text-nm-text transition-colors duration-300">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-[72px] z-50 flex flex-col items-center py-6 gap-3">
          {/* Logo */}
          <div className="nm-flat w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <TrendingUp className="w-6 h-6 text-nm-accent" />
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-3">
            {[
              { id: "dashboard", icon: Home },
              { id: "portfolio", icon: PieChart },
              { id: "settings", icon: Settings },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  activeTab === id 
                    ? 'nm-inset text-nm-accent' 
                    : 'nm-button text-nm-text-muted hover:text-nm-text'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === id ? '' : 'group-hover:translate-x-1'}`} />
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-[72px] min-h-screen">
          {/* Header */}
          <header className="sticky top-4 z-40 mx-4">
            <div className="nm-flat rounded-[28px] h-[72px] px-6 flex items-center justify-between">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm text-nm-text-muted">
                <span>Simulateur</span>
                <span>/</span>
                <span className="text-nm-text">Tableau de bord</span>
              </div>

              {/* Search */}
              <div className="hidden md:flex nm-inset rounded-full px-4 py-2 w-72 items-center gap-2">
                <Search className="w-4 h-4 text-nm-text-muted" />
                <input 
                  type="text" 
                  placeholder="Rechercher..."
                  className="bg-transparent text-sm outline-none w-full"
                />
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="nm-button w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <Moon className="w-4 h-4" />
                </button>

                <button className="nm-button w-10 h-10 rounded-full flex items-center justify-center relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-notify" />
                </button>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Wallet} 
                label="Patrimoine Final" 
                value={Math.floor(result.finalWealth)} 
                prefix="€"
                trend={{ value: 12.5, positive: true }}
                delay={0}
              />
              
              <StatCard 
                icon={Target} 
                label="Années pour Objectif" 
                value={result.targetReachedYear || 0} 
                suffix=" ans"
                trend={{ value: -2, positive: true }}
                delay={100}
              />
              
              <StatCard 
                icon={Activity} 
                label="Taux de Succès" 
                value={Math.floor(monteCarlo.successRate)} 
                suffix="%"
                trend={{ value: 5.3, positive: true }}
                delay={200}
              />
              
              <StatCard 
                icon={Clock} 
                label="Horizon" 
                value={params.maxYears} 
                suffix=" ans"
                delay={300}
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[
                { icon: Plus, label: "Nouveau scénario" },
                { icon: PieChart, label: "Répartition" },
                { icon: Activity, label: "Analyser" },
              ].map(({ icon: Icon, label }) => (
                <RippleButton key={label} className="flex items-center gap-2 px-4 py-3 whitespace-nowrap group">
                  <Icon className="w-4 h-4 icon-spin" />
                  <span className="text-sm font-medium">{label}</span>
                </RippleButton>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Section */}
              <div className="space-y-4">
                <h3 className="font-general font-semibold text-lg">Allocation Actuelle</h3>
                
                <div className="space-y-4">
                  {[
                    { label: "Actions", value: 40, color: "from-indigo-500 to-blue-500" },
                    { label: "Immobilier", value: 30, color: "from-emerald-500 to-teal-500" },
                    { label: "Crypto", value: 15, color: "from-purple-500 to-pink-500" },
                    { label: "Obligations", value: 10, color: "from-amber-500 to-orange-500" },
                    { label: "Or", value: 5, color: "from-yellow-500 to-amber-500" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <ProgressBar value={item.value} max={100} gradient={item.color} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal */}
              <div className="space-y-4">
                <h3 className="font-general font-semibold text-lg">System Status</h3>
                <Terminal />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
