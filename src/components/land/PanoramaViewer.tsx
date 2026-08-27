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
  Smartphone,
  Eye,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PanoramaViewerProps {
  panorama: PanoramaData;
  className?: string;
}

export function PanoramaViewer({ panorama, className = "w-full h-[520px]" }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<LandHotspot | null>(null);
  const [isGyroEnabled, setIsGyroEnabled] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);

  // Panorama navigation internal state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const yawRef = useRef(panorama.initialYaw || 0);
  const pitchRef = useRef(panorama.initialPitch || 0);
  const fovRef = useRef(75);
  const animationFrameIdRef = useRef<number | null>(null);
  const textureImageRef = useRef<HTMLImageElement | null>(null);

  const startViewer = () => {
    setIsStarted(true);
  };

  // Canvas Equirectangular Projection Renderer
  useEffect(() => {
    if (!isStarted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = panorama.panoramaUrl;
    textureImageRef.current = img;

    const render = () => {
      if (!canvas || !ctx || !img.complete || img.naturalWidth === 0) {
        animationFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Simple, robust 2D equirectangular panorama viewport projection
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      // Map yaw to horizontal pixel offset (0 to imgW)
      let normalizedYaw = ((yawRef.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const xOffset = (normalizedYaw / (Math.PI * 2)) * imgW;
      const yOffset = Math.max(0, Math.min(imgH - height, (imgH / 2) - (pitchRef.current * 300)));

      // Draw wrapped image slices
      const sliceW = (fovRef.current / 360) * imgW;
      const aspect = width / height;
      const sliceH = sliceW / aspect;

      ctx.drawImage(
        img,
        xOffset,
        imgH / 2 - sliceH / 2 + pitchRef.current * 100,
        Math.min(imgW - xOffset, sliceW),
        sliceH,
        0,
        0,
        (Math.min(imgW - xOffset, sliceW) / sliceW) * width,
        height
      );

      // Handle wraparound
      if (xOffset + sliceW > imgW) {
        const remainingW = xOffset + sliceW - imgW;
        ctx.drawImage(
          img,
          0,
          imgH / 2 - sliceH / 2 + pitchRef.current * 100,
          remainingW,
          sliceH,
          ((imgW - xOffset) / sliceW) * width,
          0,
          (remainingW / sliceW) * width,
          height
        );
      }

      // Update compass
      const headingDeg = Math.round(((normalizedYaw * 180) / Math.PI + (panorama.northOffset || 0)) % 360);
      setCompassHeading(headingDeg);

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    img.onload = () => {
      render();
    };

    // Resize canvas to element dimensions
    const resizeObserver = new ResizeObserver(() => {
      if (canvas && containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isStarted, panorama]);

  // Pointer drag controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    yawRef.current += deltaX * 0.003;
    pitchRef.current = Math.max(-0.8, Math.min(0.8, pitchRef.current + deltaY * 0.002));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    fovRef.current = Math.max(45, Math.min(100, fovRef.current + e.deltaY * 0.05));
  };

  // Touch controls for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    yawRef.current += deltaX * 0.004;
    pitchRef.current = Math.max(-0.8, Math.min(0.8, pitchRef.current + deltaY * 0.003));

    previousMousePositionRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const resetView = () => {
    yawRef.current = panorama.initialYaw || 0;
    pitchRef.current = panorama.initialPitch || 0;
    fovRef.current = 75;
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

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-brand-border select-none ${className}`}
    >
      {!isStarted ? (
        // Initial Poster & CTA State
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={panorama.posterImage}
            alt={panorama.altDescription}
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

          <div className="relative z-10 text-center p-6 max-w-lg space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Interactive 360° Land Inspection</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {panorama.label}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Explore the parcel in full 360 degrees. Rotate the camera, inspect mountain horizons, identify road access points, and verify survey pins.
            </p>

            <Button
              variant="forest"
              size="lg"
              onClick={startViewer}
              className="shadow-xl"
              icon={<Eye className="w-5 h-5" />}
            >
              Enter 360° Virtual Tour
            </Button>

            {panorama.weatherNote && (
              <p className="text-[11px] text-slate-300 font-medium">
                Captured: {panorama.capturedAt} • {panorama.weatherNote}
              </p>
            )}
          </div>
        </div>
      ) : (
        // Active 360 Viewport
        <div
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Top Compass & Info Bar */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <div className="flex items-center gap-2 bg-brand-ink/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
              <Compass
                className="w-4 h-4 text-brand-blue"
                style={{ transform: `rotate(${compassHeading}deg)` }}
              />
              <span>{compassHeading}° {getCompassDirection(compassHeading)}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-xl border border-white/10">
              <Info className="w-3.5 h-3.5 text-amber-300" />
              <span>Drag or swipe to rotate</span>
            </div>
          </div>

          {/* Top Right Actions */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={resetView}
              className="p-2 rounded-xl bg-brand-ink/80 hover:bg-brand-ink text-white border border-white/20 backdrop-blur-md transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-brand-ink/80 hover:bg-brand-ink text-white border border-white/20 backdrop-blur-md transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Hotspot Pills */}
          {panorama.hotspots && panorama.hotspots.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 justify-center pointer-events-none">
              {panorama.hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => {
                    yawRef.current = hs.yaw;
                    pitchRef.current = hs.pitch;
                    setActiveHotspot(hs);
                  }}
                  className="pointer-events-auto flex items-center gap-1.5 bg-brand-ink/90 hover:bg-brand-forest text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-md shadow-lg transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{hs.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Active Hotspot Modal Card */}
          {activeHotspot && (
            <div className="absolute top-16 left-4 right-4 sm:right-auto sm:w-80 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-brand-border animate-in fade-in duration-150">
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
                {activeHotspot.description || "Point of interest documented during ground survey."}
              </p>
            </div>
          )}
        </div>
      )}
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
