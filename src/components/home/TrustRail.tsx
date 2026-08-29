import React from "react";
import Link from "next/link";
import { LayoutGrid, Map, Wallet, Compass, ArrowRight } from "lucide-react";
import {
  PROPERTIES,
  PROPERTIES_WITH_360,
  STATES_IN_INVENTORY,
} from "@/lib/data/properties";
import { formatMoney } from "@/lib/utils";

/**
 * Inventory figures, computed from the imported catalog.
 *
 * Every number is derived from the listings actually on the site, and each
 * one links to the filtered view that proves it.
 */
export function TrustRail() {
  const monthlies = PROPERTIES.map((p) => p.defaultPlan.monthlyPayment).filter(
    (m) => m > 0
  );
  const lowestMonthly = monthlies.length ? Math.min(...monthlies) : null;

  const stats = [
    {
      icon: LayoutGrid,
      value: String(PROPERTIES.length),
      label: "parcels available",
      href: "/land",
    },
    {
      icon: Map,
      value: String(STATES_IN_INVENTORY.length),
      label: "states covered",
      href: "/map",
    },
    {
      icon: Wallet,
      value: lowestMonthly != null ? formatMoney(lowestMonthly) : "—",
      suffix: lowestMonthly != null ? "/mo" : undefined,
      label: "lowest payment",
      href: "/land?maxMonthly=175",
    },
    {
      icon: Compass,
      value: String(PROPERTIES_WITH_360.length),
      label: "with a 360° tour",
      href: "/land?has360=true",
    },
  ];

  return (
    <section className="bg-brand-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pulled up so the strip straddles the hero edge and reads as one unit */}
        <div className="-mt-8 sm:-mt-10 relative z-10 rounded-2xl sm:rounded-3xl bg-white border border-brand-border shadow-card overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-brand-border/70">
            {stats.map(({ icon: Icon, value, suffix, label, href }, i) => (
              <Link
                key={i}
                href={href}
                className="group relative p-4 sm:p-5 lg:p-6 hover:bg-brand-sand-light/70 transition-colors"
              >
                <Icon
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-brand-blue mb-2 sm:mb-3"
                  strokeWidth={2}
                />

                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-brand-ink leading-none">
                    {value}
                  </span>
                  {suffix && (
                    <span className="text-sm sm:text-base font-bold text-slate-400 leading-none">
                      {suffix}
                    </span>
                  )}
                </div>

                <div className="mt-1.5 flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 leading-snug">
                  <span>{label}</span>
                  <ArrowRight className="w-3 h-3 shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-brand-blue" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
