"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = "xl",
  children,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full bg-white rounded-modal shadow-2xl border border-brand-border z-10 overflow-hidden my-auto max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col animate-in fade-in zoom-in-95 duration-200",
          maxWidthClasses[maxWidth]
        )}
      >
        {(title || subtitle) && (
          <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-brand-border bg-brand-sand-light/50 shrink-0">
            <div className="min-w-0">
              {title && (
                <h3 className="text-lg sm:text-xl font-bold text-brand-ink">{title}</h3>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-brand-muted mt-1">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="flex items-center justify-center w-10 h-10 -mt-1 -mr-1 shrink-0 text-slate-400 hover:text-brand-ink rounded-lg hover:bg-brand-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>
  );
}
