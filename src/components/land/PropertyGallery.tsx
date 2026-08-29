"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LandProperty } from "@/types/land";
import { StreetViewEmbed } from "./StreetViewEmbed";
import { BoundaryMap } from "./BoundaryMap";
import { Camera, Sparkles, MapPin, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { imageOf } from "@/lib/utils";

interface PropertyGalleryProps {
  property: LandProperty;
}

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "360" | "map">("photos");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const images = property.galleryImages.length > 0 ? property.galleryImages : [property.primaryImage];

  return (
    <div className="space-y-4">
      {/* Media Tabs Header — scrolls sideways instead of overflowing on phones */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-brand-sand rounded-2xl border border-brand-border text-xs font-bold w-full lg:w-fit overflow-x-auto no-scrollbar touch-rail">
        <button
          onClick={() => setActiveTab("photos")}
          className={`flex shrink-0 items-center gap-1.5 py-2.5 px-3 sm:px-4 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "photos"
              ? "bg-brand-ink text-white shadow-sm font-extrabold"
              : "text-slate-700 hover:text-brand-ink"
          }`}
        >
          <Camera className="w-4 h-4 shrink-0" />
          <span>Photos ({images.length})</span>
        </button>

        {property.panorama?.streetView && (
          <button
            onClick={() => setActiveTab("360")}
            className={`flex shrink-0 items-center gap-1.5 py-2.5 px-3 sm:px-4 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "360"
                ? "bg-brand-forest text-white shadow-sm font-extrabold"
                : "text-slate-700 hover:text-brand-forest"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="sm:hidden">360° Tour</span>
            <span className="hidden sm:inline">360° Virtual Tour</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab("map")}
          className={`flex shrink-0 items-center gap-1.5 py-2.5 px-3 sm:px-4 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "map"
              ? "bg-brand-blue text-white shadow-sm font-extrabold"
              : "text-slate-700 hover:text-brand-blue"
          }`}
        >
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="sm:hidden">Map</span>
          <span className="hidden sm:inline">Parcel &amp; Aerial Map</span>
        </button>
      </div>

      {/* Media Viewport */}
      {activeTab === "photos" && (
        <div className="space-y-3">
          {/* Main Selected Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-brand-border shadow-soft group">
            <Image
              src={imageOf(images[selectedPhotoIndex])}
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
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-black/50 text-white hover:bg-black/80 active:bg-black/80 transition-colors backdrop-blur-sm"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((selectedPhotoIndex + 1) % images.length)
                  }
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-black/50 text-white hover:bg-black/80 active:bg-black/80 transition-colors backdrop-blur-sm"
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
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar touch-rail">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhotoIndex(index)}
                  aria-label={`View photo ${index + 1}`}
                  className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedPhotoIndex === index
                      ? "border-brand-forest scale-95 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imageOf(img)}
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

      {activeTab === "360" && property.panorama?.streetView && (
        <StreetViewEmbed
          embedUrl={property.panorama.streetView.embedUrl}
          label={property.panorama.label}
          lat={property.panorama.streetView.lat}
          lng={property.panorama.streetView.lng}
          heading={property.panorama.streetView.heading}
          posterImage={property.primaryImage}
          className="w-full h-[300px] sm:h-[420px] lg:h-[520px]"
          eager
        />
      )}

      {activeTab === "map" && <BoundaryMap property={property} />}
    </div>
  );
}
