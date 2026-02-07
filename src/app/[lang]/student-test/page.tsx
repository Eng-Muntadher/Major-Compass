import StudentTestPageContent from "@/app/_components/StudentTestPageContent";
import { getLocaleFromParams } from "@/app/_utils/lang";
import { getTranslations } from "@/app/translations";

export const metadata = {
  title: "Student Test | Major Compass",
};

async function StudentTest({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;

  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).studentTest;

  return <StudentTestPageContent t={t} lang={locale} />;
}

export default StudentTest;
