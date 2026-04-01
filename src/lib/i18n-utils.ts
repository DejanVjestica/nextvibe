import { i18nConfig, Locale } from '@/i18n-config';

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

export const getBaseUrl = () =>
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT || 3000}` : undefined);

export const getAlternateLanguages = (slug: string = '') => {
	const slugStr = slug ? `/${slug}` : '';
	return Object.fromEntries(
		i18nConfig.locales.map((lang) => [
			lang,
			lang === i18nConfig.defaultLocale ? `${getBaseUrl()}${slugStr}` : `${getBaseUrl()}/${lang}${slugStr}`,
		]),
	);
};
