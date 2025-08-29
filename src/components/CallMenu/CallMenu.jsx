'use client';

import { useEffect, useRef, useState } from 'react';
import { FiPhone, FiChevronDown } from 'react-icons/fi';
import s from './CallMenu.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export default function CallMenu({
  label = 'Call',
  phones = [
    { label: 'Natalia', number: '+420775616298' },
    { label: 'Anzhelika', number: '+420721460816' },
  ],
  className,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onVis = () => {
      if (document.visibilityState === 'visible') setOpen(false);
    };

    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 420,
        damping: 28,
        mass: 0.6,
        duration: 0.25,
        staggerChildren: 0.04,
        delayChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      y: 6,
      scale: 0.98,
      filter: 'blur(4px)',
      transition: { duration: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: 4, transition: { duration: 0.12 } },
  };

  return (
    <div className={s.wrap} ref={ref}>
      <button
        type="button"
        className={`${s.cta} ${className || ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <FiPhone aria-hidden className={s.ico} />
        <span>{label}</span>
        <FiChevronDown aria-hidden className={s.chev} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={s.menu}
            role="menu"
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
