"use client";

import { useParams } from "next/navigation";
import { LanguageSwitcher } from "../LanguageSwitcher";

export function Header() {
  const params = useParams();

  const currentLocale = (params.locale as string) || "de";

  return (
    <header className="flex gap-2">
      <p>{currentLocale}</p>
      <LanguageSwitcher></LanguageSwitcher>
    </header>
  );
}
