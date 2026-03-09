import type {
  ERROR_MESSAGES,
  METHODS,
  PLACEHOLDER_MESSAGES,
  VALIDATION_MESSAGES,
} from '@/utils/constants';

type EnvConfig = {
  ENVIRONMENT: 'development' | 'staging' | 'production';
  API_BASE_URL: string;
  PORT: number;
  DEBUG_MODE: boolean;
};

type HttpErrorStatus =
  | 400
  | 401
  | 403
  | 404
  | 408
  | 422
  | 500
  | 502
  | 503
  | 504;

type UserRole = 'admin' | 'user' | 'manager';

type ValidationMessageKey = keyof typeof VALIDATION_MESSAGES;
type ValidationMessageValue =
  (typeof VALIDATION_MESSAGES)[ValidationMessageKey];

type PlaceholderMessageKey = keyof typeof PLACEHOLDER_MESSAGES;
type PlaceholderMessageValue =
  (typeof PLACEHOLDER_MESSAGES)[PlaceholderMessageKey];

type DateInput = Date | string | number | null | undefined;
type DateFormatters = {
  date: (date?: DateInput) => string;
  dateTime: (date?: DateInput) => string;
};

type HttpMethodKey = keyof typeof METHODS;
type HttpMethod = (typeof METHODS)[HttpMethodKey];

type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
type ErrorMessageValue = (typeof ERROR_MESSAGES)[ErrorMessageKey];

type AsyncFn = (args: Record<string, unknown>) => Promise<unknown>;
type ServiceGroup = {
  [key: string]: AsyncFn | ServiceGroup;
};
type Services = {
  auth: ServiceGroup;
  admin: ServiceGroup;
  web: ServiceGroup;
};

export type {
  EnvConfig,
  HttpErrorStatus,
  UserRole,
  ValidationMessageKey,
  ValidationMessageValue,
  PlaceholderMessageKey,
  PlaceholderMessageValue,
  DateInput,
  DateFormatters,
  HttpMethodKey,
  HttpMethod,
  ErrorMessageKey,
  ErrorMessageValue,
  Services,
  AsyncFn,
};
