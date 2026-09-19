'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import 'swiper/css';

import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import s from './Gallery.module.css';

const IMAGES = [
  '/gallery/1.webp',
  '/gallery/2.webp',
  '/gallery/3.webp',
  '/gallery/4.webp',
  '/gallery/5.webp',
  '/gallery/6.webp',
  '/gallery/7.webp',
  '/gallery/8.webp',
  '/gallery/9.webp',
  '/gallery/10.webp',
];

export default function Gallery() {
  const t = useTranslations('Gallery');
  const [activeIdx, setActiveIdx] = useState(null);
  const [mounted, setMounted] = useState(false);

  const swiperRef = useRef(null);
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (activeIdx == null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIdx]);

  const open = (index) => {
    previousFocusRef.current = document.activeElement;
    setActiveIdx(index);
  };

  const close = () => {
    setActiveIdx(null);

    requestAnimationFrame(() => {
      previousFocusRef.current?.focus?.();
    });
  };

  const handleDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab' || !overlayRef.current) return;

    const focusable = Array.from(
      overlayRef.current.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const overlay =
    activeIdx != null ? (
      <div
        ref={overlayRef}
        className={s.overlay}
        onClick={close}
        onKeyDown={handleDialogKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label={t('previewDialog')}
      >
        <button
          ref={closeRef}
          type="button"
          className={s.close}
          aria-label={t('close')}
          onClick={(event) => {
            event.stopPropagation();
            close();
          }}
        >
          <FiX aria-hidden />
        </button>

        <button
          type="button"
          className={`${s.arrow} ${s.arrowLeft}`}
          aria-label={t('previous')}
          onClick={(event) => {
            event.stopPropagation();
            swiperRef.current?.slidePrev();
          }}
        >
          <FiChevronLeft aria-hidden />
        </button>

        <button
          type="button"
          className={`${s.arrow} ${s.arrowRight}`}
          aria-label={t('next')}
          onClick={(event) => {
            event.stopPropagation();
            swiperRef.current?.slideNext();
          }}
        >
          <FiChevronRight aria-hidden />
        </button>

        <div className={s.frame} onClick={(event) => event.stopPropagation()}>
          <Swiper
            key={`lightbox-${activeIdx}`}
            className={s.swiper}
            modules={[Keyboard]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            initialSlide={activeIdx}
            keyboard={{ enabled: true }}
            loop={IMAGES.length > 1}
            spaceBetween={8}
            slidesPerView={1}
          >
            {IMAGES.map((src, index) => (
              <SwiperSlide key={src}>
                <div className={s.slide}>
                  <Image
                    src={src}
                    alt={t('imageAlt', { number: index + 1 })}
                    fill
                    className={s.preview}
                    sizes="(max-width: 768px) 95vw, (max-width: 1280px) 85vw, 1200px"
                    priority={index === activeIdx}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    ) : null;

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
          {IMAGES.map((src, index) => (
            <button
              type="button"
              key={src}
              className={s.thumbBtn}
              onClick={() => open(index)}
              aria-label={t('openPreview', { number: index + 1 })}
            >
              <Image
                src={src}
                alt={t('imageAlt', { number: index + 1 })}
                width={400}
                height={500}
                className={s.thumbImg}
                priority={index === 0}
                sizes="(max-width: 600px) 45vw, (max-width: 1024px) 30vw, 400px"
              />
            </button>
          ))}
        </div>
      </div>

      {mounted && activeIdx != null
        ? createPortal(overlay, document.body)
        : null}
    </section>
  );
}
