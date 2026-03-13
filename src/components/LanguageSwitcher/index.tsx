"use client";

import { Locale } from "@/i18n-config";
import { getLocalizedPath } from "@/lib/i18n-utils";
import { useParams, usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const params = useParams();

  const currentLocale: Locale = (params.locale as Locale) ?? "de";
  const nextLocale: Locale = currentLocale === "en" ? "de" : "en";

  const toggleLanguage = (newLocale: Locale) => {
    router.replace(getLocalizedPath(pathname, newLocale));
  };

  const label = currentLocale === "en" ? "Switch to German" : "Switch to English";

  return (
    <button onClick={() => toggleLanguage(nextLocale)} className="flex cursor-pointer items-center justify-center bg-[--bg-light] p-2 transition-colors hover:bg-[--bg-light] dark:hover:bg-[--bg-light]" aria-label={label} title={label}>
      <span className="sr-only">Language switcher button</span>
      <span>{nextLocale}</span>
    </button>
  );
}
