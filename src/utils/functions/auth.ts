import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/utils/constants/routes';

/**
 * Read the authentication token from the request cookies.
 *
 * @returns The token string, or `null` when no token cookie is present.
 */
export const getAuthToken = (request: NextRequest): string | null => {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  return token ?? null;
};

/**
 * Determine whether the current request carries a valid auth token.
 *
 * NOTE: This only checks for the *presence* of the cookie — it does NOT
 * validate the JWT signature.  Signature validation must happen in the API
 * layer / backend.
 */
export const isAuthenticated = (request: NextRequest): boolean => {
  const token = getAuthToken(request);
  return token !== null && token.length > 0;
};
