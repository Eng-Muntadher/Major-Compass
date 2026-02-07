import { Target } from "lucide-react";
import { aboutTranslation } from "../translations/en/about";
import InfoSection from "./InfoSection";

interface MissionSectionProps {
  mission: aboutTranslation["mission"];
}

function MissionSection({ mission }: MissionSectionProps) {
  return (
    <InfoSection
      icon={Target}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
      title={mission.title}
    >
      <p className="text-gray-700 leading-relaxed mb-4">
        {mission.paragraphs[0]}
      </p>
      <p className="text-gray-700 leading-relaxed">{mission.paragraphs[1]}</p>
    </InfoSection>
  );
}

export default MissionSection;
