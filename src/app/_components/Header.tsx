"use client";

import { useState } from "react";
import { MobileSearchToggle } from "./MobileSearchToggle";
import { MobileMenuButton } from "./MobileMenuButton";
import { LanguageToggle } from "./LanguageToggle";
import { SavedMajorsButton } from "./SavedMajorsButton";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { Logo } from "./Logo";
import { useSidebar } from "../_context/SideBarContext";

// interface HeaderProps {
//   onSearch: (query: string) => void;
//   onMenuToggle: () => void;
//   isMobileMenuOpen: boolean;
//   onSelectMajor?: (majorId: string) => void;
// }

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Menu Toggle */}
          <div className="flex items-center gap-3">
            <MobileMenuButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            <Logo />
          </div>

          {/* Center: Search Bar (Desktop) */}
          <SearchBar className="flex-1 max-w-2xl mx-4 hidden md:block" />

          {/* Right: Header Items */}
          <div className="flex items-center gap-2">
            <MobileSearchToggle
              isExpanded={isSearchExpanded}
              onToggle={() => setIsSearchExpanded(!isSearchExpanded)}
            />

            <LanguageToggle />

            <SavedMajorsButton />

            <UserMenu />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="pb-4 md:hidden">
            <SearchBar autoFocus />
          </div>
        )}
      </div>
    </header>
  );
}
