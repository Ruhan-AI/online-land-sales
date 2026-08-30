import React from "react";
import Link from "next/link";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { STATES_IN_INVENTORY } from "@/lib/data/properties";
import { BrandMark } from "@/components/brand/BrandMark";

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white/90 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-brand-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 sm:pb-12 border-b border-white/10">
          {/* Brand & Contact */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark className="w-10 h-10 shrink-0 rounded-lg" />
              <span className="font-extrabold text-lg text-white tracking-tight">
                Online Land Sales, LLC
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Selling U.S. land direct to buyers since 2004, with owner financing
              handled in-house.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                <a href="tel:15304664094" className="hover:text-white font-medium">
                  (530) 466-4094
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <a href="mailto:service@onlinelandsales.com" className="hover:text-white break-all">
                  service@onlinelandsales.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-white tracking-wider uppercase">Explore</h5>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>
                <Link href="/land" className="block py-1.5 hover:text-white transition-colors">
                  All Available Land
                </Link>
              </li>
              <li>
                <Link href="/map" className="block py-1.5 hover:text-white transition-colors">
                  Interactive Land Map
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="block py-1.5 hover:text-white transition-colors">
                  How Buying Works
                </Link>
              </li>
              <li>
                <Link href="/financing" className="block py-1.5 hover:text-white transition-colors">
                  Financing Calculator
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="block py-1.5 hover:text-white transition-colors">
                  Our Guarantee
                </Link>
              </li>
              <li>
                <Link href="/learning-center" className="block py-1.5 hover:text-white transition-colors">
                  Learning Center
                </Link>
              </li>
            </ul>
          </div>

          {/* By State */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-white tracking-wider uppercase">Top States</h5>
            {/* Driven by real inventory so we never link to an empty state */}
            <ul className="space-y-1 text-xs text-slate-400">
              {STATES_IN_INVENTORY.slice(0, 6).map(({ state, count }) => (
                <li key={state}>
                  <Link
                    href={`/land?state=${encodeURIComponent(state)}`}
                    className="flex items-center justify-between gap-2 py-1.5 hover:text-white transition-colors"
                  >
                    <span>{state} Land</span>
                    <span className="text-[10px] text-slate-500">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-white tracking-wider uppercase">Buyers & Loans</h5>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>
                <Link href="/make-a-payment" className="flex items-center gap-1 py-1.5 text-brand-blue-light hover:text-white font-medium">
                  <span>Make a Loan Payment</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <a href="https://onlinelandsales.com/account" target="_blank" rel="noopener noreferrer" className="block py-1.5 hover:text-white transition-colors">
                  Account Portal Login
                </a>
              </li>
              <li>
                <Link href="/contact" className="block py-1.5 hover:text-white transition-colors">
                  Schedule a Consultation
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="block py-1.5 hover:text-white transition-colors">
                  Refund & Exchange Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Regulatory Disclaimer */}
        <div className="pt-8 space-y-4 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">Disclaimer:</strong> Online Land Sales, LLC is a direct principal owner and seller of real property, not a real estate brokerage or lending bank. All property boundaries, GIS maps, elevation models, satellite overlays, and 360-degree virtual tour hotspots displayed on this website are approximate and intended for preliminary illustrative reference only. Prospective buyers are encouraged to perform their own due diligence, review official county recorded plats and surveys, and confirm buildability and zoning with relevant county jurisdictions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs text-slate-400">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Online Land Sales, LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-slate-400">
              <Link href="/guarantee" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/guarantee" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/guarantee" className="hover:text-white">
                Financing Disclosures
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
