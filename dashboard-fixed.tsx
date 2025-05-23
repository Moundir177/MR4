import { locales } from '@/i18n/settings';

// This function is required for static exports with dynamic routes
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

// Temporary file to be renamed
