'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import s from './LangSwitcher.module.css';

const COOKIE = 'MYNEXTAPP_LOCALE';
const ALLOWED = ['en', 'uk', 'cs'];
const DEFAULT = 'en';

function readCookie() {
  const pair = document.cookie
    .split('; ')
    .find((r) => r.startsWith(`${COOKIE}=`));
  return pair ? pair.split('=')[1] : '';
}
function writeCookie(value) {
  // залишаю як було; якщо схочеш — додамо path=/; max-age; samesite=lax
  document.cookie = `${COOKIE}=${value};`;
}

export default function LangSwitcher() {
  const [locale, setLocale] = useState(DEFAULT);
  const router = useRouter();

  useEffect(() => {
    const fromCookie = readCookie().toLowerCase();
    setLocale(ALLOWED.includes(fromCookie) ? fromCookie : DEFAULT);
  }, []);

  const changeLocale = (next) => {
    if (!ALLOWED.includes(next)) return;
    setLocale(next);
    writeCookie(next);
    router.refresh();
  };

  return (
    <nav className={s.wrap} aria-label="Language">
      <button
        type="button"
        onClick={() => changeLocale('en')}
        className={clsx(s.btn, locale === 'en' && s.active)}
        aria-pressed={locale === 'en'}
        title="English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => changeLocale('uk')}
        className={clsx(s.btn, locale === 'uk' && s.active)}
        aria-pressed={locale === 'uk'}
        title="Українська"
      >
        UA
      </button>
      <button
        type="button"
        onClick={() => changeLocale('cs')}
        className={clsx(s.btn, locale === 'cs' && s.active)}
        aria-pressed={locale === 'cs'}
        title="Čeština"
      >
        CZ
      </button>
    </nav>
  );
}
