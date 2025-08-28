import Image from 'next/image';
import { useTranslations } from 'next-intl';
import s from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer} role="contentinfo">
      <div className="container">
        <div className={s.row}>
          <a
            href="#hero"
            className={s.brand}
            aria-label="Beauty Lashes Tábor — Home"
          >
            <Image
              src="/brand/logo-devCraft.webp"
              alt="Dmytro DevCraft"
              width={150}
              height={40}
              className={s.brandImg}
              priority
              sizes="160px"
            />
          </a>

          <div className={s.copy}>{t('copyright', { year })}</div>
        </div>
      </div>
    </footer>
  );
}
