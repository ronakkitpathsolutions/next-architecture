import { Button } from '@/components/ui/button';
import ICONS from '@/assets/icons';
import { Link } from '@/i18n/routing';
import useT from '@/hooks/use-translation';

export default function Home() {
  const t = useT('translation');
  return (
    <div className="w-full flex items-center justify-center h-[calc(100vh-66px)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">
          {t('welcome_message')}
          <span className="ml-2 dark:text-cyan-600 text-cyan-500">2.0</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/ui-kit">
              {t('explore_components')}
              <ICONS.ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/error-boundary">
              {t('explore_error_boundry')}
              <ICONS.ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
