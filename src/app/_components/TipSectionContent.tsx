import { type TipContent } from "../_data/tips";
import TipContentItem from "./TipContentItem";

function TipSectionContent({ content }: { content: TipContent[] }) {
  return (
    <div className="px-6 pb-6 space-y-6 border-t border-gray-100 pt-6">
      {content.map((item, index) => (
        <TipContentItem key={index} content={item} />
      ))}
    </div>
  );
}

export default TipSectionContent;
