"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { SimulationResult } from "@/lib/engine";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WealthChartProps {
  result: SimulationResult;
  targetWealth: number;
  scenarioLabel?: string;
}

const SCENARIO_COLORS = [
  "#1E40AF", // blue-800
  "#059669", // emerald-600
  "#D97706", // amber-600
  "#7C3AED", // violet-600
];

export function WealthChart({ result, targetWealth, scenarioLabel = "Scénario" }: WealthChartProps) {
  const data = result.yearlySnapshots.map((snapshot) => ({
    year: snapshot.year,
    patrimony: snapshot.patrimonyValue,
    investments: snapshot.investmentPortfolio,
    total: snapshot.totalWealth,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Évolution du Patrimoine</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="year"
                tickFormatter={(value) => `${value} ans`}
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis
                tickFormatter={(value) => formatCompactNumber(value)}
                stroke="#64748b"
                fontSize={12}
                width={80}
              />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(label) => `Année ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <ReferenceLine
                y={targetWealth}
                stroke="#059669"
                strokeDasharray="5 5"
                label={{
                  value: "Objectif",
                  position: "right",
                  fill: "#059669",
                  fontSize: 12,
                }}
              />
              
              <Line
                type="monotone"
                dataKey="total"
                stroke={SCENARIO_COLORS[0]}
                strokeWidth={2}
                dot={false}
                name="Patrimoine total"
              />
              
              <Line
                type="monotone"
                dataKey="patrimony"
                stroke={SCENARIO_COLORS[1]}
                strokeWidth={2}
                dot={false}
                name="Patrimoine initial"
              />
              
              <Line
                type="monotone"
                dataKey="investments"
                stroke={SCENARIO_COLORS[2]}
                strokeWidth={2}
                dot={false}
                name="Investissements"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Légende */}
        <div className="flex gap-6 mt-4 justify-center flex-wrap">
          {[
            { color: SCENARIO_COLORS[0], label: "Patrimoine total" },
            { color: SCENARIO_COLORS[1], label: "Patrimoine initial" },
            { color: SCENARIO_COLORS[2], label: "Investissements" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-4 h-1 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
