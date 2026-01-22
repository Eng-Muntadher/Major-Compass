import AboutFooterNote from "../_components/AboutFooterNote";
import AboutHeader from "../_components/AboutHeader";
import ContactSection from "../_components/ContactSeaction";
import FeaturesGrid from "../_components/FeaturesGrid";
import MissionSection from "../_components/MissionSection";
import PurposeSection from "../_components/PurposeSection";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <AboutHeader />
      <MissionSection />
      <PurposeSection />
      <FeaturesGrid />
      <ContactSection />
      <AboutFooterNote />
    </div>
  );
}
