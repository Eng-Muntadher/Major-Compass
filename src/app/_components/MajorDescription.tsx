import { BookOpen } from "lucide-react";

interface DescriptionSectionProps {
  description: string;
}

function MajorDescription({ description }: DescriptionSectionProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      aria-labelledby="description-heading"
    >
      <h2
        id="description-heading"
        className="text-xl mb-3 flex items-center gap-2 font-semibold"
      >
        <BookOpen className="w-6 h-6 text-blue-600" aria-hidden="true" />
        About This Major
      </h2>

      <p className="text-gray-700 leading-relaxed">{description}</p>
    </section>
  );
}

export default MajorDescription;
