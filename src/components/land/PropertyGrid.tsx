"use client";

import React, { useState } from "react";
import { LandProperty } from "@/types/land";
import { PropertyCard } from "./PropertyCard";
import { PropertyMap } from "./PropertyMap";
import { LayoutGrid, List, Map as MapIcon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PropertyGridProps {
  properties: LandProperty[];
  onResetFilters?: () => void;
}

export function PropertyGrid({ properties, onResetFilters }: PropertyGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "split" | "map">("grid");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>();

  // Sort logic
  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":
        return a.cashPrice - b.cashPrice;
      case "price_desc":
        return b.cashPrice - a.cashPrice;
      case "monthly_asc":
        return a.defaultPlan.monthlyPayment - b.defaultPlan.monthlyPayment;
      case "acres_desc":
        return b.acres - a.acres;
      case "acres_asc":
        return a.acres - b.acres;
      default:
        return (a.featuredPriority || 99) - (b.featuredPriority || 99);
    }
  });

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-brand-border shadow-soft">
        <div className="text-sm font-semibold text-brand-ink">
          Showing <span className="font-extrabold text-brand-forest">{properties.length}</span>{" "}
          Available Parcels
        </div>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs flex-1 min-w-0">
            <span className="text-slate-500 font-bold hidden lg:inline shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort properties"
              className="w-full sm:w-auto min-w-0 bg-brand-sand-light border border-brand-border rounded-xl px-3 py-2 text-xs font-semibold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="recommended">Recommended / Featured</option>
              <option value="monthly_asc">Lowest Monthly Payment</option>
              <option value="price_asc">Lowest Total Price</option>
              <option value="acres_desc">Largest Acreage</option>
              <option value="acres_asc">Smallest Acreage</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-brand-sand rounded-xl border border-brand-border shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-white text-brand-ink shadow-sm" : "text-slate-600 hover:text-brand-ink"
              }`}
              title="Grid View"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                viewMode === "split" ? "bg-white text-brand-ink shadow-sm" : "text-slate-600 hover:text-brand-ink"
              }`}
              title="Split List & Map View"
              aria-label="Split list and map view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                viewMode === "map" ? "bg-white text-brand-ink shadow-sm" : "text-slate-600 hover:text-brand-ink"
              }`}
              title="Full Map View"
              aria-label="Full map view"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Map Render */}
      {sortedProperties.length === 0 ? (
        <div className="bg-white border border-brand-border rounded-card p-8 sm:p-12 text-center space-y-4 shadow-soft">
          <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center mx-auto text-brand-muted">
            <RotateCcw className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-brand-ink">No matching parcels found</h4>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Try adjusting your state, budget, or acreage filters to see more available land parcels.
          </p>
          {onResetFilters && (
            <Button variant="primary" size="md" onClick={onResetFilters}>
              Reset All Filters
            </Button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {sortedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} layout="grid" />
          ))}
        </div>
      ) : viewMode === "split" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* List Column */}
          <div className="lg:col-span-6 space-y-4 lg:max-h-[900px] lg:overflow-y-auto lg:pr-2">
            {sortedProperties.map((property) => (
              <div
                key={property.id}
                onMouseEnter={() => setSelectedPropertyId(property.id)}
              >
                <PropertyCard property={property} layout="list" />
              </div>
            ))}
          </div>
          {/* Map Column */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 h-[360px] sm:h-[520px] lg:h-[800px] rounded-card overflow-hidden">
            <PropertyMap
              properties={sortedProperties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={(prop) => setSelectedPropertyId(prop.id)}
              className="h-full w-full"
            />
          </div>
        </div>
      ) : (
        // Full Map View
        <div className="h-[420px] sm:h-[560px] lg:h-[750px] rounded-card overflow-hidden">
          <PropertyMap
            properties={sortedProperties}
            selectedPropertyId={selectedPropertyId}
            onSelectProperty={(prop) => setSelectedPropertyId(prop.id)}
            className="h-full w-full"
          />
        </div>
      )}
    </div>
  );
}
