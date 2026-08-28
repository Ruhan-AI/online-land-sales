"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PanoramaData, LandHotspot } from "@/types/land";
import {
  Compass,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Info,
  Eye,
  MapPin,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PanoramaViewerProps {
  panorama: PanoramaData;
  className?: string;
}

export function PanoramaViewer({
  panorama,
  className = "w-full h-[300px] sm:h-[420px] lg:h-[520px]",
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(true); // Auto-active for immediate viewing
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<LandHotspot | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Panorama navigation states
  const [yaw, setYaw] = useState(panorama.initialYaw ? (panorama.initialYaw * 180) / Math.PI : 0);
  const [pitch, setPitch] = useState(panorama.initialPitch ? (panorama.initialPitch * 180) / Math.PI : 0);
  const [zoom, setZoom] = useState(1); // 1 to 2.5x

  const dragStartRef = useRef<{ x: number; y: number; yaw: number; pitch: number }>({
    x: 0,
    y: 0,
    yaw: 0,
    pitch: 0,
  });

  // Auto-rotate effect
  useEffect(() => {
    if (!isAutoRotating || isDragging) return;

    const interval = setInterval(() => {
      setYaw((prev) => (prev + 0.15) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoRotating, isDragging]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      yaw,
      pitch,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const sensitivity = 0.25 / zoom;
    const newYaw = (dragStartRef.current.yaw - deltaX * sensitivity) % 360;
    const newPitch = Math.max(-40, Math.min(40, dragStartRef.current.pitch + deltaY * sensitivity));

    setYaw(newYaw < 0 ? newYaw + 360 : newYaw);
    setPitch(newPitch);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // React attaches wheel handlers passively, so preventDefault() there is a no-op
  // (and logs a console error). Bind natively so wheel-zoom doesn't scroll the page.
  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((prev) => Math.max(0.8, Math.min(2.5, prev - e.deltaY * 0.0015)));
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, []);

  const resetView = () => {
    setYaw(panorama.initialYaw ? (panorama.initialYaw * 180) / Math.PI : 0);
    setPitch(panorama.initialPitch ? (panorama.initialPitch * 180) / Math.PI : 0);
    setZoom(1);
    setIsAutoRotating(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const compassHeading = Math.round((yaw + (panorama.northOffset || 0)) % 360);

  // Background position for 360 wrap
  const backgroundPositionX = `${(yaw / 360) * 100}%`;
  const backgroundPositionY = `${50 - pitch * 0.8}%`;

  const bgImage = panorama.panoramaUrl || panorama.posterImage;

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden bg-slate-950 border border-brand-border select-none shadow-2xl ${className}`}
    >
      {/* 360 Viewport Container
          `touch-none` is what makes drag-to-look work on a phone — without it the
          browser claims the gesture and scrolls the page instead. */}
      <div
        ref={viewportRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden touch-none overscroll-contain"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Seamless 360 Panorama Panoramic Image Background */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-75"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: `${350 * zoom}% auto`,
            backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`,
            backgroundRepeat: "repeat-x",
            filter: "brightness(0.95) contrast(1.05)",
            transform: `scale(${zoom})`,
          }}
        />

        {/* Ambient Vignette & Sky/Ground Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Floating Hotspots in Viewport */}
        {panorama.hotspots && panorama.hotspots.length > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {panorama.hotspots.map((hs) => {
              const hsDeg = (hs.yaw * 180) / Math.PI;
              let diff = hsDeg - yaw;
              while (diff < -180) diff += 360;
              while (diff > 180) diff -= 360;

              // Visible if within ~60 degrees of FOV
              const isVisible = Math.abs(diff) < 55;
              if (!isVisible) return null;

              // Keep the pill inside the frame and clear of the edge control stacks
              const rawX = 50 + (diff / 55) * 45;
              const screenXPercent = Math.max(22, Math.min(72, rawX));
              const hsPitchDeg = (hs.pitch * 180) / Math.PI;
              const screenYPercent = Math.max(
                22,
                Math.min(78, 50 - (hsPitchDeg - pitch) * 1.2)
              );

              return (
                <div
                  key={hs.id}
                  style={{
                    left: `${screenXPercent}%`,
                    top: `${screenYPercent}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute pointer-events-auto z-20"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(hs);
                      setIsAutoRotating(false);
                    }}
                    className="group flex items-center gap-1.5 bg-brand-ink/90 hover:bg-brand-forest text-white text-[11px] font-bold px-3 py-2 rounded-full border border-white/30 backdrop-blur-md shadow-2xl transition-all hover:scale-110 animate-bounce whitespace-nowrap max-w-[45vw] sm:max-w-none"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{hs.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Top Bar: Compass & Status */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-30 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-2 bg-brand-ink/85 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl">
            <Compass
              className="w-4 h-4 text-brand-blue transition-transform duration-75"
              style={{ transform: `rotate(${compassHeading}deg)` }}
            />
            <span>
              {compassHeading}° {getCompassDirection(compassHeading)}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-2 rounded-2xl border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive 360° View</span>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-ink/80 hover:bg-brand-ink text-white border border-white/20 backdrop-blur-md shadow-lg transition-colors"
            title={isAutoRotating ? "Pause auto-rotation" : "Play auto-rotation"}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={resetView}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-ink/80 hover:bg-brand-ink text-white border border-white/20 backdrop-blur-md shadow-lg transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-ink/80 hover:bg-brand-ink text-white border border-white/20 backdrop-blur-md shadow-lg transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Right Side Zoom Controls */}
        <div className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1 sm:gap-1.5">
          <button
            onClick={() => setZoom((prev) => Math.min(2.5, prev + 0.25))}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-ink/80 hover:bg-brand-ink text-white border border-white/20 backdrop-blur-md shadow-lg transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((prev) => Math.max(0.8, prev - 0.25))}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-ink/80 hover:bg-brand-ink text-white border border-white/20 backdrop-blur-md shadow-lg transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Hotspots Tray */}
        {panorama.hotspots && panorama.hotspots.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-16 z-30 flex gap-2 justify-start sm:justify-center overflow-x-auto no-scrollbar touch-rail sm:flex-wrap sm:overflow-visible">
            {panorama.hotspots.map((hs) => (
              <button
                key={hs.id}
                onClick={() => {
                  const targetYaw = ((hs.yaw * 180) / Math.PI + 360) % 360;
                  setYaw(targetYaw);
                  setPitch((hs.pitch * 180) / Math.PI);
                  setActiveHotspot(hs);
                  setIsAutoRotating(false);
                }}
                className="flex shrink-0 items-center gap-1.5 bg-brand-ink/90 hover:bg-brand-forest text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-3.5 py-2 rounded-full border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-105 whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{hs.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Active Hotspot Modal Card */}
        {activeHotspot && (
          <div className="absolute top-14 sm:top-16 left-2.5 right-2.5 sm:left-4 sm:right-auto sm:w-80 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-brand-border animate-in fade-in duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-forest uppercase">
                <MapPin className="w-4 h-4" />
                <span>{activeHotspot.label}</span>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-slate-400 hover:text-brand-ink text-xs font-bold px-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              {activeHotspot.description ||
                "Point of interest documented during official ground survey."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function getCompassDirection(deg: number): string {
  if (deg >= 337.5 || deg < 22.5) return "N";
  if (deg >= 22.5 && deg < 67.5) return "NE";
  if (deg >= 67.5 && deg < 112.5) return "E";
  if (deg >= 112.5 && deg < 157.5) return "SE";
  if (deg >= 157.5 && deg < 202.5) return "S";
  if (deg >= 202.5 && deg < 247.5) return "SW";
  if (deg >= 247.5 && deg < 292.5) return "W";
  return "NW";
}
