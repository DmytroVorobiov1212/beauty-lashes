import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Navbar from '@/components/NavBar/NavBar';
import BackToTop from '@/components/BackToTop/BackToTop';
import JsonLd from '@/components/SEO/JsonLd';
import './globals.css';
import CookieConsent from '@/components/CookieConsent/CookieConsent';
import MotionProvider from '@/components/Providers/MotionProvider';
import { Manrope, Noto_Serif_Display } from 'next/font/google';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
});

const notoSerifDisp = Noto_Serif_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif'
});

const META = {
  cs: {
    title: 'Beauty Bar Lashes Tábor',
    desc: 'Profesionální prodlužování řas v Táboře: klasika, 2D/3D. Citlivá aplikace, krásný efekt.',
    ogLocale: 'cs_CZ'
  },
  uk: {
    title: 'Beauty Bar Lashes Tábor',
    desc: 'Нарощування вій у Таборі: класика, 2D/3D. Делікатна робота, wow-ефект.',
    ogLocale: 'uk_UA'
  },
  en: {
    title: 'Beauty Bar Lashes Tábor',
    desc: 'Eyelash extensions in Tábor: Classic, 2D/3D. Gentle application, stunning look.',
    ogLocale: 'en_US'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e0f12'
};

export async function generateMetadata() {
  const locale = await getLocale();                 // 'cs' | 'uk' | 'en'
  const { title, desc, ogLocale } = META[locale] ?? META.cs;

  return {
    title,
    description: desc,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: SITE_URL },
    openGraph: {
      type: 'website',
      url: SITE_URL,
      title,
      description: desc,
      siteName: 'Beauty Bar Lashes Tábor',
      locale: ogLocale,
      images: ['/og.jpg']
    },
    twitter: {
      card: 'summary_large_image',
      site: '@',
      title,
      description: desc,
      images: ['/og.jpg']
    },
    icons: {
      icon: [
        { url: '/favicon.ico', type: 'image/x-icon', rel: 'icon' },
        { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
    },
    manifest: '/manifest.webmanifest'
  };
}

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${manrope.variable} ${notoSerifDisp.variable}`}>
      <body>
        <MotionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            {children}
            <BackToTop />
            <CookieConsent />
            <JsonLd />
          </NextIntlClientProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

