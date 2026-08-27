import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, RotateCcw, HeartHandshake, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GuaranteePage() {
  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Peace of Mind Commitment</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-ink tracking-tight font-sans">
            Our 90-Day Satisfaction Guarantee
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We want you to love your American land. That's why we back every parcel with an ironclad 90-day money-back guarantee and equity exchange program.
          </p>
        </div>

        {/* 2 Core Protection Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Full Refund */}
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500/30 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-ink">Option 1: 100% Principal Refund</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If within 90 days of reserving your property you visit the parcel or change your mind for any reason, we will refund 100% of your principal payments. No questions asked and no hard feelings.
            </p>
          </div>

          {/* Pillar 2: 100% Equity Exchange */}
          <div className="bg-white rounded-3xl p-8 border-2 border-brand-blue/30 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-ink">Option 2: 100% Equity Exchange</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Found another property in our inventory that better suits your vision? You can roll 100% of your invested equity (including down payment and monthly principal) into any other active parcel anytime within 90 days.
            </p>
          </div>
        </div>

        {/* How to Request a Guarantee Claim */}
        <div className="bg-brand-sand-light rounded-3xl p-8 sm:p-10 border border-brand-border space-y-6">
          <h2 className="text-2xl font-bold text-brand-ink">
            How to Request an Exchange or Refund
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              1. <strong>Contact Support:</strong> Call or text our support line at <strong>(800) 555-LAND</strong> or email <strong>support@onlinelandsales.com</strong> with your property code and full name.
            </p>
            <p>
              2. <strong>Simple Verification:</strong> We confirm your purchase date within the 90-day window and ensure real estate property taxes remain current.
            </p>
            <p>
              3. <strong>Instant Resolution:</strong> We execute your cancellation agreement and process your full refund back to your original payment method within 5–7 business days, or instantly apply your equity to your newly selected lot.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <Link href="/land">
            <Button variant="forest" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
              Browse Available Land with Zero Risk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
