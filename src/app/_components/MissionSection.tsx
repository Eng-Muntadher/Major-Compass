import { Target } from "lucide-react";
import InfoSection from "./InfoSection";

function MissionSection() {
  return (
    <InfoSection
      icon={Target}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
      title="Our Mission"
    >
      <p className="text-gray-700 leading-relaxed mb-4">
        College Guide was created to help Iraqi 6th-grade students make informed
        decisions about their future. We understand that choosing a college
        major is one of the most important decisions in a young person&apos;s
        life.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Our platform provides comprehensive information about different majors,
        career opportunities, and personalized guidance to help students
        discover the path that&apos;s right for them.
      </p>
    </InfoSection>
  );
}

export default MissionSection;
