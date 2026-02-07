import AboutHeader from "@/app/_components/AboutHeader";
import ContactSection from "@/app/_components/ContactSeaction";
import FeaturesGrid from "@/app/_components/FeaturesGrid";
import MissionSection from "@/app/_components/MissionSection";
import PurposeSection from "@/app/_components/PurposeSection";
import { getTranslations } from "@/app/translations";
import { getLocaleFromParams } from "@/app/_utils/lang";

export const metadata = {
  title: "About Major Compass",
};

export default async function About({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
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
