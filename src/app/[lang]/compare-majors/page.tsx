import { createClient } from "@/app/_lib/static-server";
import { getMajorsWithFullInfo } from "@/app/_lib/supabaseHelpers";
import { getTranslations } from "@/app/translations";
import { getLocaleFromParams } from "@/app/_utils/lang";
import CompareHeader from "@/app/_components/CompareHeader";
import CompareMajorsClientWrapper from "@/app/_components/CompareMajorsClientWrapper";

// This page is one of the most expensive ones when it comes to data fetching
// So I made sure that it uses ISR via a special static server (see => src/app/_lib/static-server for more info)
export const revalidate = 60;

export const metadata = {
  title: "Compare Majors | Major Compass",
};

interface ComparePageProps {
  params: Promise<{ lang: "en" | "ar" }>;
}

export default async function CompareMajors({ params }: ComparePageProps) {
  // Get the current language from the params
  const { lang } = await params;

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).compare;

  const supabase = createClient();

  // fetch majors data based on the current language (fetch only what's needed from the DB)
  const majors = await getMajorsWithFullInfo(supabase, lang);

  return (
    <div className="max-w-7xl mx-auto">
      <CompareHeader t={t.header} />

      <CompareMajorsClientWrapper
        majors={majors}
        t={{
          selection: t.selection,
          comparisonTable: t.comparisonTable,
          emptyState: t.emptyState,
        }}
      />
    </div>
  );
}
