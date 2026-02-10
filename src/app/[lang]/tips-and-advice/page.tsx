import TipsPageHeader from "@/app/_components/TipsPageHeader";
import TipsList from "@/app/_components/TipsList";
import TipsCTASection from "@/app/_components/TipsCTASection";
import { getLocaleFromParams } from "@/app/_utils/lang";
import { getTranslations } from "@/app/translations";

// Tap Title
export const metadata = {
  title: "Tips & Advice | Major Compass",
};

export default async function TipsAndAdvicePage({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  // Get the current language from the params
  const { lang } = await params;

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).tips;

  return (
    <div className="max-w-4xl mx-auto">
      <TipsPageHeader header={t.header} />
      <TipsList sections={t.sections} />
      <TipsCTASection cta={t.cta} />
    </div>
  );
}
