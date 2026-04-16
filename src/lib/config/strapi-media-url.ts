import { trimTrailingSlash } from '@/utils/trim-trailing-slash';

export const strapiMediaUrl = () => {
	const url = trimTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || '');

	if (url) return url;
	if (process.env.NODE_ENV === 'development') return `http://localhost:1337`;

	throw new Error('NEXT_PUBLIC_STRAPI_MEDIA_URL is not set in production environment');
};
