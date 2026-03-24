"use client";

import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { cn, formatCompactNumber, formatCurrency } from "@/lib/utils";

export interface DataPoint {
  year: number;
  value: number;
  confidenceLower?: number;
  confidenceUpper?: number;
}

export interface WealthChartProps {
  data: DataPoint[];
  targetLine?: number;
  showConfidence?: boolean;
  className?: string;
  height?: number;
}

// Custom Tooltip
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: number;
}) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl">
      <p className="text-sm font-medium text-white/60 mb-2">
        Année {label}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-sm text-white/80">
              {entry.dataKey === "value"
                ? "Patrimoine"
                : entry.dataKey === "confidenceLower"
                ? "Min (confiance)"
                : "Max (confiance)"}
            </span>
            <span className="text-sm font-bold text-white tabular-nums">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WealthChart({
  data,
  targetLine,
  showConfidence = false,
  className,
  height = 400,
}: WealthChartProps) {
  const hasConfidence = showConfidence && data[0]?.confidenceLower !== undefined;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="year"
            tickFormatter={(value) => `${value}`}
            stroke="rgba(255,255,255,0.3)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />

          <YAxis
            tickFormatter={(value) => formatCompactNumber(value)}
            stroke="rgba(255,255,255,0.3)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            width={80}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Confidence interval area */}
          {hasConfidence && (
            <Area
              type="monotone"
              dataKey="confidenceUpper"
              stroke="none"
              fill="url(#confidenceGradient)"
              baseLine={data[0]?.confidenceLower}
            />
          )}

          {/* Target line */}
          {targetLine && (
            <ReferenceLine
              y={targetLine}
              stroke="#10b981"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: "Objectif",
                position: "right",
                fill: "#10b981",
                fontSize: 12,
                fontWeight: 500,
              }}
            />
          )}

          {/* Main area */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#wealthGradient)"
          />

          {/* Main line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "#1e293b",
            }}
          />

          {/* Confidence lines */}
          {hasConfidence && (
            <>
              <Line
                type="monotone"
                dataKey="confidenceLower"
                stroke="#8b5cf6"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="confidenceUpper"
                stroke="#8b5cf6"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
