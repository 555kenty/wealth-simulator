"use client";

import {
  Building2,
  TrendingUp,
  Bitcoin,
  CircleDollarSign,
  Landmark,
  Wallet,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AssetType =
  | "realEstate"
  | "stocks"
  | "crypto"
  | "gold"
  | "bonds"
  | "cash";

interface AssetConfig {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  label: string;
}

const assetConfigs: Record<AssetType, AssetConfig> = {
  realEstate: {
    icon: Building2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    label: "Immobilier",
  },
  stocks: {
    icon: TrendingUp,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    label: "Actions",
  },
  crypto: {
    icon: Bitcoin,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    label: "Crypto",
  },
  gold: {
    icon: CircleDollarSign,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    label: "Or",
  },
  bonds: {
    icon: Landmark,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    label: "Obligations",
  },
  cash: {
    icon: Wallet,
    color: "text-slate-400",
    bgColor: "bg-slate-400/10",
    label: "Liquidités",
  },
};

export interface AssetIconProps {
  type: AssetType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    container: "w-8 h-8",
    icon: "w-4 h-4",
  },
  md: {
    container: "w-10 h-10",
    icon: "w-5 h-5",
  },
  lg: {
    container: "w-12 h-12",
    icon: "w-6 h-6",
  },
};

export function AssetIcon({
  type,
  size = "md",
  showLabel = false,
  className,
}: AssetIconProps) {
  const config = assetConfigs[type];
  const Icon = config.icon;
  const sizes = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl",
          sizes.container,
          config.bgColor,
          "border border-white/5"
        )}
      >
        <Icon className={cn(sizes.icon, config.color)} />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-white/80">{config.label}</span>
      )}
    </div>
  );
}

// Helper to get asset color for charts etc.
export function getAssetColor(type: AssetType): string {
  const colors: Record<AssetType, string> = {
    realEstate: "#34d399",
    stocks: "#60a5fa",
    crypto: "#c084fc",
    gold: "#facc15",
    bonds: "#22d3ee",
    cash: "#94a3b8",
  };
  return colors[type];
}

// Helper to get asset label
export function getAssetLabel(type: AssetType): string {
  return assetConfigs[type].label;
}

// Export all asset types for iteration
export const ASSET_TYPES: AssetType[] = [
  "realEstate",
  "stocks",
  "crypto",
  "gold",
  "bonds",
  "cash",
];
