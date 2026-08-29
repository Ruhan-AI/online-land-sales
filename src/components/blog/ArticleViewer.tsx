"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/data/articles";
import {
  Clock,
  ChevronLeft,
  ArrowRight,
  Share2,
  Check,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Calculator,
  ShieldCheck,
  BookmarkCheck,
  Calendar,
  UserCheck,
  Award,
  Compass,
  FileText,
  MapPin,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ArticleViewerProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleViewer({ article, relatedArticles }: ArticleViewerProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // In-article mini calculator state
  const [calcPrice, setCalcPrice] = useState(7000);
  const [calcDown, setCalcDown] = useState(250);
  const [calcMonths, setCalcMonths] = useState(48);

  const financedAmount = Math.max(0, calcPrice - calcDown);
  const estMonthly = Math.round(financedAmount / calcMonths * 1.12); // ~10-12% interest model

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(`${article.title} - Essential guide on buying vacant land:`);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  const handleShareFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  // Helper to render markdown content with rich Tailwind elements
  const renderFormattedContent = (rawText: string) => {
    const lines = rawText.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];

    const flushTable = () => {
      if (inTable && tableHeaders.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="my-8 overflow-x-auto rounded-2xl border border-brand-border bg-white shadow-soft">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-brand-ink text-white">
                <tr>
                  {tableHeaders.map((th, idx) => (
                    <th key={idx} className="p-3 sm:p-4 font-bold tracking-wide">
                      {th.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-brand-canvas/60"}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 sm:p-4 align-top leading-relaxed">
                        {cell.includes("**") ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: cell.trim().replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brand-ink">$1</strong>')
                            }}
                          />
                        ) : (
                          cell.trim()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }
    };

    const flushCodeBlock = () => {
      if (inCodeBlock && codeBlockLines.length > 0) {
        elements.push(
          <div key={`code-${elements.length}`} className="my-6 rounded-2xl bg-brand-charcoal text-emerald-400 p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto shadow-card border border-slate-700/60 leading-relaxed">
            <pre className="whitespace-pre">{codeBlockLines.join("\n")}</pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockLines = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks (``` or ~~~)
      if (line.trim().startsWith("```") || line.trim().startsWith("~~~")) {
        if (inCodeBlock) {
          flushCodeBlock();
        } else {
          flushTable();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      // Markdown Tables (| ... |)
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        const cells = line.split("|").slice(1, -1);
        if (!inTable) {
          inTable = true;
          tableHeaders = cells;
        } else if (line.includes("---")) {
          // Divider row, skip
          continue;
        } else {
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Blockquotes (> ...)
      if (line.trim().startsWith(">")) {
        const quoteText = line.replace(/^>\s*/, "");
        elements.push(
          <div key={`quote-${i}`} className="my-6 p-5 sm:p-6 bg-brand-forest-light/60 border-l-4 border-brand-forest rounded-r-2xl shadow-soft">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
              <div
                className="text-brand-forest-dark text-sm sm:text-base leading-relaxed font-medium"
                dangerouslySetInnerHTML={{
                  __html: quoteText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-brand-forest-dark">$1</strong>')
                }}
              />
            </div>
          </div>
        );
        continue;
      }

      // Headings with IDs (### or ####)
      if (line.trim().startsWith("### ")) {
        const clean = line.trim();
        const match = clean.match(/^###\s+(.*?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?\s*$/);
        const headingText = match ? match[1] : clean.replace(/^###\s+/, "");
        const headingId = match && match[2] ? match[2] : headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h2
            key={`h2-${i}`}
            id={headingId}
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-ink pt-8 pb-3 border-b border-brand-border scroll-mt-24 font-sans tracking-tight"
          >
            {headingText}
          </h2>
        );
        continue;
      }

      if (line.trim().startsWith("#### ")) {
        const clean = line.trim();
        const headingText = clean.replace(/^####\s+/, "");
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h3
            key={`h3-${i}`}
            id={headingId}
            className="text-lg sm:text-xl font-bold text-brand-ink pt-6 pb-2 scroll-mt-24 font-sans"
          >
            {headingText}
          </h3>
        );
        continue;
      }

      // Horizontal Rules
      if (line.trim() === "---" || line.trim() === "***") {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-brand-border" />);
        continue;
      }

      // Numbered or Bullet Lists
      if (line.trim().match(/^\d+\.\s+/) || line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
        const text = isBullet ? line.trim().replace(/^[-*]\s+/, "") : line.trim().replace(/^\d+\.\s+/, "");
        elements.push(
          <div key={`list-${i}`} className="flex items-start gap-3 my-2 text-slate-700 text-sm sm:text-base leading-relaxed pl-2 sm:pl-4">
            <div className="w-2 h-2 rounded-full bg-brand-forest mt-2 shrink-0" />
            <div
              className="flex-1"
              dangerouslySetInnerHTML={{
                __html: text
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brand-ink">$1</strong>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-forest font-bold underline hover:text-brand-forest-dark transition-colors">$1</a>')
              }}
            />
          </div>
        );
        continue;
      }

      // Regular Paragraphs
      if (line.trim().length > 0) {
        elements.push(
          <p
            key={`p-${i}`}
            className="my-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
            dangerouslySetInnerHTML={{
              __html: line
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brand-ink">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-forest font-bold underline hover:text-brand-forest-dark transition-colors">$1</a>')
            }}
          />
        );
      }
    }

    flushTable();
    flushCodeBlock();

    return elements;
  };

  return (
    <div className="bg-brand-canvas min-h-screen">
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-brand-border/40 z-50">
        <div
          className="h-full bg-gradient-to-r from-brand-forest via-brand-blue to-brand-clay transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            href="/learning-center"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-ink transition-colors bg-white px-3 py-1.5 rounded-full border border-brand-border shadow-soft"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Learning Center</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider bg-brand-sand px-3 py-1 rounded-full text-brand-ink">
              {article.category}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold bg-white border border-brand-border px-3 py-1 rounded-full">
              {article.wordCount || "1,950 words"}
            </span>
          </div>
        </div>

        {/* Hero Header Area */}
        <header className="space-y-6 max-w-4xl">
          <h1 className="text-[1.85rem] leading-tight xs:text-3xl sm:text-4xl lg:text-5xl font-black text-brand-ink tracking-tight font-sans">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {article.summary}
          </p>

          {/* Author & E-E-A-T Editorial Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-4 border-y border-brand-border">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-brand-forest shadow-soft">
                <Image
                  src={article.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={article.author?.name || "Editorial Team"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-brand-ink">
                    {article.author?.name || "Online Land Sales Editorial Team"}
                  </span>
                  <span title="Verified Land Specialists">
                    <Award className="w-3.5 h-3.5 text-brand-forest" />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{article.author?.role || "Land Research & Acquisition Specialists"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-blue" />
                <span>{article.readTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-forest" />
                <span>Updated {article.lastUpdated || article.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fact Checked</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Photo */}
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-card border border-brand-border my-8">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs sm:text-sm font-medium bg-brand-ink/75 backdrop-blur-md px-3.5 py-1.5 rounded-full">
            Featured Guide: Direct Owner Financed Land in the United States
          </div>
        </div>

        {/* Main Grid: Content (Left) + Sticky Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Article Body (8 cols) */}
          <main className="lg:col-span-8 space-y-8">
            {/* Key Takeaways Callout Card */}
            <div className="bg-gradient-to-br from-brand-blue-light/70 via-white to-brand-sand-light p-6 sm:p-8 rounded-3xl border border-brand-blue/20 shadow-soft space-y-4">
              <div className="flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-wider">
                <BookmarkCheck className="w-5 h-5 text-brand-blue" />
                <span>Executive Summary & Key Takeaways</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-brand-border/60">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                  <span><strong>100% Guaranteed Approval:</strong> No credit score checks or bank underwriting.</span>
                </li>
                <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-brand-border/60">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                  <span><strong>Immediate Possessory Rights:</strong> Camp, build, and use your land on day one.</span>
                </li>
                <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-brand-border/60">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                  <span><strong>Low Down Payments:</strong> Reserve parcels starting with $149–$299 down.</span>
                </li>
                <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-brand-border/60">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                  <span><strong>Zero Prepayment Penalties:</strong> Pay off anytime early with interest savings.</span>
                </li>
              </ul>
            </div>

            {/* Article Markdown Rendered Elements */}
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-soft">
              {renderFormattedContent(article.content)}
            </article>

            {/* Interactive In-Article Financing Calculator */}
            <div className="bg-gradient-to-br from-brand-ink to-brand-charcoal text-white rounded-3xl p-6 sm:p-8 shadow-card border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-brand-forest text-white">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Estimate Your Monthly Land Payment</h3>
                  <p className="text-xs text-slate-300">Test different down payments and loan terms in real-time.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Land Price: ${calcPrice.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="3000"
                    max="25000"
                    step="500"
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(Number(e.target.value))}
                    className="w-full accent-brand-forest cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Down Payment: ${calcDown.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="150"
                    max="2000"
                    step="50"
                    value={calcDown}
                    onChange={(e) => setCalcDown(Number(e.target.value))}
                    className="w-full accent-brand-forest cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Term Length: {calcMonths} Months ({Math.round(calcMonths / 12)} Yrs)
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={calcMonths}
                    onChange={(e) => setCalcMonths(Number(e.target.value))}
                    className="w-full accent-brand-forest cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <span className="text-xs text-slate-300 uppercase tracking-wider">Estimated Monthly Installment:</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                    ${estMonthly} <span className="text-xs text-slate-300 font-normal">/ month</span>
                  </div>
                </div>

                <Link href="/land">
                  <Button variant="forest" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Browse Matching Land
                  </Button>
                </Link>
              </div>
            </div>

            {/* Interactive FAQ Accordion */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-brand-forest" />
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-ink">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="divide-y divide-brand-border">
                  {article.faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div key={index} className="py-4">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="w-full flex items-center justify-between gap-4 text-left font-bold text-brand-ink text-sm sm:text-base hover:text-brand-forest transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                              isOpen ? "rotate-180 text-brand-forest" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Social Share Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-brand-border shadow-soft flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-ink">
                <Share2 className="w-4 h-4 text-brand-forest" />
                <span>Share this guide:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full border border-brand-border bg-brand-canvas hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <BookmarkCheck className="w-3.5 h-3.5" />}
                  <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                </button>

                <button
                  onClick={handleShareTwitter}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full border border-brand-border bg-brand-canvas hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  Twitter / X
                </button>

                <button
                  onClick={handleShareFacebook}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full border border-brand-border bg-brand-canvas hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  Facebook
                </button>

                <button
                  onClick={handleShareLinkedIn}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full border border-brand-border bg-brand-canvas hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </main>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            {/* Table of Contents */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-border shadow-soft space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-brand-border text-brand-ink font-bold text-sm">
                  <Compass className="w-4 h-4 text-brand-forest" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                  {article.tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="block text-xs text-slate-600 hover:text-brand-forest hover:font-bold transition-all py-1.5 px-2.5 rounded-lg hover:bg-brand-canvas leading-snug"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Quick Find Land Promo Card */}
            <div className="bg-gradient-to-br from-brand-forest-dark to-brand-forest text-white rounded-3xl p-6 shadow-card space-y-4">
              <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Zero Credit Check
              </span>
              <h4 className="text-lg font-bold">Ready to Buy Land with Seller Financing?</h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Explore 240+ verified vacant parcels with payments as low as $13 to $175/month.
              </p>
              <Link href="/land" className="block pt-2">
                <Button variant="clay" size="sm" className="w-full" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  View Financed Parcels
                </Button>
              </Link>
            </div>

            {/* Buyer Protection Guarantee Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-border shadow-soft space-y-3">
              <div className="flex items-center gap-2 text-brand-ink font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-brand-forest" />
                <span>Our 100% Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every property comes with a 100% money-back satisfaction guarantee and clean title guarantee.
              </p>
              <Link
                href="/guarantee"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-forest hover:underline"
              >
                <span>Read Full Guarantee</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-brand-border space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-brand-ink font-sans">
                Continue Reading: More Buyer Guides
              </h3>
              <Link
                href="/learning-center"
                className="text-xs font-bold text-brand-forest hover:underline flex items-center gap-1"
              >
                <span>View All Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/learning-center/${rel.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-brand-border shadow-soft hover:shadow-hover transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-brand-ink/85 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                        {rel.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>{rel.readTime}</span>
                        <span>•</span>
                        <span>{rel.date}</span>
                      </div>

                      <h4 className="font-bold text-sm text-brand-ink group-hover:text-brand-blue transition-colors line-clamp-2">
                        {rel.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {rel.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-1 flex items-center gap-1.5 text-xs font-bold text-brand-forest group-hover:underline">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
