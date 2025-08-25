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
              src="/brand/logo-devCraft.jpg" // ← шлях до твого лого
              alt="Dmytro DevCraft"
              width={160}
              height={40}
              className={s.brandImg}
              priority
            />
            {/* <span className={s.brandText}>Dmytro DevCraft</span> */}
          </a>

          <div className={s.copy}>{t('copyright', { year })}</div>
        </div>
      </div>
    </footer>
  );
}
