"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LandProperty } from "@/types/land";
import { PanoramaViewer } from "./PanoramaViewer";
import { BoundaryMap } from "./BoundaryMap";
import { Camera, Sparkles, MapPin, FileText, ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  property: LandProperty;
}

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "360" | "map">("photos");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const images = property.galleryImages.length > 0 ? property.galleryImages : [property.primaryImage];

  return (
    <div className="space-y-4">
      {/* Media Tabs Header */}
      <div className="flex items-center gap-2 p-1.5 bg-brand-sand rounded-2xl border border-brand-border text-xs font-bold w-fit">
        <button
          onClick={() => setActiveTab("photos")}
          className={`flex items-center gap-1.5 py-2 px-4 rounded-xl transition-all ${
            activeTab === "photos"
              ? "bg-brand-ink text-white shadow-sm font-extrabold"
              : "text-slate-700 hover:text-brand-ink"
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Photos ({images.length})</span>
        </button>

        {property.panorama && (
          <button
            onClick={() => setActiveTab("360")}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl transition-all ${
              activeTab === "360"
                ? "bg-brand-forest text-white shadow-sm font-extrabold"
                : "text-slate-700 hover:text-brand-forest"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>360° Virtual Tour</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab("map")}
          className={`flex items-center gap-1.5 py-2 px-4 rounded-xl transition-all ${
            activeTab === "map"
              ? "bg-brand-blue text-white shadow-sm font-extrabold"
              : "text-slate-700 hover:text-brand-blue"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Parcel & Aerial Map</span>
        </button>
      </div>

      {/* Media Viewport */}
      {activeTab === "photos" && (
        <div className="space-y-3">
          {/* Main Selected Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-brand-border shadow-soft group">
            <Image
              src={images[selectedPhotoIndex]}
              alt={`${property.title} - Photo ${selectedPhotoIndex + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover"
            />

            {/* Prev / Next controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedPhotoIndex(
                      (selectedPhotoIndex - 1 + images.length) % images.length
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((selectedPhotoIndex + 1) % images.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom counter badge */}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg border border-white/20">
              {selectedPhotoIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedPhotoIndex === index
                      ? "border-brand-forest scale-95 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "360" && property.panorama && (
        <PanoramaViewer panorama={property.panorama} className="w-full h-[520px]" />
      )}

      {activeTab === "map" && <BoundaryMap property={property} />}
    </div>
  );
}
