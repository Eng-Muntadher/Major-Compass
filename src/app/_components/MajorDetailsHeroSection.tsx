// app/majors/[majorId]/_components/HeroSection.tsx
import { ImageWithFallback } from "./ImageWithFallback";
import { Major } from "../_lib/types";
import SaveMajorButton from "./SaveMajorButton";
import { createClient } from "../_lib/supabase";
import { updateRecentlyViewedMajor } from "@/app/actions/majorsActions";

interface HeroDetailsHeroProps {
  major: Major | null;
}

async function MajorDetailsHeroSection({ major }: HeroDetailsHeroProps) {
  // Get current signed in user (if there is one)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If there is a user => update his RecentlyViewedMajor array in the DB
  if (user) {
    updateRecentlyViewedMajor(major?.id);
  }

  // Get user's profile data
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("bookmarks")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
  }

  const savedMajorsIds = profile?.bookmarks;

  // Check if this major has been bookmarked by this user
  const isSaved = savedMajorsIds?.includes(major?.id);

  return (
    <section
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      aria-labelledby="major-title"
    >
      <div className="relative h-64 bg-linear-to-br from-blue-100 to-purple-100">
        <ImageWithFallback
          src={major?.imageUrl}
          alt={major?.nameEn ? `${major.nameEn} major` : "Major image"}
          className="w-full h-full"
          priority={true}
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        {/* Title and Save Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 id="major-title" className="text-3xl mb-2 font-bold">
                {major?.nameEn}
              </h1>

              <p className="text-xl opacity-90" lang="ar">
                {major?.nameAr}
              </p>
            </div>

            <SaveMajorButton
              usedInDetails={true}
              isSaved={isSaved}
              majorId={major?.id}
              isUserAuthenticated={user ? true : false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MajorDetailsHeroSection;
