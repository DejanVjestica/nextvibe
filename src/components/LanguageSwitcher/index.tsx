'use client';
import { i18nConfig, Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/lib/i18n/get-localized-path';
import { NavLink } from '@/components/NavLink';
import { usePathname } from 'next/navigation';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

export const LanguageSwitcher = () => {
	const { defaultLocale } = i18nConfig;
	const pathname = usePathname();
	const currentLocale = useCurrentLocale();
	const nextLocale: Locale = currentLocale === 'en' ? 'de' : 'en';
	const ariaLabel = currentLocale === defaultLocale ? 'Switch to English' : 'Zu Deutsch wechseln';

	return <NavLink href={getLocalizedPath(pathname, nextLocale)} label={nextLocale} ariaLabel={ariaLabel}></NavLink>;
};
