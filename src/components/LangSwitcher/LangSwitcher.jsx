'use client';

import { useLocale } from 'next-intl';
import clsx from 'clsx';

import { usePathname, useRouter } from '@/i18n/navigation';
import s from './LangSwitcher.module.css';

const LANGUAGES = [
  { locale: 'cs', short: 'CZ', label: 'Čeština' },
  { locale: 'uk', short: 'UA', label: 'Українська' },
  { locale: 'en', short: 'EN', label: 'English' },
];

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (nextLocale) => {
    if (nextLocale === locale) return;

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className={s.wrap} aria-label="Language">
      {LANGUAGES.map((item) => (
        <button
          key={item.locale}
          type="button"
          onClick={() => changeLocale(item.locale)}
          className={clsx(s.btn, locale === item.locale && s.active)}
          aria-pressed={locale === item.locale}
          aria-label={item.label}
          title={item.label}
        >
          {item.short}
        </button>
      ))}
    </nav>
  );
}
