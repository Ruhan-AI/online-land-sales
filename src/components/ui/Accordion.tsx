"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  badge?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenId,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className="border border-brand-border rounded-xl bg-white overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-brand-ink hover:bg-brand-sand-light/60 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                <span>{item.title}</span>
                {item.badge && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-sand text-brand-ink">
                    {item.badge}
                  </span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-brand-muted shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180 text-brand-ink"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-brand-border/60 pt-4 bg-brand-canvas/50 animate-in fade-in-50 duration-150">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
