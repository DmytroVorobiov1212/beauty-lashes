// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default withNextIntl(nextConfig);


// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        formats: ['image/avif', 'image/webp'],

        deviceSizes: [320, 375, 640, 750, 828, 1080, 1200, 1356, 1440, 1920, 2160, 2560, 2880, 3840],

        imageSizes: [64, 96, 160, 220, 240, 320, 400, 500, 800],
    },

    experimental: {
        optimizePackageImports: ['react-icons', 'swiper'],
    },

    async headers() {
        return [
            {
                source: '/hero/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/gallery/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/map/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/team/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/brand/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ];
    },

};

export default withNextIntl(nextConfig);
