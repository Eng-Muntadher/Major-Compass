import { ArrowLeft } from "lucide-react";
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
import SimilarMajors from "@/app/_components/SmimilarMajors";
import AIAnalyzeButton from "@/app/_components/AIAnalyzeButton";
import { getMajorsInEnglish } from "@/app/_lib/supabaseHelpers";
import { createClient } from "@/app/_lib/supabase";

interface PageProps {
  params: Promise<{
    majorId: string;
  }>;
}

export const revalidate = 60;

export default async function MajorDetail({ params }: PageProps) {
  const { majorId } = await params;

  const supabase = await createClient();
  const majorRaw = await getMajorsInEnglish(supabase, [majorId]);
  const major = majorRaw?.at(0);

  if (!major) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <p className="text-center text-gray-600">Major not found</p>
      </div>
    );
  }

  const similarMajorsList = major.similarMajors;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/browse"
          className="flex items-center gap-2 w-fit text-gray-600 hover:text-black mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span>Back to majors</span>
        </Link>
      </nav>

      <article aria-labelledby="major-title">
        <MajorDetailsHeroSection major={major} />

        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <MajorQuickStats major={major} />
          <AIAnalyzeButton />
        </section>

        <GPANotice />

        <MajorDemandBanners
          demandInIraq={major.demandInIraqLevel}
          demandOutsideIraq={major.demandOutsideIraqLevel}
        />

        <MajorDescription description={major.description} />

        <MajorSkillsSection skills={major.skills} />

        <SubjectsSection subjects={major.subjects} />

        <MajorProsAndCons pros={major.pros} cons={major.cons} />

        {/* Career Opportunities */}
        <MajorCareerSection
          jobs={major.jobOpportunities}
          salary={major.averageSalary}
        />

        <MajorUniversitiesSection universities={major.topUniversities} />

        {/* Common Mistakes */}
        {major.commonMistakes && major.commonMistakes.length > 0 && (
          <CommonMistakes mistakes={major.commonMistakes} />
        )}

        {/* Similar Majors */}
        {similarMajorsList.length > 0 && (
          <SimilarMajors similarMajorsList={similarMajorsList} />
        )}
      </article>
    </div>
  );
}
