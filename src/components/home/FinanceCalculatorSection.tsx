"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data/properties";
import { formatMoney, calculateMonthlyPayment } from "@/lib/utils";
import { Calculator, DollarSign, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinanceCalculatorSection() {
  const [totalPrice, setTotalPrice] = useState<number>(10000);
  const [downPayment, setDownPayment] = useState<number>(250);
  const [termMonths, setTermMonths] = useState<number>(60);
  const interestRate = 8.9;

  const financedPrincipal = Math.max(0, totalPrice - downPayment);
  const monthlyPayment = calculateMonthlyPayment(financedPrincipal, interestRate, termMonths);

  // Find matching properties around this budget
  const matchingProperties = PROPERTIES.filter(
    (p) =>
      p.status === "available" &&
      p.defaultPlan.monthlyPayment <= monthlyPayment + 50 &&
      p.defaultPlan.monthlyPayment >= monthlyPayment - 50
  ).slice(0, 2);

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-brand-sand-light border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest-light px-3 py-1 rounded-full">
            <Calculator className="w-4 h-4 text-brand-forest" />
            <span>Budget-First Financing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
            Calculate Your Custom Monthly Payment
          </h2>
          <p className="text-sm text-slate-600">
            Slide the controls to match your ideal down payment and term. Every single parcel comes with guaranteed approval.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 border border-brand-border shadow-card space-y-6">
            {/* Total Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold text-brand-ink">
                <span>Estimated Land Price</span>
                <span className="text-base text-brand-blue font-extrabold">{formatMoney(totalPrice)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="30000"
                step="500"
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
                className="w-full h-2 bg-brand-sand rounded-lg appearance-none cursor-pointer accent-brand-forest touch-pan-y"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>$5,000</span>
                <span>$15,000</span>
                <span>$30,000</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold text-brand-ink">
                <span>Down Payment</span>
                <span className="text-base text-brand-forest font-extrabold">{formatMoney(downPayment)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-brand-sand rounded-lg appearance-none cursor-pointer accent-brand-forest touch-pan-y"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>$100</span>
                <span>$1,000</span>
                <span>$2,000</span>
              </div>
            </div>

            {/* Term Months Slider */}
            <div className="space-y-2">
              <div className="flex flex-wrap justify-between items-center gap-x-3 text-sm font-bold text-brand-ink">
                <span>Loan Term</span>
                <span className="text-sm sm:text-base text-brand-ink font-extrabold">{termMonths} Months ({Math.round(termMonths / 12)} Yrs)</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs font-bold">
                {[24, 36, 48, 60, 72].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTermMonths(m)}
                    className={`py-2 px-3 rounded-xl border transition-all ${
                      termMonths === m
                        ? "bg-brand-forest text-white border-brand-forest font-extrabold shadow-sm"
                        : "bg-brand-sand-light hover:bg-brand-sand text-slate-700 border-brand-border"
                    }`}
                  >
                    {m} Mo
                  </button>
                ))}
              </div>
            </div>

            {/* Trust bullet points */}
            <div className="pt-4 border-t border-brand-border/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0" />
                <span>Zero Prepayment Penalties</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0" />
                <span>No Credit Check Required</span>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-ink via-brand-charcoal to-brand-ink text-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-brand-forest/40 border border-brand-forest/50 px-3 py-1 rounded-full">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Your Estimated Payment</span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {formatMoney(monthlyPayment)}
                  <span className="text-lg font-normal text-slate-400">/mo</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Based on {formatMoney(downPayment)} down payment over {termMonths} months at {interestRate}% fixed annual interest.
                </p>
              </div>

              {/* Matching lots preview */}
              {matchingProperties.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Matching Available Parcels:
                  </span>
                  <div className="space-y-2">
                    {matchingProperties.map((prop) => (
                      <Link
                        key={prop.id}
                        href={`/products/${prop.handle}`}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs"
                      >
                        <span className="font-semibold text-white truncate min-w-0">
                          {prop.displayTitle}
                        </span>
                        <span className="font-extrabold text-emerald-300 shrink-0">
                          {formatMoney(prop.defaultPlan.monthlyPayment)}/mo
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href={`/land?maxMonthly=${monthlyPayment + 25}`}>
              <Button
                variant="forest"
                size="lg"
                className="w-full justify-center shadow-xl font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Browse Parcels Under {formatMoney(monthlyPayment + 25)}/mo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
