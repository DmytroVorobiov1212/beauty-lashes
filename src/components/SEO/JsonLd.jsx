import { getLocale } from 'next-intl/server';

export default async function JsonLd() {
  const lang = (await getLocale()) || 'cs';
  const site = (
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ).replace(/\/$/, '');

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${site}/#beauty-salon`,
    name: 'Beauty Bar Lashes Tábor',
    url: site,
    inLanguage: lang,
    email: 'vakulenkonatala10@gmail.com',
    telephone: '+420721460816',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+420721460816',
        contactType: 'customer service',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+420775616298',
        contactType: 'customer service',
      },
    ],
    sameAs: [
      'https://www.instagram.com/beauty.bar.tabor',
      'https://maps.app.goo.gl/fPf2RveWmkiqSLrv9',
    ],
    image: [`${site}/og.jpg`, `${site}/hero/hero-desc.webp`],
    logo: `${site}/brand/beautybar-logo.webp`,
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
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
