import { createClient } from "@/app/_lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/`);
  }

  const supabase = await createClient();

  // Exchange code for session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.exchangeCodeForSession(code);

  if (sessionError) {
    console.error("Session error:", sessionError);
    return NextResponse.redirect(`${origin}/sign-in?error=auth_failed`);
  }

  // Create profile if it doesn't exist (for both Google and email users)
  if (session?.user) {
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", session.user.id)
      .maybeSingle();

    if (!existingProfile) {
      const userData = session.user.user_metadata;

      await supabase.from("profiles").insert({
        id: session.user.id,
        username:
          userData.full_name ||
          userData.name ||
          session.user.email?.split("@")[0] ||
          "User",
        email: session.user.email,
        grade: null,
        avatar_url: userData.avatar_url || userData.picture || null,
        bookmarks: [],
      });
    }
  }

  return NextResponse.redirect(`${origin}/`);
}
