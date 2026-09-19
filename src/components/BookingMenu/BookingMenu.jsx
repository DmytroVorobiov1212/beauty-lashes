'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiInstagram, FiPhone } from 'react-icons/fi';

import s from './BookingMenu.module.css';

const MASTERS = [
  {
    name: 'Natalia',
    phone: '+420775616298',
    instagram: 'https://www.instagram.com/nv_studio_tabor',
  },
  {
    name: 'Anzhelika',
    phone: '+420721460816',
    instagram: 'https://www.instagram.com/rasy_tabor',
  },
];

export default function BookingMenu({ className = '', align = 'left' }) {
  const t = useTranslations('Booking');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    firstLinkRef.current?.focus();

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className={s.wrap} ref={ref}>
      <button
        type="button"
        className={`${s.cta} ${className}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{t('cta')}</span>
        <FiChevronDown
          aria-hidden
          className={`${s.chevron} ${open ? s.chevronOpen : ''}`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className={`${s.menu} ${align === 'right' ? s.menuRight : ''}`}
            role="menu"
            aria-label={t('chooseMaster')}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <p className={s.menuTitle}>{t('chooseMaster')}</p>

            {MASTERS.map((master, index) => (
              <div className={s.master} key={master.name}>
                <strong className={s.name}>{master.name}</strong>
                <div className={s.actions}>
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`tel:${master.phone}`}
                    className={s.action}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    <FiPhone aria-hidden />
                    <span>{t('call')}</span>
                  </a>
                  <a
                    href={master.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className={s.action}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    <FiInstagram aria-hidden />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
