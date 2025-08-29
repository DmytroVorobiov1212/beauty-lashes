// app/sitemap.js
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-domain.tld';

export default function sitemap() {
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0
        }
    ];
}
