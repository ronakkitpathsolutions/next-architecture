import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { LoginForm } from '@/components/login-form';

interface LoginContainerProps {
  locale: string;
  callbackUrl?: string;
  error?: string;
}

const normalizeCallbackUrl = (
  value: string | undefined,
  locale: string,
): string => {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return `/${locale}`;
  }

  return value;
};

export function LoginContainer({
  locale,
  callbackUrl,
  error,
}: LoginContainerProps) {
  const safeCallbackUrl = normalizeCallbackUrl(callbackUrl, locale);

  const signInAction = async (formData: FormData): Promise<void> => {
    'use server';

    const email = formData.get('email');
    const password = formData.get('password');
    const rawCallbackUrl = formData.get('callbackUrl');
    const nextCallbackUrl = normalizeCallbackUrl(
      typeof rawCallbackUrl === 'string' ? rawCallbackUrl : undefined,
      locale,
    );

    if (typeof email !== 'string' || typeof password !== 'string') {
      redirect(
        `/${locale}/login?error=CredentialsSignin&callbackUrl=${encodeURIComponent(nextCallbackUrl)}`,
      );
    }

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: nextCallbackUrl,
      });
    } catch (authError: unknown) {
      if (authError instanceof AuthError) {
        redirect(
          `/${locale}/login?error=CredentialsSignin&callbackUrl=${encodeURIComponent(nextCallbackUrl)}`,
        );
      }

      throw authError;
    }
  };

  return (
    <LoginForm
      action={signInAction}
      callbackUrl={safeCallbackUrl}
      error={error ?? null}
      locale={locale}
    />
  );
}
