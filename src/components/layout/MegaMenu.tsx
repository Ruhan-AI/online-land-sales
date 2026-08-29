"use client";

import React from "react";
import Link from "next/link";
import { MapPin, DollarSign, Mountain, Compass, Sparkles, ArrowRight } from "lucide-react";
import { BROWSABLE_USES, UseIcon, useLabel } from "@/lib/useIcons";
import { STATES_IN_INVENTORY } from "@/lib/data/properties";

interface MegaMenuProps {
  onClose: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div
      className="absolute top-full left-0 w-full bg-white border-b border-brand-border shadow-2xl py-8 px-6 z-40 animate-in fade-in-50 slide-in-from-top-2 duration-200 max-h-[calc(100dvh-9rem)] overflow-y-auto"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
        {/* Column 1: By State */}
        <div>
          <div className="flex items-center gap-2 text-brand-ink font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-border">
            <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
            <span>Browse by State</span>
          </div>
          <ul className="space-y-1 text-sm">
            {STATES_IN_INVENTORY.slice(0, 6).map(({ state, count }) => (
              <li key={state}>
                <Link
                  href={`/land?state=${encodeURIComponent(state)}`}
                  onClick={onClose}
                  className="flex items-center justify-between gap-2 py-2 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
                >
                  <span>{state}</span>
                  <span className="text-xs text-brand-muted">{count} lots</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: By Monthly Payment */}
        <div>
          <div className="flex items-center gap-2 text-brand-ink font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-border">
            <DollarSign className="w-4 h-4 shrink-0 text-slate-400" />
            <span>By Monthly Payment</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/land?maxMonthly=150"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>Under $150 / Month</span>
                <span className="text-xs text-brand-muted">Lowest</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?maxMonthly=250"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>$150 – $250 / Month</span>
                <span className="text-xs text-brand-muted">Mid range</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?maxMonthly=400"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>$250 – $400 / Month</span>
                <span className="text-xs text-brand-muted">Larger lots</span>
              </Link>
            </li>
            <li>
              <Link
                href="/financing"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-2 pt-2 px-2"
              >
                <span>Payment calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: By Acreage & Use */}
        <div>
          <div className="flex items-center gap-2 text-brand-ink font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-border">
            <Mountain className="w-4 h-4 shrink-0 text-slate-400" />
            <span>Shop by Goal</span>
          </div>
          <ul className="space-y-1 text-sm">
            {BROWSABLE_USES.map((use) => (
              <li key={use}>
                <Link
                  href={`/land?use=${use}`}
                  onClick={onClose}
                  className="group flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
                >
                  <UseIcon
                    use={use}
                    className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-brand-blue transition-colors"
                  />
                  <span>{useLabel(use)}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/land?has360=true"
                onClick={onClose}
                className="group flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-brand-sand transition-colors text-brand-forest font-semibold"
              >
                <Sparkles className="w-4 h-4 shrink-0 text-brand-forest" />
                <span>Parcels with a 360° tour</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Featured Promo Card */}
        <div className="bg-gradient-to-br from-brand-sand to-brand-sand-light p-5 rounded-2xl border border-brand-border flex flex-col justify-between">
          <div>
            <Compass className="w-5 h-5 text-brand-forest mb-2" />
            <h4 className="font-bold text-brand-ink text-base">
              See every parcel on the map
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Terrain and satellite views, with the monthly payment on each pin.
            </p>
          </div>
          <Link
            href="/map"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 bg-brand-ink text-white text-xs font-semibold py-2.5 px-4 rounded-xl hover:bg-brand-charcoal transition-colors mt-4"
          >
            <span>Open the map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
