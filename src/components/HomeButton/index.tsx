"use client";

import { i18nConfig, Locale } from "@/i18n-config";
import { getLocalizedPath } from "@/lib/i18n-utils";
import { useParams } from "next/navigation";
import { NavLink } from "../NavLink";

export const HomeButton = () => {
  const params = useParams();
  const { defaultLocale } = i18nConfig;

  const currentLocale: Locale = params.locale as Locale;
  const ariaLabel = currentLocale === defaultLocale ? "Zur Startseite" : "Go to home page";

  return <NavLink href={getLocalizedPath("/", currentLocale)} label="Nextvibe" ariaLabel={ariaLabel}></NavLink>;
};
