import 'server-only';
import type { Locale } from './settings';

// Import dictionaries directly
import enDict from './messages/en.json';
import frDict from './messages/fr.json';
import arDict from './messages/ar.json';

const dictionaries = {
  en: enDict,
  fr: frDict,
  ar: arDict
} as const;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale as keyof typeof dictionaries];
}; 