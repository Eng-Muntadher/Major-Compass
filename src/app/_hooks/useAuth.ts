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

function subscribe(onStoreChange: () => void) {
  // Cookies don't emit change events. Poll the specific cookie and notify
  // subscribers when it changes. Also trigger checks on window focus/visibility
  // to make updates faster when users sign in via redirects.
  let prev = getAuthSnapshot();

  const check = () => {
    const next = getAuthSnapshot();
    if (next !== prev) {
      prev = next;
      onStoreChange();
    }
  };

  const interval = window.setInterval(check, 300);

  const onFocus = () => check();
  const onVisibility = () => {
    if (document.visibilityState === "visible") check();
  };

  // Also fetch authoritative status from the server on focus/visibility
  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/auth/status", {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!res.ok) return;
      const json = await res.json();
      const next = json?.username ?? null;
      if (next !== prev) {
        prev = next;
        onStoreChange();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Register handlers
  window.addEventListener("focus", onFocus);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("focus", fetchStatus);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") fetchStatus();
  });

  // Run immediate checks so subscribers see updated auth state right after navigation
  check();
  void fetchStatus();

  return () => {
    clearInterval(interval);
    window.removeEventListener("focus", onFocus);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("focus", fetchStatus);
    document.removeEventListener(
      "visibilitychange",
      fetchStatus as () => Promise<void>,
    );
  };
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
