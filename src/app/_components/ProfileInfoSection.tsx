import { Mail, GraduationCap, BookmarkIcon } from "lucide-react";
import ProfileInfoCard from "./ProfileInfoCard";

interface ProfileInfoSectionProps {
  email: string;
  grade: string;
  savedCount: number;
  isEditing: boolean;
  onGradeChange?: (grade: string) => void;
  translations: {
    email: string;
    grade: string;
    savedMajors: string;
  };
}

const gradeOptions = [
  { label: "6th Grade" },
  { label: "7th Grade" },
  { label: "8th Grade" },
  { label: "9th Grade" },
  { label: "10th Grade" },
  { label: "11th Grade" },
  { label: "12th Grade" },
];

export default function ProfileInfoSection({
  email,
  grade,
  savedCount,
  isEditing,
  onGradeChange,
  translations,
}: ProfileInfoSectionProps) {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      aria-label="Profile information"
    >
      <ProfileInfoCard
        icon={Mail}
        label={translations.email}
        value={email}
        isEditing={false}
        inputType="email"
      />

      <ProfileInfoCard
        icon={GraduationCap}
        label={translations.grade}
        value={grade}
        isEditing={isEditing}
        inputType="select"
        selectOptions={gradeOptions}
        onChange={onGradeChange}
      />

      <ProfileInfoCard
        icon={BookmarkIcon}
        label={translations.savedMajors}
        value={savedCount}
        isEditing={false}
      />
    </section>
  );
}
