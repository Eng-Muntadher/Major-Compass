import CTASection from "../_components/CTASection";
import Hero from "../_components/Hero";
import KeyFeatures from "../_components/KeyFeatures";
import StatsSection from "../_components/StatsSection";
import WhatWeOffer from "../_components/WhatWeOffer";

export default function HomePage() {
  const isAuthenticated = false;

  return (
    <div className="max-w-6xl mx-auto">
      <Hero isAuthenticated={isAuthenticated} />
      <WhatWeOffer />
      <KeyFeatures />
      <StatsSection />
      <CTASection isAuthenticated={isAuthenticated} />
    </div>
  );
}
