import { NextResponse } from "next/server";
import { createClient } from "@/app/_lib/supabase";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Prepare response early so we can set cookies on it
    if (!user) {
      const res = NextResponse.json({ username: null });
      // Ensure any stale cookie is removed
      res.cookies.delete("user-name");
      return res;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    const username = profile?.username ?? null;

    const res = NextResponse.json({ username });

    if (username) {
      res.cookies.set("user-name", username, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    } else {
      res.cookies.delete("user-name");
    }

    return res;
  } catch (error) {
    console.error("/api/auth/status error:", error);
    const res = NextResponse.json({ username: null });
    res.cookies.delete("user-name");
    return res;
  }
}
