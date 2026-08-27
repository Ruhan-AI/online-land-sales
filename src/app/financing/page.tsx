"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data/properties";
import { formatMoney, calculateMonthlyPayment } from "@/lib/utils";
import { Calculator, ShieldCheck, CheckCircle2, DollarSign, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FinancingPage() {
  const [totalPrice, setTotalPrice] = useState<number>(12000);
  const [downPayment, setDownPayment] = useState<number>(299);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(8.9);

  const financedPrincipal = Math.max(0, totalPrice - downPayment);
  const monthlyPayment = calculateMonthlyPayment(financedPrincipal, interestRate, termMonths);

  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest-light px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-brand-forest" />
            <span>Guaranteed Seller Financing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-ink tracking-tight font-sans">
            Simple, Transparent Land Financing
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Own prime American land without bank loans or credit checks. Customize your terms below to fit your family's budget.
          </p>
        </div>

        {/* Standalone Interactive Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-card space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border">
            <h2 className="text-xl font-bold text-brand-ink flex items-center gap-2">
              <Calculator className="w-5 h-5 text-brand-forest" />
              <span>Interactive Loan Payment Calculator</span>
            </h2>
            <span className="text-xs font-bold text-brand-forest bg-brand-forest-light px-2.5 py-1 rounded-full">
              0% Prepayment Penalty
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Controls */}
            <div className="space-y-6">
              {/* Land Price */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-brand-ink">
                  <span>Target Land Price</span>
                  <span className="text-base text-brand-blue font-extrabold">{formatMoney(totalPrice)}</span>
                </div>
                <input
                  type="range"
                  min="4000"
                  max="40000"
                  step="500"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(Number(e.target.value))}
                  className="w-full h-2 bg-brand-sand rounded-lg appearance-none cursor-pointer accent-brand-forest"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-brand-ink">
                  <span>Down Payment</span>
                  <span className="text-base text-brand-forest font-extrabold">{formatMoney(downPayment)}</span>
                </div>
                <input
                  type="range"
                  min="99"
                  max="3000"
                  step="50"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-brand-sand rounded-lg appearance-none cursor-pointer accent-brand-forest"
                />
              </div>

              {/* Term */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-brand-ink">
                  <span>Term Length</span>
                  <span className="text-sm text-brand-ink font-extrabold">{termMonths} Months ({termMonths / 12} Years)</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 text-xs font-bold">
                  {[12, 24, 36, 48, 60, 72].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTermMonths(m)}
                      className={`py-2 rounded-xl border transition-all ${
                        termMonths === m
                          ? "bg-brand-forest text-white border-brand-forest shadow-sm"
                          : "bg-brand-sand-light hover:bg-brand-sand text-slate-700 border-brand-border"
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="bg-brand-sand-light/80 rounded-2xl p-6 border border-brand-border flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-forest block">
                  Calculated Monthly Payment:
                </span>
                <div className="text-4xl font-extrabold text-brand-forest">
                  {formatMoney(monthlyPayment)}
                  <span className="text-sm font-normal text-slate-600"> / month</span>
                </div>

                <div className="space-y-2 text-xs border-t border-brand-border pt-4 text-slate-700">
                  <div className="flex justify-between">
                    <span>Financed Principal:</span>
                    <span className="font-semibold">{formatMoney(financedPrincipal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment Due Today:</span>
                    <span className="font-semibold">{formatMoney(downPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>One-Time Document Fee:</span>
                    <span className="font-semibold">$199</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fixed Interest Rate:</span>
                    <span className="font-semibold">{interestRate}% APR</span>
                  </div>
                </div>
              </div>

              <Link href={`/land?maxMonthly=${monthlyPayment + 20}`}>
                <Button variant="forest" size="lg" className="w-full justify-center shadow-md font-bold">
                  Browse Matching Parcels
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Fee & Transparent Pricing Schedule */}
        <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-soft space-y-6">
          <h2 className="text-xl font-bold text-brand-ink">
            Transparent Fee Schedule — No Hidden Surprises
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-brand-border text-brand-muted uppercase font-bold">
                  <th className="pb-3">Fee Type</th>
                  <th className="pb-3">Cost</th>
                  <th className="pb-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60 text-slate-700">
                <tr>
                  <td className="py-3 font-bold text-brand-ink">Down Payment</td>
                  <td className="py-3 font-bold text-brand-forest">$99 to $299</td>
                  <td className="py-3">Directly reduces your principal loan balance.</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-brand-ink">Document Prep Fee</td>
                  <td className="py-3 font-bold text-brand-ink">$199 (One-Time)</td>
                  <td className="py-3">Covers digital contract drafting, promissory notes, and closing files.</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-brand-ink">Prepayment Penalties</td>
                  <td className="py-3 font-bold text-brand-forest">$0 (Never)</td>
                  <td className="py-3">Pay off your loan balance at any time without fees.</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-brand-ink">Credit Check Fee</td>
                  <td className="py-3 font-bold text-brand-forest">$0 (Never)</td>
                  <td className="py-3">No credit bureau inquiries or employment verification required.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
