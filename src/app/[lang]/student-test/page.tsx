import StudentTestPageContent from "@/app/_components/StudentTestPageContent";
import { getLocaleFromParams } from "@/app/_utils/lang";
import { getTranslations } from "@/app/translations";

// Tap Title
export const metadata = {
  title: "Student Test | Major Compass",
};

async function StudentTest({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  // Get the current language from the params
  const { lang } = await params;

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).studentTest;

  return <StudentTestPageContent t={t} lang={locale} />;
}

export default StudentTest;
