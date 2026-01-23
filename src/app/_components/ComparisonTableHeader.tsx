interface ComparisonTableHeaderProps {
  major1Name: string;
  major1NameArabic: string;
  major2Name: string;
  major2NameArabic: string;
}

export default function ComparisonTableHeader({
  major1Name,
  major1NameArabic,
  major2Name,
  major2NameArabic,
}: ComparisonTableHeaderProps) {
  return (
    <div className="grid grid-cols-3 bg-linear-to-r from-purple-50 to-pink-50 border-b border-gray-200">
      <div className="p-4">
        <h2 className="text-sm text-gray-600 font-medium">
          Comparison Criteria
        </h2>
      </div>
      <div className="p-4 border-l border-gray-200">
        <h3 className="text-lg font-semibold">{major1Name}</h3>
        <p className="text-sm text-gray-600">{major1NameArabic}</p>
      </div>
      <div className="p-4 border-l border-gray-200">
        <h3 className="text-lg font-semibold">{major2Name}</h3>
        <p className="text-sm text-gray-600">{major2NameArabic}</p>
      </div>
    </div>
  );
}
