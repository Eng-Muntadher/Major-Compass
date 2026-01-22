import { type TipContent } from "../_data/tips";

function TipContentItem({ content }: { content: TipContent }) {
  return (
    <div>
      <h3 className="mb-3 text-blue-600">{content.heading}</h3>
      <p className="text-sm text-gray-500 mb-3">{content.headingArabic}</p>
      <ul className="space-y-2">
        {content.points.map((point, pointIndex) => (
          <li key={pointIndex} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0" />
            <span className="text-gray-700 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipContentItem;
