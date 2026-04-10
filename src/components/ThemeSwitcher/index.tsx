'use client';

import { i18nConfig, Locale } from '@/i18n-config';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';
import { useEffect, useEffectEvent, useState } from 'react';

export const ThemeSwitcher = () => {
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

	const localeKey = currentLocale === defaultLocale ? 'de' : 'en';
	const themeKey: 'light' | 'dark' = resolvedTheme as 'light' | 'dark';

	const label = labels[localeKey][themeKey];
	const ariaLabel = labels[localeKey].aria[themeKey];

	const toggleTheme = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	const styles = `w-15 cursor-pointer p-2 transition-colors text-foreground hover:text-primary`;

	return (
		<button onClick={toggleTheme} className={styles} aria-label={ariaLabel} title={ariaLabel}>
			{label}
		</button>
	);
};
