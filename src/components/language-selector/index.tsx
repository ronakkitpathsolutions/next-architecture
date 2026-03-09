import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LANGUAGES } from '@/utils/constants/language';
import ICONS from '@/assets/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const LanguageSelector = () => {
  const { locale } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ICONS.Languages className="size-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {LANGUAGES.map(({ code, label }) => (
          <DropdownMenuItem key={code} asChild>
            <Link
              href={`/${code}`}
              className="flex items-center justify-between w-full"
            >
              {label}
              {locale === code && <ICONS.Check className="size-3.5" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
