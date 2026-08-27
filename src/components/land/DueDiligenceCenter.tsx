"use client";

import React from "react";
import { LandProperty } from "@/types/land";
import {
  FileText,
  Download,
  Phone,
  Globe,
  ShieldCheck,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

interface DueDiligenceCenterProps {
  property: LandProperty;
}

export function DueDiligenceCenter({ property }: DueDiligenceCenterProps) {
  return (
    <div className="bg-white border border-brand-border rounded-card p-6 shadow-soft space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
        <div>
          <h3 className="text-lg font-bold text-brand-ink flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-forest" />
            <span>Buyer Due Diligence & Legal Documents</span>
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            Transparent records, county recorded plats, covenants, and government contacts.
          </p>
        </div>
      </div>

      {/* Official Recorded Documents List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-brand-ink uppercase tracking-wider">
          Download Official Documents
        </h4>

        {property.documents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {property.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-brand-border bg-brand-canvas hover:bg-brand-sand-light transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-brand-sand text-brand-blue shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-brand-ink block truncate">
                      {doc.title}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {doc.fileSize} • Verified {doc.lastVerifiedAt}
                    </span>
                  </div>
                </div>

                <a
                  href={doc.downloadUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Sample Download: ${doc.fileName}`);
                  }}
                  className="p-2 text-slate-500 hover:text-brand-forest hover:bg-brand-sand rounded-lg transition-colors shrink-0"
                  title="Download Document"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            Standard County Assessor map and warranty deed available upon contract request.
          </p>
        )}
      </div>

      {/* County Contact Verification Card */}
      <div className="bg-brand-sand-light rounded-2xl p-5 border border-brand-border space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-brand-ink">
            {property.county} Government Contacts
          </h4>
          <span className="text-[11px] font-semibold text-brand-forest flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Verified Public Offices
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          You are welcome to contact county offices directly to verify property tax status, building codes, zoning permits, or road maintenance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-white border border-brand-border">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Assessor Phone</span>
            <a href={`tel:${property.countyContact.assessorPhone.replace(/\D/g, "")}`} className="font-bold text-brand-blue hover:underline">
              {property.countyContact.assessorPhone}
            </a>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-brand-border">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Planning & Zoning</span>
            <a href={`tel:${property.countyContact.planningPhone.replace(/\D/g, "")}`} className="font-bold text-brand-blue hover:underline">
              {property.countyContact.planningPhone}
            </a>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-brand-border">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">County Recorder</span>
            <a href={`tel:${property.countyContact.recorderPhone.replace(/\D/g, "")}`} className="font-bold text-brand-blue hover:underline">
              {property.countyContact.recorderPhone}
            </a>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={property.countyContact.countyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-ink transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Visit Official County Website ({property.countyContact.countyWebsite})</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
