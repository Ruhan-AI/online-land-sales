import React from "react";
import Link from "next/link";
import { Phone, ShieldCheck, CreditCard, User, Clock } from "lucide-react";

export function UtilityBar() {
  return (
    <div className="bg-brand-ink text-white/90 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left trust signal & phone */}
        <div className="flex items-center gap-4 lg:gap-6 min-w-0">
          <a
            href="tel:15304664094"
            className="flex items-center gap-2 hover:text-brand-blue-light transition-colors font-medium whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-brand-blue shrink-0" />
            <span>Call / Text: (530) 466-4094</span>
          </a>
          <div className="hidden xl:flex items-center gap-1.5 text-slate-400 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>24/7 Service</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-emerald-400 font-medium whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Money-back guarantee</span>
          </div>
        </div>

        {/* Right action links */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0 whitespace-nowrap">
          <Link
            href="/make-a-payment"
            className="flex items-center gap-1.5 hover:text-white transition-colors text-slate-300"
          >
            <CreditCard className="w-3.5 h-3.5 text-brand-blue shrink-0" />
            <span>Make a Payment</span>
          </Link>
          <span className="hidden lg:inline text-white/20">|</span>
          <Link
            href="/contact"
            className="hidden lg:inline hover:text-white transition-colors text-slate-300"
          >
            Need Help?
          </Link>
          <span className="text-white/20">|</span>
          <a
            href="https://onlinelandsales.com/account"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors text-slate-300"
          >
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Buyer Portal</span>
          </a>
        </div>
      </div>
    </div>
  );
}
