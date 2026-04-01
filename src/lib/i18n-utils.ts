import { i18nConfig, Locale } from '@/i18n-config';
import { siteUrl } from './config/site-url';

export const getLocalizedPath = (pathname: string, newLocale: string) => {
	const segments = pathname.split('/').filter(Boolean);
	const { locales, defaultLocale, prefixDefault } = i18nConfig;

	if (locales.includes(segments[0] as Locale)) {
		segments.shift();
	}
	let newPath: string;

	if (newLocale === defaultLocale && !prefixDefault) {
		newPath = '/' + segments.join('/');
	} else {
		newPath = '/' + newLocale + '/' + segments.join('/');
	}

	return newPath;
};

export const getAlternateLanguages = (slug: string = '') => {
	const slugStr = slug ? `/${slug}` : '';
	return Object.fromEntries(
		i18nConfig.locales.map((locale) => [
			locale,
			locale === i18nConfig.defaultLocale ? `${siteUrl()}${slugStr}` : `${siteUrl()}/${locale}${slugStr}`,
		]),
	);
};
