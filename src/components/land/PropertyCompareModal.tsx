"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, CheckCircle2, ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { PROPERTIES } from "@/lib/data/properties";
import { formatMoney, formatAcres, getRoadAccessLabel, getUtilitySummary } from "@/lib/utils";

export function PropertyCompareModal() {
  const { comparePropertyIds, toggleCompareProperty, clearCompare, isCompareModalOpen, setIsCompareModalOpen } = useStore();

  const comparedProperties = PROPERTIES.filter((p) =>
    comparePropertyIds.includes(p.id)
  );

  return (
    <Modal
      isOpen={isCompareModalOpen}
      onClose={() => setIsCompareModalOpen(false)}
      title="Property Comparison"
      subtitle={`Comparing ${comparedProperties.length} of 4 selected parcels`}
      maxWidth="6xl"
    >
      {comparedProperties.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <p className="text-sm text-brand-muted">
            You have not selected any properties to compare yet.
          </p>
          <p className="text-xs text-slate-500">
            Click the "Compare" button on any property card to compare financing, acreage, road access, and utilities side-by-side.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={clearCompare}
              className="text-xs text-brand-clay hover:underline flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="overflow-x-auto touch-rail pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="p-2 sm:p-3 font-bold text-brand-muted w-28 sm:w-36">Feature</th>
                  {comparedProperties.map((prop) => (
                    <th key={prop.id} className="p-2 sm:p-3 font-bold text-brand-ink w-48 sm:w-56">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2 border border-brand-border">
                        <Image
                          src={prop.primaryImage}
                          alt={prop.title}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => toggleCompareProperty(prop.id)}
                          className="absolute top-1.5 right-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white hover:bg-brand-clay transition-colors"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <Link
                        href={`/products/${prop.handle}`}
                        onClick={() => setIsCompareModalOpen(false)}
                        className="font-bold text-sm text-brand-ink hover:text-brand-blue line-clamp-1"
                      >
                        {prop.displayTitle}
                      </Link>
                      <span className="text-[11px] text-brand-muted block mt-0.5">
                        {prop.county}, {prop.stateCode}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {/* Monthly Payment */}
                <tr className="bg-brand-forest-light/30">
                  <td className="p-2 sm:p-3 font-bold text-brand-forest">Monthly Payment</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-2 sm:p-3 font-extrabold text-brand-forest text-sm">
                      {formatMoney(prop.defaultPlan.monthlyPayment)}/mo
                      <span className="block text-[10px] text-slate-500 font-normal">
                        {prop.defaultPlan.termMonths} mo @ {prop.defaultPlan.interestRate}%
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Down Payment */}
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-slate-600">Down Payment</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-2 sm:p-3 font-bold text-brand-ink">
                      {formatMoney(prop.defaultPlan.downPayment)}
                    </td>
                  ))}
                </tr>

                {/* Discounted Cash Price */}
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-slate-600">Discounted Cash Price</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-2 sm:p-3 font-bold text-brand-ink text-sm">
                      {formatMoney(prop.cashPrice)}
                    </td>
                  ))}
                </tr>

                {/* Acreage */}
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-slate-600">Acreage</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-2 sm:p-3 font-bold text-brand-ink">
                      {formatAcres(prop.acres)}
                    </td>
                  ))}
                </tr>

                {/* Road Access */}
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-slate-600">Road Access</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-2 sm:p-3 text-slate-700">
                      {getRoadAccessLabel(prop.roadAccess)}
                    </td>
                  ))}
                </tr>

                {/* Utilities */}
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-slate-600">Utilities</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-2 sm:p-3 space-y-1">
                      {getUtilitySummary(prop.utilities).map((u, i) => (
                        <span
                          key={i}
                          className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-brand-sand font-medium mr-1 mb-1"
                        >
                          {u}
                        </span>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* 360 View */}
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-slate-600">360° Virtual Tour</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-2 sm:p-3">
                      {prop.panorama ? (
                        <span className="text-brand-forest font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Available
                        </span>
                      ) : (
                        <span className="text-slate-400">Photos Only</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* CTA Row */}
                <tr>
                  <td className="p-2 sm:p-3"></td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-2 sm:p-3">
                      <Link
                        href={`/products/${prop.handle}`}
                        onClick={() => setIsCompareModalOpen(false)}
                        className="inline-flex items-center justify-center gap-1.5 w-full bg-brand-ink text-white font-semibold py-2.5 px-3 rounded-xl hover:bg-brand-forest transition-colors text-xs"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Modal>
  );
}
