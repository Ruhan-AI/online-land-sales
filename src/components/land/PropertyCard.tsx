"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, MapPin, Zap, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { LandProperty } from "@/types/land";
import { formatMoney, formatAcres, getStatusBadge, getRoadAccessLabel, getUtilitySummary, imageOf } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";

interface PropertyCardProps {
  property: LandProperty;
  layout?: "grid" | "list";
}

export function PropertyCard({ property, layout = "grid" }: PropertyCardProps) {
  const { isPropertySaved, toggleSavedProperty, toggleCompareProperty, comparePropertyIds } = useStore();
  const isSaved = isPropertySaved(property.id);
  const isComparing = comparePropertyIds.includes(property.id);
  const statusBadge = getStatusBadge(property.status);
  const utilities = getUtilitySummary(property.utilities);

  return (
    <div
      className={`group relative bg-white border border-brand-border rounded-card overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 flex ${
        layout === "list" ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      {/* Media Box */}
      <div
        className={`relative overflow-hidden shrink-0 bg-slate-100 ${
          layout === "list" ? "w-full md:w-80 h-56 md:h-auto" : "w-full aspect-[4/3]"
        }`}
      >
        <Image
          src={imageOf(property.primaryImage)}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges — capped so they never crowd out the save button */}
        <div className="absolute top-3 left-3 right-14 flex flex-wrap items-center gap-1.5 z-10">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${statusBadge.bg} ${statusBadge.color}`}
          >
            {statusBadge.label}
          </span>

          {property.hasStreetView && (
            <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-brand-ink/80 text-white border border-white/20 shadow-sm backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>360° Tour</span>
            </span>
          )}
        </div>

        {/* Top Right Save Button */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSavedProperty(property.id);
            }}
            className={`flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border shadow-sm transition-transform active:scale-90 ${
              isSaved
                ? "bg-brand-clay text-white border-brand-clay"
                : "bg-white/85 text-slate-700 hover:text-brand-clay hover:bg-white border-white/40"
            }`}
            title={isSaved ? "Remove from saved" : "Save property"}
            aria-label="Save Property"
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Bottom Left Acreage Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-brand-ink/90 text-white shadow-md backdrop-blur-md border border-white/20">
            {formatAcres(property.acres)}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location & APN */}
          <div className="flex items-center justify-between gap-2 text-xs text-brand-muted mb-1">
            <span className="flex items-center gap-1 font-semibold text-brand-blue-dark truncate min-w-0">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-brand-blue" />
              <span className="truncate">{property.county}, {property.stateCode}</span>
            </span>
            {property.acres != null && (
              <span className="hidden xs:block text-[11px] text-slate-400 font-mono shrink-0">
                {formatAcres(property.acres)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-brand-ink group-hover:text-brand-blue transition-colors line-clamp-1">
            <Link href={`/products/${property.handle}`}>
              {property.title}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
            {property.shortSummary}
          </p>

          {/* Key Characteristic Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-sand text-brand-ink">
              {getRoadAccessLabel(property.roadAccess)}
            </span>
            {utilities.slice(0, 2).map((u, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-sand-light text-slate-700 border border-brand-border"
              >
                {u}
              </span>
            ))}
          </div>
        </div>

        {/* Financial Summary & Action */}
        <div className="pt-3 border-t border-brand-border">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
            {/* Owner-financed monthly payment */}
            {property.defaultPlan.monthlyPayment > 0 ? (
              <div className="bg-brand-forest-light/60 p-2.5 rounded-xl border border-brand-forest/20">
                <span className="block text-[10px] uppercase font-bold text-brand-forest tracking-wider">
                  Owner Financed
                </span>
                <span className="text-base font-extrabold text-brand-forest tracking-tight">
                  {formatMoney(property.defaultPlan.monthlyPayment)}
                  <span className="text-xs font-normal text-slate-600">/mo</span>
                </span>
                <span className="block text-[10px] text-slate-500 mt-0.5">
                  {property.defaultPlan.isFullPayment
                    ? `${formatMoney(property.defaultPlan.amountDueToday)} at checkout`
                    : property.defaultPlan.downPayment > 0
                      ? `${formatMoney(property.defaultPlan.downPayment)} down`
                      : "$0 down"}
                </span>
              </div>
            ) : (
              <div className="bg-brand-sand-light p-2.5 rounded-xl border border-brand-border">
                <span className="block text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                  Cash Only
                </span>
                <span className="text-base font-extrabold text-brand-ink tracking-tight">
                  {formatMoney(property.cashPrice)}
                </span>
              </div>
            )}

            {/* Seller's stated total property price */}
            {property.cashPrice != null && property.defaultPlan.monthlyPayment > 0 && (
              <div className="bg-brand-sand-light p-2.5 rounded-xl border border-brand-border">
                <span className="block text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                  Property Price
                </span>
                <span className="text-base font-extrabold text-brand-ink tracking-tight">
                  {formatMoney(property.cashPrice)}
                </span>
                {property.defaultPlan.termMonths ? (
                  <span className="block text-[10px] text-slate-500 mt-0.5">
                    over {property.defaultPlan.termMonths} months
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`/products/${property.handle}`}
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 bg-brand-ink hover:bg-brand-charcoal text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all group-hover:bg-brand-forest"
            >
              <span>View Property</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>

            <button
              onClick={() => toggleCompareProperty(property.id)}
              className={`py-3 px-3 shrink-0 rounded-xl border text-xs font-semibold transition-colors ${
                isComparing
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-slate-600 hover:bg-brand-sand border-brand-border"
              }`}
              title="Compare property"
            >
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
