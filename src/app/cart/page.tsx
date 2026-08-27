"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatMoney, formatAcres } from "@/lib/utils";
import { createShopifyCheckout } from "@/lib/shopify";
import { Button } from "@/components/ui/Button";
import { Trash2, ShieldCheck, Lock, CheckCircle2, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart } = useStore();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const item = cart[0];

  const handleCheckout = async () => {
    if (!item || !termsAgreed) return;
    setIsCheckingOut(true);
    try {
      const res = await createShopifyCheckout(cart);
      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      }
    } catch (e) {
      console.error(e);
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-brand-ink tracking-tight font-sans">
          Your Property Reservation Cart
        </h1>

        {!item ? (
          <div className="bg-white rounded-3xl p-12 border border-brand-border text-center space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center mx-auto text-brand-muted">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-ink">Your cart is currently empty</h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-sm mx-auto">
              You have not selected any parcels yet. Explore our active inventory of seller-financed land with guaranteed approval.
            </p>
            <Link href="/land">
              <Button variant="forest" size="lg" className="shadow-md font-bold mt-2">
                Browse Available Land Parcels
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Item Breakdown */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-6">
              <div className="flex gap-4">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-brand-border">
                  <Image
                    src={item.property.primaryImage}
                    alt={item.property.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-brand-blue uppercase font-mono">
                      {item.property.propertyCode}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.property.id)}
                      className="text-slate-400 hover:text-brand-clay transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-base text-brand-ink truncate">
                    {item.property.displayTitle}
                  </h3>
                  <p className="text-xs text-brand-muted">
                    {formatAcres(item.property.acres)} • {item.property.county}, {item.property.stateCode}
                  </p>
                  <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-brand-forest-light text-brand-forest">
                    {item.purchaseType === "cash" ? "Discounted Cash Purchase" : item.selectedPlan.name}
                  </span>
                </div>
              </div>

              {/* Terms Table */}
              <div className="border-t border-brand-border pt-4 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Total Purchase Price:</span>
                  <span className="font-bold text-brand-ink">
                    {formatMoney(
                      item.purchaseType === "cash"
                        ? item.property.cashPrice
                        : item.selectedPlan.totalFinancedPrice
                    )}
                  </span>
                </div>

                {item.purchaseType === "financed" && (
                  <>
                    <div className="flex justify-between">
                      <span>Monthly Installment:</span>
                      <span className="font-bold text-brand-forest">
                        {formatMoney(item.selectedPlan.monthlyPayment)} / month ({item.selectedPlan.termMonths} mo @ {item.selectedPlan.interestRate}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Down Payment (Applies to Principal):</span>
                      <span>{formatMoney(item.selectedPlan.downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Document Prep Fee (One-Time):</span>
                      <span>{formatMoney(item.selectedPlan.docFee)}</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between text-base font-extrabold text-brand-ink pt-3 border-t border-dashed border-brand-border">
                  <span>Total Amount Due Today:</span>
                  <span className="text-xl text-brand-forest">
                    {formatMoney(item.amountDueToday)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Checkout Box */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-6">
              <h3 className="font-bold text-lg text-brand-ink">Order Summary</h3>

              <div className="bg-brand-sand/50 rounded-2xl p-4 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-bold text-brand-ink">
                  <ShieldCheck className="w-4 h-4 text-brand-forest" />
                  <span>90-Day Money-Back Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Full refund or 100% equity exchange if you change your mind within 90 days.
                </p>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-forest focus:ring-brand-forest"
                />
                <span className="text-xs text-slate-600 leading-tight">
                  I agree to the{" "}
                  <Link href="/guarantee" className="text-brand-blue underline" target="_blank">
                    Terms of Reservation
                  </Link>{" "}
                  and acknowledge that contracts will be delivered via digital signature within 24 hours.
                </span>
              </label>

              <Button
                variant="forest"
                size="lg"
                className="w-full justify-center shadow-lg font-bold py-4 text-base"
                disabled={!termsAgreed || isCheckingOut}
                onClick={handleCheckout}
                icon={<Lock className="w-4 h-4" />}
              >
                {isCheckingOut ? "Connecting to Checkout..." : "Proceed to Shopify Checkout"}
              </Button>

              <div className="text-center text-[11px] text-brand-muted flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted 256-bit secure checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
