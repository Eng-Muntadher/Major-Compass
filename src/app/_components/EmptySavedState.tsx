import { BookmarkX } from "lucide-react";
import { SavedMajorsTranslationTypes } from "../translations/en/savedMajors";
import { Button } from "./Button";

interface EmptySavedStateProps {
  emptyState: SavedMajorsTranslationTypes["emptyState"];
  lang: "en" | "ar";
}

export default function EmptySavedState({
  emptyState,
  lang,
}: EmptySavedStateProps) {
  return (
    <section
      className="text-center py-20"
      role="status"
      aria-labelledby="empty-state-heading"
    >
      <div
        className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        aria-hidden="true"
      >
        <BookmarkX className="w-12 h-12 text-gray-400" aria-hidden="true" />
      </div>

      <h2 id="empty-state-heading" className="text-2xl font-semibold mb-2">
        {emptyState.title}
      </h2>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {emptyState.description}
      </p>

      <nav
        className="flex flex-col sm:flex-row gap-3 justify-center"
        aria-label="Quick actions"
      >
        <Button href={`/${lang}/browse`} variant="secondary">
          {emptyState.actions.browse}
        </Button>

        <Button href={`/${lang}/tips-and-advice`} variant="outline">
          {emptyState.actions.tips}
        </Button>
      </nav>
    </section>
  );
}
