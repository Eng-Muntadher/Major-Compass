import TipsPageHeader from "../_components/TipsPageHeader";
import TipsList from "../_components/TipsList";
import TipsCTASection from "../_components/TipsCTASection";

export default function TipsAndAdvice() {
  return (
    <div className="max-w-4xl mx-auto">
      <TipsPageHeader />
      <TipsList />
      <TipsCTASection />
    </div>
  );
}
