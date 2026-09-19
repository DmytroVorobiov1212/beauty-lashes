import { routing } from '@/i18n/routing';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://beauty-lashes.vercel.app'
).replace(/\/$/, '');

export default function sitemap() {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${SITE_URL}/${locale}`,
    ]),
  );

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        ...languages,
        'x-default': `${SITE_URL}/${routing.defaultLocale}`,
      },
    },
  }));
}
