import React from "react";
import Link from "next/link";
import { CreditCard, ShieldCheck, Phone, ArrowUpRight, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MakeAPaymentPage() {
  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3.5 py-1 rounded-full">
            <CreditCard className="w-4 h-4 text-brand-blue" />
            <span>Existing Land Buyers</span>
          </div>
          <h1 className="text-[1.75rem] leading-tight xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight font-sans">
            Make Your Monthly Loan Payment
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Manage your active seller-financed land installment loan, view your current balance, or set up automatic ACH recurring payments.
          </p>
        </div>

        {/* 2 Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Option 1: Online Loan Portal */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-blue/30 shadow-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-ink">Online Borrower Portal</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Log in to your secure account to make a one-time credit/debit card payment, set up automated monthly ACH withdrawals, or check your remaining loan payoff balance.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://onlinelandsales.com/account"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center shadow-md font-bold"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Go to Borrower Portal Login
                </Button>
              </a>
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                <Lock className="w-3 h-3" />
                <span>Redirects to encrypted loan servicing system</span>
              </div>
            </div>
          </div>

          {/* Option 2: Pay by Phone or Check */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-sand text-brand-ink flex items-center justify-center font-bold">
                <Phone className="w-6 h-6 text-brand-forest" />
              </div>
              <h3 className="text-xl font-bold text-brand-ink">Pay by Phone or Mail</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Prefer to make your installment payment over the phone with a live representative, or send a certified check? Our team is happy to assist.
              </p>
              <div className="space-y-2 text-xs text-slate-700 pt-2">
                <p>
                  <strong>Call Phone Support:</strong> (800) 555-LAND
                </p>
                <p>
                  <strong>Support Hours:</strong> Mon–Fri 8:00 AM – 6:00 PM MST
                </p>
              </div>
            </div>

            <a href="tel:18005555263" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center font-bold"
                icon={<Phone className="w-4 h-4" />}
              >
                Call (800) 555-LAND
              </Button>
            </a>
          </div>
        </div>

        {/* Notice for new buyers */}
        <div className="bg-brand-sand-light rounded-2xl p-6 border border-brand-border text-center space-y-2">
          <h4 className="font-bold text-brand-ink text-sm">Looking to Buy a New Property?</h4>
          <p className="text-xs text-slate-600">
            If you have not reserved a parcel yet, visit our active catalog to find your dream lot.
          </p>
          <Link href="/land" className="inline-block pt-1 text-xs font-bold text-brand-blue hover:underline">
            Browse All Available Land →
          </Link>
        </div>
      </div>
    </div>
  );
}
