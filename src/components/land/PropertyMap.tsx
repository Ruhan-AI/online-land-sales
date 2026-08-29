"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LandProperty } from "@/types/land";
import { formatMoney, formatAcres, getStatusBadge, imageOf } from "@/lib/utils";
import { Sparkles, ArrowRight, X } from "lucide-react";

interface PropertyMapProps {
  properties: LandProperty[];
  selectedPropertyId?: string;
  onSelectProperty?: (property: LandProperty) => void;
  className?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export function PropertyMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  className = "h-[600px] w-full",
  initialCenter = [37.0902, -100.7129], // US Centroid
  initialZoom = 4,
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLayer, setMapLayer] = useState<"terrain" | "satellite">("terrain");
  const [activeProperty, setActiveProperty] = useState<LandProperty | null>(null);

  useEffect(() => {
    // Dynamic load of Leaflet only in browser
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;
      // Import Leaflet CSS directly into head if not already loaded
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      if (!mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // Base tile layers.
      //
      // CARTO's raster basemaps now require an API key and serve an
      // "API KEY REQUIRED" watermark tile without one, so both layers come from
      // Esri's keyless ArcGIS Online services. Topo is used rather than a plain
      // street map because it carries contour lines, elevation markers and
      // water features — the detail that actually matters when buying land.
      const streetLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, HERE, Garmin, USGS, NGA',
          maxZoom: 19,
        }
      );

      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA, USGS',
          maxZoom: 19,
        }
      );

      if (mapLayer === "satellite") {
        satelliteLayer.addTo(map);
      } else {
        streetLayer.addTo(map);
      }

      // Add custom SVG pins for each property
      markersRef.current = [];
      const validProperties = properties.filter(
        (p): p is typeof p & { coordinates: { lat: number; lng: number } } =>
          !!p.coordinates && Number.isFinite(p.coordinates.lat) && Number.isFinite(p.coordinates.lng)
      );

      validProperties.forEach((prop) => {
        const isSelected = prop.id === selectedPropertyId;
        const iconHtml = `
          <div class="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 ${
            isSelected ? "scale-125 z-30" : "hover:scale-110"
          }">
            <div class="flex items-center gap-1 bg-brand-ink text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-card border-2 border-white whitespace-nowrap">
              <span>$${prop.defaultPlan.monthlyPayment}/mo</span>
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-ink rotate-45 border-r border-b border-white"></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-map-pin",
          iconSize: [80, 30],
          iconAnchor: [40, 32],
        });

        const marker = L.marker([prop.coordinates.lat, prop.coordinates.lng], {
          icon: customIcon,
        }).addTo(map);

        marker.on("click", () => {
          setActiveProperty(prop);
          if (onSelectProperty) onSelectProperty(prop);
          map.panTo([prop.coordinates.lat, prop.coordinates.lng], { animate: true });
        });

        markersRef.current.push(marker);

        // If GeoJSON boundary exists, render polygon
        if (prop.boundaryGeoJson) {
          const polyCoords = prop.boundaryGeoJson.coordinates[0].map(([lng, lat]) => [
            lat,
            lng,
          ]);
          L.polygon(polyCoords as any, {
            color: "#2F6B4F",
            fillColor: "#2F6B4F",
            fillOpacity: 0.25,
            weight: 2,
            dashArray: "4, 4",
          }).addTo(map);
        }
      });

      // Fit bounds if multiple properties exist
      if (validProperties.length > 0) {
        const bounds = L.latLngBounds(
          validProperties.map((p) => [p.coordinates.lat, p.coordinates.lng])
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [properties, mapLayer, selectedPropertyId]);

  return (
    // `isolate` creates a stacking context so Leaflet's panes and our own
    // z-[400] overlays stay inside the map and can't paint over the sticky header.
    <div
      className={`relative isolate rounded-card overflow-hidden border border-brand-border shadow-soft bg-slate-100 ${className}`}
    >
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Layer Switcher Button */}
      <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-[400] flex items-center bg-white/90 backdrop-blur-md rounded-xl p-1 shadow-card border border-brand-border">
        <button
          onClick={() => setMapLayer("terrain")}
          className={`text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-2 min-h-[40px] rounded-lg transition-colors whitespace-nowrap ${
            mapLayer === "terrain"
              ? "bg-brand-ink text-white shadow-sm"
              : "text-slate-600 hover:text-brand-ink"
          }`}
        >
          <span className="sm:hidden">Terrain</span>
          <span className="hidden sm:inline">Terrain Map</span>
        </button>
        <button
          onClick={() => setMapLayer("satellite")}
          className={`text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-2 min-h-[40px] rounded-lg transition-colors whitespace-nowrap ${
            mapLayer === "satellite"
              ? "bg-brand-ink text-white shadow-sm"
              : "text-slate-600 hover:text-brand-ink"
          }`}
        >
          <span className="sm:hidden">Satellite</span>
          <span className="hidden sm:inline">Satellite Aerial</span>
        </button>
      </div>

      {/* Active Selected Property Card Overlay */}
      {activeProperty && (
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-auto sm:w-96 z-[400] bg-white rounded-2xl shadow-2xl border border-brand-border p-3 sm:p-4 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex gap-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-brand-border">
              <Image
                src={imageOf(activeProperty.primaryImage)}
                alt={activeProperty.title}
                fill
                className="object-cover"
              />
              {activeProperty.hasStreetView && (
                <span className="absolute top-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  360°
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-brand-blue uppercase truncate min-w-0">
                  {activeProperty.county}, {activeProperty.stateCode}
                </span>
                <button
                  onClick={() => setActiveProperty(null)}
                  aria-label="Close property preview"
                  className="flex items-center justify-center -mt-1 -mr-1 w-8 h-8 shrink-0 text-slate-400 hover:text-brand-ink text-xs font-bold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-bold text-sm text-brand-ink truncate">
                {activeProperty.displayTitle}
              </h4>
              <p className="text-xs text-brand-muted">
                {formatAcres(activeProperty.acres)} • APN: {activeProperty.apn}
              </p>

              <div className="mt-2 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs font-extrabold text-brand-forest">
                    {formatMoney(activeProperty.defaultPlan.monthlyPayment)}/mo
                  </span>
                  <span className="text-[10px] text-slate-500 block truncate">
                    Cash: {formatMoney(activeProperty.cashPrice)}
                  </span>
                </div>

                <Link
                  href={`/products/${activeProperty.handle}`}
                  className="inline-flex shrink-0 items-center gap-1 bg-brand-ink hover:bg-brand-forest text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
