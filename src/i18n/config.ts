export const defaultLocale = 'en' as const;

export const locales = ['en', 'de', 'fr', 'es', 'hr', 'sr'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  hr: 'Hrvatski',
  sr: 'Srpski',
};

/** URL prefix per locale. English uses root `/`. */
export function localePath(locale: Locale, path = ''): string {
  const suffix = path.startsWith('/') ? path : path ? `/${path}` : '';
  if (locale === defaultLocale) return suffix || '/';
  return `/${locale}${suffix}`;
}
