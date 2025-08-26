'use client';

import { useEffect, useRef, useState } from 'react';
import { FiPhone, FiChevronDown } from 'react-icons/fi';
import s from './CallMenu.module.css';

export default function CallMenu({
  label = 'Call',
  phones = [
    { label: 'Natalia', number: '+420721460816' },
    { label: 'Anzhelika', number: '+420000000000' },
  ],
  className, // щоб можна було підкинути стилі з Hero/NavBar
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

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

      {open && (
        <div className={s.menu} role="menu">
          {phones.map((p) => (
            <a
              key={p.number}
              role="menuitem"
              className={s.item}
              href={`tel:${p.number}`}
              onClick={() => setOpen(false)}
            >
              <FiPhone aria-hidden className={s.itemIco} />
              <div className={s.col}>
                <span className={s.person}>{p.label}</span>
                <span className={s.num}>{p.number}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
