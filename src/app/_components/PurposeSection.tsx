import { Users } from "lucide-react";
import InfoSection from "./InfoSection";
import { aboutTranslation } from "../translations/en/about";

interface PurposeSectionProps {
  purpose: aboutTranslation["purpose"];
}

function PurposeSection({ purpose }: PurposeSectionProps) {
  return (
    <InfoSection
      icon={Users}
      iconBgColor="bg-purple-100"
      iconColor="text-purple-600"
      title={purpose.title}
    >
      <p className="text-gray-700 leading-relaxed mb-4">
        {purpose.paragraphs[0]}
      </p>
      <p className="text-gray-700 leading-relaxed">{purpose.paragraphs[1]}</p>
    </InfoSection>
  );
}

export default PurposeSection;
