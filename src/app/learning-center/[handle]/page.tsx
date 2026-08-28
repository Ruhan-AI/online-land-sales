import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ARTICLES } from "@/lib/data/articles";
import { Clock, ChevronLeft, ArrowRight, ShieldCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  return ARTICLES.map((art) => ({
    handle: art.slug,
  }));
}

interface ArticlePageProps {
  params: Promise<{ handle: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { handle } = await params;
  const article = ARTICLES.find((a) => a.slug === handle);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-brand-canvas min-h-screen py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        {/* Back link */}
        <div>
          <Link
            href="/learning-center"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-muted hover:text-brand-ink transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Learning Guides</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <span className="inline-block bg-brand-sand text-brand-ink text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
          <h1 className="text-[1.75rem] leading-tight xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight font-sans">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>Published {article.date}</span>
            <span>•</span>
            <span>By Online Land Sales Editorial Team</span>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-card border border-brand-border">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Markdown Body */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-brand-border shadow-soft prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6">
          <div className="whitespace-pre-line leading-relaxed">
            {article.content}
          </div>
        </div>

        {/* Call to action at bottom */}
        <div className="bg-gradient-to-br from-brand-ink to-brand-charcoal text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Ready to Start Your Land Journey?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Browse our current active inventory of seller-financed land with guaranteed approval and 90-day money-back guarantee.
          </p>
          <Link href="/land" className="inline-block pt-2">
            <Button variant="forest" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              View Available Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
