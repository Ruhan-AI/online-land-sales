"use client";

import React from "react";
import { LandProperty } from "@/types/land";
import { PropertyMap } from "./PropertyMap";
import { MapPin, Navigation, ExternalLink, AlertTriangle } from "lucide-react";

interface BoundaryMapProps {
  property: LandProperty;
}

export function BoundaryMap({ property }: BoundaryMapProps) {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${property.coordinates.lat},${property.coordinates.lng}`;

  return (
    <div className="bg-white border border-brand-border rounded-card p-5 sm:p-6 shadow-soft space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-brand-border">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-brand-ink flex items-start gap-2">
            <MapPin className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
            <span>Interactive Parcel Map &amp; Coordinates</span>
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            GPS: {property.coordinates.lat.toFixed(5)}, {property.coordinates.lng.toFixed(5)}
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 bg-brand-sand hover:bg-brand-sand-light text-brand-ink text-xs font-bold py-3 px-4 rounded-xl border border-brand-border transition-colors shadow-sm"
        >
          <Navigation className="w-4 h-4 text-brand-blue shrink-0" />
          <span className="sm:hidden">Driving Directions</span>
          <span className="hidden sm:inline">Get Driving Directions in Google Maps</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      </div>

      {/* Map Embed */}
      <div className="h-[280px] sm:h-[360px] lg:h-[420px] rounded-xl overflow-hidden border border-brand-border">
        <PropertyMap
          properties={[property]}
          selectedPropertyId={property.id}
          initialCenter={[property.coordinates.lat, property.coordinates.lng]}
          initialZoom={14}
          className="h-full w-full"
        />
      </div>

      {/* Legal boundary disclaimer */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Boundary Disclaimer:</strong> The green perimeter overlay is based on county GIS parcel coordinate records and is provided for preliminary visual reference only. An official licensed boundary survey is recommended to mark precise physical stakes prior to erecting permanent structures or fencing.
        </p>
      </div>
    </div>
  );
}
