/** SUPABASE AUTHENTICATION CALLBACK ROUTE:
 * Handles the OAuth callback after a user signs in with Google or
 * confirms their email for email/password authentication.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/app/_lib/supabase";

export async function GET(request: Request) {
  // Parse the URL to extract query parameters and origin
  const { searchParams, origin } = new URL(request.url);

  // Extract the authorization code from the URL.
  const code = searchParams.get("code");

  // No code = invalid callback, redirect to homepage
  if (!code) {
    return NextResponse.redirect(`${origin}/`);
  }

  // Create a Supabase client for this request
  const supabase = await createClient();

  // Exchange the authorization code for a user session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.exchangeCodeForSession(code);

  // If exchange fails, redirect to sign-in with error message
  if (sessionError) {
    console.error("Session error:", sessionError);
    return NextResponse.redirect(`${origin}/sign-in?error=auth_failed`);
  }

  // Create user profile if this is their first sign-in
  if (session?.user) {
    // Query the profiles table to see if this user already has a profile
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", session.user.id)
      .maybeSingle(); // Returns null if not found (doesn't throw error)

    // If no profile exists, create one
    if (!existingProfile) {
      //Extract user metadata from the session
      const userData = session.user.user_metadata;

      // Insert new profile
      await supabase.from("profiles").insert({
        id: session.user.id, // Use Supabase auth user ID as primary key
        username:
          userData.full_name || // Try full_name first (email auth)
          userData.name || // Try name (Google)
          session.user.email?.split("@")[0] || // Fallback: email prefix
          "User", // Last resort: "User"
        email: session.user.email,
        grade: null, // Will be set later by user
        avatar_url:
          userData.avatar_url || // Try avatar_url (email auth)
          userData.picture || // Try picture (Google)
          null, // Fallback: no avatar
        bookmarks: [], // Initialize empty bookmarks array
      });
    }
  }

  // Redirect to homepage (authentication complete)
  return NextResponse.redirect(`${origin}/`);
}
