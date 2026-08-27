"use client";

import React, { useState } from "react";
import { PROPERTIES } from "@/lib/data/properties";
import { PropertyMap } from "@/components/land/PropertyMap";
import { Compass, Sparkles, Filter, MapPin } from "lucide-react";
import { LandProperty } from "@/types/land";

export default function MapExplorerPage() {
  const [selectedState, setSelectedState] = useState<string>("all");
  const [has360Only, setHas360Only] = useState<boolean>(false);

  const filteredProperties = PROPERTIES.filter((p) => {
    if (selectedState !== "all" && p.state.toLowerCase() !== selectedState.toLowerCase()) {
      return false;
    }
    if (has360Only && !p.panorama) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-brand-canvas min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight font-sans flex items-center gap-2">
              <Compass className="w-6 h-6 text-brand-forest" />
              <span>Interactive Land Map Explorer</span>
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Click on any pin to inspect parcels, satellite topography, boundary lines, and monthly payment options.
            </p>
          </div>

          {/* Quick Filter Bar */}
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-brand-border shadow-soft text-xs font-bold">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-brand-sand-light border border-brand-border rounded-xl px-3 py-1.5 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="all">All States ({PROPERTIES.length})</option>
              <option value="Arizona">Arizona</option>
              <option value="Colorado">Colorado</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
              <option value="Nevada">Nevada</option>
            </select>

            <label className="flex items-center gap-1.5 cursor-pointer select-none px-2 text-slate-700">
              <input
                type="checkbox"
                checked={has360Only}
                onChange={(e) => setHas360Only(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-brand-forest focus:ring-brand-forest"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>360° Only</span>
              </span>
            </label>
          </div>
        </div>

        {/* Map Viewport */}
        <div className="h-[75vh] min-h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-brand-border">
          <PropertyMap
            properties={filteredProperties}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
