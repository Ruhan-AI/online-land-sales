import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data/properties";
import { PropertyGallery } from "@/components/land/PropertyGallery";
import { FinanceBox } from "@/components/land/FinanceBox";
import { QuickFacts } from "@/components/land/QuickFacts";
import { DueDiligenceCenter } from "@/components/land/DueDiligenceCenter";
import { BoundaryMap } from "@/components/land/BoundaryMap";
import { PropertyCard } from "@/components/land/PropertyCard";
import { ShareButton } from "@/components/land/ShareButton";
import { Accordion } from "@/components/ui/Accordion";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { formatMoney, formatAcres, getStatusBadge } from "@/lib/utils";
import {
  MapPin,
  ChevronRight,
  ShieldCheck,
  Share2,
  Heart,
  Phone,
  Sparkles,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export async function generateStaticParams() {
  return PROPERTIES.map((property) => ({
    handle: property.handle,
  }));
}

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const property = PROPERTIES.find((p) => p.handle === handle);

  if (!property) {
    notFound();
  }

  const statusBadge = getStatusBadge(property.status);

  // Related properties (same state or similar budget)
  const relatedProperties = PROPERTIES.filter(
    (p) => p.id !== property.id && p.status === "available"
  ).slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Land Catalog", url: "/land" },
    { name: property.state, url: `/land?state=${property.state}` },
    { name: property.county, url: `/land?state=${property.state}` },
    { name: property.displayTitle, url: `/products/${property.handle}` },
  ];

  return (
    <div className="bg-brand-canvas min-h-screen py-6 sm:py-10">
      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(property)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-brand-muted flex-wrap">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <Link
                href={crumb.url}
                className="hover:text-brand-ink transition-colors font-medium"
              >
                {crumb.name}
              </Link>
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Property Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-brand-border">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${statusBadge.bg} ${statusBadge.color}`}
              >
                {statusBadge.label}
              </span>
              {property.isHotLot && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-clay text-white">
                  🔥 High Demand
                </span>
              )}
              <span className="text-xs font-bold text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded-md">
                APN: {property.apn}
              </span>
              <span className="text-xs font-bold text-slate-500 font-mono">
                Code: {property.propertyCode}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-brand-muted font-medium">
              <MapPin className="w-4 h-4 text-brand-blue" />
              <span>
                {property.county}, {property.state} • {property.nearestTown} ({property.distanceToTownMiles} miles)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <ShareButton />
          </div>
        </div>

        {/* Main 2-Column Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Media, Description, Quick Facts, Due Diligence, FAQs (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Tabbed Media Gallery (Photos / 360 / Map) */}
            <PropertyGallery property={property} />

            {/* 2. Structured Narrative Description */}
            <div className="bg-white border border-brand-border rounded-card p-6 sm:p-8 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-brand-ink">
                About This Property
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {property.fullDescription}
              </p>

              {/* Nearby Highlights */}
              {property.nearbyHighlights.length > 0 && (
                <div className="pt-4 border-t border-brand-border/60 space-y-3">
                  <h3 className="font-bold text-xs text-brand-ink uppercase tracking-wider">
                    Nearby Attractions & Outdoor Recreation:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {property.nearbyHighlights.map((h, i) => (
                      <div key={i} className="p-3 rounded-xl bg-brand-sand-light border border-brand-border/60 space-y-1">
                        <span className="font-bold text-brand-ink block">
                          {h.name} ({h.distanceMiles} miles)
                        </span>
                        <span className="text-slate-600 block text-[11px] leading-relaxed">
                          {h.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Quick Facts Table Grid */}
            <QuickFacts property={property} />

            {/* 4. Due Diligence & Document Downloads */}
            <DueDiligenceCenter property={property} />

            {/* 5. Interactive Satellite Boundary Map */}
            <BoundaryMap property={property} />

            {/* 6. Frequently Asked Questions */}
            {property.faqs.length > 0 && (
              <div className="bg-white border border-brand-border rounded-card p-6 sm:p-8 shadow-soft space-y-6">
                <h3 className="text-xl font-bold text-brand-ink">
                  Frequently Asked Questions About This Lot
                </h3>
                <Accordion
                  items={property.faqs.map((faq, i) => ({
                    id: `faq-${i}`,
                    title: faq.question,
                    content: <p>{faq.answer}</p>,
                  }))}
                />
              </div>
            )}
          </div>

          {/* Right Column: Sticky Finance & Purchase Card (4 cols) */}
          <div className="lg:col-span-4">
            <FinanceBox property={property} />
          </div>
        </div>

        {/* Comparable & Nearby Lots */}
        {relatedProperties.length > 0 && (
          <div className="pt-12 border-t border-brand-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-brand-ink">
                  Similar Available Properties
                </h3>
                <p className="text-xs text-brand-muted">
                  Explore alternative parcels with similar monthly payments and guaranteed terms.
                </p>
              </div>
              <Link
                href="/land"
                className="text-xs font-bold text-brand-blue hover:underline hidden sm:block"
              >
                View Full Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((rel) => (
                <PropertyCard key={rel.id} property={rel} layout="grid" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Reserve Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border p-4 shadow-float flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">
            Guaranteed Monthly
          </span>
          <span className="text-lg font-extrabold text-brand-forest">
            {formatMoney(property.defaultPlan.monthlyPayment)}
            <span className="text-xs font-normal text-slate-600">/mo</span>
          </span>
        </div>

        <Link
          href={`/products/${property.handle}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-forest text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md active:scale-95 transition-transform"
        >
          <span>Reserve Now ({formatMoney(property.defaultPlan.amountDueToday)})</span>
        </Link>
      </div>
    </div>
  );
}
