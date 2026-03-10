"use client";

import { useParams } from "next/navigation";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { MainNav } from "../MainNav";

export function Header() {
  const params = useParams();

  const currentLocale = (params.locale as string) || "de";

  return (
    <header className="grid gap-2 bg-second grid-cols-12">
      <p className="col-start-2 content-center col-span-1">{currentLocale}</p>
      <LanguageSwitcher className="col-start-10  col-span-1"></LanguageSwitcher>
      <MainNav className="col-start-11  col-span-1 items-center"></MainNav>
    </header>
  );
}
