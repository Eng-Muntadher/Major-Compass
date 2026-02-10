import { getTranslations } from "@/app/translations";
import { getLocaleFromParams } from "@/app/_utils/lang";
import AboutHeader from "@/app/_components/AboutHeader";
import ContactSection from "@/app/_components/ContactSeaction";
import FeaturesGrid from "@/app/_components/FeaturesGrid";
import MissionSection from "@/app/_components/MissionSection";
import PurposeSection from "@/app/_components/PurposeSection";

export const metadata = {
  title: "About Major Compass",
};

export default async function About({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  // Get the current language from the params
  const { lang } = await params;

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).about;

  return (
    <div className="max-w-4xl mx-auto">
      <AboutHeader header={t.header} />
      <MissionSection mission={t.mission} />
      <PurposeSection purpose={t.purpose} />
      <FeaturesGrid features={t.features} />
      <ContactSection contact={t.contact} />
    </div>
  );
}
