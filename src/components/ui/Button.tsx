"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "forest" | "clay" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-brand-ink text-white hover:bg-brand-charcoal focus:ring-brand-ink shadow-sm hover:shadow-md",
    secondary:
      "bg-brand-blue text-white hover:bg-brand-blue-dark focus:ring-brand-blue shadow-sm hover:shadow-md",
    forest:
      "bg-brand-forest text-white hover:bg-brand-forest-dark focus:ring-brand-forest shadow-sm hover:shadow-md",
    clay:
      "bg-brand-clay text-white hover:bg-[#b05731] focus:ring-brand-clay shadow-sm hover:shadow-md",
    outline:
      "bg-white text-brand-ink border border-brand-border hover:bg-brand-sand/50 hover:border-slate-300 focus:ring-brand-blue",
    ghost:
      "bg-transparent text-brand-ink hover:bg-brand-sand/60 focus:ring-brand-blue",
  };

  // min-h keeps every button at a comfortable thumb target on touch screens
  const sizeStyles = {
    sm: "text-xs px-3 py-2 gap-1.5 min-h-[36px]",
    md: "text-sm px-4 py-2.5 gap-2 min-h-[44px]",
    lg: "text-sm sm:text-base px-5 sm:px-6 py-3.5 gap-2.5 font-semibold min-h-[48px]",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
