import StatItem from "./StatItem";

// Static data
const stats = [
  { value: "16+", label: "College Majors" },
  { value: "8", label: "Categories" },
  { value: "🎯", label: "AI-Powered Guidance" },
];

function StatsSection() {
  return (
    <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16 border border-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default StatsSection;
