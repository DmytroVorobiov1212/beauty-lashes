'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { useTranslations, useFormatter } from 'next-intl';
import { FiChevronDown } from 'react-icons/fi';

import SectionIntro from '@/components/SectionIntro/SectionIntro';
import s from './Offerings.module.css';

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

  const fmt = (value) =>
    f.number(value, {
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
      <span id="prices" className="visually-hidden" aria-hidden="true" />

      <div className="container">
        <SectionIntro
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          titleId="offerings-title"
        />

        <Accordion.Root type="single" collapsible className={s.list}>
          {ITEMS.map(({ key, price }, index) => (
            <Accordion.Item key={key} value={key} className={s.item}>
              <Accordion.Header>
                <Accordion.Trigger className={s.trigger}>
                  <span className={s.index} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className={s.name}>{t(`items.${key}.name`)}</h3>

                  <div className={s.right}>
                    <div className={s.price}>{fmt(price)}</div>
                    <div className={s.chevWrap} aria-hidden="true">
                      <FiChevronDown className={s.chev} />
                    </div>
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className={s.content}>
                <div className={s.contentInner}>
                  <p className={s.desc}>{t(`items.${key}.desc`)}</p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <p className={s.note}>{t('note')}</p>
      </div>
    </section>
  );
}
