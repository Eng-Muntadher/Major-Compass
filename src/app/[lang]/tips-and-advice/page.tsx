import TipsPageHeader from "@/app/_components/TipsPageHeader";
import TipsList from "@/app/_components/TipsList";
import TipsCTASection from "@/app/_components/TipsCTASection";
import { getLocaleFromParams } from "@/app/_utils/lang";
import { getTranslations } from "@/app/translations";

export const metadata = {
  title: "Tips & Advice | Major Compass",
};

export default async function TipsAndAdvicePage({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;

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
