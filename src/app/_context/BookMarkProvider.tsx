"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/app/_lib/client";

const BookmarkContext = createContext<{
  bookmarks: string[];
  isUserAuthenticated: boolean;
  loading: boolean;
}>({
  bookmarks: [],
  isUserAuthenticated: false,
  loading: true,
});

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookmarks() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsUserAuthenticated(!!user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("bookmarks")
          .eq("id", user.id)
          .single();

        setBookmarks(profile?.bookmarks ?? []);
      }

      setLoading(false);
    }

    loadBookmarks();
  }, []);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, isUserAuthenticated, loading }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
