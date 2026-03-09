/**
 * Centralized route definitions and classifiers.
 *
 * All route arrays contain pathnames WITHOUT locale prefixes.
 * The middleware strips the locale prefix before matching.
 */

// ---------------------------------------------------------------------------
// Route arrays
// ---------------------------------------------------------------------------

/** Auth pages — accessible only to unauthenticated users. */
export const AUTH_ROUTES: readonly string[] = [
  '/login',
  '/register',
  '/forgot-password',
  '/change-password',
] as const;

/**
 * Public pages — accessible to everyone (no auth check).
 * The locale home page `/` is always public and handled separately.
 */
export const PUBLIC_ROUTES: readonly string[] = [
  '/privacy-policy',
  '/terms-conditions',
] as const;

/**
 * Protected pages — require authentication.
 * If the user is unauthenticated they will be redirected to the login page.
 */
export const PROTECTED_ROUTES: readonly string[] = [
  '/dashboard',
  '/profile',
  '/user-management',
] as const;

// ---------------------------------------------------------------------------
// Default redirect targets
// ---------------------------------------------------------------------------

/** Where authenticated users are sent when they hit an auth page. */
export const DEFAULT_AUTH_REDIRECT = '/dashboard';

/** Where unauthenticated users are sent when they hit a protected page. */
export const DEFAULT_LOGIN_REDIRECT = '/login';

// ---------------------------------------------------------------------------
// Auth cookie
// ---------------------------------------------------------------------------

/** Name of the cookie that carries the authentication token. */
export const AUTH_COOKIE_NAME = 'auth-token';

// ---------------------------------------------------------------------------
// Classifiers
// ---------------------------------------------------------------------------

/**
 * Check whether the given pathname (without locale prefix) matches an auth
 * route.
 */
export const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};

/**
 * Check whether the given pathname (without locale prefix) matches a public
 * route.  The locale root `/` is always considered public.
 */
export const isPublicRoute = (pathname: string): boolean => {
  if (pathname === '/' || pathname === '') return true;
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};

/**
 * Check whether the given pathname (without locale prefix) matches a
 * protected route.
 */
export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};
