"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand/BrandMark";
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

  // Close the drawer whenever navigation happens, and lock the page behind it
  // so the body doesn't scroll under the open menu on touch devices.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-soft transition-all">
      <UtilityBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group min-w-0 lg:shrink-0"
            aria-label="Online Land Sales — home"
          >
            <BrandMark className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl border border-brand-border shadow-sm group-hover:scale-105 transition-transform" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-extrabold text-base sm:text-lg lg:text-xl leading-tight tracking-tight text-brand-ink font-sans truncate lg:overflow-visible lg:whitespace-nowrap">
                  Online Land Sales
                </span>
                <span className="hidden xl:inline-block shrink-0 text-[10px] font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue-dark px-1.5 py-0.5 rounded">
                  LLC
                </span>
              </div>
              <span className="hidden sm:block text-[11px] font-medium text-brand-muted tracking-wide truncate">
                Owner Financed Land
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 text-sm font-semibold text-brand-ink shrink-0">
            {/* Browse Land with MegaMenu */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={cn(
                  "flex items-center gap-1.5 py-2 px-2.5 xl:px-3 rounded-xl hover:bg-brand-sand transition-colors whitespace-nowrap",
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
                "flex items-center gap-1.5 py-2 px-2.5 xl:px-3 rounded-xl hover:bg-brand-sand transition-colors whitespace-nowrap",
                pathname === "/map" && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              <Compass className="w-4 h-4 text-brand-forest" />
              <span>Map Search</span>
            </Link>

            <Link
              href="/how-it-works"
              className={cn(
                "py-2 px-2.5 xl:px-3 rounded-xl hover:bg-brand-sand transition-colors whitespace-nowrap",
                pathname === "/how-it-works" && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              How It Works
            </Link>

            <Link
              href="/financing"
              className={cn(
                "py-2 px-2.5 xl:px-3 rounded-xl hover:bg-brand-sand transition-colors whitespace-nowrap",
                pathname === "/financing" && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              Financing
            </Link>

            <Link
              href="/guarantee"
              className={cn(
                "py-2 px-2.5 xl:px-3 rounded-xl hover:bg-brand-sand transition-colors whitespace-nowrap",
                pathname === "/guarantee" && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              <span className="xl:hidden">Guarantee</span>
              <span className="hidden xl:inline">Our Guarantee</span>
            </Link>

            <Link
              href="/learning-center"
              className={cn(
                "py-2 px-2.5 xl:px-3 rounded-xl hover:bg-brand-sand transition-colors whitespace-nowrap",
                pathname.startsWith("/learning-center") && "bg-brand-sand text-brand-blue font-bold"
              )}
            >
              Learn
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
            {/* Search Quick Link — hidden at lg, where the nav needs the room */}
            <Link
              href="/land"
              className="p-2.5 text-slate-600 hover:text-brand-ink hover:bg-brand-sand rounded-xl transition-colors hidden sm:flex lg:hidden xl:flex items-center gap-1 text-xs font-semibold"
              title="Search Land"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Find Land</span>
            </Link>

            {/* Compare / Saved properties */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative flex items-center justify-center w-11 h-11 text-slate-600 hover:text-brand-ink hover:bg-brand-sand rounded-xl transition-colors"
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
              className="flex items-center gap-1.5 sm:gap-2 bg-brand-ink hover:bg-brand-charcoal text-white text-xs sm:text-sm font-semibold h-11 px-3 sm:px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0"
              aria-label="Open reservation cart"
            >
              <ShoppingCart className="w-4 h-4 text-brand-blue-light shrink-0" />
              <span className="hidden xs:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-forest text-white text-[11px] font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 shrink-0 text-brand-ink hover:bg-brand-sand rounded-xl transition-colors"
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
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
        <div className="lg:hidden bg-white border-b border-brand-border px-4 sm:px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain">
          <div className="space-y-0.5 font-semibold text-brand-ink">
            <Link
              href="/land"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg hover:bg-brand-sand active:bg-brand-sand"
            >
              Browse All Land
            </Link>
            <Link
              href="/map"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-brand-sand active:bg-brand-sand text-brand-forest"
            >
              <span>Interactive Map Search</span>
              <Sparkles className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg hover:bg-brand-sand active:bg-brand-sand"
            >
              How Buying Works
            </Link>
            <Link
              href="/financing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg hover:bg-brand-sand active:bg-brand-sand"
            >
              Guaranteed Financing
            </Link>
            <Link
              href="/guarantee"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg hover:bg-brand-sand active:bg-brand-sand"
            >
              Our guarantee
            </Link>
            <Link
              href="/learning-center"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg hover:bg-brand-sand active:bg-brand-sand"
            >
              Learning Center & Guides
            </Link>
            <Link
              href="/make-a-payment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg hover:bg-brand-sand active:bg-brand-sand text-brand-blue font-bold"
            >
              Make a Monthly Loan Payment
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg hover:bg-brand-sand active:bg-brand-sand"
            >
              Contact Support
            </Link>
          </div>

          <div className="pt-4 border-t border-brand-border flex flex-col gap-3">
            <a
              href="tel:15304664094"
              className="flex items-center justify-center gap-2 bg-brand-sand text-brand-ink font-semibold py-3 rounded-xl hover:bg-brand-sand-light transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-brand-blue" />
              <span>Call / Text (530) 466-4094</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
