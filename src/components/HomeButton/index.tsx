"use client";

import { Locale } from "@/i18n-config";
import { getLocalizedPath } from "@/lib/i18n-utils";
import { useParams } from "next/navigation";
import { NavLink } from "../NavLink";

export const HomeButton = () => {
  const params = useParams();

  const currentLocale: Locale = params.locale as Locale;

  return <NavLink href={getLocalizedPath("/", currentLocale)} label="Nextvibe" ariaLabel="Go to home page"></NavLink>;
};
