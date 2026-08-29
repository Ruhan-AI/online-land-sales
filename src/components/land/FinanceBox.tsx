"use client";

import React from "react";
import { LandProperty } from "@/types/land";
import { formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Lock, Sparkles, Gavel, ExternalLink } from "lucide-react";

interface FinanceBoxProps {
  property: LandProperty;
}

/**
 * Purchase panel.
 *
 * Every figure here comes from the seller's own listing: the monthly payment,
 * down payment, total property price, rate and term. We show only what the
 * listing states — no derived "cash discount" percentages, because the source
 * publishes a single property price rather than separate cash/financed prices.
 */
export function FinanceBox({ property }: FinanceBoxProps) {
  const { addToCart } = useStore();
  const plan = property.defaultPlan;

  const isCashOnly = property.saleType === "cash_discount" || plan.monthlyPayment <= 0;
  const isSold = property.status === "sold";
  const isAuction = !!plan.isAuctionBid;

  const handleReserve = () => {
    addToCart(property, plan, isCashOnly ? "cash" : "financed");
  };

  return (
    <div className="bg-white border-2 border-brand-forest/20 rounded-2xl p-5 sm:p-6 shadow-card space-y-5 sm:space-y-6 lg:sticky lg:top-28">
      {/* Header badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest-light px-3 py-1 rounded-full flex items-center gap-1.5">
          {isAuction ? (
            <Gavel className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{isCashOnly ? "Cash Purchase" : plan.name}</span>
        </span>
        <span className="text-xs text-brand-muted font-medium">No credit check</span>
      </div>

      {/* Headline figure */}
      {isCashOnly ? (
        <div className="bg-brand-sand-light border border-brand-border rounded-xl p-4 text-center space-y-1">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Property Price
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            {formatMoney(property.cashPrice)}
          </div>
          <p className="text-xs text-slate-600 font-medium">
            This parcel is offered for cash purchase.
          </p>
        </div>
      ) : (
        <div className="bg-brand-forest-light/40 border border-brand-forest/20 rounded-xl p-4 text-center space-y-1">
          <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
            Monthly Payment
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
            {formatMoney(plan.monthlyPayment)}
            <span className="text-base font-normal text-slate-600">/mo</span>
          </div>
          {(plan.termMonths || plan.interestRate) && (
            <p className="text-xs text-slate-600 font-medium">
              {plan.termMonths ? `${plan.termMonths} months` : null}
              {plan.termMonths && plan.interestRate ? " @ " : null}
              {plan.interestRate ? `${plan.interestRate}% APR` : null}
            </p>
          )}
        </div>
      )}

      {/* Line items — each rendered only when the listing supplies it */}
      <div className="space-y-2 text-xs border-t border-brand-border pt-4">
        {!isCashOnly && !plan.isFullPayment && (
          <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
            <span>Down payment:</span>
            <span className="font-semibold text-brand-ink">
              {isAuction && plan.downPayment === 0
                ? "Winning bid"
                : formatMoney(plan.downPayment)}
            </span>
          </div>
        )}

        {property.cashPrice != null && !isCashOnly && (
          <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
            <span>Total property price:</span>
            <span className="font-semibold text-brand-ink">
              {formatMoney(property.cashPrice)}
            </span>
          </div>
        )}

        {plan.interestRate != null && (
          <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
            <span>Interest rate:</span>
            <span className="font-semibold text-brand-ink">{plan.interestRate}% APR</span>
          </div>
        )}

        {property.annualTaxes != null && (
          <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
            <span>Property taxes:</span>
            <span className="text-slate-600">
              {formatMoney(property.annualTaxes)} / year
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm sm:text-base font-extrabold text-brand-ink pt-3 border-t border-dashed border-brand-border">
          <span>Due at checkout:</span>
          <span className="text-brand-forest font-extrabold text-xl">
            {isCashOnly
              ? formatMoney(property.cashPrice)
              : isAuction && plan.amountDueToday === 0
                ? "Winning bid"
                : formatMoney(plan.amountDueToday)}
          </span>
        </div>

        {!isCashOnly && (
          <p className="text-[11px] text-slate-500 pt-1">
            {plan.isFullPayment
              ? "This parcel is listed to be paid in full at checkout."
              : "Checkout bills the down payment only. The balance is paid monthly."}
          </p>
        )}
      </div>

      {/* Early payoff incentive — only when the listing states one */}
      {property.earlyPayoffDiscountPercent != null && (
        <div className="bg-brand-blue-light/60 rounded-xl p-3 border border-brand-blue/20 text-xs text-brand-blue-dark font-semibold">
          {property.earlyPayoffDiscountPercent}% discount on the remaining balance
          if you pay off early.
        </div>
      )}

      {/* Action */}
      <div className="space-y-3">
        {isSold ? (
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-center bg-slate-100 text-slate-500 cursor-not-allowed border-slate-300"
            disabled
          >
            No longer available
          </Button>
        ) : (
          <Button
            variant="forest"
            size="lg"
            className="w-full justify-center shadow-lg text-base py-4 font-extrabold tracking-wide"
            onClick={handleReserve}
            icon={<Lock className="w-4 h-4" />}
          >
            {isCashOnly
              ? `Buy for ${formatMoney(property.cashPrice)}`
              : isAuction
                ? "Reserve this parcel"
                : `Reserve for ${formatMoney(plan.amountDueToday)}`}
          </Button>
        )}

        {property.sourceUrl && (
          <a
            href={property.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-brand-blue hover:underline"
          >
            <span>View this listing on our store</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        )}
      </div>

      {/* Guarantee — wording matches the seller's published terms */}
      <div className="bg-brand-sand/50 rounded-xl p-3.5 border border-brand-border/60 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-bold text-brand-ink block">
            Satisfaction guarantee
          </span>
          <span className="text-slate-600 leading-relaxed block">
            If you are not satisfied with the property, your money back. On
            financing agreements the refund covers principal paid, not interest
            and fees.
          </span>
        </div>
      </div>
    </div>
  );
}
