"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface Step {
  id: string;
  label: string;
  description?: string;
}

export interface ProgressStepProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function ProgressStep({
  steps,
  currentStep,
  className,
}: ProgressStepProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-start justify-between relative">
        {/* Connection line background */}
        <div
          className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 -z-10"
          style={{
            marginLeft: `${100 / (steps.length * 2)}%`,
            marginRight: `${100 / (steps.length * 2)}%`,
          }}
        />

        {/* Active connection line */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-blue-500 -z-10 transition-all duration-500"
          style={{
            marginLeft: `${100 / (steps.length * 2)}%`,
            width:
              currentStep > 0
                ? `calc(${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * (100 - 100 / steps.length)}%)`
                : "0%",
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center gap-2 flex-1"
            >
              {/* Step circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "text-sm font-bold transition-all duration-300",
                  "border-2",
                  isCompleted && [
                    "bg-blue-500 border-blue-500 text-white",
                    "shadow-lg shadow-blue-500/30",
                  ],
                  isCurrent && [
                    "bg-slate-800 border-blue-500 text-blue-400",
                    "shadow-lg shadow-blue-500/20",
                    "ring-4 ring-blue-500/10",
                  ],
                  isPending && [
                    "bg-slate-800/50 border-white/20 text-white/40",
                  ]
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step label */}
              <div className="text-center">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isCompleted && "text-blue-400",
                    isCurrent && "text-white",
                    isPending && "text-white/40"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p
                    className={cn(
                      "text-xs mt-0.5 transition-colors duration-300",
                      isCompleted && "text-blue-400/60",
                      isCurrent && "text-white/60",
                      isPending && "text-white/30"
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
