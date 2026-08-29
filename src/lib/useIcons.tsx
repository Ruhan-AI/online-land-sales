import React from "react";
import { Home, Tent, TrendingUp, Hammer, Trees, Compass } from "lucide-react";
import type { IntendedUse } from "@/types/land";

/**
 * One icon per intended use, shared by the mega menu, filters and cards so the
 * same option never shows a different glyph in two places.
 *
 * Lucide only — no emoji. Emoji render in the OS font, which means a different
 * shape, weight and colour on every platform and never matches the rest of the UI.
 */
const USE_ICONS: Record<IntendedUse, React.ComponentType<{ className?: string }>> = {
  homestead: Home,
  off_grid: Trees,
  camping_rv: Tent,
  recreation: Compass,
  investment: TrendingUp,
  build_later: Hammer,
  mobile_home: Home,
  tiny_home: Home,
};

const USE_LABELS: Record<IntendedUse, string> = {
  homestead: "Off-grid homesteading",
  off_grid: "Off-grid living",
  camping_rv: "Camping & RV",
  recreation: "Recreation",
  investment: "Long-term investment",
  build_later: "Build later / cabin",
  mobile_home: "Mobile home",
  tiny_home: "Tiny home",
};

export function useIcon(use: IntendedUse) {
  return USE_ICONS[use] ?? Compass;
}

export function useLabel(use: IntendedUse) {
  return USE_LABELS[use] ?? use;
}

/** Renders the icon for an intended use at a consistent size. */
export function UseIcon({
  use,
  className = "w-4 h-4 shrink-0",
}: {
  use: IntendedUse;
  className?: string;
}) {
  const Icon = useIcon(use);
  return <Icon className={className} />;
}

/** The uses we surface in navigation and filters, in a deliberate order. */
export const BROWSABLE_USES: IntendedUse[] = [
  "homestead",
  "camping_rv",
  "investment",
  "build_later",
];
