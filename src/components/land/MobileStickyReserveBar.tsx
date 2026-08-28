"use client";

import React from "react";
import { LandProperty } from "@/types/land";
import { useStore } from "@/lib/store";
import { formatMoney } from "@/lib/utils";
import { ShoppingBag, Lock, ShieldCheck } from "lucide-react";

interface MobileStickyReserveBarProps {
  property: LandProperty;
}

export function MobileStickyReserveBar({ property }: MobileStickyReserveBarProps) {
  const { addToCart, setIsCartOpen } = useStore();

  const handleReserve = () => {
    addToCart(property, "financed", property.defaultPlan);
    setIsCartOpen(true);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border p-3.5 shadow-2xl flex items-center justify-between gap-3 safe-area-bottom">
      <div className="min-w-0">
        <span className="text-[10px] text-slate-500 uppercase font-bold block truncate">
          {property.defaultPlan.name}
        </span>
        <span className="text-base font-extrabold text-brand-forest">
          {formatMoney(property.defaultPlan.monthlyPayment)}
          <span className="text-xs font-normal text-slate-600">/mo</span>
        </span>
      </div>

      <button
        onClick={handleReserve}
        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-forest hover:bg-brand-forest-dark text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg active:scale-95 transition-all"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Reserve for {formatMoney(property.defaultPlan.amountDueToday)} Today</span>
      </button>
    </div>
  );
}
