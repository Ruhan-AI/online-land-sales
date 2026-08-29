"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, DollarSign, Mountain, Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PROPERTIES, STATES_IN_INVENTORY } from "@/lib/data/properties";

export function HeroFinder() {
  const router = useRouter();
  const [state, setState] = useState("all");
  const [maxMonthly, setMaxMonthly] = useState("");
  const [minAcres, setMinAcres] = useState("");
  const [use, setUse] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (state !== "all") params.set("state", state);
    if (maxMonthly) params.set("maxMonthly", maxMonthly);
    if (minAcres) params.set("minAcres", minAcres);
    if (use !== "all") params.set("use", use);

    router.push(`/land?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-brand-ink text-white pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pb-32">
      {/* Background Aerial Landscape with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="American open land landscape"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/80 to-brand-ink/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Copy */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
          <h1 className="text-[2rem] leading-[1.1] xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white sm:leading-tight font-sans text-balance">
            Buy land directly,
            <br className="hidden sm:inline" />{" "}
            <span className="text-emerald-300">pay monthly.</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            {PROPERTIES.length} parcels across {STATES_IN_INVENTORY.length}{" "}
            states, financed by us directly — no credit check, and a fixed
            monthly payment.
          </p>
        </div>

        {/* Smart Finder Widget */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-brand-border text-brand-ink">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* State */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>Location / State</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full text-xs font-bold bg-brand-sand-light border border-brand-border rounded-xl p-3 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
              >
                <option value="all">All States</option>
                {STATES_IN_INVENTORY.map(({ state, count }) => (
                  <option key={state} value={state}>
                    {state} ({count})
                  </option>
                ))}
              </select>
            </div>

            {/* Monthly Budget */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <DollarSign className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>Max Monthly Budget</span>
              </label>
              <select
                value={maxMonthly}
                onChange={(e) => setMaxMonthly(e.target.value)}
                className="w-full text-xs font-bold bg-brand-sand-light border border-brand-border rounded-xl p-3 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
              >
                <option value="">Any Monthly Budget</option>
                <option value="175">Under $175 / month</option>
                <option value="250">Under $250 / month</option>
                <option value="350">Under $350 / month</option>
                <option value="500">Under $500 / month</option>
              </select>
            </div>

            {/* Acreage */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <Mountain className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>Minimum Acreage</span>
              </label>
              <select
                value={minAcres}
                onChange={(e) => setMinAcres(e.target.value)}
                className="w-full text-xs font-bold bg-brand-sand-light border border-brand-border rounded-xl p-3 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
              >
                <option value="">Any Size</option>
                <option value="1">1+ Acres</option>
                <option value="2">2+ Acres</option>
                <option value="5">5+ Acres</option>
                <option value="10">10+ Acres</option>
              </select>
            </div>

            {/* Submit — label stays on one line at every width */}
            <div>
              <Button
                variant="forest"
                size="lg"
                type="submit"
                className="w-full justify-center shadow-lg font-bold whitespace-nowrap"
                icon={<Search className="w-4 h-4" />}
              >
                Search land
              </Button>
            </div>
          </form>

          {/* Quick Filter Links */}
          <div className="mt-4 pt-3 border-t border-brand-border/60 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-semibold text-slate-400">Popular:</span>
              <Link
                href="/land?maxMonthly=175"
                className="py-1.5 hover:text-brand-forest font-semibold underline"
              >
                Under $175/mo
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                href="/land?has360=true"
                className="py-1.5 hover:text-brand-forest font-semibold underline flex items-center gap-1 text-brand-forest"
              >
                <Sparkles className="w-3 h-3 shrink-0" />
                360° Tours
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                href="/land?state=Arizona"
                className="py-1.5 hover:text-brand-forest font-semibold underline"
              >
                Arizona Land
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                href="/land?state=Colorado"
                className="py-1.5 hover:text-brand-forest font-semibold underline"
              >
                Colorado Lots
              </Link>
            </div>

            <Link
              href="/map"
              className="py-1.5 font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>Browse the map</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
