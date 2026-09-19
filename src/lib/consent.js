const COOKIE = 'MYNEXTAPP_CONSENT';
const MAX_AGE = 60 * 60 * 24 * 180;
const SESSION_KEY = 'CONSENT_DISMISSED_SESSION';
const CHANGE_EVENT = 'consent:change';
const SESSION_EVENT = 'consent:session-change';

function readCookieRaw(name = COOKIE) {
  if (typeof document === 'undefined') return '';

  const pair = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));

  return pair ? decodeURIComponent(pair.split('=')[1]) : '';
}

export function readConsent() {
  try {
    const raw = readCookieRaw();
    if (!raw) return null;

    const consent = JSON.parse(raw);

    return {
      necessary: true,
      maps: !!consent.maps,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
      v: 1,
      ts: consent.ts || 0,
    };
  } catch {
    return null;
  }
}

function writeCookieValue(value) {
  if (typeof document === 'undefined') return;

  document.cookie = `${COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

export function writeConsent(next) {
  const payload = {
    necessary: true,
    maps: !!next.maps,
    analytics: !!next.analytics,
    marketing: !!next.marketing,
    v: 1,
    ts: Date.now(),
  };

  writeCookieValue(JSON.stringify(payload));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(CHANGE_EVENT, {
        detail: payload,
      }),
    );
  }
}

export function updateConsent(patchOrFn) {
  const current = readConsent() || {
    necessary: true,
    maps: false,
    analytics: false,
    marketing: false,
  };

  const next =
    typeof patchOrFn === 'function'
      ? patchOrFn(current)
      : { ...current, ...patchOrFn };

  writeConsent(next);
}

export function onConsentChange(callback) {
  if (typeof window === 'undefined') return () => {};

  const handler = (event) => callback(event.detail);
  window.addEventListener(CHANGE_EVENT, handler);

  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function subscribeConsentStore(listener) {
  if (typeof window === 'undefined') return () => {};

  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener(SESSION_EVENT, listener);

  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener(SESSION_EVENT, listener);
  };
}

export function getMapsAllowedSnapshot() {
  return !!readConsent()?.maps;
}

export function getMapsAllowedServerSnapshot() {
  return false;
}

export function getConsentBannerSnapshot() {
  if (typeof window === 'undefined') return false;

  let dismissed = false;

  try {
    dismissed = sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {}

  return !readConsent() && !dismissed;
}

export function getConsentBannerServerSnapshot() {
  return false;
}

export function dismissConsentForSession() {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {}

  window.dispatchEvent(new Event(SESSION_EVENT));
}

export const grantAll = () =>
  writeConsent({ maps: true, analytics: true, marketing: true });

export const rejectAll = () =>
  writeConsent({ maps: false, analytics: false, marketing: false });

export const grantMapsOnly = () =>
  updateConsent((current) => ({ ...current, maps: true }));
