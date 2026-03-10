"use client";

import { Locale } from "@/i18n-config";
import { getLocalizedPath } from "@/lib/i18n-utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const params = useParams();

  const currentLocale = (params.locale as string) || "de";

  const toggleLanguage = (newLocale: Locale) => {
    router.push(getLocalizedPath(pathname, newLocale));
  };

  return (
    <div className={className}>
      <button
        onClick={() => toggleLanguage(currentLocale === "en" ? "de" : "en")}
        className="py-4 px-4 cursor-pointer"
      >
        {currentLocale === "en" ? "de" : "en"}
      </button>
    </div>
  );
}
