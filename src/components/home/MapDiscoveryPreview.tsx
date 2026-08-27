import React from "react";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data/properties";
import { PropertyMap } from "@/components/land/PropertyMap";
import { Compass, Sparkles, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function MapDiscoveryPreview() {
  return (
    <section className="py-16 sm:py-20 bg-brand-sand-light/50 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest-light px-3 py-1 rounded-full">
              <Compass className="w-4 h-4 text-brand-forest" />
              <span>Interactive Discovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
              Explore Land Across the United States
            </h2>
            <p className="text-sm text-brand-muted max-w-xl">
              Filter parcels visually by satellite terrain, mountain ranges, and nearby lakes. Click any pin to preview monthly payments and boundary lines.
            </p>
          </div>

          <Link href="/map">
            <Button variant="primary" size="md" icon={<Compass className="w-4 h-4" />}>
              Open Full-Screen Map
            </Button>
          </Link>
        </div>

        {/* Map Embed */}
        <div className="h-[520px] rounded-3xl overflow-hidden shadow-card border border-brand-border">
          <PropertyMap properties={PROPERTIES} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
