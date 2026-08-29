import React from "react";
import { LandProperty } from "@/types/land";
import {
  FileText,
  Download,
  Search,
  ShieldCheck,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

interface DueDiligenceCenterProps {
  property: LandProperty;
}

/**
 * Buyer due-diligence panel.
 *
 * We deliberately do NOT print county assessor / planning / recorder phone
 * numbers: the source listings don't publish them, and inventing contact
 * details a buyer might actually dial would be harmful. Instead we link out to
 * a scoped search so the buyer reaches the real county office themselves.
 */
export function DueDiligenceCenter({ property }: DueDiligenceCenterProps) {
  const countyQuery = encodeURIComponent(
    `${property.county} ${property.state} assessor parcel search`
  );
  const documents = property.documents ?? [];
  const contact = property.countyContact;

  return (
    <div className="bg-white border border-brand-border rounded-card p-5 sm:p-6 shadow-soft space-y-6">
      <div className="pb-4 border-b border-brand-border">
        <h3 className="text-lg font-bold text-brand-ink flex items-start gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
          <span>Do Your Own Due Diligence</span>
        </h3>
        <p className="text-xs text-brand-muted mt-1 leading-relaxed">
          Everything below points at primary sources. We encourage you to verify
          zoning, taxes, access and title directly with {property.county} before
          you buy.
        </p>
      </div>

      {/* Seller-published documents, when there are any */}
      {documents.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-brand-ink uppercase tracking-wider">
            Documents
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-brand-border bg-brand-canvas hover:bg-brand-sand-light transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-brand-sand text-brand-blue shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-brand-ink block truncate">
                      {doc.title}
                    </span>
                    {doc.fileSize && (
                      <span className="text-[11px] text-slate-500 block">
                        {doc.fileSize}
                      </span>
                    )}
                  </div>
                </div>
                <Download className="w-4 h-4 shrink-0 text-slate-500" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Verification links */}
      <div className="bg-brand-sand-light rounded-2xl p-4 sm:p-5 border border-brand-border space-y-4">
        <h4 className="font-bold text-sm text-brand-ink">
          Verify with {property.county}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Contact the county assessor, planning and recorder offices to confirm
          parcel status, property taxes, building codes and zoning. We do not
          publish county phone numbers here so you always reach the office
          directly from an official source.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <a
            href={`https://www.google.com/search?q=${countyQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-brand-sand text-brand-ink text-xs font-bold py-2.5 px-4 rounded-xl border border-brand-border transition-colors shadow-sm"
          >
            <Search className="w-4 h-4 text-brand-blue shrink-0" />
            <span>Find the county assessor</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>

          {contact?.countyWebsite && (
            <a
              href={contact.countyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-sand text-brand-ink text-xs font-bold py-2.5 px-4 rounded-xl border border-brand-border transition-colors shadow-sm"
            >
              <span className="break-all">County website</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          )}

          {property.sourceUrl && (
            <a
              href={property.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-sand text-brand-ink text-xs font-bold py-2.5 px-4 rounded-xl border border-brand-border transition-colors shadow-sm"
            >
              <span>View original listing</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Parcel details are reproduced from the seller&apos;s listing and may
          change. Confirm acreage, boundaries, access and permitted use with the
          county and a licensed surveyor before purchase.
        </p>
      </div>
    </div>
  );
}
