import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication — Next Architecture',
  description: 'Sign in or create an account.',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen flex bg-background text-foreground">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-2/3 items-center justify-center p-8 bg-primary text-primary-foreground">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Primary Header</h1>
          <p className="text-lg opacity-90">Feature Header</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/3 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">Logo</div>
          {children}
        </div>
      </div>
    </div>
  );
}
