import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const capitalize = (value: string): string => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const logError = (error: unknown): void => {
  console.error('Error:', error);
};

const errorHandler = <T>(
  handleTry: () => T,
  handleCatch?: (error: unknown) => T | null,
  handleFinally?: () => void,
): T | null => {
  try {
    const response = handleTry();
    return response;
  } catch (error) {
    logError(error);
    if (typeof handleCatch === 'function') {
      return handleCatch(error);
    }
    return null;
  } finally {
    if (typeof handleFinally === 'function') {
      handleFinally();
    }
  }
};

export { cn, capitalize, logError, errorHandler };
