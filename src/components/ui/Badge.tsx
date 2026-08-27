import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "forest" | "blue" | "sand" | "clay" | "slate" | "amber";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Badge({
  variant = "blue",
  size = "md",
  className,
  children,
  icon,
}: BadgeProps) {
  const variantStyles = {
    forest: "bg-brand-forest-light text-brand-forest border-brand-forest/20",
    blue: "bg-brand-blue-light text-brand-blue-dark border-brand-blue/20",
    sand: "bg-brand-sand text-brand-ink border-brand-ink/10",
    clay: "bg-brand-clay-light text-brand-clay border-brand-clay/30 font-semibold",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border shrink-0 tracking-tight",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
