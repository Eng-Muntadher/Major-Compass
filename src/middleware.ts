/**
 * This middleware handles:
 * 1. Language detection and redirection (English/Arabic)
 * 2. Auth state management (username cookie for client-side use)
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const LOCALES = ["en", "ar"] as const;
const DEFAULT_LOCALE = "en";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip processing for Next.js internals, API routes, auth routes, static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    /\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot|xml|txt)$/i.test(
      pathname,
    )
  ) {
    return NextResponse.next();
  }

  // Initialize response (we'll modify it as needed)
  const response = NextResponse.next();

  // ============================================================================
  // AUTH HANDLING - Set username cookie for client-side access
  // ============================================================================
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options) {
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options) {
            response.cookies.set({ name, value: "", ...options });
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (profile?.username) {
        response.cookies.set("user-name", profile.username, {
          httpOnly: false, // Allow client-side reading
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/",
        });
      }
    } else {
      // User is not logged in, remove username cookie
      response.cookies.delete("user-name");
    }
  } catch (error) {
    // If auth check fails, continue anyway (non-critical)
    console.error("Middleware auth check failed:", error);
  }

  // ============================================================================
  // LANGUAGE DETECTION & REDIRECTION
  // ============================================================================

  // Check if user is on /en or /ar root and redirect to /home
  const localeRootMatch = pathname.match(/^\/(en|ar)$/);
  if (localeRootMatch) {
    const locale = localeRootMatch[1];
    const redirectUrl = new URL(`/${locale}/home${search}`, request.url);
    return NextResponse.redirect(redirectUrl, 307);
  }

  // If path already has locale prefix, continue with modified response (cookies set)
  const pathnameHasLocale = LOCALES.some((locale) =>
    pathname.startsWith(`/${locale}/`),
  );
  // about/en
  if (pathnameHasLocale) {
    return response;
  }

  // Determine user's preferred locale
  let locale = DEFAULT_LOCALE;

  // Priority 1: Cookie preference
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as "en" | "ar")) {
    locale = cookieLocale as (typeof LOCALES)[number];
  } else {
    // Priority 2: Browser language
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      const preferredLang = acceptLanguage
        .split(",")[0]
        .split("-")[0]
        .toLowerCase();

      if (LOCALES.includes(preferredLang as "en" | "ar")) {
        locale = preferredLang as (typeof LOCALES)[number];
      }
    }
  }

  // Redirect to localized path
  const targetPath = pathname === "/" ? "/home" : pathname;
  const redirectUrl = new URL(`/${locale}${targetPath}${search}`, request.url);

  // Create redirect response and copy auth cookies to it
  const redirectResponse = NextResponse.redirect(redirectUrl, 307);

  // Copy cookies from our response to the redirect response
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|auth|.*\\..*).*)",
  ],
};

/* Note: I intoduced the second part of this middleware in my
app (user auth detection) to allow the home page to be
statically server rendered (does not need to check user auth on the serever) */
