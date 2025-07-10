/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./src/app/lib/i18n";

function getLocale(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Get locale from cookie or header
  const cookieLocale = request.cookies.get("locale")?.value;
  const headerLocale = request.headers.get("accept-language");

  // Priority: URL > Cookie > Browser > Default
  if (!pathnameIsMissingLocale) {
    return (
      i18n.locales.find((locale) => pathname.startsWith(`/${locale}`)) ||
      i18n.defaultLocale
    );
  }

  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  if (headerLocale) {
    const browserLocale = headerLocale.split(",")[0].split("-")[0];
    if (i18n.locales.includes(browserLocale as any)) {
      return browserLocale;
    }
  }

  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If missing locale, redirect to default or detected locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // For Turkish (default), don't add locale prefix
    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(
        new URL(`/${locale}${pathname}`, request.url)
      );
    }

    // For English, redirect with locale prefix
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // Set locale cookie
  const currentLocale = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  if (currentLocale) {
    const response = NextResponse.next();
    response.cookies.set("locale", currentLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
    return response;
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*|manifest.json).*)",
  ],
};
