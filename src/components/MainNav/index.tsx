"use client";
import Link from "next/link";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={` ${className} flex gap-2 `}>
      <Link href={"/about"} prefetch>
        about
      </Link>
      <Link href={"/"} prefetch>
        home
      </Link>
    </nav>
  );
}
