import { Users } from "lucide-react";
import InfoSection from "./InfoSection";

function PurposeSection() {
  return (
    <InfoSection
      icon={Users}
      iconBgColor="bg-purple-100"
      iconColor="text-purple-600"
      title="Why I Built This"
    >
      <p className="text-gray-700 leading-relaxed mb-4">
        Many students in Iraq struggle to find clear, accessible information
        about college majors and career paths. This often leads to confusion and
        regret later in life.
      </p>
      <p className="text-gray-700 leading-relaxed">
        We built College Guide to bridge this gap, providing students with the
        knowledge and tools they need to make confident, informed decisions
        about their education and future careers.
      </p>
    </InfoSection>
  );
}

export default PurposeSection;
