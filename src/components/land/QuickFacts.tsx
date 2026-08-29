import React from "react";
import { LandProperty } from "@/types/land";
import { formatAcres, formatSqFt, formatMoney, getRoadAccessLabel } from "@/lib/utils";
import { FileText, Zap, ExternalLink } from "lucide-react";

interface QuickFactsProps {
  property: LandProperty;
}

interface Fact {
  label: string;
  value: React.ReactNode;
  hint?: string;
  wide?: boolean;
}

/**
 * Renders only the attributes the seller actually publishes for this parcel.
 * Anything missing from the source listing is omitted entirely rather than
 * shown as an empty or invented value.
 */
export function QuickFacts({ property }: QuickFactsProps) {
  const facts: Fact[] = [];

  if (property.apn) {
    facts.push({
      label: "Parcel Number (APN)",
      value: <span className="font-mono break-all">{property.apn}</span>,
    });
  } else if (property.parcelRef) {
    facts.push({
      label: "Seller Parcel Ref",
      value: <span className="font-mono break-all">{property.parcelRef}</span>,
      hint: "Seller's own reference, not a county APN",
    });
  }

  if (property.acres != null) {
    facts.push({
      label: "Size & Area",
      value: `${formatAcres(property.acres)} (${formatSqFt(property.acres)})`,
    });
  }

  facts.push({
    label: "County & State",
    value: `${property.county}, ${property.state}`,
  });

  if (property.nearestTown) {
    facts.push({ label: "Nearest Town", value: property.nearestTown });
  }

  if (property.zoning) {
    facts.push({ label: "Zoning", value: property.zoning });
  }

  if (property.annualTaxes != null) {
    facts.push({
      label: "Annual Property Taxes",
      value: `${formatMoney(property.annualTaxes)} / year`,
    });
  }

  if (property.roadSurfaceNotes || property.roadAccess) {
    facts.push({
      label: "Road Access",
      value: property.roadSurfaceNotes || getRoadAccessLabel(property.roadAccess),
      wide: true,
    });
  }

  if (property.coordinates) {
    const { lat, lng } = property.coordinates;
    facts.push({
      label: "GPS Coordinates",
      value: (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-brand-blue hover:underline"
        >
          {lat.toFixed(6)}, {lng.toFixed(6)}
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      ),
      wide: true,
    });
  }

  if (property.legalDescription) {
    facts.push({
      label: "Legal Description",
      value: (
        <span className="font-normal text-slate-600 text-[11px] leading-relaxed block">
          {property.legalDescription}
        </span>
      ),
      wide: true,
    });
  }

  const utilitySummary = property.utilities?.summary;

  return (
    <div className="bg-white border border-brand-border rounded-card p-5 sm:p-6 shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 pb-4 border-b border-brand-border">
        <h3 className="text-lg font-bold text-brand-ink flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-blue shrink-0" />
          <span>Parcel Facts</span>
        </h3>
        {property.lastVerifiedAt && (
          <span className="text-xs text-brand-muted shrink-0">
            Listing updated: {property.lastVerifiedAt}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 text-xs">
        {facts.map((f, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl bg-brand-canvas border border-brand-border space-y-1 ${
              f.wide ? "sm:col-span-2" : ""
            }`}
          >
            <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
              {f.label}
            </span>
            <span className="font-bold text-brand-ink text-sm block">{f.value}</span>
            {f.hint && (
              <span className="text-slate-500 block text-[10px]">{f.hint}</span>
            )}
          </div>
        ))}
      </div>

      {/* Utilities — the seller's own line, quoted verbatim */}
      {utilitySummary && (
        <div className="border border-brand-border rounded-xl p-4 bg-brand-sand-light space-y-2">
          <h4 className="font-bold text-sm text-brand-ink flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-forest shrink-0" />
            <span>Utilities</span>
          </h4>
          <p className="text-xs text-slate-700">{utilitySummary}</p>
          <p className="text-[11px] text-slate-500 italic border-t border-brand-border/60 pt-2">
            Utility availability and connection costs should be confirmed with the
            county and local providers before purchase.
          </p>
        </div>
      )}
    </div>
  );
}
