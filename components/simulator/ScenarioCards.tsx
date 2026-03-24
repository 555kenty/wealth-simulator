"use client";

import { SimulationResult } from "@/lib/engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Clock, Target, TrendingUp } from "lucide-react";

interface ScenarioCardsProps {
  result: SimulationResult;
  reinvestmentRate: number;
}

export function ScenarioCards({ result, reinvestmentRate }: ScenarioCardsProps) {
  const yearsToTarget = result.targetReachedYear;
  const finalWealth = result.finalWealth;
  const targetYear = yearsToTarget !== null ? new Date().getFullYear() + yearsToTarget : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Années pour atteindre l'objectif */}
      <Card className={yearsToTarget !== null ? "border-green-500/50" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temps pour objectif</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {yearsToTarget !== null ? (
              <span className="text-green-600">{yearsToTarget} ans</span>
            ) : (
              <span className="text-muted-foreground">Non atteint</span>
            )}
          </div>
          {targetYear && (
            <p className="text-xs text-muted-foreground">
              En {targetYear}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Patrimoine final */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Patrimoine final</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">
            {formatCurrency(finalWealth)}
          </div>
          <p className="text-xs text-muted-foreground">
            Après la période de simulation
          </p>
        </CardContent>
      </Card>

      {/* Réinvestissement */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Réinvestissement</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(reinvestmentRate * 100).toFixed(0)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Du revenu réinvesti
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
