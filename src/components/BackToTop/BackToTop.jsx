'use client';
import { useEffect, useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import s from './BackToTop.module.css';

export default function BackToTop({ threshold = 400 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
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
      aria-label="Back to top"
      title="Back to top"
    >
      <FiChevronUp className={s.icon} />
    </button>
  );
}
