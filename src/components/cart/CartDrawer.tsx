"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShieldCheck, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatMoney, formatAcres, imageOf } from "@/lib/utils";
import { createShopifyCheckout } from "@/lib/shopify";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart } = useStore();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Keep the page behind the drawer from scrolling under a touch drag
  useEffect(() => {
    if (!isCartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const item = cart[0]; // Single parcel reservation model

  const handleCheckout = async () => {
    if (!item || !termsAgreed) return;
    setIsCheckingOut(true);
    try {
      const response = await createShopifyCheckout(cart);
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    } catch (e) {
      console.error("Checkout error", e);
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl border-l border-brand-border flex flex-col h-full animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between gap-3 bg-brand-sand-light/60 shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-brand-ink">Your Land Reservation</h3>
              {cart.length > 0 && (
                <span className="text-xs bg-brand-forest/10 text-brand-forest font-semibold px-2 py-0.5 rounded-full">
                  1 Lot
                </span>
              )}
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="flex items-center justify-center w-10 h-10 -mr-2 shrink-0 text-slate-400 hover:text-brand-ink rounded-lg hover:bg-brand-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-6">
            {!item ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center mx-auto text-brand-muted">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-brand-ink text-base">Your cart is empty</h4>
                <p className="text-xs text-brand-muted max-w-xs mx-auto">
                  Browse our available properties to find your ideal homestead, cabin site, or desert retreat.
                </p>
                <Link
                  href="/land"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-brand-ink text-white text-xs font-semibold py-2.5 px-5 rounded-xl hover:bg-brand-charcoal transition-colors"
                >
                  <span>Explore Available Land</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Item Card */}
                <div className="border border-brand-border rounded-2xl p-4 bg-brand-canvas space-y-3">
                  <div className="flex gap-3">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-brand-border">
                      <Image
                        src={imageOf(item.property.primaryImage)}
                        alt={item.property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-bold text-brand-blue uppercase">
                          {item.property.propertyCode}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.property.id)}
                          className="flex items-center justify-center w-9 h-9 -mt-2 -mr-1 shrink-0 text-slate-400 hover:text-brand-clay transition-colors"
                          title="Remove item"
                          aria-label="Remove item from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-bold text-sm text-brand-ink truncate">
                        {item.property.displayTitle}
                      </h4>
                      <p className="text-xs text-brand-muted">
                        {formatAcres(item.property.acres)} • {item.property.county}, {item.property.stateCode}
                      </p>
                      <div className="mt-1">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-forest-light text-brand-forest">
                          {item.purchaseType === "cash" ? "Discounted Cash Purchase" : item.selectedPlan.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Breakdown Table */}
                  <div className="border-t border-brand-border pt-3 space-y-1.5 text-xs">
                    <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
                      <span>Total Land Price:</span>
                      <span className="font-semibold text-brand-ink">
                        {formatMoney(
                          item.purchaseType === "cash"
                            ? item.property.cashPrice
                            : item.selectedPlan.totalFinancedPrice
                        )}
                      </span>
                    </div>

                    {item.purchaseType === "financed" && (
                      <>
                        <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
                          <span>Monthly Payment:</span>
                          <span className="font-semibold text-brand-forest">
                            {formatMoney(item.selectedPlan.monthlyPayment)} / month ({item.selectedPlan.termMonths} mo @ {item.selectedPlan.interestRate}%)
                          </span>
                        </div>
                        <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
                          <span>Down Payment:</span>
                          <span>{formatMoney(item.selectedPlan.downPayment)}</span>
                        </div>
                        <div className="flex flex-wrap justify-between gap-x-3 text-slate-600">
                          <span>One-time Doc Prep Fee:</span>
                          <span>{formatMoney(item.selectedPlan.docFee)}</span>
                        </div>
                      </>
                    )}

                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-brand-ink font-bold pt-2 border-t border-dashed border-brand-border text-sm">
                      <span>Amount Due Today:</span>
                      <span className="text-brand-forest font-extrabold">
                        {formatMoney(item.amountDueToday)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust & Next Steps Accordion */}
                <div className="bg-brand-sand/60 rounded-xl p-3.5 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-bold text-brand-ink">
                    <CheckCircle2 className="w-4 h-4 text-brand-forest" />
                    <span>What Happens Next?</span>
                  </div>
                  <ul className="space-y-1 pl-6 list-disc text-slate-600">
                    <li>Instant digital receipt & reservation confirmation.</li>
                    <li>Official Deed Contract sent for e-signature within 24 hours.</li>
                    <li>Full possessory rights to use and explore your property immediately.</li>
                  </ul>
                </div>

                {/* Terms and Consent Checkbox */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="w-5 h-5 mt-px shrink-0 rounded border-slate-300 text-brand-forest focus:ring-brand-forest"
                    />
                    <span className="text-xs text-slate-600 leading-tight">
                      I agree to the{" "}
                      <Link href="/guarantee" className="text-brand-blue underline" target="_blank">
                        Terms of Reservation
                      </Link>{" "}
                      and acknowledge the{" "}
                      <strong className="text-brand-ink font-semibold">
                        money-back guarantee
                      </strong>
                      .
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {item && (
            <div className="p-4 sm:p-5 border-t border-brand-border bg-white space-y-3 safe-area-inset-bottom">
              <div className="flex items-center justify-between text-sm font-bold text-brand-ink">
                <span>Total Due Right Now:</span>
                <span className="text-lg text-brand-forest font-extrabold">
                  {formatMoney(item.amountDueToday)}
                </span>
              </div>

              <Button
                variant="forest"
                size="lg"
                className="w-full justify-center shadow-lg"
                disabled={!termsAgreed || isCheckingOut}
                onClick={handleCheckout}
                icon={isCheckingOut ? undefined : <Lock className="w-4 h-4" />}
              >
                {isCheckingOut ? "Connecting to Checkout..." : "Proceed to Secure Checkout"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-brand-muted">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>256-Bit Encrypted Hosted Shopify Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
