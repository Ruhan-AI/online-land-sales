import React from "react";
import Link from "next/link";
import { ShoppingCart, FileCheck2, MountainSnow, ShieldCheck, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      stepNumber: "01",
      icon: <ShoppingCart className="w-6 h-6 text-brand-forest" />,
      title: "Reserve Online in 2 Minutes",
      description:
        "Select your parcel, pick your customized monthly budget plan, and pay the affordable down payment + one-time doc fee through our secure checkout.",
    },
    {
      stepNumber: "02",
      icon: <FileCheck2 className="w-6 h-6 text-brand-blue" />,
      title: "Review & e-Sign Within 24 Hours",
      description:
        "Our closing team drafts your official Land Installment Contract and Promissory Note, delivering them directly to your email for easy digital signature.",
    },
    {
      stepNumber: "03",
      icon: <MountainSnow className="w-6 h-6 text-brand-clay" />,
      title: "Full Land Ownership & Usage",
      description:
        "Receive immediate legal rights to visit, camp, build, or homestead on your land while making simple monthly payments online. We record your Deed upon loan completion.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-brand-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3 py-1 rounded-full">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
            How Buying Land Works
          </h2>
          <p className="text-sm text-slate-600">
            No bank applications. No credit checks. No hidden closing costs. Just pure land ownership.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft flex flex-col justify-between space-y-6 group hover:shadow-hover transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-brand-sand shrink-0 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-slate-200 group-hover:text-brand-forest/30 transition-colors font-mono">
                    {step.stepNumber}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-ink">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border/60 text-xs font-semibold text-brand-forest flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Protected by 90-Day Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="text-center pt-4">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-ink hover:text-brand-blue transition-colors underline"
          >
            <span>Read full details on deeds, taxes, and loan servicing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
