import React from "react";
import { Hero } from "@/components/home/Hero";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ThemeCards } from "@/components/home/ThemeCards";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <ThemeCards />
      <Testimonials />
      <FAQSection />
    </div>
  );
}
