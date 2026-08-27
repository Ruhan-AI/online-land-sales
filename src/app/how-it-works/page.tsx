import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  FileCheck2,
  MountainSnow,
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowRight,
  FileText,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS } from "@/lib/data/faqs";

export default function HowItWorksPage() {
  const buyingFaqs = FAQS.filter((f) => f.category === "Buying Process" || f.category === "Guarantees & Title");

  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3 py-1 rounded-full">
            <span>Direct Land Ownership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-ink tracking-tight font-sans">
            How Buying Land Works
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            At Online Land Sales, we own every single property in our inventory free and clear. That means no banks, no credit approvals, and no complicated loan applications.
          </p>
        </div>

        {/* 3 Step Interactive Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-brand-ink text-center">
            The 3-Step Purchase Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-sand text-brand-forest flex items-center justify-center font-extrabold text-xl">
                1
              </div>
              <h3 className="text-lg font-bold text-brand-ink">Reserve Your Parcel</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Find the property you love, select your preferred monthly installment plan, and pay the affordable down payment + one-time document fee online.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-sand text-brand-blue flex items-center justify-center font-extrabold text-xl">
                2
              </div>
              <h3 className="text-lg font-bold text-brand-ink">e-Sign Within 24 Hours</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our closing team drafts your official Land Installment Contract and Promissory Note, emailing them for quick digital signature (DocuSign).
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-sand text-brand-clay flex items-center justify-center font-extrabold text-xl">
                3
              </div>
              <h3 className="text-lg font-bold text-brand-ink">Enjoy Your Land</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You receive full rights to use, camp, or build on your land immediately. We record the official Deed in your name once the loan is paid off.
              </p>
            </div>
          </div>
        </div>

        {/* Guaranteed Seller Financing Breakdown */}
        <div className="bg-gradient-to-br from-brand-ink via-brand-charcoal to-brand-ink text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-brand-forest/40 px-3 py-1 rounded-full">
              Zero Credit Checks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why We Can Guarantee Your Financing
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Traditional banks rarely lend money for vacant, raw land. Because Online Land Sales is the direct property owner, we can act as the lender and offer fixed, affordable financing to every buyer regardless of credit history.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>100% Guaranteed Approval (No Credit Bureau Inquiries)</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Zero Prepayment Penalties & Early Payoff Discounts</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Fixed Interest Rates That Never Increase</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Automatic Online Portal & Automated ACH / Card Billing</span>
            </div>
          </div>
        </div>

        {/* Deed Transfer & Legal Ownership */}
        <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-soft space-y-6">
          <h2 className="text-2xl font-bold text-brand-ink flex items-center gap-2">
            <Award className="w-6 h-6 text-brand-forest" />
            <span>How Deed Transfer & Title Recording Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-5 rounded-2xl bg-brand-sand-light border border-brand-border space-y-2">
              <h4 className="font-bold text-brand-ink text-base">Discounted Cash Purchases</h4>
              <p>
                When you purchase for cash, we prepare an official <strong>Special Warranty Deed</strong> or <strong>Warranty Deed</strong> and submit it directly to the County Clerk & Recorder within 14 business days. You receive the certified recorded deed directly from the county.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-brand-sand-light border border-brand-border space-y-2">
              <h4 className="font-bold text-brand-ink text-base">Seller Financed Purchases</h4>
              <p>
                You execute an official <strong>Installment Land Contract</strong> granting you full equitable title and possessory rights to use, camp, improve, and enjoy the land. Upon making your final monthly payment, we record the Warranty Deed in your name.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-brand-ink text-center">
            Common Buying Process Questions
          </h2>
          <Accordion
            items={buyingFaqs.map((faq, i) => ({
              id: `faq-${i}`,
              title: faq.question,
              content: <p>{faq.answer}</p>,
            }))}
          />
        </div>

        {/* CTA Bar */}
        <div className="text-center pt-6">
          <Link href="/land">
            <Button variant="forest" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
              Browse Available Land Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
