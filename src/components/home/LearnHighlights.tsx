import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ARTICLES } from "@/lib/data/articles";
import { BookOpen, ArrowRight, Clock } from "lucide-react";

export function LearnHighlights() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-brand-sand-light/60 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3 py-1 rounded-full">
              <BookOpen className="w-4 h-4 text-brand-blue" />
              <span>Educational Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight font-sans">
              Learn Before You Buy
            </h2>
            <p className="text-sm text-brand-muted max-w-xl">
              Honest, practical guides on seller financing, off-grid water systems, solar power, and county zoning due diligence.
            </p>
          </div>

          <Link
            href="/learning-center"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-ink transition-colors"
          >
            <span>Visit Learning Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/learning-center/${art.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-border shadow-soft hover:shadow-hover transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
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

                  <h3 className="font-bold text-base text-brand-ink group-hover:text-brand-blue transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center gap-1.5 text-xs font-bold text-brand-forest group-hover:underline">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
