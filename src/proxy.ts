import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';
import { isAuthenticated } from '@/utils/functions/auth';
import {
  isAuthRoute,
  isProtectedRoute,
  DEFAULT_AUTH_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
} from '@/utils/constants/routes';

// ---------------------------------------------------------------------------
// next-intl locale middleware
// ---------------------------------------------------------------------------
const intlMiddleware = createMiddleware(routing);

// ---------------------------------------------------------------------------
// Supported locale prefixes — used to strip locale from pathname
// ---------------------------------------------------------------------------
const LOCALE_PREFIX_RE = new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`);

/**
 * Strip the locale prefix from a pathname so it can be matched against the
 * route arrays which store paths without locale prefixes.
 */
const stripLocale = (pathname: string): string => {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, '');
  return stripped === '' ? '/' : stripped;
};

/**
 * Detect the preferred locale from the request.
 * Falls back to the default locale defined in routing config.
 */
const getLocaleFromRequest = (request: NextRequest): string => {
  const match = request.nextUrl.pathname.match(LOCALE_PREFIX_RE);
  if (match) return match[1];

  // Let next-intl middleware compute the actual locale based on headers,
  // but for quick redirects we can default to English if not present in URL
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (routing.locales.includes(preferredLocale as 'fr' | 'en' | 'ar')) {
      return preferredLocale;
    }
  }
  return routing.defaultLocale;
};

// ---------------------------------------------------------------------------
// Main middleware
// ---------------------------------------------------------------------------

export default function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const pathWithoutLocale = stripLocale(pathname);
  const authenticated = isAuthenticated(request);

  // -----------------------------------------------------------------------
  // 1. Auth routes — redirect authenticated users to dashboard
  // -----------------------------------------------------------------------
  if (isAuthRoute(pathWithoutLocale)) {
    if (authenticated) {
      const locale = getLocaleFromRequest(request);
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${DEFAULT_AUTH_REDIRECT}`;
      return NextResponse.redirect(url);
    }

    // Unauthenticated users allowed; proceed to next-intl middleware
    return intlMiddleware(request);
  }

  // -----------------------------------------------------------------------
  // 2. Protected routes — redirect unauthenticated users to login
  // -----------------------------------------------------------------------
  if (isProtectedRoute(pathWithoutLocale)) {
    if (!authenticated) {
      const locale = getLocaleFromRequest(request);
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${DEFAULT_LOGIN_REDIRECT}`;
      return NextResponse.redirect(url);
    }
  }

  // -----------------------------------------------------------------------
  // 3. Delegate to next-intl middleware for locale negotiation
  // -----------------------------------------------------------------------
  return intlMiddleware(request);
}

// ---------------------------------------------------------------------------
// Matcher
// ---------------------------------------------------------------------------
export const config = {
  matcher: ['/', '/(ar|en|fr)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
