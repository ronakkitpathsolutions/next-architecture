import { format, isValid } from 'date-fns';
import { capitalize } from '@/utils/functions';
import type {
  DateFormatters,
  DateInput,
  HttpErrorStatus,
  UserRole,
} from '@/types';

const APP_TITLE = 'Next Architecture';
const LOCAL_STORAGE_KEY = 'next-architecture';
const CACHED_URL_LOCAL_STORAGE_KEY = 'cached-redirect-url';

const USER_ROLES: Record<string, UserRole> = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
};

const METHODS = {
  POST: 'post',
  GET: 'get',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
  HEAD: 'head',
  OPTIONS: 'options',
} as const;

const AUTH_MESSAGES = {
  loginSuccess: 'Login successful.',
  invalidLogin: 'Invalid email or password.',
  forgotPassword: 'Password reset link has been sent to your email.',
  resetPassword: 'Your password has been reset successfully.',
  createPassword: 'Your password has been created successfully.',
  logout: 'You have been logged out.',
  sessionExpired: 'Your session has expired. Please log in again.',
  emailVerificationSent: 'Verification email sent. Please check your inbox.',
  verificationLinkExpired: 'The verification link has expired.',
} as const;

const ERROR_MESSAGES: Record<HttpErrorStatus | 'common' | 'network', string> = {
  400: 'Invalid request. Please try again.',
  401: 'You must be logged in to continue.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  408: 'The request timed out. Please try again.',
  422: 'Invalid input. Please check your details.',
  500: 'Something went wrong on our end. Please try again later.',
  502: 'Server connection issue. Please try again later.',
  503: 'Service is temporarily unavailable. Please try again later.',
  504: 'Server response took too long. Please try again.',
  network: 'Network error. Please check your connection.',
  common: 'Something went wrong. Please try again.',
};

const VALIDATION_MESSAGES = {
  required: (field: string) => `${capitalize(field)} is required.`,
  minLength: (field: string, length: number) =>
    `${capitalize(field)} must be at least ${length} characters.`,
  maxLength: (field: string, length: number) =>
    `${capitalize(field)} must be at most ${length} characters.`,
  invalid: (field: string) => `${capitalize(field)} is invalid.`,
  passwordUppercase: 'Password must contain at least one uppercase letter.',
  passwordLowercase: 'Password must contain at least one lowercase letter.',
  passwordNumber: 'Password must contain at least one number.',
  passwordSpecialChar: 'Password must contain at least one special character.',
  passwordsDoNotMatch: 'Passwords do not match.',
} as const;

const PLACEHOLDER_MESSAGES = {
  default: (field: string) => `Enter ${field}`,
  select: (field: string) => `Select ${field}`,
  filter: (field: string) => `Filter by ${field}`,
  search: 'Search…',
} as const;

const DATE_FORMAT: DateFormatters = {
  date: (date: DateInput) => {
    if (!date) return '-';

    const parsed = new Date(date);
    if (!isValid(parsed)) return '-';

    return format(parsed, 'dd/MM/yyyy');
  },

  dateTime: (date: DateInput) => {
    if (!date) return '-';

    const parsed = new Date(date);
    if (!isValid(parsed)) return '-';

    return format(parsed, 'dd/MM/yyyy, h:mm a');
  },
};

export {
  APP_TITLE,
  AUTH_MESSAGES,
  LOCAL_STORAGE_KEY,
  CACHED_URL_LOCAL_STORAGE_KEY,
  USER_ROLES,
  ERROR_MESSAGES,
  PLACEHOLDER_MESSAGES,
  VALIDATION_MESSAGES,
  DATE_FORMAT,
  METHODS,
};
