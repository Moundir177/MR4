import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/settings';

function getLocale(request: NextRequest): string {
  // Simplified locale detection - just use default or browser language
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Try to match one of our locales
  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      return locale;
    }
  }
  
  // Default fallback
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Create new URL for redirect
    const newUrl = new URL(request.nextUrl.origin);
    newUrl.pathname = `/${locale}${pathname}`;
    
    return NextResponse.redirect(newUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  // Skip all internal paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 