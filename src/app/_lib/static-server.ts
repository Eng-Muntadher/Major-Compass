// This is a server-only Supabase client for static pages
// It does NOT use cookies so it allows specific gapes like compare-majors page to use ISG

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false, // ← No session/cookies
      },
    },
  );
}
