import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white/90 pt-16 pb-12 border-t border-brand-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-forest/20 flex items-center justify-center shrink-0 border border-brand-forest/30">
              <Compass className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Founded in 2004</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Over two decades of trusted direct land sales with 55,000+ acres successfully transferred to American families.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center shrink-0 border border-brand-blue/30">
              <ShieldCheck className="w-6 h-6 text-brand-blue-light" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Guaranteed Financing</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Zero bank qualifying, zero credit checks, and zero prepayment penalties. Everyone qualifies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">90-Day Money-Back</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Visit your property in person with 100% peace of mind. Exchange or refund if it’s not the perfect fit.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-sand/10 flex items-center justify-center shrink-0 border border-white/10">
              <Phone className="w-6 h-6 text-brand-sand" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Direct Human Support</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Speak directly with real land specialists who know the terrain, coordinates, and county regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-white/10">
          {/* Brand & Contact */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-forest flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Online Land Sales
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Making American land ownership affordable, transparent, and accessible to everyone through guaranteed direct seller financing.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-blue" />
                <a href="tel:18005555263" className="hover:text-white font-medium">
                  (800) 555-LAND / (800) 555-5263
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue" />
                <a href="mailto:support@onlinelandsales.com" className="hover:text-white">
                  support@onlinelandsales.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-white tracking-wider uppercase">Explore</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/land" className="hover:text-white transition-colors">
                  All Available Land
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white transition-colors">
                  Interactive Land Map
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How Buying Works
                </Link>
              </li>
              <li>
                <Link href="/financing" className="hover:text-white transition-colors">
                  Financing Calculator
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="hover:text-white transition-colors">
                  90-Day Guarantee
                </Link>
              </li>
              <li>
                <Link href="/learning-center" className="hover:text-white transition-colors">
                  Learning Center
                </Link>
              </li>
            </ul>
          </div>

          {/* By State */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-white tracking-wider uppercase">Top States</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/land?state=Arizona" className="hover:text-white transition-colors">
                  Arizona Land For Sale
                </Link>
              </li>
              <li>
                <Link href="/land?state=Colorado" className="hover:text-white transition-colors">
                  Colorado Mountain Lots
                </Link>
              </li>
              <li>
                <Link href="/land?state=Texas" className="hover:text-white transition-colors">
                  Texas Desert Acreage
                </Link>
              </li>
              <li>
                <Link href="/land?state=Florida" className="hover:text-white transition-colors">
                  Florida Lake Parcels
                </Link>
              </li>
              <li>
                <Link href="/land?state=Nevada" className="hover:text-white transition-colors">
                  Nevada High Desert
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-white tracking-wider uppercase">Buyers & Loans</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/make-a-payment" className="text-brand-blue-light hover:text-white font-medium flex items-center gap-1">
                  <span>Make a Loan Payment</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <a href="https://onlinelandsales.com/account" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Account Portal Login
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Schedule a Consultation
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="hover:text-white transition-colors">
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
            <p>© {new Date().getFullYear()} Online Land Sales, LLC. All rights reserved.</p>
            <div className="flex items-center gap-6 text-slate-400">
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
