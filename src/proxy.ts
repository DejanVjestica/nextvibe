import { NextResponse, type NextRequest } from "next/server";
import { i18nConfig, Locale } from "./i18n-config";

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  if (userAgent.includes("facebookexternalhit") || userAgent.includes("Twitterbot") || userAgent.includes("LinkedInBot") || userAgent.includes("Slackbot")) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const { locales, defaultLocale } = i18nConfig;

  if (pathname.includes(".") || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  const pathLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) as Locale | undefined;

  if (pathLocale === defaultLocale) {
    const cleanPath = pathname.replace(`/${defaultLocale}`, "") || "/";
    return NextResponse.redirect(new URL(cleanPath, request.url));
  }

  if (!pathLocale) {
    return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
