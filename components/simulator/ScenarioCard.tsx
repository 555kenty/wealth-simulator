"use client";

import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface Allocation {
  type: string;
  percentage: number;
  color: string;
}

export interface ScenarioCardProps {
  title: string;
  icon: LucideIcon;
  allocation: Allocation[];
  return: number;
  risk: "low" | "medium" | "high";
  years: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const riskLabels = {
  low: "Faible",
  medium: "Modéré",
  high: "Élevé",
};

const riskColors = {
  low: "text-green-400 bg-green-400/10",
  medium: "text-yellow-400 bg-yellow-400/10",
  high: "text-red-400 bg-red-400/10",
};

// Mini sparkline component
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={points}
        className="drop-shadow-sm"
      />
      {/* Gradient area under line */}
      <polygon
        fill={`${color}20`}
        points={`0,100 ${points} 100,100`}
      />
    </svg>
  );
}

export function ScenarioCard({
  title,
  icon: Icon,
  allocation,
  return: returnRate,
  risk,
  years,
  selected = false,
  onClick,
  className,
}: ScenarioCardProps) {
  // Generate mini sparkline data based on return rate
  const generateSparklineData = () => {
    const base = 100;
    const data: number[] = [base];
    for (let i = 1; i <= 10; i++) {
      data.push(base * Math.pow(1 + returnRate / 100, i));
    }
    return data;
  };

  const sparklineData = generateSparklineData();
  const mainColor = allocation[0]?.color || "#3b82f6";

  return (
    <GlassCard
      hover={true}
      glow={selected}
      className={cn(
        "cursor-pointer transition-all duration-300",
        selected && "ring-2 ring-blue-400/50 bg-white/10",
        className
      )}
      onClick={onClick}
    >
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2.5 rounded-xl",
                "bg-white/5",
                "border border-white/10"
              )}
            >
              <Icon className="w-5 h-5 text-white/90" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-xs text-white/50">{years} ans horizon</p>
            </div>
          </div>
          
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              riskColors[risk]
            )}
          >
            {riskLabels[risk]}
          </span>
        </div>

        {/* Mini Chart */}
        <div className="h-16 w-full">
          <Sparkline data={sparklineData} color={mainColor} />
        </div>

        {/* Allocation Bars */}
        <div className="flex h-1.5 rounded-full overflow-hidden">
          {allocation.map((item, index) => (
            <div
              key={index}
              className="h-full transition-all duration-300"
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>

        {/* Footer Stats */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1.5">
            {returnRate > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : returnRate < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-400" />
            ) : (
              <Minus className="w-4 h-4 text-white/40" />
            )}
            <span
              className={cn(
                "text-sm font-bold",
                returnRate > 0
                  ? "text-green-400"
                  : returnRate < 0
                  ? "text-red-400"
                  : "text-white/60"
              )}
            >
              {returnRate > 0 ? "+" : ""}
              {returnRate.toFixed(1)}%
            </span>
          </div>
          
          <span className="text-xs text-white/40">
            {allocation.length} actifs
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
