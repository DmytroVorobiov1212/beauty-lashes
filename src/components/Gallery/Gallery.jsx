'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // ⬅️ додали
import s from './Gallery.module.css';

const IMAGES = ['/gallery/2.jpg', '/gallery/3.jpg', '/gallery/4.jpg'];

export default function Gallery() {
  const t = useTranslations('Gallery');
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false); // ⬅️ для безпечного порталу

  useEffect(() => setMounted(true), []);

  // Закриття по ESC
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  // Лочимо скрол сторінки при відкритті
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  const overlay = active && (
    <div
      className={s.overlay}
      onClick={() => setActive(null)}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        className={s.close}
        aria-label="Close"
        onClick={() => setActive(null)}
      >
        ✕
      </button>
      <div className={s.frame} onClick={(e) => e.stopPropagation()}>
        <Image
          src={active}
          alt="Preview"
          fill
          className={s.preview}
          sizes="95vw"
          priority
        />
      </div>
    </div>
  );

  return (
    <section
      id="gallery"
      className={`section ${s.section}`}
      aria-labelledby="gallery-title"
    >
      <div className="container">
        <h2 id="gallery-title" className={s.title}>
          {t('title')}
        </h2>
        <div className={s.grid}>
          {IMAGES.map((src, i) => (
            <button
              key={src}
              className={s.thumbBtn}
              onClick={() => setActive(src)}
              aria-label={`Open preview ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Lashes ${i + 1}`}
                width={400}
                height={500}
                className={s.thumbImg}
                priority={i === 0}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Портал: малюємо оверлей у <body> */}
      {mounted && active ? createPortal(overlay, document.body) : null}
    </section>
  );
}
