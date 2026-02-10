"use server";

import { createClient } from "@/app/_lib/supabase";
import { redirect } from "next/navigation";

// This function redirects to a route handler at auth/callback for Google sign up/in
// Works for both sign up and sign in since Supabase handles both cases automatically
export async function signInWithGoogle() {
  const supabase = await createClient();

  // The route handler will deal with filling the data and creating the profile
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
