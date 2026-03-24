"use client";

import { cn } from "@/lib/utils";
import { Share2, Check, Link2 } from "lucide-react";
import { useState, useCallback } from "react";

export interface ShareButtonProps {
  url: string;
  className?: string;
  label?: string;
  toastDuration?: number;
}

export function ShareButton({
  url,
  className,
  label = "Partager",
  toastDuration = 2000,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setShowToast(true);

      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, toastDuration);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setShowToast(true);
        setTimeout(() => {
          setCopied(false);
          setShowToast(false);
        }, toastDuration);
      } catch (e) {
        console.error("Fallback copy failed:", e);
      }
      document.body.removeChild(textArea);
    }
  }, [url, toastDuration]);

  return (
    <>
      <button
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl",
          "bg-white/5 border border-white/10",
          "text-white/70 text-sm font-medium",
          "transition-all duration-200",
          "hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30",
          "hover:shadow-lg hover:shadow-blue-500/10",
          "active:scale-95",
          className
        )}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-green-400">Copié !</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span>{label}</span>
          </>
        )}
      </button>

      {/* Toast Notification */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
          "flex items-center gap-3 px-4 py-3 rounded-xl",
          "bg-slate-900 border border-white/10 shadow-xl",
          "transition-all duration-300",
          showToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Lien copié !</p>
          <p className="text-xs text-white/50">Le lien a été copié dans votre presse-papier</p>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5">
          <Link2 className="w-3 h-3 text-white/40" />
          <span className="text-xs text-white/60 truncate max-w-[150px]">
            {url.replace(/^https?:\/\//, "").substring(0, 25)}
            {url.length > 25 && "..."}
          </span>
        </div>
      </div>
    </>
  );
}
