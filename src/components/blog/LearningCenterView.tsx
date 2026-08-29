"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/data/articles";
import { Clock, ArrowRight, BookOpen, Sparkles, ShieldCheck, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LearningCenterViewProps {
  articles: Article[];
}

export function LearningCenterView({ articles }: LearningCenterViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Financing", "Due Diligence", "Off-Grid & Solar", "Buying Guide"];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles[0]; // The pillar seller financing guide

  return (
    <div className="bg-brand-canvas min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-forest-light text-brand-forest font-bold text-xs px-3.5 py-1.5 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Land Buying Knowledge Hub</span>
          </div>

          <h1 className="text-[2rem] leading-tight xs:text-3xl sm:text-4xl lg:text-5xl font-black text-brand-ink tracking-tight font-sans">
            Learning Center & In-Depth Buyer Guides
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about seller financing, off-grid water & solar systems, county zoning due diligence, and building equity on vacant land.
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides (e.g., seller financing, solar, zoning)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-brand-border text-xs sm:text-sm text-slate-700 shadow-soft focus:outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 transition-all"
            />
          </div>
        </div>

        {/* Featured Pillar Article Hero (If showing All and no search) */}
        {selectedCategory === "All" && !searchQuery && featuredArticle && (
          <div className="bg-gradient-to-br from-brand-ink via-brand-charcoal to-brand-ink rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 sm:p-10 lg:p-12">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-brand-forest text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Featured Pillar Guide
                </span>
                <span className="bg-white/10 text-slate-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  {featuredArticle.readTime}
                </span>
                <span className="bg-white/10 text-slate-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  {featuredArticle.wordCount || "1,950 words"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {featuredArticle.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href={`/learning-center/${featuredArticle.slug}`}>
                  <Button variant="forest" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Read Complete 2026 Guide
                  </Button>
                </Link>
                <span className="text-xs text-slate-400">
                  Updated {featuredArticle.lastUpdated || featuredArticle.date}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-card border border-white/20">
              <Image
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                selectedCategory === cat
                  ? "bg-brand-ink text-white shadow-soft"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-brand-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredArticles.map((art) => (
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
                  {art.wordCount && (
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-brand-ink text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                      {art.wordCount}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" />
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

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-brand-forest group-hover:underline">
                <span className="flex items-center gap-1.5">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] text-slate-400 font-normal group-hover:no-underline">
                  Free Access
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-border space-y-3">
            <p className="text-base font-bold text-slate-700">No articles matched your search.</p>
            <p className="text-xs text-slate-500">Try clearing filters or search terms.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
