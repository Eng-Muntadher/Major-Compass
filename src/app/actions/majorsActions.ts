"use server";

import { createClient } from "@/app/_lib/supabase";

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
