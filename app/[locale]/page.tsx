import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const t = useTranslations('translation');
  const commonT = useTranslations('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8">
      <h1 className="text-4xl font-bold">{t('welcome_message')}</h1>
      <p className="text-muted-foreground">{commonT('logo')}</p>

      <div className="flex items-center gap-4 mt-8">
        <Link
          href="/en"
          className="text-primary hover:underline font-medium font-sans"
        >
          English
        </Link>
        <Link
          href="/fr"
          className="text-primary hover:underline font-medium font-sans"
        >
          Français
        </Link>
        <Link
          href="/ar"
          className="text-primary hover:underline font-medium font-sans"
          dir="rtl"
        >
          العربية
        </Link>
      </div>

      <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}
