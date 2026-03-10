import { i18nConfig, Locale } from "@/i18n-config";

export function getLocalizedPath(pathname: string, newLocale: string) {
  const segments = pathname.split("/").filter(Boolean);
  const { locales, defaultLocale, prefixDefault } = i18nConfig;

  if (locales.includes(segments[0] as Locale)) {
    segments.shift();
  }
  let newPath: string;

  if (newLocale === defaultLocale && !prefixDefault) {
    newPath = "/" + segments.join("/");
  } else {
    newPath = "/" + newLocale + "/" + segments.join("/");
  }

  return newPath;
}
