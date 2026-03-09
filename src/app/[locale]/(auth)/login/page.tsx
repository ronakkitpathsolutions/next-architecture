import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login — Next Architecture',
  description: 'Sign in to your account to access the dashboard.',
};

export default function LoginPage() {
  return <div className="w-full">Login Page</div>;
}
