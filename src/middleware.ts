import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// List of private routes (excluding the locale prefix)
const privateRoutes = ['/accommodation', '/transportation', '/poll', '/dictionary'];

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Extract the locale and the actual path
    const pathParts = pathname.split('/');
    const locale = pathParts[1];
    const relativePath = '/' + pathParts.slice(2).join('/');

    // Check if it's a private route
    const isPrivate = privateRoutes.some(route => relativePath.startsWith(route));

    if (isPrivate) {
        const guestEmail = request.cookies.get('guest_email');

        // If no email cookie, redirect to RSVP page of the current locale
        if (!guestEmail) {
            const url = request.nextUrl.clone();
            url.pathname = `/${locale}/rsvp`;
            return NextResponse.redirect(url);
        }
    }

    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|es|pl)/:path*']
};
