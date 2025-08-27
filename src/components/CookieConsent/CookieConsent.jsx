'use client';

import { useEffect, useRef, useState } from 'react';
import { readConsent, grantAll, rejectAll, updateConsent } from '@/lib/consent';
import s from './CookieConsent.module.css';
import { useTranslations } from 'next-intl';

const SESSION_KEY = 'CONSENT_DISMISSED_SESSION';

export default function CookieConsent() {
  const t = useTranslations('Cookies');

  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  const [maps, setMaps] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const startY = useRef(0);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const c = readConsent();
    const dismissed =
      typeof window !== 'undefined' &&
      sessionStorage.getItem(SESSION_KEY) === '1';

    if (!c && !dismissed) {
      setVisible(true);
    } else if (c) {
      setMaps(!!c.maps);
      setAnalytics(!!c.analytics);
      setMarketing(!!c.marketing);
    }

    if (typeof window !== 'undefined') {
      window.__openConsent__ = () => {
        setVisible(true);
        setPrefsOpen(true);
      };
    }
  }, []);

  const closeWithAnim = (cb) => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      setVisible(false);
      setDragY(0);
      setDragging(false);
      cb && cb();
    }, 240);
  };

  const acceptAll = () => {
    grantAll();
    closeWithAnim();
  };
  const denyAll = () => {
    rejectAll();
    closeWithAnim();
  };
  const savePrefs = () => {
    updateConsent({ maps, analytics, marketing });
    closeWithAnim();
  };

  const onTouchStart = (e) => {
    setDragging(true);
    startY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e) => {
    if (!dragging) return;
    const dy = e.touches[0].clientY - startY.current;
  };
  const onTouchEnd = () => {
    if (!dragging) return;
    const threshold = 120;
    if (dragY > threshold) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {}
      closeWithAnim();
    } else {
      setDragY(0);
    }
    setDragging(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`${s.backdrop} ${closing ? s.fadeOut : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
    >
      <div
        className={`${s.sheet} ${prefsOpen ? s.sheetTall : ''} ${dragging ? s.dragging : ''} ${closing ? s.closing : ''}`}
        style={{ transform: `translateY(${dragY}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {!prefsOpen ? (
          <>
            <div className={s.handle} aria-hidden />
            <h3 className={s.title}>{t('title')}</h3>
            <p className={s.text}>{t('description')}</p>
            <div className={s.actions}>
              <button className={s.btnGhost} onClick={() => setPrefsOpen(true)}>
                {t('configure')}
              </button>
              <button className={s.btnSecondary} onClick={denyAll}>
                {t('deny')}
              </button>
              <button className={s.btnPrimary} onClick={acceptAll}>
                {t('acceptAll')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={s.handle} aria-hidden />
            <h3 className={s.title}>{t('settingsTitle')}</h3>

            <div className={s.prefList}>
              <div className={s.prefRow}>
                <div>
                  <strong>{t('mapsLabel')}</strong>
                  <div className={s.hint}>{t('mapsHint')}</div>
                </div>
                <label className={s.switch}>
                  <input
                    type="checkbox"
                    checked={maps}
                    onChange={(e) => setMaps(e.target.checked)}
                  />
                  <span></span>
                </label>
              </div>

              <div className={s.prefRow}>
                <div>
                  <strong>{t('analyticsLabel')}</strong>
                  <div className={s.hint}>{t('analyticsHint')}</div>
                </div>
                <label className={s.switch}>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <span></span>
                </label>
              </div>

              <div className={s.prefRow}>
                <div>
                  <strong>{t('marketingLabel')}</strong>
                  <div className={s.hint}>{t('marketingHint')}</div>
                </div>
                <label className={s.switch}>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                  <span></span>
                </label>
              </div>
            </div>

            <div className={s.actions}>
              <button
                className={s.btnGhost}
                onClick={() => setPrefsOpen(false)}
              >
                {t('back')}
              </button>
              <button className={s.btnSecondary} onClick={denyAll}>
                {t('deny')}
              </button>
              <button className={s.btnPrimary} onClick={savePrefs}>
                {t('save')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
