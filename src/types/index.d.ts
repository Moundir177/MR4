declare module '@formatjs/intl-localematcher' {
  export function match(
    requestedLocales: string[], 
    availableLocales: readonly string[], 
    defaultLocale: string
  ): string;
}

declare module 'negotiator' {
  export default class Negotiator {
    constructor(options: { headers: Record<string, string> });
    languages(available?: string[]): string[];
  }
} 