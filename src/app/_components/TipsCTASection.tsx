import { TipsTranslationTypes } from "../translations/en/tips";
import InfoBadge from "./InfoBadge";

interface TipsCTASectionProps {
  cta: TipsTranslationTypes["cta"];
}

function TipsCTASection({ cta }: TipsCTASectionProps) {
  return (
    <div className="mt-8 bg-linear-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center border border-blue-100">
      <h3 className="text-xl mb-2">{cta.title}</h3>
      <p className="text-gray-600 mb-4">{cta.description}</p>
      <div className="flex flex-wrap gap-3 justify-center">
        {cta.badges.map((badge, index) => (
          <InfoBadge key={index} emoji={badge.emoji} text={badge.text} />
        ))}
      </div>
    </div>
  );
}

export default TipsCTASection;
