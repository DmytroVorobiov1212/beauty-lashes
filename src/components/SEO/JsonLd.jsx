'use client';
import { useLocale } from 'next-intl';

export default function JsonLd() {
  const lang = useLocale() || 'cs';
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Beauty Bar Lashes Tábor',
    url: site,
    inLanguage: lang,
    telephone: '+420721460816, +420775616298',
    sameAs: [
      'https://www.instagram.com/beauty.bar.tabor',
      'https://maps.app.goo.gl/fPf2RveWmkiqSLrv9',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tábor',
      addressRegion: 'Jihočeský kraj',
      addressCountry: 'CZ',
    },
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
