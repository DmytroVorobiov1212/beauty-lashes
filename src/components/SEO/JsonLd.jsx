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
    image: [`${site}/og.jpg`],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hradební 129/1',
      postalCode: '390 01',
      addressLocality: 'Tábor',
      addressRegion: 'Jihočeský kraj',
      addressCountry: 'CZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.41248661648474,
      longitude: 14.657767926600082,
    },
    hasMap:
      'https://www.google.com/maps/?q=49.41248661648474,14.657767926600082',
    logo: `${site}/brand/beautybar-logo.webp`,
    image: [`${site}/hero/hero-desc.webp`],
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
