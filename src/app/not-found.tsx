"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-linear-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30 animate-pulse">
              <Compass
                aria-hidden="true"
                className="w-16 h-16 text-white"
                strokeWidth={1.5}
              />
            </div>
            {/* Floating decorative elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-linear-to-br from-blue-400 to-purple-400 rounded-lg animate-bounce delay-100"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-linear-to-br from-purple-400 to-blue-400 rounded-lg animate-bounce delay-300"></div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Lost Your Way?
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you&apos;re looking for seems to have wandered off the map.
            Let&apos;s get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-gray-700 font-medium min-w-45"
          >
            <ArrowLeft
              aria-hidden="true"
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
            />
            Go Back
          </button>

          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-white font-medium min-w-45"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Back to Home
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Maybe you were looking for:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/en/majors"
              className="px-4 py-2 text-sm bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
            >
              Browse Majors
            </Link>
            <Link
              href="/en/test"
              className="px-4 py-2 text-sm bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
            >
              Take Assessment
            </Link>
            <Link
              href="/en/about"
              className="px-4 py-2 text-sm bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
