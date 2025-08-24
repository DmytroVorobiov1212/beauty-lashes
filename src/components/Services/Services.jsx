'use client';
import { useTranslations } from 'next-intl';
import s from './Services.module.css';

export default function Services() {
  const t = useTranslations('Services');

  return (
    <section id="services" className={`section ${s.section}`}>
      <div className="container">
        <h2 className={s.title}>{t('title')}</h2>

        <ul className={s.list} role="list">
          <li className={s.item}>
            <span className={s.icon} aria-hidden="true" />
            <span className={s.text}>{t('item1')}</span>
          </li>
          <li className={s.item}>
            <span className={s.icon} aria-hidden="true" />
            <span className={s.text}>{t('item2')}</span>
          </li>
          <li className={s.item}>
            <span className={s.icon} aria-hidden="true" />
            <span className={s.text}>{t('item3')}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
