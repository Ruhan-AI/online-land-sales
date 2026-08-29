import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GuaranteePage() {
  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-[1.75rem] leading-tight xs:text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
            Our guarantee
          </h1>
        </div>

        {/* The guarantee, in the seller's own words */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-forest shrink-0 mt-0.5" />
            <blockquote className="text-base sm:text-lg text-brand-ink leading-relaxed font-medium">
              &ldquo;We guarantee your complete satisfaction with Online Land
              Sales LLC properties, or your money back — on financing agreements
              this refund is of the principal, and not the interest and
              fees.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* What that means in practice */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-ink">What this covers</h2>
          <ul className="space-y-3 text-sm text-slate-700 leading-relaxed list-disc pl-5">
            <li>
              If you are not satisfied with the property, you can request your
              money back.
            </li>
            <li>
              On an owner-financed agreement, the refund covers the{" "}
              <strong>principal you have paid</strong> — it does not include
              interest or fees.
            </li>
          </ul>
        </div>

        {/* Honest about what we don't publish here */}
        <div className="bg-brand-sand-light rounded-2xl p-5 sm:p-6 border border-brand-border space-y-3">
          <h2 className="text-base font-bold text-brand-ink">
            Ask us for the specifics before you buy
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            The exact claim window, the process, and how long a refund takes are
            set out in your purchase agreement. We would rather you get those
            details from us directly than read an approximation here — call or
            email before you commit and we will walk you through them.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <a
              href="tel:15304664094"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-sand text-brand-ink text-xs font-bold py-3 px-4 rounded-xl border border-brand-border transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-brand-blue shrink-0" />
              <span>(530) 466-4094</span>
            </a>
            <a
              href="mailto:service@onlinelandsales.com"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-sand text-brand-ink text-xs font-bold py-3 px-4 rounded-xl border border-brand-border transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="break-all">service@onlinelandsales.com</span>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Link href="/land" className="inline-block">
            <Button
              variant="forest"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Browse available land
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
