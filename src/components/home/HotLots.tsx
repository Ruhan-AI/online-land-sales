import React from "react";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data/properties";
import { PropertyCard } from "@/components/land/PropertyCard";
import { ArrowRight } from "lucide-react";

export function HotLots() {
  const hotLots = PROPERTIES.filter((p) => p.status === "available").slice(0, 3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-brand-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
              Parcels with a 360° tour
            </h2>
            <p className="text-sm text-brand-muted max-w-xl">
              Parcels with a 360° Street View tour, listed newest first.
            </p>
          </div>

          <Link
            href="/land"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-ink transition-colors"
          >
            <span>View All Available Land</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {hotLots.map((property) => (
            <PropertyCard key={property.id} property={property} layout="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
