import { LoginContainer } from '@/containers/login-container';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

export default async function LoginPage({
  params,
  searchParams,
}: LoginPageProps) {
  const { locale } = await params;
  const { callbackUrl, error } = await searchParams;

  return (
    <LoginContainer locale={locale} callbackUrl={callbackUrl} error={error} />
  );
}
