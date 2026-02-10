"use server";

import { createClient } from "@/app/_lib/supabase";

export async function toggleBookmarkAction(majorId: string) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return { ok: false, error: "NOT_AUTHENTICATED" };
  }

  // Get current bookmarks
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("bookmarks")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error(profileError);
    return { ok: false, error: "PROFILE_FETCH_FAILED" };
  }

  const bookmarks: string[] = profile.bookmarks ?? [];

  const isBookmarked = bookmarks.includes(majorId);

  // Add or remove the boomarked major
  const updatedBookmarks = isBookmarked
    ? bookmarks.filter((id) => id !== majorId)
    : [...bookmarks, majorId];

  // Update the current user's bookmarks
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ bookmarks: updatedBookmarks })
    .eq("id", user.id);

  if (updateError) {
    console.error(updateError);
    return { ok: false, error: "UPDATE_FAILED" };
  }

  return {
    ok: true,
    bookmarked: !isBookmarked,
  };
}

export async function updateRecentlyViewedMajor(majorId: string | undefined) {
  if (!majorId) return;

  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // Not logged in => silently ignore
    return;
  }

  // Fetch current recently_viewed
  const { data, error: fetchError } = await supabase
    .from("profiles")
    .select("recently_viewed")
    .eq("id", user.id)
    .single();

  if (fetchError) {
    console.error("Error fetching recently viewed:", fetchError);
    return;
  }

  const current: string[] = data?.recently_viewed ?? [];

  // Remove if already exists
  const filtered = current.filter((id) => id !== majorId);

  // Push new one to the end
  filtered.push(majorId);

  // Keep max length 3
  const updated = filtered.slice(-3);

  // Update DB
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ recently_viewed: updated })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error updating recently viewed:", updateError);
  }
}
