'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { FiInstagram, FiPhone, FiX } from 'react-icons/fi';

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

export default function BookingMenu({ className = '' }) {
  const t = useTranslations('Booking');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const previousOverflowRef = useRef('');

  useEffect(() => {
    if (!open) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflowRef.current;
      requestAnimationFrame(() => triggerRef.current?.focus());
    };
  }, [open]);

  const modal =
    open && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            <motion.div
              className={s.overlay}
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              onPointerDown={(event) => {
                if (event.target === event.currentTarget) {
                  setOpen(false);
                }
              }}
            >
              <motion.div
                className={s.sheet}
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-title"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className={s.sheetHeader}>
                  <h2 id="booking-title" className={s.menuTitle}>
                    {t('chooseMaster')}
                  </h2>
                  <button
                    ref={closeRef}
                    type="button"
                    className={s.close}
                    aria-label={t('close')}
                    onClick={() => setOpen(false)}
                  >
                    <FiX aria-hidden />
                  </button>
                </div>

                <div className={s.masterList}>
                  {MASTERS.map((master) => (
                    <div className={s.master} key={master.name}>
                      <strong className={s.name}>{master.name}</strong>
                      <div className={s.actions}>
                        <a
                          href={`tel:${master.phone}`}
                          className={s.action}
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
                          onClick={() => setOpen(false)}
                        >
                          <FiInstagram aria-hidden />
                          <span>Instagram</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <div className={s.wrap}>
        <button
          ref={triggerRef}
          type="button"
          className={`${s.cta} ${className}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          {t('cta')}
        </button>
      </div>
      {modal}
    </>
  );
}
