/**
 * This middleware automatically detects and redirects users to the correct
 * language version of the site (English or Arabic). It runs on every page request
 * before the page loads.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported languages in the application
const LOCALES = ["en", "ar"] as const;
// Default language when no preference is detected
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Don't redirect for Next.js internals, API routes, auth routes, images, ...
  if (
    pathname.startsWith("/_next") || // Next.js internal files
    pathname.startsWith("/api") || // API routes
    pathname.startsWith("/auth") || // Authentication routes (Supabase callback)
    /\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot|xml|txt)$/i.test(
      pathname,
    )
  ) {
    return NextResponse.next(); // Continue without modification
  }

  // Check if user is on /en or /ar root and redirect to /home
  const localeRootMatch = pathname.match(/^\/(en|ar)$/);
  if (localeRootMatch) {
    const locale = localeRootMatch[1];
    const redirectUrl = new URL(`/${locale}/home${search}`, request.url);
    return NextResponse.redirect(redirectUrl, 307);
  }

  // If the path already has "/en" or "/ar" => no redirect is needed
  const pathnameHasLocale = LOCALES.some((locale) =>
    pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Determine the user's preferred locale
  let locale = DEFAULT_LOCALE;

  // Priority 1: Check if user has previously selected a language (stored in cookie)
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as "en" | "ar")) {
    locale = cookieLocale as (typeof LOCALES)[number];
  } else {
    // Priority 2: Check browser's language preference (Accept-Language header)
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      // Extract the primary language code (e.g., "en-US,en;q=0.9" → "en")
      const preferredLang = acceptLanguage
        .split(",")[0] // Get first preference
        .split("-")[0] // Remove region code (en-US → en)
        .toLowerCase();

      // Use browser language if it's one we support
      if (LOCALES.includes(preferredLang as "en" | "ar")) {
        locale = preferredLang as (typeof LOCALES)[number];
      }
    }
  }

  // Redirect root "/" to "/{locale}/home"
  // All other paths get locale prefix: "/about" → "/{locale}/about"
  const targetPath = pathname === "/" ? "/home" : pathname;

  // Preserve any query parameters (primarily for sort/filter majors)
  const redirectUrl = new URL(`/${locale}${targetPath}${search}`, request.url);

  // Use 307 (Temporary Redirect) to preserve the request method and body
  return NextResponse.redirect(redirectUrl, 307);
}

// Matcher pattern defines which routes this middleware should run on.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|auth|.*\\..*).*)",
  ],
};
