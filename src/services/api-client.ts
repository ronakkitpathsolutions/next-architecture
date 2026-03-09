import type { HttpMethod, HttpErrorStatus } from '@/types';
import { METHODS, ERROR_MESSAGES } from '@/utils/constants';
import { logError } from '@/utils/functions';

/**
 * API Client for Next.js App Router (v15/16)
 * Supports server-side fetching with automatic token injection via cookies.
 * Adheres to HttpOnly security rules for client-side queries.
 */

export type NextFetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
};

export type ClientRequest<TPayload = unknown> = {
  method?: HttpMethod | Uppercase<HttpMethod>;
  url: string;
  data?: TPayload | FormData;
  params?: Record<string, unknown>;
  headers?: HeadersInit;
  signal?: AbortSignal;
  next?: NextFetchOptions;
};

export type ApiError = {
  status: number;
  message: string;
  data?: unknown;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const DEFAULT_PREFIX = '/api/v1';

/**
 * Builds a query string from a params object.
 */
const buildQuery = (params?: Record<string, unknown>): string => {
  if (!params || Object.keys(params).length === 0) return '';

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((val) => query.append(key, String(val)));
      } else {
        query.append(key, String(value));
      }
    }
  });

  return `?${query.toString()}`;
};

/**
 * Safely reads the auth token on the server side.
 * Security Note: We strictly avoid localStorage to comply with AI anti-patterns.
 * Instead, client-side requests rely on the browser automatically attaching
 * HttpOnly cookies because we set credentials: 'include'.
 */
const getServerToken = async (): Promise<string | undefined> => {
  if (typeof window !== 'undefined') {
    // Client-side: Token is managed via HttpOnly cookies by the browser.
    return undefined;
  }

  // Server-side
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
  } catch (error: unknown) {
    logError(error);
    return undefined;
  }
};

/**
 * Core Universal API Fetch Client
 */
const client = async <TResponse = unknown, TPayload = unknown>({
  method = METHODS.GET,
  url,
  data,
  params,
  headers = {},
  signal,
  next,
}: ClientRequest<TPayload>): Promise<TResponse> => {
  try {
    const token = await getServerToken();
    const query = buildQuery(params);

    const finalHeaders: HeadersInit = new Headers(headers);

    let body: BodyInit | undefined;

    // Handle FormData vs JSON payload
    if (data instanceof FormData) {
      body = data;
      // Do NOT set Content-Type for FormData; the browser will automatically
      // set it to "multipart/form-data" with the correct boundary.
    } else if (data !== undefined && data !== null) {
      finalHeaders.set('Content-Type', 'application/json');
      body = JSON.stringify(data);
    }

    // Attach Authorization header if we have a token (Server-Side)
    if (token) {
      finalHeaders.set('Authorization', `Bearer ${token}`);
    }

    // Initialize fetch config
    const config: RequestInit = {
      method: method.toUpperCase(),
      headers: finalHeaders,
      body,
      signal,
      credentials: 'include', // Ensures cookies are automatically sent on the client
    };

    // Apply Next.js specific caching and revalidation options
    if (next) {
      if (next.cache) {
        config.cache = next.cache;
      }
      if (next.revalidate !== undefined || next.tags) {
        config.next = {
          ...(next.revalidate !== undefined && { revalidate: next.revalidate }),
          ...(next.tags && { tags: next.tags }),
        };
      }
    }

    // Ensure URL is correctly formatted
    const targetUrl = `${BASE_URL}${DEFAULT_PREFIX}${url}${query}`;
    const response = await fetch(targetUrl, config);

    // Handle non-OK responses
    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }

      // Safe access since errorData is unknown
      let errorMessage =
        errorData !== null &&
        typeof errorData === 'object' &&
        'message' in errorData &&
        (errorData as Record<string, unknown>).message
          ? String((errorData as Record<string, unknown>).message)
          : undefined;

      if (!errorMessage) {
        errorMessage =
          ERROR_MESSAGES[response.status as HttpErrorStatus] ||
          ERROR_MESSAGES.common;
      }

      const errorPayload: ApiError = {
        status: response.status,
        message: errorMessage,
        data: errorData,
      };

      throw errorPayload;
    }

    // Handle No Content (204)
    if (response.status === 204) {
      return {} as unknown as TResponse;
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return (await response.json()) as TResponse;
    }

    return (await response.text()) as unknown as TResponse;
  } catch (error: unknown) {
    // If it's already our structured error, just rethrow
    if (error !== null && typeof error === 'object' && 'status' in error) {
      throw error;
    }

    // Wrap network errors or other unexpected errors gracefully
    const networkError: ApiError = {
      status: 0,
      message: error instanceof Error ? error.message : ERROR_MESSAGES.network,
      data: error, // Error payload safely preserved
    };

    throw networkError;
  }
};

export default client;
