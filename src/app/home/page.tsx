import CTASection from "../_components/CTASection";
import Hero from "../_components/Hero";
import KeyFeatures from "../_components/KeyFeatures";
import StatsSection from "../_components/StatsSection";
import WhatWeOffer from "../_components/WhatWeOffer";
import { createClient } from "../_lib/supabase";

export default async function HomePage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user; // Convert to boolean

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
