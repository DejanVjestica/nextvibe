import { trimTrailingSlash } from '@/utils/trim-trailing-slash';

export const siteUrl = () => {
	const url = trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || '');

	if (url) return url;
	if (process.env.NODE_ENV === 'development') return `http://localhost:${process.env.PORT || 3000}`;

	throw new Error('NEXT_PUBLIC_SITE_URL is not set in production environment');
};
