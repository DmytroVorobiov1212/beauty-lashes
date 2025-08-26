import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Navbar from '@/components/NavBar/NavBar';
import BackToTop from '@/components/BackToTop/BackToTop';
import JsonLd from '@/components/SEO/JsonLd';
import './globals.css';
import CookieConsent from '@/components/CookieConsent/CookieConsent';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

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
      title, description: desc,
      siteName: 'Beauty Lashes Tábor',
      locale: ogLocale
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png'
    }
  };
}

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <BackToTop />
          <CookieConsent />
          <JsonLd />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

