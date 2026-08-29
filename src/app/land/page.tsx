"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PROPERTIES } from "@/lib/data/properties";
import { PropertyFilters, FilterState } from "@/components/land/PropertyFilters";
import { PropertyGrid } from "@/components/land/PropertyGrid";
import { Filter, Compass, SlidersHorizontal, Sparkles, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

function LandCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState<FilterState>({
    state: searchParams.get("state") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    maxMonthly: searchParams.get("maxMonthly") || "",
    minAcres: searchParams.get("minAcres") || "",
    maxAcres: searchParams.get("maxAcres") || "",
    use: searchParams.get("use") || "all",
    roadAccess: searchParams.get("roadAccess") || "all",
    hasPower: searchParams.get("hasPower") === "true",
    has360: searchParams.get("has360") === "true",
    status: searchParams.get("status") || "available",
  });

  // Freeze the page behind the filter drawer so touch scrolling stays inside it
  useEffect(() => {
    if (!isMobileFilterOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileFilterOpen]);

  // Sync state to URL
  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.state !== "all") params.set("state", newFilters.state);
    if (newFilters.maxMonthly) params.set("maxMonthly", newFilters.maxMonthly);
    if (newFilters.minAcres) params.set("minAcres", newFilters.minAcres);
    if (newFilters.maxAcres) params.set("maxAcres", newFilters.maxAcres);
    if (newFilters.use !== "all") params.set("use", newFilters.use);
    if (newFilters.roadAccess !== "all") params.set("roadAccess", newFilters.roadAccess);
    if (newFilters.hasPower) params.set("hasPower", "true");
    if (newFilters.has360) params.set("has360", "true");

    router.replace(`/land?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    const defaultState: FilterState = {
      state: "all",
      minPrice: "",
      maxPrice: "",
      maxMonthly: "",
      minAcres: "",
      maxAcres: "",
      use: "all",
      roadAccess: "all",
      hasPower: false,
      has360: false,
      status: "available",
    };
    setFilters(defaultState);
    router.replace("/land", { scroll: false });
  };

  // Filter properties
  const filteredProperties = PROPERTIES.filter((p) => {
    if (filters.state !== "all" && p.state.toLowerCase() !== filters.state.toLowerCase()) {
      return false;
    }
    if (filters.maxMonthly && p.defaultPlan.monthlyPayment > Number(filters.maxMonthly)) {
      return false;
    }
    if (filters.minAcres && (p.acres ?? -Infinity) < Number(filters.minAcres)) {
      return false;
    }
    if (filters.maxAcres && (p.acres ?? Infinity) > Number(filters.maxAcres)) {
      return false;
    }
    if (filters.use !== "all" && !p.intendedUses.includes(filters.use as any)) {
      return false;
    }
    if (filters.roadAccess !== "all" && p.roadAccess !== filters.roadAccess) {
      return false;
    }
    if (filters.hasPower && p.utilities?.power !== "available_at_street") {
      return false;
    }
    if (filters.has360 && !p.hasStreetView) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-brand-canvas min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-brand-border">
          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
              {filters.state !== "all" ? `${filters.state} Land For Sale` : "All Available Land"}
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Owner financed, no credit check. Browse every parcel we currently have available.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-white text-brand-ink font-bold text-xs py-3 px-4 rounded-xl border border-brand-border shadow-soft active:scale-[0.98] transition-transform"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-blue shrink-0" />
              <span>Filters &amp; Sorting</span>
            </button>
          </div>
        </div>

        {/* 2-Column Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4 max-h-[calc(100dvh-8rem)] overflow-y-auto">
            <PropertyFilters
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
              totalCount={filteredProperties.length}
            />
          </div>

          {/* Property Results Column */}
          <div className="lg:col-span-9 min-w-0">
            <PropertyGrid
              properties={filteredProperties}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
              {/* Pinned header */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-brand-border shrink-0">
                <span className="font-extrabold text-base text-brand-ink">Filter Properties</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  aria-label="Close filters"
                  className="flex items-center justify-center w-10 h-10 -mr-2 shrink-0 text-slate-400 hover:text-brand-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Only the filter list scrolls, so the apply button stays reachable */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
                <PropertyFilters
                  bare
                  filters={filters}
                  onChange={updateFilters}
                  onReset={resetFilters}
                  totalCount={filteredProperties.length}
                />
              </div>

              <div className="px-5 pt-4 border-t border-brand-border shrink-0 safe-area-bottom">
                <Button
                  variant="forest"
                  size="lg"
                  className="w-full justify-center shadow-md font-bold"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  View {filteredProperties.length} Parcels
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LandCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading catalog...</div>}>
      <LandCatalogContent />
    </Suspense>
  );
}
