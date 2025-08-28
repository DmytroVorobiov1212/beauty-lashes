'use client';
import { useTranslations } from 'next-intl';
import { FiPhone, FiMail, FiInstagram } from 'react-icons/fi'; // ⬅️ нове
import s from './Contact.module.css';
import { useEffect, useState } from 'react';
import {
  readConsent,
  onConsentChange,
  grantMapsOnly,
  updateConsent,
} from '@/lib/consent';

const PHONES = ['+420721460816', '+420775616298'];
const INSTA =
  'https://www.instagram.com/beauty.bar.tabor?igsh=MXNmNmszdXFkOXNhdA==';
const EMAIL = 'vakulenkonatala10@gmail.com';
const OPERATOR = 'Natalia Vakulenko';
const ICO = '19197489';

const MAP_EMBED =
  'https://www.google.com/maps?q=Beauty%20Bar%20Lashes%20T%C3%A1bor&output=embed';
const MAP_LINK = 'https://maps.app.goo.gl/fPf2RveWmkiqSLrv9?g_st=ipc';

export default function Contact() {
  const t = useTranslations('Contact');

  const [mapsAllowed, setMapsAllowed] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setMapsAllowed(!!c?.maps);
    const off = onConsentChange((next) => setMapsAllowed(!!next.maps));
    return off;
  }, []);

  const enableMap = () => {
    grantMapsOnly();
    setMapsAllowed(true);
  };
  const openConsentPreferences = () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.__openConsent__ === 'function'
    ) {
      window.__openConsent__();
    } else {
      updateConsent({ maps: true });
      setMapsAllowed(true);
    }
  };

  return (
    <section
      id="contact"
      className={`section ${s.section}`}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <h2 id="contact-title" className={s.title}>
          {t('title')}
        </h2>

        <div className={s.card}>
          <div className={s.grid}>
            <div className={s.info}>
              {PHONES.map((p) => (
                <p className={s.row} key={p}>
                  <span className={`${s.ico} ${s.phone}`} aria-hidden="true">
                    <FiPhone size={16} />
                  </span>
                  <strong>{t('phoneLabel')}:</strong>
                  <a className={`${s.link} ${s.mono}`} href={`tel:${p}`}>
                    {p}
                  </a>
                </p>
              ))}
              <p className={s.row}>
                <span className={`${s.ico} ${s.mail}`} aria-hidden="true">
                  <FiMail size={16} />
                </span>
                <strong>{t('emailLabel')}:</strong>
                <a className={s.link} href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </p>
              <p className={s.row}>
                <span className={`${s.ico} ${s.insta}`} aria-hidden="true">
                  <FiInstagram size={16} />
                </span>
                <strong>{t('instaLabel')}:</strong>
                <a
                  className={s.link}
                  href={INSTA}
                  target="_blank"
                  rel="noreferrer"
                >
                  @beauty.bar.tabor
                </a>
              </p>
              <p className={s.row}>
                <span className={s.dot} aria-hidden="true" />
                <strong>{t('operatorLabel')}:</strong>
                <span>{OPERATOR}</span>
              </p>

              <p className={s.row}>
                <span className={s.dot} aria-hidden="true" />
                <strong>{t('icoLabel')}:</strong>
                <span className={s.mono}>{ICO}</span>
              </p>

              <p className={s.row}>
                <span className={s.dot} aria-hidden="true" />
                <strong>{t('addressLabel')}:</strong>
                <span className={s.addr}>{t('address')}</span>
                <a
                  className={s.link}
                  href={MAP_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('mapOpen')}
                </a>
              </p>
            </div>

            {!mapsAllowed ? (
              <div className={s.mapWrap}>
                <picture>
                  <source
                    media="(min-width: 1440px)"
                    srcSet="/map/map-static420.webp 1x, /map/map-static840.webp 2x"
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet="/map/map-static360.webp 1x, /map/map-static720.webp 2x"
                  />
                  <img
                    src="/map/map-static320.webp"
                    srcSet="/map/map-static640.webp 2x"
                    alt={t('mapPreviewAlt')}
                    className={s.map}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className={s.mapOverlay}>
                  <p>{t('mapConsentText')}</p>
                  <div className={s.mapButtons}>
                    <button className={s.mapBtn} onClick={enableMap}>
                      {t('enableMap')}
                    </button>
                    <button
                      className={s.mapBtnGhost}
                      onClick={openConsentPreferences}
                    >
                      {t('settings')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={s.mapWrap}>
                <iframe
                  title="Map"
                  src={MAP_EMBED}
                  className={s.map}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
