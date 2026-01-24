import { Mail, GraduationCap, BookmarkIcon } from "lucide-react";
import ProfileInfoCard from "./ProfileInfoCard";

interface ProfileInfoSectionProps {
  email: string;
  grade: string;
  savedCount: number;
  isEditing: boolean;
  onEmailChange?: (email: string) => void;
  onGradeChange?: (grade: string) => void;
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
  onEmailChange,
  onGradeChange,
}: ProfileInfoSectionProps) {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      aria-label="Profile information"
    >
      <ProfileInfoCard
        icon={<Mail className="w-4 h-4" />}
        label="Email"
        value={email}
        isEditing={isEditing}
        inputType="email"
        onChange={onEmailChange}
      />

      <ProfileInfoCard
        icon={<GraduationCap className="w-4 h-4" />}
        label="Grade"
        value={grade}
        isEditing={isEditing}
        inputType="select"
        selectOptions={gradeOptions}
        onChange={onGradeChange}
      />

      <ProfileInfoCard
        icon={<BookmarkIcon className="w-4 h-4" />}
        label="Saved Majors"
        value={savedCount}
        isEditing={false}
      />
    </section>
  );
}
