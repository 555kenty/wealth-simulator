"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SimulatorContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: Record<string, unknown>;
  setFormData: (data: Record<string, unknown>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(
  undefined
);

// Étapes du simulateur
export const STEPS = [
  { path: "/simulator/current", label: "Patrimoine", stepNumber: 1 },
  { path: "/simulator/allocation", label: "Allocation", stepNumber: 2 },
  { path: "/simulator/projection", label: "Projection", stepNumber: 3 },
  { path: "/simulator/results", label: "Résultats", stepNumber: 4 },
];

export const STEP_LABELS = STEPS.map((s) => s.label);

export function SimulatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [formData, setFormDataState] = useState<Record<string, unknown>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Déterminer l'étape actuelle
  const currentStep =
    STEPS.find((step) => pathname.startsWith(step.path))?.stepNumber || 1;

  // Charger les données sauvegardées au montage
  useEffect(() => {
    const saved = localStorage.getItem("wealth-simulator-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormDataState(parsed);
      } catch {
        console.error("Failed to parse saved data");
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder les données quand elles changent
  const setFormData = (data: Record<string, unknown>) => {
    setFormDataState(data);
    localStorage.setItem("wealth-simulator-data", JSON.stringify(data));
  };

  // Navigation entre les étapes
  const goToNextStep = () => {
    if (currentStep < STEPS.length) {
      const nextPath = STEPS[currentStep].path;
      router.push(nextPath);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      const prevPath = STEPS[currentStep - 2].path;
      router.push(prevPath);
    }
  };

  const setCurrentStep = (step: number) => {
    const targetPath = STEPS[step - 1]?.path;
    if (targetPath) router.push(targetPath);
  };

  const contextValue: SimulatorContextType = {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    goToNextStep,
    goToPreviousStep,
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cinematic-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SimulatorContext.Provider value={contextValue}>
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error("useSimulator must be used within SimulatorProvider");
  }
  return context;
}
