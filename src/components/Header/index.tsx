"use client";

import { useParams } from "next/navigation";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { MainNav } from "../MainNav";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function Header() {
  const params = useParams();

  const currentLocale = (params.locale as string) || "de";

  return (
    <header className="bg-second grid grid-cols-12 gap-2">
      <p className="col-span-1 col-start-2 content-center">{currentLocale}</p>
      <LanguageSwitcher></LanguageSwitcher>
      <ThemeSwitcher></ThemeSwitcher>
      <MainNav className="col-span-1 col-start-11 items-center"></MainNav>
    </header>
  );
}
