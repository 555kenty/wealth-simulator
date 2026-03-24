"use client";

import { cn } from "@/lib/utils";

export interface AllocationSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  color?: string;
  className?: string;
}

export function AllocationSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  label,
  color = "bg-blue-500",
  className,
}: AllocationSliderProps) {
  const percentage = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-white/80">{label}</label>
        <span className="text-sm font-bold tabular-nums text-white">
          {percentage}%
        </span>
      </div>
      
      <div className="relative h-6 flex items-center">
        {/* Track with neumorphic inset */}
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-slate-800/50",
            "shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.05)]"
          )}
        />
        
        {/* Progress fill */}
        <div
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full transition-all duration-150",
            color
          )}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Input range */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
            "z-10"
          )}
        />
        
        {/* Thumb with neumorphic flat */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full",
            "bg-slate-700",
            "shadow-[2px_2px_4px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(255,255,255,0.1)]",
            "border border-white/10",
            "transition-transform duration-150",
            "pointer-events-none z-20"
          )}
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    </div>
  );
}
