import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  isAuthenticated: boolean;
}

export default function Hero({ isAuthenticated }: HeroProps) {
  return (
    <div className="text-center mb-16">
      <div className="inline-block p-3 bg-linear-to-r from-blue-100 to-purple-100 rounded-2xl mb-6">
        <div className="text-6xl">🎓</div>
      </div>

      <h1 className="text-5xl mb-6">Discover Your Perfect College Major</h1>

      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Explore 16+ college majors tailored for Iraqi students. Get AI-powered
        recommendations, expert tips, and make informed decisions about your
        future.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {isAuthenticated ? (
          <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center">
            <span>Explore Majors</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <>
            <Link
              href="/browse"
              className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/sign-in"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-all"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
