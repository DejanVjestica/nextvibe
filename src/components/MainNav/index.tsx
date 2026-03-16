"use client";
import { getLocalizedPath } from "@/lib/i18n-utils";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { NavLink } from "../NavLink";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n-config";

interface MainNavProps {
  className?: string;
}

export const MainNav = ({ className }: MainNavProps) => {
  const params = useParams();
  return (
    <nav className={` ${className} flex items-center gap-2 justify-self-center`}>
      <ul className="contents">
        <li>
          <NavLink href={getLocalizedPath("/about", params.locale as Locale)} label="about"></NavLink>
        </li>
        <li>
          <LanguageSwitcher></LanguageSwitcher>
        </li>
      </ul>
    </nav>
  );
};
