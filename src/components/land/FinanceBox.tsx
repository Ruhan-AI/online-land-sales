"use client";

import React, { useState } from "react";
import { LandProperty, FinancingPlan } from "@/types/land";
import { formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Sparkles, HelpCircle } from "lucide-react";

interface FinanceBoxProps {
  property: LandProperty;
}

export function FinanceBox({ property }: FinanceBoxProps) {
  const { addToCart } = useStore();
  const [purchaseType, setPurchaseType] = useState<"financed" | "cash">("financed");
  const [selectedPlanId, setSelectedPlanId] = useState<string>(property.defaultPlan.id);

  const allPlans: FinancingPlan[] = [
    property.defaultPlan,
    ...(property.alternativePlans || []),
  ];

  const currentPlan =
    allPlans.find((p) => p.id === selectedPlanId) || property.defaultPlan;

  const handleReserve = () => {
    addToCart(property, currentPlan, purchaseType);
  };

  const isSold = property.status === "sold";

  return (
    <div className="bg-white border-2 border-brand-forest/20 rounded-2xl p-5 sm:p-6 shadow-card space-y-5 sm:space-y-6 lg:sticky lg:top-28">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest-light px-3 py-1 rounded-full flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-forest shrink-0" />
          <span>Guaranteed Seller Financing</span>
        </span>
        <span className="text-xs text-brand-muted font-medium">0% Credit Check</span>
      </div>

      {/* Financed vs. Cash Switcher */}
      <div className="grid grid-cols-2 p-1 bg-brand-sand rounded-xl border border-brand-border text-xs font-bold">
        <button
          onClick={() => setPurchaseType("financed")}
          className={`py-2.5 px-2 sm:px-3 rounded-lg transition-all text-[11px] sm:text-xs ${
            purchaseType === "financed"
              ? "bg-brand-forest text-white shadow-sm font-extrabold"
              : "text-slate-700 hover:text-brand-ink"
          }`}
        >
          Seller Financed
        </button>
        <button
          onClick={() => setPurchaseType("cash")}
          className={`py-2.5 px-2 sm:px-3 rounded-lg transition-all text-[11px] sm:text-xs ${
            purchaseType === "cash"
              ? "bg-brand-ink text-white shadow-sm font-extrabold"
              : "text-slate-700 hover:text-brand-ink"
          }`}
        >
          Discounted Cash
        </button>
      </div>

      {/* Main Economics Display */}
      {purchaseType === "financed" ? (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Monthly Payment Hero */}
          <div className="bg-brand-forest-light/40 border border-brand-forest/20 rounded-xl p-4 text-center space-y-1">
            <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
              Monthly Payment
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
              {formatMoney(currentPlan.monthlyPayment)}
              <span className="text-base font-normal text-slate-600">/mo</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {currentPlan.termMonths} Months @ {currentPlan.interestRate}% Fixed Interest
            </p>
          </div>

          {/* Plan Selector Options */}
          {allPlans.length > 1 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-brand-ink uppercase tracking-wider">
                Select Your Payment Plan:
              </label>
              <div className="space-y-2">
                {allPlans.map((plan) => {
                  const isSelected = plan.id === currentPlan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 text-xs ${
                        isSelected
                          ? "border-brand-forest bg-brand-forest-light/30 shadow-sm"
                          : "border-brand-border hover:bg-brand-sand-light"
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-brand-ink">{plan.name}</span>
                          {plan.badge && (
                            <span className="text-[10px] bg-brand-sand text-brand-ink font-semibold px-1.5 py-0.2 rounded">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-slate-500 block">
                          {formatMoney(plan.downPayment)} down • {formatMoney(plan.monthlyPayment)}/mo ({plan.termMonths} mo)
                        </span>
                      </div>
                      <div className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 border-brand-forest">
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-forest" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Detailed Fee Line Items */}
          <div className="space-y-2 text-xs border-t border-brand-border pt-4">
            <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
              <span>Down Payment:</span>
              <span className="font-semibold text-brand-ink">
                {formatMoney(currentPlan.downPayment)}
              </span>
            </div>
            <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
              <span>One-Time Document Prep Fee:</span>
              <span className="font-semibold text-brand-ink">
                {formatMoney(currentPlan.docFee)}
              </span>
            </div>
            <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
              <span>Total Land Price:</span>
              <span className="font-semibold text-brand-ink">
                {formatMoney(currentPlan.totalFinancedPrice)}
              </span>
            </div>
            <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
              <span>Estimated Property Taxes:</span>
              <span className="text-slate-600">
                ~{formatMoney(currentPlan.estimatedMonthlyTax)}/mo
              </span>
            </div>

            {/* Total Due Today */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm sm:text-base font-extrabold text-brand-ink pt-3 border-t border-dashed border-brand-border">
              <span>Total Due Today to Reserve:</span>
              <span className="text-brand-forest font-extrabold text-xl">
                {formatMoney(currentPlan.amountDueToday)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        // Cash Discount View
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-brand-sand-light border border-brand-border rounded-xl p-4 text-center space-y-1">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              One-Time Cash Price
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
              {formatMoney(property.cashPrice)}
            </div>
            {property.cashDiscountPercentage && (
              <span className="inline-block text-xs font-bold text-brand-forest bg-brand-forest-light px-2.5 py-0.5 rounded-full mt-1">
                Save {property.cashDiscountPercentage}% vs Financed Price
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs border-t border-brand-border pt-4">
            <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
              <span>One-Time Deed Recording & Doc Fee:</span>
              <span className="font-semibold text-brand-ink">
                {formatMoney(property.docFee)}
              </span>
            </div>
            <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
              <span>Deed Delivery:</span>
              <span className="font-semibold text-brand-forest">
                Special Warranty Deed within 14 days
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {isSold ? (
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-center bg-slate-100 text-slate-500 cursor-not-allowed border-slate-300"
            disabled
          >
            Property Sold (Join Waitlist)
          </Button>
        ) : (
          <Button
            variant="forest"
            size="lg"
            className="w-full justify-center shadow-lg text-base py-4 font-extrabold tracking-wide"
            onClick={handleReserve}
            icon={<Lock className="w-4 h-4" />}
          >
            {purchaseType === "financed"
              ? `Reserve for ${formatMoney(currentPlan.amountDueToday)} Today`
              : `Buy for ${formatMoney(property.cashPrice)} Cash`}
          </Button>
        )}

        <p className="text-[11px] text-center text-slate-500">
          Instant digital contract delivery within {property.contractDeliveryHours} hours.
        </p>
      </div>

      {/* Trust & Guarantee Box */}
      <div className="bg-brand-sand/50 rounded-xl p-3.5 border border-brand-border/60 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-bold text-brand-ink block">
            {property.guaranteeSummary}
          </span>
          <span className="text-slate-600 leading-relaxed block">
            Exchange your equity or receive a full refund if you change your mind within 90 days.
          </span>
        </div>
      </div>
    </div>
  );
}
