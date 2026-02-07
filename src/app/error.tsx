"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-linear-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <AlertTriangle
                className="w-16 h-16 text-white"
                strokeWidth={1.5}
              />
            </div>
            {/* Warning pulse effect */}
            <div className="absolute inset-0 w-32 h-32 bg-linear-to-br from-blue-600 to-purple-600 rounded-3xl animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Oops! Something Went Wrong
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-4">
            We encountered an unexpected error. Don&apos;t worry, it&apos;s not
            your fault!
          </p>
          {error.message && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl max-w-lg mx-auto">
              <p className="text-sm text-red-700 font-mono wrap-break-words">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="group flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-white font-medium min-w-45"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-gray-700 font-medium min-w-45"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Back to Home
          </Link>
        </div>

        {/* Support Message */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If this problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
