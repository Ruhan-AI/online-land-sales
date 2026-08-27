"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2.5 rounded-xl border border-brand-border bg-white text-slate-700 hover:bg-brand-sand transition-colors shadow-soft flex items-center gap-1.5 text-xs font-semibold"
      title="Share property"
      aria-label="Share property link"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-brand-forest" />
          <span className="text-brand-forest">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </>
      )}
    </button>
  );
}
