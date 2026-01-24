import { MajorCard } from "../_components/MajorCard";
import { Major } from "../_data/majors";

interface MajorsGridProps {
  majors: Major[];
}

export default function MajorsGrid({ majors }: MajorsGridProps) {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-label="Saved majors list"
    >
      {majors.map((major) => (
        <MajorCard
          key={major.id}
          major={major}
          isSaved={true}
          onToggleSave={() => {}}
        />
      ))}
    </section>
  );
}
