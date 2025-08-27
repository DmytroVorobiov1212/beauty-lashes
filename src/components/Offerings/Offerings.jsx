'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { useTranslations, useFormatter } from 'next-intl';
import { FiChevronDown } from 'react-icons/fi';
import s from './Offerings.module.css';

// Один список – і для назв, і для цін, і для описів
const ITEMS = [
  { key: 'classic', price: 800 },
  { key: '2d3d', price: 800 },
  { key: 'wetEffect', price: 900 },
  { key: '4d5d', price: 1000 },
  { key: 'volume', price: 1200 },
  { key: 'removal', price: 100 },
];

export default function Offerings() {
  const t = useTranslations('Offerings');
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
      id="services"
      className={`section ${s.section}`}
      aria-labelledby="offerings-title"
    >
      {/* щоб старий лінк #prices теж працював */}
      <span id="prices" className="visually-hidden" aria-hidden="true" />
      <div className="container">
        <h2 id="offerings-title" className={s.title}>
          {t('title')}
        </h2>

        <Accordion.Root type="single" collapsible className={s.list}>
          {ITEMS.map(({ key, price }) => (
            <Accordion.Item key={key} value={key} className={s.item}>
              <Accordion.Header>
                <Accordion.Trigger className={s.trigger}>
                  {/* Назва */}
                  <h3 className={s.name}>{t(`items.${key}.name`)}</h3>

                  {/* Правий блок: ціна + стрілка */}
                  <div className={s.right}>
                    <div className={s.price}>{fmt(price)}</div>
                    <div className={s.chevWrap} aria-hidden>
                      <FiChevronDown className={s.chev} />
                    </div>
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className={s.content}>
                <p className={s.desc}>{t(`items.${key}.desc`)}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <p className={s.note}>{t('note')}</p>
      </div>
    </section>
  );
}
