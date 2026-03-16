"use client";

import { Locale } from "@/i18n-config";
import { getLocalizedPath } from "@/lib/i18n-utils";
import { useParams, usePathname } from "next/navigation";
import { NavLink } from "../NavLink";

export const LanguageSwitcher = () => {
  const pathname = usePathname();

  const params = useParams();

  const currentLocale: Locale = params.locale as Locale;
  const nextLocale: Locale = currentLocale === "en" ? "de" : "en";

  const ariaLabel = currentLocale === "en" ? "Zu Deutsch wechseln" : "Switch to English";

  return <NavLink href={getLocalizedPath(pathname, nextLocale)} label={nextLocale} ariaLabel={ariaLabel}></NavLink>;
};
