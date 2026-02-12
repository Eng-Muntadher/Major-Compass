"use client";

import { MajorCard } from "./MajorCard";
import { Major } from "@/app/_lib/types";
import { useBookmarks } from "@/app/_context/BookMarkProvider";

interface MajorCardClientProps {
  major: Partial<Major>;
  lang: "en" | "ar";
  index: number;
}

export default function ClientSideMajorCardList({
  major,
  lang,
  index,
}: MajorCardClientProps) {
  const { bookmarks, isUserAuthenticated } = useBookmarks();

  const isSaved = bookmarks.includes(major.id as string);

  return (
    <MajorCard
      index={index}
      major={major}
      lang={lang}
      isSaved={isSaved}
      isUserAuthenticated={isUserAuthenticated}
    />
  );
}
