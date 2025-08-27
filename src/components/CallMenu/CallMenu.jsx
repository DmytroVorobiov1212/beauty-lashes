'use client';

import { useEffect, useRef, useState } from 'react';
import { FiPhone, FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import s from './CallMenu.module.css';

export default function CallMenu({
  label = 'Call',
  phones = [
    { label: 'Natalia', number: '+420721460816' },
    { label: 'Anzhelika', number: '+420775616298' },
  ],
  className,
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false); // чи відкривати меню вгору
  const wrapRef = useRef(null);

  // Закриття: клік поза, ESC, повернення у вкладку
  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onVis = () => document.visibilityState === 'visible' && setOpen(false);

    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // Перерахувати напрям відкриття при показі / ресайзі / повороті
  useEffect(() => {
    if (!open || !wrapRef.current) return;

    const calc = () => {
      const btn = wrapRef.current.querySelector(`.${s.cta}`);
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // орієнтовна висота меню: ~64px на пункт + відступи
      const estimated = Math.max(phones.length * 64 + 24, 120);
      setDropUp(spaceBelow < estimated);
    };

    calc();
    // ще раз після розмітки
    requestAnimationFrame(calc);

    window.addEventListener('resize', calc);
    window.addEventListener('orientationchange', calc);
    return () => {
      window.removeEventListener('resize', calc);
      window.removeEventListener('orientationchange', calc);
    };
  }, [open, phones.length]);

  // Варіанти анімацій (враховують напрямок)
  const menuVariants = {
    hidden: { opacity: 0, y: dropUp ? -8 : 8, scale: 0.98, filter: 'blur(6px)' },
    show: {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: {
        type: 'spring', stiffness: 420, damping: 28, mass: 0.6, duration: 0.25,
        staggerChildren: 0.04, delayChildren: 0.02,
      },
    },
    exit: { opacity: 0, y: dropUp ? -6 : 6, scale: 0.98, filter: 'blur(4px)', transition: { duration: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: dropUp ? -6 : 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: dropUp ? -4 : 4, transition: { duration: 0.12 } },
  };

  return (
    <div className={s.wrap} ref={wrapRef}>
      <button
        type="button"
        className={`${s.cta} ${className || ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <FiPhone aria-hidden className={s.ico} />
        <span>{label}</span>
        <FiChevronDown aria-hidden className={s.chev} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`${s.menu} ${dropUp ? s.up : ''}`}
            role="menu"
            style={{ transformOrigin: dropUp ? 'bottom right' : 'top right' }}
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {phones.map((p) => (
              <motion.a
                key={p.number}
                role="menuitem"
                className={s.item}
                href={`tel:${p.number}`}
                rel="nofollow"
                variants={itemVariants}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(false)}
              >
                <FiPhone aria-hidden className={s.itemIco} />
                <div className={s.col}>
                  <span className={s.person}>{p.label}</span>
                  <span className={s.num}>{p.number}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}