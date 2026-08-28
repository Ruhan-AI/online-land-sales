import React from "react";
import { LandProperty } from "@/types/land";
import { formatAcres, formatSqFt, formatMoney, getRoadAccessLabel } from "@/lib/utils";
import {
  MapPin,
  FileText,
  Mountain,
  Compass,
  Zap,
  Droplet,
  Home,
  Clock,
  Shield,
  DollarSign,
} from "lucide-react";

interface QuickFactsProps {
  property: LandProperty;
}

export function QuickFacts({ property }: QuickFactsProps) {
  return (
    <div className="bg-white border border-brand-border rounded-card p-5 sm:p-6 shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 pb-4 border-b border-brand-border">
        <h3 className="text-lg font-bold text-brand-ink flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-blue shrink-0" />
          <span>Quick Property Facts</span>
        </h3>
        <span className="text-xs text-brand-muted shrink-0">
          Last Verified: {property.lastVerifiedAt}
        </span>
      </div>

      {/* Grid of Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 text-xs">
        {/* APN */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            Parcel ID / APN
          </span>
          <span className="font-bold text-brand-ink text-sm font-mono break-all">{property.apn}</span>
        </div>

        {/* Acreage */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            Size & Area
          </span>
          <span className="font-bold text-brand-ink text-sm">
            {formatAcres(property.acres)} ({formatSqFt(property.acres)})
          </span>
        </div>

        {/* Location */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            County & State
          </span>
          <span className="font-bold text-brand-ink text-sm">
            {property.county}, {property.state}
          </span>
        </div>

        {/* Elevation */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            Elevation
          </span>
          <span className="font-bold text-brand-ink text-sm">
            {property.elevationFeet.toLocaleString()} Feet above sea level
          </span>
        </div>

        {/* Zoning */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1 sm:col-span-2">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            Zoning & Permitted Use
          </span>
          <span className="font-bold text-brand-ink text-sm block">{property.zoning}</span>
          <span className="text-slate-600 block text-[11px] leading-relaxed">
            {property.zoningDescription}
          </span>
        </div>

        {/* Road Access */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1 sm:col-span-2">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            Road Access & Terrain
          </span>
          <span className="font-bold text-brand-ink text-sm block">
            {getRoadAccessLabel(property.roadAccess)} • {property.terrain.replace("_", " ")}
          </span>
          <span className="text-slate-600 block text-[11px]">
            {property.roadSurfaceNotes}
          </span>
        </div>

        {/* Time to Build */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            Time Limit to Build
          </span>
          <span className="font-bold text-brand-forest text-sm">{property.timeToBuild}</span>
        </div>

        {/* Annual Taxes */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            Annual Property Taxes
          </span>
          <span className="font-bold text-brand-ink text-sm">
            {formatMoney(property.annualTaxes)} / year ({property.taxYear})
          </span>
        </div>

        {/* HOA / POA */}
        <div className="p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
            HOA / POA Dues
          </span>
          <span className="font-bold text-brand-forest text-sm">
            {property.hoaPoaFeeAnnual === 0 ? "$0 (No HOA)" : `${formatMoney(property.hoaPoaFeeAnnual)}/yr`}
          </span>
        </div>
      </div>

      {/* Utilities Verification Box */}
      <div className="border border-brand-border rounded-xl p-4 bg-brand-sand-light space-y-3">
        <h4 className="font-bold text-sm text-brand-ink flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-forest" />
          <span>Utilities & Off-Grid Verification</span>
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">Power:</span>
            <span className="font-bold text-brand-ink capitalize">
              {property.utilities.power.replace(/_/g, " ")}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Water:</span>
            <span className="font-bold text-brand-ink capitalize">
              {property.utilities.water.replace(/_/g, " ")}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Sewer:</span>
            <span className="font-bold text-brand-ink capitalize">
              {property.utilities.sewer.replace(/_/g, " ")}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Cell Signal:</span>
            <span className="font-bold text-brand-ink capitalize">
              {property.utilities.cellSignal.replace(/_/g, " ")}
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 italic border-t border-brand-border/60 pt-2">
          {property.utilities.notes}
        </p>
      </div>
    </div>
  );
}
