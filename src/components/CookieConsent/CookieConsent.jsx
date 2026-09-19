'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { readConsent, grantAll, rejectAll, updateConsent } from '@/lib/consent';
import s from './CookieConsent.module.css';

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
  const dragYRef = useRef(0);
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    const dismissed =
      typeof window !== 'undefined' &&
      sessionStorage.getItem(SESSION_KEY) === '1';

    if (!consent && !dismissed) {
      previousFocusRef.current = document.activeElement;
      setVisible(true);
    } else if (consent) {
      setMaps(!!consent.maps);
      setAnalytics(!!consent.analytics);
      setMarketing(!!consent.marketing);
    }

    if (typeof window !== 'undefined') {
      window.__openConsent__ = () => {
        previousFocusRef.current = document.activeElement;
        setVisible(true);
        setPrefsOpen(true);
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.__openConsent__;
      }
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector('button, input, [href], [tabindex]:not([tabindex="-1"])')
        ?.focus();
    });
  }, [visible, prefsOpen]);

  const resetDrag = () => {
    dragYRef.current = 0;
    setDragY(0);
    setDragging(false);
  };

  const restoreFocus = () => {
    requestAnimationFrame(() => previousFocusRef.current?.focus?.());
  };

  const closeWithAnim = (callback) => {
    setClosing(true);

    window.setTimeout(() => {
      setClosing(false);
      setVisible(false);
      resetDrag();
      callback?.();
      restoreFocus();
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

  const dismissForSession = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {}

    closeWithAnim();
  };

  const onTouchStart = (event) => {
    startY.current = event.touches[0].clientY;
    dragYRef.current = 0;
    setDragY(0);
    setDragging(true);
  };

  const onTouchMove = (event) => {
    if (!dragging) return;

    const dy = Math.max(0, event.touches[0].clientY - startY.current);
    dragYRef.current = dy;
    setDragY(dy);
  };

  const onTouchEnd = () => {
    if (!dragging) return;

    if (dragYRef.current > 120) {
      dismissForSession();
      return;
    }

    resetDrag();
  };

  const onDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dismissForSession();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.offsetParent !== null);

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

  if (!visible) return null;

  return (
    <div className={`${s.backdrop} ${closing ? s.fadeOut : ''}`}>
      <div
        ref={dialogRef}
        className={`${s.sheet} ${prefsOpen ? s.sheetTall : ''} ${dragging ? s.dragging : ''} ${closing ? s.closing : ''}`}
        style={{ transform: `translateY(${dragY}px)` }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        onKeyDown={onDialogKeyDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {!prefsOpen ? (
          <>
            <div className={s.handle} aria-hidden />
            <h3 id="cookie-consent-title" className={s.title}>
              {t('title')}
            </h3>
            <p className={s.text}>{t('description')}</p>
            <div className={s.actions}>
              <button
                type="button"
                className={s.btnGhost}
                onClick={() => setPrefsOpen(true)}
              >
                {t('configure')}
              </button>
              <button type="button" className={s.btnSecondary} onClick={denyAll}>
                {t('deny')}
              </button>
              <button type="button" className={s.btnPrimary} onClick={acceptAll}>
                {t('acceptAll')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={s.handle} aria-hidden />
            <h3 id="cookie-consent-title" className={s.title}>
              {t('settingsTitle')}
            </h3>

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
                    aria-label={t('mapsLabel')}
                    onChange={(event) => setMaps(event.target.checked)}
                  />
                  <span aria-hidden="true" />
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
                    aria-label={t('analyticsLabel')}
                    onChange={(event) => setAnalytics(event.target.checked)}
                  />
                  <span aria-hidden="true" />
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
                    aria-label={t('marketingLabel')}
                    onChange={(event) => setMarketing(event.target.checked)}
                  />
                  <span aria-hidden="true" />
                </label>
              </div>
            </div>

            <div className={s.actions}>
              <button
                type="button"
                className={s.btnGhost}
                onClick={() => setPrefsOpen(false)}
              >
                {t('back')}
              </button>
              <button type="button" className={s.btnSecondary} onClick={denyAll}>
                {t('deny')}
              </button>
              <button type="button" className={s.btnPrimary} onClick={savePrefs}>
                {t('save')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
