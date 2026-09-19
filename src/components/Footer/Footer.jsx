import Image from 'next/image';
import { useTranslations } from 'next-intl';

import s from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Nav');
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer} role="contentinfo">
      <div className="container">
        <div className={s.shell}>
          <div className={s.salon}>
            <span className={s.eyebrow}>Beauty Bar Lashes</span>
            <strong>Tábor</strong>
          </div>

          <a href="#hero" className={s.brand} aria-label={nav('homeAria')}>
            <Image
              src="/brand/logo-devCraft.webp"
              alt="Dmytro DevCraft"
              width={160}
              height={48}
              className={s.brandImg}
              sizes="160px"
              loading="lazy"
              fetchPriority="low"
            />
          </a>

          <div className={s.copy}>{t('copyright', { year })}</div>
        </div>
      </div>
    </footer>
  );
}
