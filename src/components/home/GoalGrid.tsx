import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function GoalGrid() {
  const goals = [
    {
      title: "Off-Grid Homesteading",
      description: "Self-sufficient living with solar potential, deep water tables, and no HOA rules.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      href: "/land?use=homestead",
      tag: "Top Choice for Freedom",
    },
    {
      title: "Camping & RV Escapes",
      description: "Park your camper, pitch a tent under dark skies, and escape the city on weekends.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      href: "/land?use=camping_rv",
      tag: "Recreation & Outdoors",
    },
    {
      title: "Colorado Mountain Lots",
      description: "Panoramic 14,000-ft alpine views, crisp pine air, and hunting/fishing nearby.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      href: "/land?state=Colorado",
      tag: "Scenic Alpine Land",
    },
    {
      title: "Land Investment & Wealth",
      description: "Own tangible American real estate as an inflation hedge for future generations.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      href: "/land?use=investment",
      tag: "Tangible Asset",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-brand-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
            Shop Land by Your Goal
          </h2>
          <p className="text-sm text-slate-600">
            Browse by what you plan to do with the land.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {goals.map((goal, i) => (
            <Link
              key={i}
              href={goal.href}
              className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-hover border border-brand-border bg-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={goal.image}
                  alt={goal.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase bg-brand-ink/90 text-white px-2.5 py-1 rounded-full backdrop-blur-md">
                  {goal.tag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-brand-ink group-hover:text-brand-blue transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-forest group-hover:underline">
                  <span>Browse Parcels</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
