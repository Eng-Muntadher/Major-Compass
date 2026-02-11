"use client";

import { useSyncExternalStore } from "react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  return null;
}

// Create a proper external store for auth state
function getAuthSnapshot() {
  return getCookie("user-name");
}

function getServerSnapshot() {
  return null; // Always null on server
}

function subscribe() {
  // Listen for storage events (not really needed for cookies, but follows pattern)
  // We can return a no-op since cookies are managed by middleware
  return () => {};
}

export function useAuth() {
  // Use useSyncExternalStore to avoid hydration issues
  const userName = useSyncExternalStore(
    subscribe,
    getAuthSnapshot,
    getServerSnapshot,
  );
  const isAuthenticated = !!userName;

  return { isAuthenticated, userName };
}
