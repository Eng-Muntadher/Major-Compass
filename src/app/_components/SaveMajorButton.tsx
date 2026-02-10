"use client";

import { BookmarkIcon } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { toggleBookmarkAction } from "@/app/actions/majorsActions";

interface SaveMajorButtonProps {
  majorId: string | undefined;
  isSaved: boolean;
  isUserAuthenticated: boolean;
  usedInDetails?: boolean;
}

function SaveMajorButton({
  majorId,
  isSaved,
  isUserAuthenticated,
  usedInDetails = false,
}: SaveMajorButtonProps) {
  const [saved, setSaved] = useState(isSaved);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!majorId) return;

    e.preventDefault();
    e.stopPropagation();

    if (!isUserAuthenticated) {
      toast.dismiss();

      toast.error("Please sign in to save majors");
      return;
    }

    setSaved((prev) => !prev);

    startTransition(async () => {
      const result = await toggleBookmarkAction(majorId);

      if (!result.ok) {
        setSaved(isSaved);
        toast.error("Something went wrong. Please check your connection");
      }
    });
  };

  // Styles for details page
  const detailsStyles = `p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/60 cursor-pointer ${
    saved
      ? "bg-blue-600 text-white hover:opacity-85"
      : "bg-white/90 text-gray-600 hover:bg-white"
  } ${isPending ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`;

  // Styles for card/listing page
  const cardStyles = `absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
    saved
      ? "bg-blue-600 text-white"
      : "bg-white/90 text-gray-600 hover:bg-white"
  } ${isPending ? "opacity-60 cursor-not-allowed" : "hover:scale-110"}`;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved majors" : "Save major"}
      className={usedInDetails ? detailsStyles : cardStyles}
    >
      <BookmarkIcon
        className={`${usedInDetails ? "w-6 h-6" : "w-5 h-5"} ${
          saved ? "fill-current" : ""
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

export default SaveMajorButton;
