import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/auth';
import { routing } from '@/i18n/routing';
import {
  isPublicRoute,
  isAuthRoute,
  isProtectedRoute,
  DEFAULT_AUTH_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
} from '@/utils/constants/routes';
const handleI18nRouting = createMiddleware(routing);

const getLocaleFromPathname = (pathname: string): string => {
  const firstSegment = pathname.split('/')[1];

  if (
    routing.locales.includes(firstSegment as (typeof routing.locales)[number])
  ) {
    return firstSegment;
  }

  return routing.defaultLocale;
};

const stripLocaleFromPathname = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  const [firstSegment, ...rest] = segments;

  if (
    routing.locales.includes(firstSegment as (typeof routing.locales)[number])
  ) {
    if (rest.length === 0) {
      return '/';
    }

    return `/${rest.join('/')}`;
  }

  return pathname;
};

const getI18nResolvedPathname = (
  request: NextRequest,
  response: NextResponse,
): string => {
  const rewrittenPath = response.headers.get('x-middleware-rewrite');

  if (rewrittenPath) {
    return new URL(rewrittenPath).pathname;
  }

  const redirectPath = response.headers.get('location');

  if (redirectPath) {
    return new URL(redirectPath, request.url).pathname;
  }

  return request.nextUrl.pathname;
};

export const proxy = auth((request) => {
  const i18nResponse = handleI18nRouting(request);
  const pathname = getI18nResolvedPathname(request, i18nResponse);
  const locale = getLocaleFromPathname(pathname);
  const pathWithoutLocale = stripLocaleFromPathname(pathname);
  const authenticated = Boolean(
    request.auth?.user &&
    (request.auth.user.email || request.auth.user.name || request.auth.user.id),
  );

  if (isAuthRoute(pathWithoutLocale)) {
    if (authenticated) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${DEFAULT_AUTH_REDIRECT}`;
      return NextResponse.redirect(url);
    }

    return i18nResponse;
  }

  if (isProtectedRoute(pathWithoutLocale) && !authenticated) {
    const callbackUrl = `${pathname}${request.nextUrl.search}`;
    const loginUrl = new URL(
      `/${locale}${DEFAULT_LOGIN_REDIRECT}`,
      request.url,
    );
    loginUrl.searchParams.set('callbackUrl', callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute(pathWithoutLocale)) {
    return i18nResponse;
  }

  return i18nResponse;
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
