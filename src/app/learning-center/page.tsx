import React from "react";
import { Metadata } from "next";
import { ARTICLES } from "@/lib/data/articles";
import { LearningCenterView } from "@/components/blog/LearningCenterView";

export const metadata: Metadata = {
  title: "Learning Center & Buyer Guides | Online Land Sales",
  description: "Comprehensive guides on owner financing vacant land, due diligence checklists, off-grid water & solar systems, and county zoning rules.",
  keywords: [
    "how seller financing land works",
    "owner financed land guide",
    "vacant land due diligence",
    "off-grid solar land",
    "buy land without bank"
  ],
  openGraph: {
    title: "Learning Center & Land Buyer Guides | Online Land Sales",
    description: "Master seller financing, due diligence, and off-grid homesteading with our expert land acquisition guides.",
    type: "website",
  },
};

export default function LearningCenterPage() {
  return <LearningCenterView articles={ARTICLES} />;
}
