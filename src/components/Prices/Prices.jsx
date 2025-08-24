'use client';
import { useTranslations, useFormatter } from 'next-intl';
import s from './Prices.module.css';

const ITEMS = [
  { key: 'classic', price: 800 },
  { key: '2d3d', price: 800 },
  { key: 'wetEffect', price: 900 },
  { key: '4d5d', price: 1000 },
  { key: 'volume', price: 1200 },
  { key: 'removal', price: 100 },
];

export default function Prices() {
  const t = useTranslations('Prices');
  const f = useFormatter();

  const fmt = (n) =>
    f.number(n, {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
      currencyDisplay: 'narrowSymbol',
    });

  return (
    <section
      id="prices"
      className={`section ${s.section}`}
      aria-labelledby="prices-title"
    >
      <div className="container">
        <h2 id="prices-title" className={s.title}>
          {t('title')}
        </h2>

        <div className={s.card}>
          <div className={s.table} role="table" aria-label={t('title')}>
            {ITEMS.map(({ key, price }) => (
              <div key={key} className={s.row} role="row">
                <div className={s.cellName} role="cell">
                  {t(`items.${key}`)}
                </div>
                <div className={s.cellPrice} role="cell">
                  {fmt(price)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className={s.note}>{t('note')}</p>
      </div>
    </section>
  );
}
