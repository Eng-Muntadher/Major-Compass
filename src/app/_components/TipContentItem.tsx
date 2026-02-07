interface TipContentItemProps {
  content: {
    heading: string;
    points: readonly string[];
  };
}

function TipContentItem({ content }: TipContentItemProps) {
  return (
    <div>
      <h3 className="mb-3 text-blue-600">{content.heading}</h3>
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
