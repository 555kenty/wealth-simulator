"use client";

import { SimulationProvider } from "@/contexts/SimulationContext";
import { StepNavigation } from "@/components/steps/StepNavigation";

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SimulationProvider>
      <div className="min-h-screen bg-nm-bg text-nm-text">
        <StepNavigation />
        <main className="container mx-auto px-4 py-8 max-w-6xl">{children}</main>
      </div>
    </SimulationProvider>
  );
}
