import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ARTICLES } from "@/lib/data/articles";
import { Clock, ArrowRight } from "lucide-react";

export default function LearningCenterPage() {
  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-[1.75rem] leading-tight xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight font-sans">
            Learning Center & Buyer Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Everything you need to know about seller financing, off-grid water and solar setups, county zoning, and land due diligence.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/learning-center/${art.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-border shadow-soft hover:shadow-hover transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={art.coverImage}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-brand-ink/85 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="font-bold text-lg text-brand-ink group-hover:text-brand-blue transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center gap-1.5 text-xs font-bold text-brand-forest group-hover:underline">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
