import { createClient } from "@/app/_lib/supabase";
import { getMajorsWithFullInfo } from "@/app/_lib/supabaseHelpers";
import { getTranslations } from "@/app/translations";
import { getLocaleFromParams } from "@/app/_utils/lang";
import CompareHeader from "@/app/_components/CompareHeader";
import CompareMajorsClientWrapper from "@/app/_components/CompareMajorsClientWrapper";

export const revalidate = 60;

export const metadata = {
  title: "Compare Majors | Major Compass",
};

interface ComparePageProps {
  params: Promise<{ lang: "en" | "ar" }>;
}

export default async function CompareMajors({ params }: ComparePageProps) {
  const { lang } = await params;

  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).compare;

  const supabase = await createClient();
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
