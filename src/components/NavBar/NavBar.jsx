'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import s from './NavBar.module.css';

export default function NavBar() {
  const tNav = useTranslations('Nav');
  const tServices = useTranslations('Services');
  const tGallery = useTranslations('Gallery');
  const tPrices = useTranslations('Prices');

  const OBSERVE_IDS = ['hero', 'services', 'prices', 'gallery', 'contact'];
  const [active, setActive] = useState('');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-55% 0px -40% 0px', threshold: 0.1 },
    );
    OBSERVE_IDS.map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const items = [
    { id: 'services', label: tServices('title') },
    { id: 'prices', label: tPrices('title') },
    { id: 'gallery', label: tGallery('title') },
    { id: 'contact', label: tNav('contact') },
  ];

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { delayChildren: 0.05, staggerChildren: 0.08 },
    },
  };
  const link = {
    hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.row}>
          <a
            href="#hero"
            className={s.brand}
            aria-label="Beauty Lashes Tábor — Home"
          >
            <Image
              src="/brand/beautybar-logo.webp"
              alt="Beauty Lashes Tábor"
              width={40}
              height={40}
              className={s.brandImg}
              priority
            />
          </a>

          <m.nav
            className={s.links}
            aria-label="Primary"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {items.map(({ id, label }) => (
              <m.a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                variants={link}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {label}
              </m.a>
            ))}
          </m.nav>

          <LangSwitcher />
        </div>
      </div>
    </header>
  );
}
