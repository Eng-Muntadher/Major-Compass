// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "ar"] as const;
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip internals & static files
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

  // Already has locale → do nothing
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Determine locale
  let locale = DEFAULT_LOCALE;

  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as any)) {
    locale = cookieLocale as (typeof LOCALES)[number];
  } else {
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      const preferredLang = acceptLanguage
        .split(",")[0]
        .split("-")[0]
        .toLowerCase();

      if (LOCALES.includes(preferredLang as any)) {
        locale = preferredLang as (typeof LOCALES)[number];
      }
    }
  }

  // PRESERVE QUERY PARAMS
  const redirectUrl = new URL(`/${locale}${pathname}${search}`, request.url);

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|auth|.*\\..*).*)",
  ],
};
