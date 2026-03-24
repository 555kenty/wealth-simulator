"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface GlassCardProps extends React.ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        // Base glassmorphic styles
        "relative overflow-hidden rounded-2xl",
        "bg-white/5 backdrop-blur-xl",
        "border border-white/10",
        "transition-all duration-300 ease-out",
        // Hover effects
        hover && [
          "hover:-translate-y-1",
          "hover:shadow-xl hover:shadow-black/10",
          "hover:bg-white/10",
        ],
        // Glow effect
        glow && [
          "after:absolute after:inset-0",
          "after:rounded-2xl after:opacity-0",
          "after:transition-opacity after:duration-300",
          "hover:after:opacity-100",
          "after:bg-gradient-to-br after:from-white/10 after:to-transparent",
          "after:blur-xl",
        ],
        className
      )}
      {...props}
    >
      {/* Inner content with z-index to stay above glow */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
