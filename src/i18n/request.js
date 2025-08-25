import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const ALLOWED = ['en', 'uk', 'cs'];
const DEFAULT = 'cs';

export default getRequestConfig(async () => {
    const store = await cookies();
    const raw = store.get('MYNEXTAPP_LOCALE')?.value?.trim().toLowerCase() || '';
    const locale = ALLOWED.includes(raw) ? raw : DEFAULT;

    const messages = (await import(`../messages/${locale}.json`)).default;

    return { locale, messages };
});

