'use client';

import { useTranslations } from 'next-intl';
import LangSwitcher from '../LangSwitcher/LangSwitcher'; // шлях з урахуванням твоєї структури
import s from './NavBar.module.css';
import Image from 'next/image';

export default function NavBar() {
  const tNav = useTranslations('Nav');
  const tServices = useTranslations('Services');
  const tGallery = useTranslations('Gallery');
  const tPrices = useTranslations('Prices');

  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.row}>
          {/* Лого */}
          <a
            href="#hero"
            className={s.brand}
            aria-label="Beauty Lashes Tábor — Home"
          >
            <Image
              src="/brand/beautybar-logo.jpg" // ← твій шлях
              alt="Beauty Lashes Tábor"
              width={40}
              height={40}
              className={s.brandImg}
              priority
            />
          </a>

          {/* Навігація */}
          <nav className={s.links} aria-label="Primary">
            <a href="#services">{tServices('title')}</a>
            <a href="#prices">{tPrices('title')}</a>
            <a href="#gallery">{tGallery('title')}</a>
            <a href="#contact">{tNav('contact')}</a>
          </nav>

          {/* <div className={s.spacer} /> */}

          {/* Перемикач мов + CTA */}
          <LangSwitcher />
          {/* <a className={s.cta} href="tel:+420721460816">
            +420&nbsp;721&nbsp;460&nbsp;816
          </a> */}
        </div>
      </div>
    </header>
  );
}
