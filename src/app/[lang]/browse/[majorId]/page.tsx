import { getMajorDetails, getMajorName } from "@/app/_lib/supabaseHelpers";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/app/_lib/supabase";
import { getTranslations } from "@/app/translations";
import { getLocaleFromParams } from "@/app/_utils/lang";
import type { Metadata } from "next";
import Link from "next/link";
import MajorDetailsHeroSection from "@/app/_components/MajorDetailsHeroSection";
import MajorQuickStats from "@/app/_components/MajorQuickStats";
import GPANotice from "@/app/_components/GPANotice";
import MajorDemandBanners from "@/app/_components/MajorDemandBanners";
import MajorDescription from "@/app/_components/MajorDescription";
import MajorSkillsSection from "@/app/_components/MajorSkillsSection";
import SubjectsSection from "@/app/_components/SubjectsSection";
import MajorProsAndCons from "@/app/_components/MajorProsAndCons";
import MajorCareerSection from "@/app/_components/MajorCareerSection";
import MajorUniversitiesSection from "@/app/_components/MajorUniversitiesSection";
import CommonMistakes from "@/app/_components/CommonMistakes";
import AIAnalyzeButton from "@/app/_components/AIAnalyzeButton";
import SimilarMajors from "@/app/_components/SmimilarMajors";

interface PageProps {
  params: Promise<{
    majorId: string;
    lang: "en" | "ar";
  }>;
}

export const revalidate = 60;

// Tap name control function
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, majorId } = await params;

  const supabase = await createClient();
  const major = await getMajorName(supabase, lang, majorId);
  if (!major) {
    return {
      title:
        lang === "ar"
          ? "تفاصيل التخصص | Major Compass"
          : "Major Details | Major Compass",
    };
  }

  return {
    title:
      lang === "ar"
        ? `${major} | Major Compass`
        : `${major} Major | Major Compass`,
  };
}

export default async function MajorDetail({ params }: PageProps) {
  // Get the current language and major id from the params
  const { lang, majorId } = await params;

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).majorDetails;

  // Fetch the major full data (Arabic OR English)
  const supabase = await createClient();
  const major = await getMajorDetails(supabase, lang, majorId);

  // 404 Error handling
  if (!major) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <p className="text-center text-gray-600">{t.notFound.message}</p>
      </div>
    );
  }

  const similarMajorsList = major.similarMajors;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href={`/${lang}/browse`}
          className="flex items-center gap-2 w-fit text-gray-600 hover:text-black mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span>{t.navigation.backToMajors}</span>
        </Link>
      </nav>

      <article aria-labelledby="major-title">
        <MajorDetailsHeroSection major={major} />

        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <MajorQuickStats major={major} t={t.quickStats} />

          <AIAnalyzeButton
            major={lang === "en" ? major.nameEn : major.nameAr}
            t={t.aiAnalyze}
          />
        </section>

        <GPANotice t={t.gpaNotice} />

        <MajorDemandBanners
          demandInIraq={major.demandInIraqLevel}
          demandOutsideIraq={major.demandOutsideIraqLevel}
          t={t.demandBanners}
        />

        <MajorDescription description={major.description} t={t.description} />

        <MajorSkillsSection skills={major.skills || []} t={t.skills} />

        <SubjectsSection subjects={major.subjects || []} t={t.subjects} />

        <MajorProsAndCons
          pros={major.pros || []}
          cons={major.cons || []}
          t={t.prosAndCons}
        />

        <MajorCareerSection
          jobs={major.jobOpportunities || []}
          salary={major.averageSalary}
          t={t.career}
        />

        <MajorUniversitiesSection
          universities={major.topUniversities || []}
          t={t.universities}
        />

        {major.commonMistakes && major.commonMistakes.length > 0 && (
          <CommonMistakes
            mistakes={major.commonMistakes}
            t={t.commonMistakes}
          />
        )}

        {similarMajorsList
          ? similarMajorsList.length > 0 && (
              <SimilarMajors
                similarMajorsList={similarMajorsList}
                t={t.similarMajors}
                lang={lang}
              />
            )
          : null}
      </article>
    </div>
  );
}
