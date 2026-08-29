import React from "react";
import { HeroFinder } from "@/components/home/HeroFinder";
import { TrustRail } from "@/components/home/TrustRail";
import { HotLots } from "@/components/home/HotLots";
import { MapDiscoveryPreview } from "@/components/home/MapDiscoveryPreview";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { GoalGrid } from "@/components/home/GoalGrid";
import { FinanceCalculatorSection } from "@/components/home/FinanceCalculatorSection";
import { LearnHighlights } from "@/components/home/LearnHighlights";

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero & Property Finder */}
      <HeroFinder />

      {/* 2. Trust Rail */}
      <TrustRail />

      {/* 3. Hot Lots / Featured Inventory */}
      <HotLots />

      {/* 4. Interactive Map Discovery Preview */}
      <MapDiscoveryPreview />

      {/* 5. How Buying Works */}
      <HowItWorksSection />

      {/* 6. Shop by Goal */}
      <GoalGrid />

      {/* 8. Budget-First Financing Calculator */}
      <FinanceCalculatorSection />

      {/* 10. Educational Learning Center Guides */}
      <LearnHighlights />
    </div>
  );
}
