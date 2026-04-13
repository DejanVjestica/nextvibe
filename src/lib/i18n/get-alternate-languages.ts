import { i18nConfig } from '@/i18n-config';
import { siteUrl } from '../config/site-url';

export const getAlternateLanguages = (slug: string = '') => {
	const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
	const slugStr = cleanSlug ? `/${cleanSlug}` : '';

	return Object.fromEntries(
		i18nConfig.locales.map((locale) => [
			locale,
			locale === i18nConfig.defaultLocale ? `${siteUrl()}${slugStr}` : `${siteUrl()}/${locale}${slugStr}`,
		]),
	);
};
