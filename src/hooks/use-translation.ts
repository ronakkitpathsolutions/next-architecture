import type { NAMESPACES } from '@/utils/constants/language';
import { useTranslations } from 'next-intl';

type Namespace = (typeof NAMESPACES)[number];

/**
 * Type-safe translation hook.
 *
 * - Without arguments → uses the default namespace (`translation`)
 * - With a namespace   → scopes `t()` keys to that namespace
 *
 * Keys are fully autocompleted based on the JSON files in `public/locales/en/`.
 */

const useT = <N extends Namespace = 'translation'>(ns?: N) => {
  const t = useTranslations(ns);
  return t;
};

export default useT;
