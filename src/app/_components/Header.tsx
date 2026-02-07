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
import { EnglishSearchMajors } from "../_lib/types";

interface HeaderProps {
  searchMajors: EnglishSearchMajors[] | null;
  userName: string | null;
  lang: "en" | "ar";
}

export function Header({ searchMajors, userName, lang }: HeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm shrink-0">
      <div className="grid grid-cols-2 md:grid-cols-[230px_1fr_230px] items-center px-4 h-16">
        {/* Left: Logo and Menu Toggle */}
        <div className="flex items-center gap-3">
          <MobileMenuButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />
          <Logo lang={lang} />
        </div>

        {/* Center: Search Bar (Desktop) */}
        <SearchBar
          lang={lang}
          searchMajors={searchMajors}
          className={`hidden md:block ${lang === "en" ? "lg:ml-60" : "lg:mr-60"}`}
        />

        {/* Right: Header Items */}
        <div className="flex justify-end gap-2">
          <MobileSearchToggle
            isExpanded={isSearchExpanded}
            onToggle={() => setIsSearchExpanded(!isSearchExpanded)}
          />

          <LanguageToggle currentLanguage={lang} />

          <SavedMajorsButton currentLanguage={lang} />

          <UserMenu userName={userName} lang={lang} />
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchExpanded && (
        <div className="pb-4 md:hidden px-4">
          <SearchBar lang={lang} searchMajors={searchMajors} autoFocus />
        </div>
      )}
    </header>
  );
}
