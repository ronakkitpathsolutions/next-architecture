import type { EnvConfig } from '@/types';

const ENV_CONFIG: EnvConfig = {
  ENVIRONMENT: process.env.APP_ENV || 'development',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  PORT: Number(process.env.NEXT_PUBLIC_PORT) || 3000,
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
};

export { ENV_CONFIG };
