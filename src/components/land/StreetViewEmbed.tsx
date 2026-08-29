"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Compass,
  Maximize2,
  Minimize2,
  ExternalLink,
  Play,
  MapPin,
} from "lucide-react";

interface StreetViewEmbedProps {
  /** Full `https://www.google.com/maps/embed?pb=...` Street View URL from the listing. */
  embedUrl: string;
  /** Human label for the vantage point, e.g. "Standing on the parcel looking north". */
  label?: string;
  lat?: number;
  lng?: number;
  /** Compass heading in degrees, used only for the on-screen badge. */
  heading?: number;
  /** Poster shown before the viewer is activated. */
  posterImage?: string;
  className?: string;
  /** Load the iframe immediately instead of waiting for a tap. */
  eager?: boolean;
}

function compassPoint(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(((deg % 360) + 360) % 360 / 45) % 8];
}

/**
 * Google Street View 360° viewer.
 *
 * The live onlinelandsales.com store publishes each parcel's 360° view as a
 * Google Maps Street View embed, so we render the same iframe rather than
 * re-implementing a panorama viewer. No API key is required for this endpoint.
 *
 * The iframe is mounted only after the user activates it (or when `eager`),
 * because Google's embed is heavy and we don't want it competing with the
 * gallery for bandwidth on mobile.
 */
export function StreetViewEmbed({
  embedUrl,
  label,
  lat,
  lng,
  heading,
  posterImage,
  className = "w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]",
  eager = false,
}: StreetViewEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(eager);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keep our button icon in sync with the real fullscreen state (Esc, F11, etc.)
  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const node = containerRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      node.requestFullscreen?.().catch(() => {});
    }
  };

  const mapsLink =
    lat != null && lng != null
      ? `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`
      : null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-border bg-slate-950 shadow-card ${className}`}
    >
      {isActive ? (
        <>
          <iframe
            src={embedUrl}
            title={label ? `360° Street View — ${label}` : "360° Street View of this parcel"}
            className="absolute inset-0 h-full w-full border-0"
            style={{ border: 0 }}
            allowFullScreen
            loading={eager ? "eager" : "lazy"}
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoaded(true)}
          />

          {/* Simple skeleton until Google paints the first tile */}
          {!isLoaded && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Compass className="h-4 w-4 animate-spin text-brand-blue-light" />
                <span>Loading 360° view…</span>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Poster / activation state */
        <button
          type="button"
          onClick={() => setIsActive(true)}
          className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 text-white"
          aria-label="Load the interactive 360° Street View"
        >
          {posterImage ? (
            <>
              {/* Decorative only — the button itself carries the label */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posterImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition-opacity group-hover:opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/40 to-brand-ink/25" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-charcoal to-brand-ink" />
          )}

          <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-transform group-hover:scale-110 group-active:scale-95">
            <Play className="ml-0.5 h-6 w-6 fill-current" />
          </span>
          <span className="relative z-10 text-sm font-extrabold tracking-tight">
            Open 360° Street View
          </span>
          <span className="relative z-10 max-w-[85%] text-center text-[11px] font-medium text-slate-300">
            Drag to look around this parcel — powered by Google Street View
          </span>
        </button>
      )}

      {/* Heading badge */}
      {heading != null && (
        <div className="pointer-events-none absolute left-2.5 top-2.5 z-20 flex items-center gap-1.5 rounded-xl border border-white/20 bg-brand-ink/85 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-xl backdrop-blur-md sm:left-4 sm:top-4 sm:rounded-2xl sm:px-3.5 sm:py-2 sm:text-xs">
          <Compass className="h-4 w-4 shrink-0 text-brand-blue-light" />
          <span>
            {Math.round(((heading % 360) + 360) % 360)}° {compassPoint(heading)}
          </span>
        </div>
      )}

      {/* Controls */}
      {isActive && (
        <div className="absolute right-2.5 top-2.5 z-20 flex items-center gap-1 sm:right-4 sm:top-4 sm:gap-1.5">
          {mapsLink && (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Google Maps"
              aria-label="Open this Street View in Google Maps"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-brand-ink/80 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-brand-ink sm:h-11 sm:w-11"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-brand-ink/80 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-brand-ink sm:h-11 sm:w-11"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      {/* Vantage-point caption */}
      {label && isActive && (
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 z-20 sm:bottom-4 sm:left-4 sm:right-4">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/20 bg-brand-ink/85 px-3 py-1.5 text-[11px] font-semibold text-white shadow-xl backdrop-blur-md sm:text-xs">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span className="truncate">{label}</span>
          </span>
        </div>
      )}
    </div>
  );
}
