import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";

export function TrustRail() {
  const stats = [
    {
      icon: <Award className="w-5 h-5 text-brand-blue" />,
      title: "Since 2004",
      description: "20+ years of direct, principal land ownership.",
      link: "/about",
    },
    {
      icon: <Compass className="w-5 h-5 text-brand-forest" />,
      title: "55,000+ Acres Sold",
      description: "Thousands of happy American property owners.",
      link: "/how-it-works",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: "100% Guaranteed Financing",
      description: "No credit check, no bank qualifying needed.",
      link: "/financing",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-amber-500" />,
      title: "90-Day Money-Back",
      description: "Full refund or equity exchange commitment.",
      link: "/guarantee",
    },
  ];

  return (
    <section className="bg-brand-sand/60 border-y border-brand-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Link
              key={i}
              href={stat.link}
              className="group flex items-start gap-4 p-4 rounded-2xl bg-white/70 hover:bg-white border border-brand-border/60 hover:border-brand-border shadow-soft transition-all"
            >
              <div className="p-3 rounded-xl bg-brand-sand shrink-0 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1">
                  <h4 className="font-extrabold text-sm text-brand-ink group-hover:text-brand-blue transition-colors">
                    {stat.title}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
