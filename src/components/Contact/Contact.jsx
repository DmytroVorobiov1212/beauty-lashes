'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import {
  FiArrowUpRight,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';

import SectionIntro from '@/components/SectionIntro/SectionIntro';
import {
  getMapsAllowedServerSnapshot,
  getMapsAllowedSnapshot,
  grantMapsOnly,
  subscribeConsentStore,
  updateConsent,
} from '@/lib/consent';

import s from './Contact.module.css';

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

  const mapsAllowed = useSyncExternalStore(
    subscribeConsentStore,
    getMapsAllowedSnapshot,
    getMapsAllowedServerSnapshot,
  );

  const enableMap = () => {
    grantMapsOnly();
  };

  const openConsentPreferences = () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.__openConsent__ === 'function'
    ) {
      window.__openConsent__();
      return;
    }

    updateConsent({ maps: true });
  };

  return (
    <section
      id="contact"
      className={`section ${s.section}`}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <SectionIntro
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          titleId="contact-title"
        />

        <div className={s.shell}>
          <div className={s.info}>
            <div className={s.primary}>
              {PHONES.map((phone, index) => (
                <a className={s.contactCard} href={`tel:${phone}`} key={phone}>
                  <span className={s.contactIcon} aria-hidden="true">
                    <FiPhone />
                  </span>
                  <span className={s.contactCopy}>
                    <small>{t('phoneLabel')} {index + 1}</small>
                    <strong>{phone}</strong>
                  </span>
                  <FiArrowUpRight className={s.contactArrow} aria-hidden="true" />
                </a>
              ))}

              <a className={s.contactCard} href={`mailto:${EMAIL}`}>
                <span className={s.contactIcon} aria-hidden="true">
                  <FiMail />
                </span>
                <span className={s.contactCopy}>
                  <small>{t('emailLabel')}</small>
                  <strong className={s.breakable}>{EMAIL}</strong>
                </span>
                <FiArrowUpRight className={s.contactArrow} aria-hidden="true" />
              </a>

              <a
                className={s.contactCard}
                href={INSTA}
                target="_blank"
                rel="noreferrer"
              >
                <span className={s.contactIcon} aria-hidden="true">
                  <FiInstagram />
                </span>
                <span className={s.contactCopy}>
                  <small>{t('instaLabel')}</small>
                  <strong>@beauty.bar.tabor</strong>
                </span>
                <FiArrowUpRight className={s.contactArrow} aria-hidden="true" />
              </a>
            </div>

            <div className={s.meta}>
              <div className={s.metaRow}>
                <span>{t('operatorLabel')}</span>
                <strong>{OPERATOR}</strong>
              </div>
              <div className={s.metaRow}>
                <span>{t('icoLabel')}</span>
                <strong className={s.mono}>{ICO}</strong>
              </div>
              <div className={s.metaRow}>
                <span>{t('addressLabel')}</span>
                <strong>{t('address')}</strong>
              </div>
            </div>

            <a
              className={s.mapLink}
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
            >
              <FiMapPin aria-hidden="true" />
              <span>{t('mapOpen')}</span>
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>

          {!mapsAllowed ? (
            <div className={s.mapWrap}>
              <picture>
                <source
                  media="(min-width: 1440px)"
                  srcSet="/map/map-static420.webp 420w"
                  sizes="840px"
                  type="image/webp"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet="/map/map-static360.webp 360w"
                  sizes="720px"
                  type="image/webp"
                />
                <img
                  src="/map/map-static320.webp"
                  srcSet="/map/map-static320.webp 320w"
                  sizes="95vw"
                  alt={t('mapPreviewAlt')}
                  className={s.map}
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <div className={s.mapOverlay}>
                <div className={s.mapConsentCard}>
                  <FiMapPin className={s.mapConsentIcon} aria-hidden="true" />
                  <p>{t('mapConsentText')}</p>
                  <div className={s.mapButtons}>
                    <button
                      type="button"
                      className={s.mapBtn}
                      onClick={enableMap}
                    >
                      {t('enableMap')}
                    </button>
                    <button
                      type="button"
                      className={s.mapBtnGhost}
                      onClick={openConsentPreferences}
                    >
                      {t('settings')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={s.mapWrap}>
              <iframe
                title={t('mapPreviewAlt')}
                src={MAP_EMBED}
                className={s.map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
