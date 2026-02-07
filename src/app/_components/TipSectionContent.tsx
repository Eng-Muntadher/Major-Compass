import TipContentItem from "./TipContentItem";

interface TipSectionContentProps {
  content: readonly {
    heading: string;
    points: readonly string[];
  }[];
}

function TipSectionContent({ content }: TipSectionContentProps) {
  return (
    <div className="px-6 pb-6 space-y-6 border-t border-gray-100 pt-6">
      {content.map((item, index) => (
        <TipContentItem key={index} content={item} />
      ))}
    </div>
  );
}

export default TipSectionContent;
