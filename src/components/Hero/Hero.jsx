'use client';

import { useTranslations } from 'next-intl';
import s from './Hero.module.css';
import CallMenu from '../CallMenu/CallMenu';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="hero" className={s.section}>
      <div className="container">
        <div className={s.inner}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
          {/* <a className={s.cta} href="tel:+420721460816">
            {t('cta')}
          </a> */}
          <CallMenu
            label={t('cta')}
            className={s.cta}
            phones={[
              { label: 'Natalia', number: '+420721460816' },
              { label: 'Anzhelika', number: '+420775616298' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
