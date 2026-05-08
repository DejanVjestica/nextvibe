'use client';

import { i18nConfig, Locale } from '@/i18n-config';
import { useTheme } from 'next-themes';
import { useEffect, useEffectEvent, useState } from 'react';

const labels = {
	de: {
		dark: 'hell',
		light: 'dunkel',
		aria: {
			dark: 'Zum hellen Design wechseln',
			light: 'Zum dunklen Design wechseln',
		},
	},
	en: {
		dark: 'light',
		light: 'dark',
		aria: { dark: 'Switch to light theme', light: 'Switch to dark theme' },
	},
};

interface ThemeSwitcherProps {
	locale: Locale;
}

export const ThemeSwitcher = ({ locale }: ThemeSwitcherProps) => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	const markMounted = useEffectEvent(() => setMounted(true));

	useEffect(() => {
		markMounted();
	}, []);

	if (!mounted) {
		return <div className="w-15"></div>;
	}

	const localeKey = locale === i18nConfig.defaultLocale ? 'de' : 'en';
	const themeKey: 'light' | 'dark' = resolvedTheme as 'light' | 'dark';

	const label = labels[localeKey][themeKey];
	const ariaLabel = labels[localeKey].aria[themeKey];

	const toggleTheme = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	const styles = `w-15 cursor-pointer p-2 text-foreground hover:text-primary`;

	return (
		<button onClick={toggleTheme} className={styles} aria-label={ariaLabel} title={ariaLabel}>
			{label}
		</button>
	);
};
