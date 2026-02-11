"use client";

import { useState, useEffect } from "react";
import { MobileSearchToggle } from "./MobileSearchToggle";
import { MobileMenuButton } from "./MobileMenuButton";
import { LanguageToggle } from "./LanguageToggle";
import { SavedMajorsButton } from "./SavedMajorsButton";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { Logo } from "./Logo";
import { useSidebar } from "../_context/SideBarContext";
import { EnglishSearchMajors } from "../_lib/types";
import { useAuth } from "../_hooks/useAuth";
import { createClient } from "../_lib/client";
import { getSearchMajors } from "../_lib/supabaseHelpers";

interface HeaderProps {
  lang: "en" | "ar";
}

function Header({ lang }: HeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchMajors, setSearchMajors] = useState<
    EnglishSearchMajors[] | null
  >(null);
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  /* Auth is checked on the client via cookies to avoid making all pages dynamically
   rendered (since header is on every page) */
  const { userName } = useAuth();

  // Fetch search majors once on mount
  useEffect(() => {
    async function fetchSearchMajors() {
      try {
        const supabase = createClient();
        const data = await getSearchMajors(supabase);

        setSearchMajors(data);
      } catch (error) {
        console.error("Error fetching search majors:", error);
        setSearchMajors([]); // Fallback to empty array
      }
    }

    fetchSearchMajors();
  }, []); // Empty array = fetch once on mount, never re-fetch

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm shrink-0 overscroll-none">
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

export default Header;
