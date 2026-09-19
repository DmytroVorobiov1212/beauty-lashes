'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FiMenu, FiX } from 'react-icons/fi';

import BookingMenu from '@/components/BookingMenu/BookingMenu';
import LangSwitcher from '@/components/LangSwitcher/LangSwitcher';
import s from './NavBar.module.css';

const NAV_IDS = ['services', 'gallery', 'team', 'contact'];

export default function NavBar() {
  const t = useTranslations('Nav');
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const items = NAV_IDS.map((id) => ({ id, label: t(id) }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.05, 0.2, 0.5] },
    );

    ['hero', ...NAV_IDS]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.row}>
          <a
            href="#hero"
            className={s.brand}
            aria-label={t('homeAria')}
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/brand/beautybar-logo.webp"
              alt="Beauty Bar Lashes Tábor"
              width={50}
              height={50}
              className={s.brandImg}
              priority
            />
          </a>

          <nav className={s.desktopNav} aria-label={t('primaryAria')}>
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={s.actions}>
            <div className={s.desktopBooking}>
              <BookingMenu />
            </div>
            <LangSwitcher />
            <button
              type="button"
              className={s.menuButton}
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${s.mobilePanel} ${menuOpen ? s.mobilePanelOpen : ''}`}
      >
        <nav className={s.mobileNav} aria-label={t('primaryAria')}>
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className={s.mobileBooking}>
            <BookingMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
