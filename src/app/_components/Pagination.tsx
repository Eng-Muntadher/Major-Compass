"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  lang: "en" | "ar";
}

export function Pagination({ currentPage, totalPages, lang }: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      aria-label={lang === "en" ? "Pagination" : "تصفح الصفحات"}
      className="flex items-center justify-center gap-2 mt-8 mb-4"
    >
      {/* Previous button */}
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`px-3 py-2 rounded-md transition-all ${
          currentPage === 1
            ? "pointer-events-none opacity-50 bg-gray-100 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm hover:ring-1 hover:ring-gray-300"
        }`}
        aria-disabled={currentPage === 1}
        aria-label={lang === "en" ? "Previous page" : "الصفحة السابقة"}
      >
        {lang === "en" ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </Link>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-gray-500"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`px-4 py-2 rounded-md min-w-10 text-center transition-all ${
              currentPage === page
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm hover:ring-1 hover:ring-gray-300"
            }`}
            aria-label={lang === "en" ? `Page ${page}` : `الصفحة ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Link>
        ),
      )}

      {/* Next button */}
      <Link
        href={createPageUrl(currentPage + 1)}
        className={`px-3 py-2 rounded-md transition-all ${
          currentPage === totalPages
            ? "pointer-events-none opacity-50 bg-gray-100 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm hover:ring-1 hover:ring-gray-300"
        }`}
        aria-disabled={currentPage === totalPages}
        aria-label={lang === "en" ? "Next page" : "الصفحة التالية"}
      >
        {lang === "en" ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </Link>
    </nav>
  );
}
