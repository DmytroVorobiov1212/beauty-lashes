import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['cs', 'uk', 'en'],
  defaultLocale: 'cs',
  localePrefix: 'always',
  localeDetection: false,
  localeCookie: false,
});
