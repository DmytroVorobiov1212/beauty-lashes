// app/manifest.js
export default function manifest() {
    return {
        name: 'Beauty Bar Lashes Tábor',
        short_name: 'Beauty Lashes',
        description: 'Profesionální prodlužování řas v Táboře.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0e0f12',
        theme_color: '#0e0f12',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
            { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            { src: '/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
    };
}
