import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  // Load common and translation namespaces from the public folder
  const [common, translation] = await Promise.all([
    import(`../public/locales/${locale}/common.json`)
      .then((m) => m.default)
      .catch(() => ({})),
    import(`../public/locales/${locale}/translation.json`)
      .then((m) => m.default)
      .catch(() => ({})),
  ]);

  return {
    locale,
    // Provide a unified messages object to the provider
    messages: {
      common,
      translation,
    },
  };
});
