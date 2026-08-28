import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Marcus & Elena V.",
      location: "Costilla County, CO (5 Acres)",
      quote:
        "We always thought buying mountain land would require bank financing and endless paperwork. Online Land Sales made it as simple as buying something online. We signed our contract in 24 hours, and we camp on our 5 acres every summer!",
      stars: 5,
    },
    {
      name: "David K.",
      location: "Mohave County, AZ (2.15 Acres)",
      quote:
        "The 360-degree tour was spot on. When I drove out to inspect the parcel with GPS coordinates, everything was exactly as shown. Their customer service team answered every question about solar and county permits.",
      stars: 5,
    },
    {
      name: "Sarah T.",
      location: "Presidio County, TX (10 Acres)",
      quote:
        "10 acres in West Texas with zero credit checks and $249 a month! I just finished my last payment and received my recorded Warranty Deed in the mail. 100% legitimate company with honest people.",
      stars: 5,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-brand-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Verified Land Buyers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
            Trusted by Thousands of Land Owners
          </h2>
          <p className="text-sm text-slate-600">
            Real stories from everyday people who achieved the American dream of land ownership through seller financing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft flex flex-col justify-between space-y-5 sm:space-y-6 hover:shadow-hover transition-shadow relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.stars)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border/60">
                <h4 className="font-extrabold text-sm text-brand-ink">{rev.name}</h4>
                <p className="text-xs text-brand-forest font-semibold mt-0.5">{rev.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
