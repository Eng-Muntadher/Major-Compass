import { CheckCircle, XCircle } from "lucide-react";

interface ProsAndConsProps {
  pros: string[];
  cons: string[];
}

function MajorProsAndCons({ pros, cons }: ProsAndConsProps) {
  return (
    <section className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Pros */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl mb-4 flex items-center gap-2 text-green-600 font-semibold">
          <CheckCircle className="w-6 h-6" aria-hidden="true" />
          Advantages
        </h2>

        <ul className="space-y-3" role="list">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle
                className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-gray-700">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl mb-4 flex items-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-6 h-6" aria-hidden="true" />
          Challenges
        </h2>
        <ul className="space-y-3" role="list">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-3">
              <XCircle
                className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-gray-700">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MajorProsAndCons;
