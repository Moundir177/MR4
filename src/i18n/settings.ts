export const defaultLocale = 'fr';
export const locales = ['fr', 'ar', 'en'];

export type Locale = (typeof locales)[number];

export const localeNames = {
  fr: 'Français',
  ar: 'العربية',
  en: 'English',
};

export const localeDirections = {
  fr: 'ltr',
  ar: 'rtl',
  en: 'ltr',
}; 