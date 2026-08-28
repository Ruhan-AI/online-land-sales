"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, FileText, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const propertyCode = searchParams.get("property") || "AZ-MOH-215-04";
  const title = searchParams.get("title") || "Land Reservation";
  const dueToday = searchParams.get("dueToday") || "398";
  const plan = searchParams.get("plan") || "Guaranteed Seller Financing";

  return (
    <div className="bg-brand-canvas min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-brand-border shadow-card text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-forest uppercase tracking-wider bg-brand-forest-light px-3 py-1 rounded-full">
              Reservation Confirmed
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
              Congratulations on Your Land Reservation!
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your down payment & doc fee of <strong>${dueToday}</strong> for{" "}
              <strong className="text-brand-ink">{title} ({propertyCode})</strong> has been successfully received.
            </p>
          </div>

          {/* Timeline of What Happens Next */}
          <div className="bg-brand-sand-light rounded-2xl p-4 sm:p-6 border border-brand-border text-left space-y-4">
            <h3 className="font-bold text-sm text-brand-ink flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-blue" />
              <span>What Happens Next? (Next 24 Hours)</span>
            </h3>

            <ol className="space-y-3 text-xs text-slate-700 list-decimal pl-5">
              <li>
                <strong>Contract Preparation:</strong> Our closing team drafts your official Land Installment Contract, Promissory Note, and County Parcel Details.
              </li>
              <li>
                <strong>Digital e-Signature:</strong> You will receive a secure DocuSign link in your email within 24 hours to review and sign.
              </li>
              <li>
                <strong>Immediate Land Access:</strong> As soon as contracts are signed, you receive full possessory rights to visit, camp, or plan your build.
              </li>
            </ol>
          </div>

          {/* Support Guarantee & Contact */}
          <div className="border-t border-brand-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-forest shrink-0" />
              <span>90-Day 100% Satisfaction Guarantee Active</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="tel:18005555263" className="font-bold text-brand-ink hover:text-brand-blue flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <span>(800) 555-LAND</span>
              </a>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/land">
              <Button variant="forest" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Explore More Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
