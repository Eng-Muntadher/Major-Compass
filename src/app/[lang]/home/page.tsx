import { getTranslations } from "@/app/translations";
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
  // Get the current language from the params
  const { lang } = await params;

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).home;

  return (
    <div className="max-w-6xl mx-auto">
      <Hero hero={t.hero} lang={lang} />
      <WhatWeOffer features={t.features} title={t.featuresTitle} />
      <KeyFeatures keyFeatures={t.keyFeatures} title={t.keyFeaturesTitle} />
      <StatsSection stats={t.stats} />
      <CTASection cta={t.cta} lang={lang} />
    </div>
  );
}
