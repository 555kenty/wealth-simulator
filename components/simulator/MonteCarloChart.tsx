"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { cn, formatCompactNumber } from "@/lib/utils";

export interface DistributionDataPoint {
  value: number;
  frequency: number;
  isMedian?: boolean;
}

export interface MonteCarloChartProps {
  distributionData: DistributionDataPoint[];
  className?: string;
  height?: number;
}

// Custom Tooltip
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: DistributionDataPoint }>;
}) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-white/80">Valeur</span>
          <span className="text-sm font-bold text-white tabular-nums">
            {formatCompactNumber(data.value)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-white/80">Fréquence</span>
          <span className="text-sm font-bold text-white tabular-nums">
            {data.frequency.toFixed(1)}%
          </span>
        </div>
        {data.isMedian && (
          <div className="pt-1 mt-1 border-t border-white/10">
            <span className="text-xs text-amber-400 font-medium">Médiane</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function MonteCarloChart({
  distributionData,
  className,
  height = 300,
}: MonteCarloChartProps) {
  // Find median index
  const medianIndex = distributionData.findIndex((d) => d.isMedian);
  const medianValue =
    medianIndex >= 0 ? distributionData[medianIndex]?.value : null;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={distributionData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="medianGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.5} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="value"
            tickFormatter={(value) => formatCompactNumber(value)}
            stroke="rgba(255,255,255,0.3)"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            interval="preserveStartEnd"
          />

          <YAxis
            tickFormatter={(value) => `${value}%`}
            stroke="rgba(255,255,255,0.3)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />

          {/* Median reference line */}
          {medianValue && (
            <ReferenceLine
              x={medianValue}
              stroke="#f59e0b"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: "Médiane",
                position: "top",
                fill: "#f59e0b",
                fontSize: 11,
                fontWeight: 500,
              }}
            />
          )}

          <Bar dataKey="frequency" radius={[4, 4, 0, 0]} maxBarSize={50}>
            {distributionData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isMedian ? "url(#medianGradient)" : "url(#barGradient)"}
                stroke={entry.isMedian ? "#f59e0b" : "#3b82f6"}
                strokeWidth={entry.isMedian ? 2 : 0}
                strokeOpacity={0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
