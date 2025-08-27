'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import 'swiper/css';

import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import s from './Gallery.module.css';

const IMAGES = [
  '/gallery/1.jpg',
  '/gallery/2.jpg',
  '/gallery/3.jpg',
  '/gallery/4.jpg',
  '/gallery/5.jpg',
  '/gallery/6.jpg',
  '/gallery/7.jpg',
  '/gallery/8.jpg',
  '/gallery/9.jpg',
  '/gallery/10.jpg',
];

export default function Gallery() {
  const t = useTranslations('Gallery');

  const [activeIdx, setActiveIdx] = useState(null); // number|null
  const active = useMemo(
    () => (activeIdx != null ? IMAGES[activeIdx] : null),
    [activeIdx],
  );
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // ESC закриває
  useEffect(() => {
    if (activeIdx == null) return;
    const onKey = (e) => e.key === 'Escape' && setActiveIdx(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx]);

  // Лочимо скрол сторінки
  useEffect(() => {
    if (activeIdx == null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeIdx]);

  const open = (i) => setActiveIdx(i);
  const close = () => setActiveIdx(null);

  const overlay = active != null && (
    <div
      className={s.overlay}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      {/* Кнопки */}
      <button
        className={s.close}
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        <FiX />
      </button>
      <button
        className={`${s.arrow} ${s.arrowLeft}`}
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          swiperRef.current?.slidePrev();
        }}
      >
        <FiChevronLeft />
      </button>
      <button
        className={`${s.arrow} ${s.arrowRight}`}
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          swiperRef.current?.slideNext();
        }}
      >
        <FiChevronRight />
      </button>

      {/* Слайдер у рамці. key змушує Swiper стартувати з потрібного слайду */}
      <div className={s.frame} onClick={(e) => e.stopPropagation()}>
        <Swiper
          key={`lightbox-${activeIdx}`}
          className={s.swiper}
          modules={[Keyboard]}
          onSwiper={(sw) => {
            swiperRef.current = sw;
          }}
          initialSlide={activeIdx ?? 0}
          keyboard={{ enabled: true }}
          loop={IMAGES.length > 1}
          spaceBetween={8}
          slidesPerView={1}
        >
          {IMAGES.map((src, i) => (
            <SwiperSlide key={src}>
              <div className={s.slide}>
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  fill
                  className={s.preview}
                  sizes="95vw"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
              onClick={() => open(i)}
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

      {/* Портал у body — модалка завжди над усім */}
      {mounted && active != null ? createPortal(overlay, document.body) : null}
    </section>
  );
}
