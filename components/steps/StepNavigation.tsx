"use client";

import { useSimulationContext } from "@/contexts/SimulationContext";
import { Wallet, PieChart, TrendingUp, Download, ChevronRight, ChevronLeft } from "lucide-react";

const steps = [
  { id: 1, label: "Paramètres", icon: Wallet },
  { id: 2, label: "Allocation", icon: PieChart },
  { id: 3, label: "Simulation", icon: TrendingUp },
  { id: 4, label: "Résultats", icon: Download },
];

export function StepNavigation() {
  const { currentStep, setCurrentStep, goToNextStep, goToPrevStep } = useSimulationContext();

  return (
    <div className="sticky top-0 z-50 bg-nm-bg/95 backdrop-blur-sm border-b border-nm-shadow/20">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isClickable = currentStep >= step.id || step.id === 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => isClickable && setCurrentStep(step.id)}
                  disabled={!isClickable}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'nm-inset text-nm-accent' : isCompleted ? 'nm-flat text-emerald-500' : 'nm-flat text-nm-text-muted opacity-50'} ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  aria-label={`Étape ${step.id}: ${step.label}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? 'bg-nm-accent text-white' : 'bg-nm-bg'}`}>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : step.id}
                  </div>
                  <span className="hidden sm:block font-medium">{step.label}</span>
                  <Icon className="w-4 h-4 sm:hidden" />
                </button>

                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-4">
                    <div className="h-1 bg-nm-shadow/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-nm-accent to-emerald-500 transition-all" style={{ width: isCompleted ? '100%' : '0%' }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={goToPrevStep} disabled={currentStep === 1} className={`nm-button px-4 py-2 flex items-center gap-2 text-sm ${currentStep === 1 ? 'opacity-50' : ''}`}>
            <ChevronLeft className="w-4 h-4" /> Précédent
          </button>
          <span className="text-sm text-nm-text-muted">Étape {currentStep} sur 4</span>
          <button onClick={goToNextStep} disabled={currentStep === 4} className={`nm-button px-4 py-2 flex items-center gap-2 text-sm ${currentStep === 4 ? 'opacity-50' : ''}`}>
            Suivant <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
