import { getTranslations } from "@/app/translations";
import { createClient } from "@/app/_lib/supabase";
import { getLocaleFromParams } from "@/app/_utils/lang";
import Hero from "@/app/_components/Hero";
import CTASection from "@/app/_components/CTASection";
import KeyFeatures from "@/app/_components/KeyFeatures";
import StatsSection from "@/app/_components/StatsSection";
import WhatWeOffer from "@/app/_components/WhatWeOffer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const supabase = await createClient();
  const { lang } = await params;

  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).home;

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user; // Convert to boolean

  return (
    <div className="max-w-6xl mx-auto">
      <Hero hero={t.hero} isAuthenticated={isAuthenticated} />
      <WhatWeOffer features={t.features} title={t.featuresTitle} />
      <KeyFeatures keyFeatures={t.keyFeatures} title={t.keyFeaturesTitle} />
      <StatsSection stats={t.stats} />
      <CTASection cta={t.cta} isAuthenticated={isAuthenticated} />
    </div>
  );
}
