const COOKIE = 'MYNEXTAPP_CONSENT';
const MAX_AGE = 60 * 60 * 24 * 180;

function readCookieRaw(name = COOKIE) {
    if (typeof document === 'undefined') return '';
    const pair = document.cookie.split('; ').find(r => r.startsWith(name + '='));
    return pair ? decodeURIComponent(pair.split('=')[1]) : '';
}

export function readConsent() {
    try {
        const raw = readCookieRaw();
        if (!raw) return null;
        const c = JSON.parse(raw);
        return {
            necessary: true,
            maps: !!c.maps,
            analytics: !!c.analytics,
            marketing: !!c.marketing,
            v: 1,
            ts: c.ts || Date.now()
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
    const payload = JSON.stringify({
        necessary: true,
        maps: !!next.maps,
        analytics: !!next.analytics,
        marketing: !!next.marketing,
        v: 1,
        ts: Date.now()
    });
    writeCookieValue(payload);

    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('consent:change', { detail: JSON.parse(payload) }));
    }
}

export function updateConsent(patchOrFn) {
    const current = readConsent() || { necessary: true, maps: false, analytics: false, marketing: false };
    const next = typeof patchOrFn === 'function' ? patchOrFn(current) : { ...current, ...patchOrFn };
    writeConsent(next);
}

export function onConsentChange(cb) {
    if (typeof window === 'undefined') return () => { };
    const handler = (e) => cb(e.detail);
    window.addEventListener('consent:change', handler);
    return () => window.removeEventListener('consent:change', handler);
}

export const grantAll = () => writeConsent({ maps: true, analytics: true, marketing: true });
export const rejectAll = () => writeConsent({ maps: false, analytics: false, marketing: false });
export const grantMapsOnly = () => updateConsent(c => ({ ...c, maps: true }));
