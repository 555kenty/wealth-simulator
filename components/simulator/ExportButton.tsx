"use client";

import { cn } from "@/lib/utils";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";

export interface ExportButtonProps {
  onExport: (format: "pdf" | "csv") => void | Promise<void>;
  format: "pdf" | "csv";
  className?: string;
  label?: string;
}

export function ExportButton({
  onExport,
  format,
  className,
  label,
}: ExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onExport(format);
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = format === "pdf" ? FileText : FileSpreadsheet;
  const buttonLabel = label || (format === "pdf" ? "Exporter PDF" : "Exporter CSV");
  const colors =
    format === "pdf"
      ? "hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
      : "hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30";

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl",
        "bg-white/5 border border-white/10",
        "text-white/70 text-sm font-medium",
        "transition-all duration-200",
        "hover:shadow-lg",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        colors,
        className
      )}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Export...</span>
        </>
      ) : (
        <>
          <Icon className="w-4 h-4" />
          <span>{buttonLabel}</span>
          <Download className="w-3.5 h-3.5 opacity-60" />
        </>
      )}
    </button>
  );
}
