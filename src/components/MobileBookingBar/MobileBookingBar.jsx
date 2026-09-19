'use client';

import { useTranslations } from 'next-intl';
import BookingMenu from '@/components/BookingMenu/BookingMenu';
import s from './MobileBookingBar.module.css';

export default function MobileBookingBar() {
  const t = useTranslations('Booking');

  return (
    <aside className={s.bar} aria-label={t('cta')}>
      <div className={s.inner}>
        <div className={s.copy}>
          <strong>{t('mobileTitle')}</strong>
          <span>{t('mobileHint')}</span>
        </div>
        <BookingMenu align="right" className={s.cta} />
      </div>
    </aside>
  );
}
