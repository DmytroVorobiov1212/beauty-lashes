import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const LEGACY_HOST = 'beauty-lashes.vercel.app';
const CANONICAL_ORIGIN = 'https://beautybartabor.cz';

export default function proxy(request) {
  const hostname = request.headers
    .get('host')
    ?.split(':')[0]
    .toLowerCase();

  if (hostname === LEGACY_HOST) {
    const pathname =
      request.nextUrl.pathname === '/'
        ? `/${routing.defaultLocale}`
        : request.nextUrl.pathname;

    const destination = new URL(pathname, CANONICAL_ORIGIN);
    destination.search = request.nextUrl.search;

    return NextResponse.redirect(destination, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
