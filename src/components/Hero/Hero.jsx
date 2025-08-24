'use client';

import { useTranslations } from 'next-intl';
import s from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="hero" className={s.section}>
      <div className="container">
        <div className={s.inner}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
          <a className={s.cta} href="tel:+420721460816">
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
