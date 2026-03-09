'use client';
import { useTheme } from 'next-themes';
import ICONS from '@/assets/icons';
import { cn } from '@/utils/functions';
import { Button } from '@/components/ui/button';
import useT from '@/hooks/use-translation';
import LanguageSelector from '../language-selector';

type ThemeHeaderProps = {
  className?: string;
};

const ThemeHeader = ({ className }: ThemeHeaderProps) => {
  const { theme, setTheme } = useTheme();
  const t = useT('common');

  return (
    <div
      className={cn(
        'w-full min-h-16 border-s border-e max-w-7xl mx-auto border-dashed flex justify-between items-center px-4',
        className,
      )}
    >
      <div className="text-base font-medium">{t('logo')}</div>
      <div className="flex items-center gap-1">
        <LanguageSelector />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <ICONS.Sun className="size-4" />
          ) : (
            <ICONS.Moon className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ThemeHeader;
