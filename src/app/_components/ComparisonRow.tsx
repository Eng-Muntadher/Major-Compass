interface ComparisonRowProps {
  label: string;
  value1: string | null;
  value2: string | null;
  isLongText?: boolean;
}

export default function ComparisonRow({
  label,
  value1,
  value2,
  isLongText,
}: ComparisonRowProps) {
  return (
    <div className="grid grid-cols-3 border-t border-gray-200">
      <div className="p-4 bg-gray-50">
        <p className="text-sm font-medium">{label}</p>
      </div>
      <div
        className={`p-4 border-l border-gray-200 ${isLongText ? "" : "text-center"}`}
      >
        <p className={`${isLongText ? "text-sm" : ""}`}>{value1}</p>
      </div>
      <div
        className={`p-4 border-l border-gray-200 ${isLongText ? "" : "text-center"}`}
      >
        <p className={`${isLongText ? "text-sm" : ""}`}>{value2}</p>
      </div>
    </div>
  );
}
