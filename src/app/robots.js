// app/robots.js
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-domain.tld';

export default function robots() {
    return {
        rules: [{ userAgent: '*', allow: '/' }],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL
    };
}
