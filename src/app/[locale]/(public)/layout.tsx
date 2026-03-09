import type { Metadata } from 'next';
import ThemeHeader from '@/components/theme-header';

export const metadata: Metadata = {
  title: 'Next Architecture',
  description:
    'A Next.js application demonstrating a clean architecture with a focus on maintainability and scalability.',
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <ThemeHeader />
      <div className="w-full border-dashed border-t">
        <div className="w-full max-w-7xl mx-auto border-dashed border-l border-r">
          {children}
        </div>
      </div>
    </div>
  );
}
