import BrowsePageContent from "@/app/_components/BrowsePageContent";
import { createClient } from "@/app/_lib/static-server";
import { getMajors } from "@/app/_lib/supabaseHelpers";
import { Suspense } from "react";

export const revalidate = 60; // Revalidate every 60 seconds

// Tap Title
export const metadata = {
  title: "Browse Majors | Major Compass",
};

interface PageProps {
  params: Promise<{ lang: "en" | "ar" }>;
}

export default async function BrowsePage({ params }: PageProps) {
  // Get the current language and browse options from the URL
  const { lang } = await params;

  const supabase = createClient();
  // Fetch majors data (language responsive)
  const majors = await getMajors(supabase, lang);

  return (
    // We use suspense because we have a useSearchParams here
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <BrowsePageContent majors={majors || []} lang={lang} />;
    </Suspense>
  );
}
