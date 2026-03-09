const RTL_LANGS = ['ar', 'he'] as const;

const LANGUAGES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
] as const;

const SUPPORTED_LANGS = ['en', 'fr', 'ar'] as const;
const DEFAULT_NS = 'translation' as const;
const NAMESPACES = ['translation', 'common'] as const;

export { RTL_LANGS, LANGUAGES, SUPPORTED_LANGS, DEFAULT_NS, NAMESPACES };
