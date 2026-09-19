import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Manrope, Noto_Serif_Display } from 'next/font/google';

import Navbar from '@/components/NavBar/NavBar';
import BackToTop from '@/components/BackToTop/BackToTop';
import CookieConsent from '@/components/CookieConsent/CookieConsent';
import JsonLd from '@/components/SEO/JsonLd';
import MotionProvider from '@/components/Providers/MotionProvider';
import { routing } from '@/i18n/routing';

import '../globals.css';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://beauty-lashes.vercel.app'
).replace(/\/$/, '');

const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const notoSerifDisp = Noto_Serif_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const META = {
  cs: {
    title: 'Beauty Bar Lashes Tábor | Prodlužování řas',
    description:
      'Profesionální prodlužování řas v Táboře. Klasika, 2D/3D, mokrý efekt a objemové řasy. Prohlédněte si naši práci a objednejte se.',
    ogLocale: 'cs_CZ',
  },
  uk: {
    title: 'Beauty Bar Lashes Tábor | Нарощування вій',
    description:
      'Професійне нарощування вій у Таборі: класика, 2D/3D, вологий ефект та обʼєм. Перегляньте наші роботи та запишіться.',
    ogLocale: 'uk_UA',
  },
  en: {
    title: 'Beauty Bar Lashes Tábor | Eyelash extensions',
    description:
      'Professional eyelash extensions in Tábor: Classic, 2D/3D, wet effect and volume. Explore our work and book your appointment.',
    ogLocale: 'en_US',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e0f12',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const meta = META[locale];
  const canonical = `${SITE_URL}/${locale}`;
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, `${SITE_URL}/${item}`]),
  );

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        ...languages,
        'x-default': `${SITE_URL}/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: meta.title,
      description: meta.description,
      siteName: 'Beauty Bar Lashes Tábor',
      locale: meta.ogLocale,
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => META[item].ogLocale),
      images: [
        {
          url: '/og.jpg',
          width: 1200,
          height: 630,
          alt: 'Beauty Bar Lashes Tábor',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og.jpg'],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', type: 'image/x-icon', rel: 'icon' },
        { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [
        {
          url: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    manifest: '/manifest.webmanifest',
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${manrope.variable} ${notoSerifDisp.variable}`}
    >
      <body>
        <MotionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            {children}
            <BackToTop />
            <CookieConsent />
            <JsonLd locale={locale} />
          </NextIntlClientProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
