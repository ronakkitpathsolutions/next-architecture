import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import '@/styles/index.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/theme-provider';

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Architecture',
  description:
    'A Next.js application demonstrating a clean architecture with a focus on maintainability and scalability.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className={`${urbanist.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
