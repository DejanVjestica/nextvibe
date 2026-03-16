"use client";

import { i18nConfig, Locale } from "@/i18n-config";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const params = useParams();
  const currentLocale: Locale = params.locale as Locale;
  const { defaultLocale } = i18nConfig;

  const markMounted = useEffectEvent(() => setMounted(true));

  useEffect(() => {
    markMounted();
  }, []);

  if (!mounted) {
    return <div className="w-15"></div>;
  }

  const ariaLabel = currentLocale === defaultLocale ? (resolvedTheme === "dark" ? "Zum hellen Design wechseln" : "Zum dunklen Design wechseln") : resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const label = currentLocale === defaultLocale ? (resolvedTheme === "dark" ? "hell" : "dunkel") : resolvedTheme === "dark" ? "light" : "dark";

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const styles = `w-15 cursor-pointer p-2 transition-colors text-foreground hover:text-primary`;

  return (
    <button onClick={toggleTheme} className={styles} aria-label={ariaLabel} title={ariaLabel}>
      <span className="sr-only">Theme switcher button</span>
      <span>{label}</span>
    </button>
  );
}
