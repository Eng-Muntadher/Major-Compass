interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div>
      <div className="text-4xl mb-2">{value}</div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

export default StatItem;
