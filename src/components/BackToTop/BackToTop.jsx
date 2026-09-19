'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FiChevronUp } from 'react-icons/fi';

import s from './BackToTop.module.css';

export default function BackToTop({ threshold = 400 }) {
  const t = useTranslations('Common');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > threshold);
        ticking = false;
      });

      ticking = true;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const onClick = () => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`${s.btn} ${visible ? s.show : ''}`}
      onClick={onClick}
      aria-label={t('backToTop')}
      title={t('backToTop')}
    >
      <FiChevronUp className={s.icon} aria-hidden="true" />
    </button>
  );
}
