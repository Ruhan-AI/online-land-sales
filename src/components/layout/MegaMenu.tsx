"use client";

import React from "react";
import Link from "next/link";
import { MapPin, DollarSign, Mountain, Compass, Sparkles, ArrowRight } from "lucide-react";

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
            <MapPin className="w-4 h-4 text-brand-blue" />
            <span>Browse by State</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/land?state=Arizona"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>Arizona Land</span>
                <span className="text-xs text-brand-muted">Mohave, Apache, Cochise</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?state=Colorado"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>Colorado Mountain Lots</span>
                <span className="text-xs text-brand-muted">Costilla, Park</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?state=Texas"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>Texas Acreage</span>
                <span className="text-xs text-brand-muted">Presidio, Culberson</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?state=Florida"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>Florida Lake Country</span>
                <span className="text-xs text-brand-muted">Putnam, Citrus</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?state=Nevada"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>Nevada Ranches</span>
                <span className="text-xs text-brand-muted">Elko County</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: By Monthly Payment */}
        <div>
          <div className="flex items-center gap-2 text-brand-ink font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-border">
            <DollarSign className="w-4 h-4 text-brand-forest" />
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
                <span className="text-xs font-semibold text-brand-forest">Super Affordable</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?maxMonthly=250"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>$150 – $250 / Month</span>
                <span className="text-xs text-brand-muted">Most Popular</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?maxMonthly=400"
                onClick={onClose}
                className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>$250 – $400 / Month</span>
                <span className="text-xs text-brand-muted">Larger Acreage</span>
              </Link>
            </li>
            <li>
              <Link
                href="/financing"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-2 pt-2 px-2"
              >
                <span>Calculate Your Custom Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: By Acreage & Use */}
        <div>
          <div className="flex items-center gap-2 text-brand-ink font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-border">
            <Mountain className="w-4 h-4 text-brand-clay" />
            <span>Shop by Goal</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/land?use=homestead"
                onClick={onClose}
                className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>🏡 Off-Grid Homesteading</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?use=camping_rv"
                onClick={onClose}
                className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>🏕️ Camping & RV Escapes</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?use=investment"
                onClick={onClose}
                className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-slate-700 font-medium"
              >
                <span>📈 Long-Term Land Investment</span>
              </Link>
            </li>
            <li>
              <Link
                href="/land?has360=true"
                onClick={onClose}
                className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-brand-sand transition-colors text-brand-forest font-semibold"
              >
                <Sparkles className="w-4 h-4 text-brand-forest" />
                <span>360° Virtual Tour Parcels</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Featured Promo Card */}
        <div className="bg-gradient-to-br from-brand-sand to-brand-sand-light p-5 rounded-2xl border border-brand-border flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-brand-forest text-white px-2 py-0.5 rounded-full mb-2">
              <Compass className="w-3 h-3" />
              <span>Interactive Map</span>
            </div>
            <h4 className="font-bold text-brand-ink text-base">Explore the Live Land Map</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Pinpoint parcels across America with satellite topography, boundary lines, and instant price badges.
            </p>
          </div>
          <Link
            href="/map"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 bg-brand-ink text-white text-xs font-semibold py-2.5 px-4 rounded-xl hover:bg-brand-charcoal transition-colors mt-4"
          >
            <span>Open Map Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
