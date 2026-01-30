import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
  isAuthenticated: boolean;
}

function CTASection({ isAuthenticated }: CTASectionProps) {
  return (
    <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
      <h2 className="text-3xl mb-4">Ready to Find Your Perfect Major?</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Join Iraqi students who are making informed decisions about their
        future. Start exploring today!
      </p>
      {isAuthenticated ? (
        <Link
          href="/student-test"
          className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2"
        >
          <span>Take student test</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      ) : (
        <Link
          href="/sign-up"
          className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2"
        >
          <span>Sign Up</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}

export default CTASection;
