"use client";

import { useTheme } from "next-themes";
import { useEffect, useEffectEvent, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const markMounted = useEffectEvent(() => setMounted(true));

  useEffect(() => {
    markMounted();
  }, []);

  const label = mounted && resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="flex cursor-pointer items-center justify-center bg-[--bg-light] p-2 transition-colors hover:bg-[--bg-light] dark:hover:bg-[--bg-light]" aria-label={label} title={label}>
      <span className="sr-only">Theme switcher button</span>
      {mounted && <p>{resolvedTheme === "dark" ? "light" : "dark"}</p>}
    </button>
  );
}
