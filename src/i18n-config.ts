export const i18nConfig = {
  locales: ["de", "en"] as const,
  defaultLocale: "de" as const,
  prefixDefault: false,
} as const;

export type Locale = (typeof i18nConfig.locales)[number];
