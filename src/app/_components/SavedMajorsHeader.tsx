import { Bookmark } from "lucide-react";
import { SavedMajorsTranslationTypes } from "../translations/en/savedMajors";

interface SavedMajorsHeaderProps {
  count: number;
  header: SavedMajorsTranslationTypes["header"];
}

export default function SavedMajorsHeader({
  count,
  header,
}: SavedMajorsHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
            aria-hidden="true"
          >
            <Bookmark className="w-6 h-6 text-white" aria-hidden="true" />
          </div>

          <div>
            <h1 className="text-3xl">{header.title}</h1>

            <p className="text-gray-600" aria-live="polite">
              {count}{" "}
              {/* 1 major saved OR 2 majors saved (the s is conditional)*/}
              {count === 1 ? header.countLabel.one : header.countLabel.other}
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-600">{header.description}</p>
    </header>
  );
}
