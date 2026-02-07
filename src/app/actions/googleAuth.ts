"use server";

import { createClient } from "@/app/_lib/supabase";
import { redirect } from "next/navigation";

// This functions redirects to a route handler in "http://localhost:3000/auth/callback" for Google sign up
export async function signUpWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    return;
  }

  if (data?.url) redirect(data.url);
}

export async function continueWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    return { error: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }
}
