"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Phone,
  Search,
  Layers,
  Sparkles,
} from "lucide-react";
import { UtilityBar } from "./UtilityBar";
import { MegaMenu } from "./MegaMenu";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen, savedPropertyIds, setIsCompareModalOpen } = useStore();

  const totalCartCount = cart.length;
  const savedCount = savedPropertyIds.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-soft transition-all">
      <UtilityBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-ink via-brand-forest to-brand-blue flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-brand-ink font-sans">
                  Online Land Sales
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-forest/10 text-brand-forest px-1.5 py-0.5 rounded">
                  Est. 2004
                </span>
              </div>
              <span className="text-[11px] font-medium text-brand-muted tracking-wide">
                Guaranteed Seller Financing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-brand-ink">
            {/* Browse Land with MegaMenu */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={cn(
                  "flex items-center gap-1.5 py-2 px-3.5 rounded-xl hover:bg-brand-sand transition-colors",
                  (isMegaMenuOpen || pathname === "/land") && "bg-brand-sand text-brand-blue"
                )}
              >
                <span>Browse Land</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-brand-muted",
                    isMegaMenuOpen && "rotate-180 text-brand-blue"
                  )}
                />
              </button>
            </div>

            <Link
              href="/map"
              className={cn(
                "flex items-center gap-1.5 py-2 px-3.5 rounded-xl hover:bg-brand-sand transition-colors",
                pathname === "/map" && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              <Compass className="w-4 h-4 text-brand-forest" />
              <span>Map Search</span>
            </Link>

            <Link
              href="/how-it-works"
              className={cn(
                "py-2 px-3.5 rounded-xl hover:bg-brand-sand transition-colors",
                pathname === "/how-it-works" && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              How It Works
            </Link>

            <Link
              href="/financing"
              className={cn(
                "py-2 px-3.5 rounded-xl hover:bg-brand-sand transition-colors",
                pathname === "/financing" && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              Financing
            </Link>

            <Link
              href="/guarantee"
              className={cn(
                "py-2 px-3.5 rounded-xl hover:bg-brand-sand transition-colors",
                pathname === "/guarantee" && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              90-Day Guarantee
            </Link>

            <Link
              href="/learning-center"
              className={cn(
                "py-2 px-3.5 rounded-xl hover:bg-brand-sand transition-colors",
                pathname.startsWith("/learning-center") && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              Learn
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Quick Link */}
            <Link
              href="/land"
              className="p-2.5 text-slate-600 hover:text-brand-ink hover:bg-brand-sand rounded-xl transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold"
              title="Search Land"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Find Land</span>
            </Link>

            {/* Compare / Saved properties */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative p-2.5 text-slate-600 hover:text-brand-ink hover:bg-brand-sand rounded-xl transition-colors"
              title="Saved & Compare Properties"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-clay text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Cart Reservation Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-brand-ink hover:bg-brand-charcoal text-white text-xs sm:text-sm font-semibold py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 text-brand-blue-light" />
              <span>Cart</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-forest text-white text-[11px] font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-brand-ink hover:bg-brand-sand rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 font-semibold text-brand-ink">
            <Link
              href="/land"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-brand-sand"
            >
              Browse All Land
            </Link>
            <Link
              href="/map"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-brand-sand text-brand-forest"
            >
              <span>Interactive Map Search</span>
              <Sparkles className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-brand-sand"
            >
              How Buying Works
            </Link>
            <Link
              href="/financing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-brand-sand"
            >
              Guaranteed Financing
            </Link>
            <Link
              href="/guarantee"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-brand-sand"
            >
              90-Day Money-Back Guarantee
            </Link>
            <Link
              href="/learning-center"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-brand-sand"
            >
              Learning Center & Guides
            </Link>
            <Link
              href="/make-a-payment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-brand-sand text-brand-blue font-bold"
            >
              Make a Monthly Loan Payment
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-brand-sand"
            >
              Contact Support
            </Link>
          </div>

          <div className="pt-4 border-t border-brand-border flex flex-col gap-3">
            <a
              href="tel:18005555263"
              className="flex items-center justify-center gap-2 bg-brand-sand text-brand-ink font-semibold py-3 rounded-xl hover:bg-brand-sand-light transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-brand-blue" />
              <span>Call / Text (800) 555-LAND</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
