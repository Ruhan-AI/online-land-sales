"use client";

import React from "react";
import { RotateCcw, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface FilterState {
  state: string;
  minPrice: string;
  maxPrice: string;
  maxMonthly: string;
  minAcres: string;
  maxAcres: string;
  use: string;
  roadAccess: string;
  hasPower: boolean;
  has360: boolean;
  status: string;
}

interface PropertyFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
  /** Drops the card chrome so the panel can sit flush inside the mobile drawer. */
  bare?: boolean;
}

export function PropertyFilters({
  filters,
  onChange,
  onReset,
  totalCount,
  bare = false,
}: PropertyFiltersProps) {
  const update = (key: keyof FilterState, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.state !== "all" ||
    filters.maxMonthly !== "" ||
    filters.minAcres !== "" ||
    filters.maxPrice !== "" ||
    filters.use !== "all" ||
    filters.roadAccess !== "all" ||
    filters.hasPower ||
    filters.has360;

  return (
    <div
      className={
        bare
          ? "space-y-6"
          : "bg-white border border-brand-border rounded-card p-5 space-y-6 shadow-soft"
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2 font-bold text-brand-ink text-sm min-w-0">
          <Filter className="w-4 h-4 text-brand-blue shrink-0" />
          <span>Filters</span>
          <span className="text-xs bg-brand-sand px-2 py-0.5 rounded-full text-brand-ink font-semibold whitespace-nowrap">
            {totalCount} {totalCount === 1 ? "Lot" : "Lots"}
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-brand-clay hover:underline flex items-center gap-1 font-semibold shrink-0"
          >
            <RotateCcw className="w-3 h-3 shrink-0" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* State Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-ink uppercase tracking-wider">
          State / Location
        </label>
        <select
          value={filters.state}
          onChange={(e) => update("state", e.target.value)}
          className="w-full text-xs font-semibold bg-brand-sand-light border border-brand-border rounded-xl p-2.5 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option value="all">All States</option>
          <option value="Arizona">Arizona (Mohave, Apache)</option>
          <option value="Colorado">Colorado (Costilla)</option>
          <option value="Texas">Texas (Presidio)</option>
          <option value="Florida">Florida (Putnam)</option>
          <option value="Nevada">Nevada (Elko)</option>
        </select>
      </div>

      {/* Monthly Budget */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-ink uppercase tracking-wider">
          Max Monthly Payment
        </label>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-xs font-medium">
          {[
            { label: "Any", value: "" },
            { label: "< $175", value: "175" },
            { label: "< $250", value: "250" },
            { label: "< $350", value: "350" },
            { label: "< $500", value: "500" },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => update("maxMonthly", btn.value)}
              className={`py-2.5 px-2 rounded-lg border transition-all ${
                filters.maxMonthly === btn.value
                  ? "bg-brand-forest text-white border-brand-forest font-bold shadow-sm"
                  : "bg-brand-sand-light hover:bg-brand-sand text-slate-700 border-brand-border"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Acreage Range */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-ink uppercase tracking-wider">
          Acreage
        </label>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs font-medium">
          {[
            { label: "All Sizes", min: "", max: "" },
            { label: "Under 1 Acre", min: "", max: "1" },
            { label: "1 – 5 Acres", min: "1", max: "5" },
            { label: "5+ Acres", min: "5", max: "" },
          ].map((btn, idx) => {
            const isSelected = filters.minAcres === btn.min && filters.maxAcres === btn.max;
            return (
              <button
                key={idx}
                onClick={() => {
                  update("minAcres", btn.min);
                  update("maxAcres", btn.max);
                }}
                className={`py-2.5 px-2 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-brand-ink text-white border-brand-ink font-bold shadow-sm"
                    : "bg-brand-sand-light hover:bg-brand-sand text-slate-700 border-brand-border"
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Intended Use */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-ink uppercase tracking-wider">
          Intended Use
        </label>
        <select
          value={filters.use}
          onChange={(e) => update("use", e.target.value)}
          className="w-full text-xs font-semibold bg-brand-sand-light border border-brand-border rounded-xl p-2.5 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option value="all">Any Goal / Use</option>
          <option value="homestead">🏡 Off-Grid Homesteading</option>
          <option value="camping_rv">🏕️ Camping & RV Living</option>
          <option value="investment">📈 Long-Term Investment</option>
          <option value="build_later">🔨 Build Later / Cabin</option>
        </select>
      </div>

      {/* Road Access */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-ink uppercase tracking-wider">
          Road Access
        </label>
        <select
          value={filters.roadAccess}
          onChange={(e) => update("roadAccess", e.target.value)}
          className="w-full text-xs font-semibold bg-brand-sand-light border border-brand-border rounded-xl p-2.5 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option value="all">Any Road Surface</option>
          <option value="paved">Paved Road Frontage</option>
          <option value="gravel">Maintained Gravel</option>
          <option value="dirt">Dirt Road (2WD Accessible)</option>
        </select>
      </div>

      {/* Special Feature Toggles */}
      <div className="space-y-3 pt-3 border-t border-brand-border">
        {/* 360 Available */}
        <label className="flex items-center justify-between gap-3 cursor-pointer select-none py-1.5">
          <span className="flex items-center gap-2 text-xs font-bold text-brand-ink">
            <Sparkles className="w-3.5 h-3.5 text-brand-forest" />
            <span>360° Virtual Tour Only</span>
          </span>
          <input
            type="checkbox"
            checked={filters.has360}
            onChange={(e) => update("has360", e.target.checked)}
            className="w-5 h-5 shrink-0 rounded border-slate-300 text-brand-forest focus:ring-brand-forest"
          />
        </label>

        {/* Power at Street */}
        <label className="flex items-center justify-between gap-3 cursor-pointer select-none py-1.5">
          <span className="text-xs font-bold text-brand-ink">
            Power Lines at Street
          </span>
          <input
            type="checkbox"
            checked={filters.hasPower}
            onChange={(e) => update("hasPower", e.target.checked)}
            className="w-5 h-5 shrink-0 rounded border-slate-300 text-brand-forest focus:ring-brand-forest"
          />
        </label>
      </div>
    </div>
  );
}
