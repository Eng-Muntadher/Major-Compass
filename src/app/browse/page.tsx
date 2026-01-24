"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { majors } from "../_data/majors";
import { SortDropdown, SortOption } from "../_components/SortDropdown";
import { staggerContainer, staggerItem } from "../_styles/animations";
import { MajorCard } from "../_components/MajorCard";
import { filterMajorsByCategory } from "../_utils/search";
import { sortMajors } from "../_utils/SortAndFilter";

export default function BrowsePage() {
  const [selectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [savedMajors, setSavedMajors] = useState<string[]>([]);

  // Get filtered and sorted majors
  const getFilteredMajors = () => {
    let filtered = majors;
    filtered = filterMajorsByCategory(filtered, selectedCategory);
    return sortMajors(filtered, sortOption);
  };

  const filteredMajors = getFilteredMajors();

  // Event handlers
  const handleToggleSave = (majorId: string) => {
    setSavedMajors((prev) =>
      prev.includes(majorId)
        ? prev.filter((id) => id !== majorId)
        : [...prev, majorId],
    );
  };

  return (
    <section
      aria-labelledby="all-categories-heading"
      className="min-h-screen bg-gray-50 p-8"
    >
      {/* Section header */}
      <header className="mb-8">
        <h2 id="all-categories-heading" className="text-3xl font-bold mb-2">
          All Categories
        </h2>

        <p className="text-gray-600" aria-live="polite">
          {filteredMajors.length} major
          {filteredMajors.length !== 1 ? "s" : ""} found
        </p>
      </header>

      {/* Sorting controls */}
      <div className="mb-6">
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      {/* Results list */}
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        role="list"
      >
        {filteredMajors.map((major) => (
          <motion.li key={major.id} variants={staggerItem} role="listitem">
            <MajorCard
              major={major}
              isSaved={savedMajors.includes(major.id)}
              onToggleSave={handleToggleSave}
            />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
