import React from "react";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data/properties";
import { PanoramaViewer } from "@/components/land/PanoramaViewer";
import { Sparkles, Eye, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PanoramaTeaser() {
  const panoProperty = PROPERTIES.find((p) => p.panorama) || PROPERTIES[0];

  if (!panoProperty.panorama) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-brand-sand-light border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest-light px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-brand-forest" />
            <span>Virtual Land Inspection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
            Inspect Land Remotely with 360° Tours
          </h2>
          <p className="text-sm text-slate-600">
            See the actual terrain, mountain vistas, road access, and boundary markers before you buy—right from your phone or computer.
          </p>
        </div>

        {/* Live Viewer Container */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-brand-border">
          <PanoramaViewer panorama={panoProperty.panorama} className="h-[480px] sm:h-[560px] w-full" />
        </div>

        {/* Sub-bar with link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto pt-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-brand-forest" />
            <span>Actual property shown: {panoProperty.title}</span>
          </div>

          <Link
            href="/land?has360=true"
            className="inline-flex items-center gap-1.5 font-bold text-brand-forest hover:underline"
          >
            <span>Browse all parcels with 360° Virtual Tours</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
