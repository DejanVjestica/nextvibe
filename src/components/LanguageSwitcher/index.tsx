"use client";

import { Locale } from "@/i18n-config";
import { getLocalizedPath } from "@/lib/i18n-utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const params = useParams();

  const currentLocale = (params.locale as string) || "de";

  const toggleLanguage = (newLocale: Locale) => {
    router.push(getLocalizedPath(pathname, newLocale));
  };

  return (
    <>
      <button
        onClick={() => toggleLanguage(currentLocale === "en" ? "de" : "en")}
        className="py-4 px-8 cursor-pointer"
      >
        {currentLocale === "en" ? "de" : "en"}
      </button>
      <Link href={"/about"} prefetch>
        about
      </Link>
      <Link href={"/"} prefetch>
        home
      </Link>
    </>
  );
}
