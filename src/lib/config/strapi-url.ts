import { trimTrailingSlash } from '@/utils/trim-trailing-slash';

export const strapiUrl = () => {
	const url = trimTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_URL || '');

	if (url) return url;
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') return `http://localhost:1337`;

	throw new Error(`NEXT_PUBLIC_STRAPI_URL is not set in ${process.env.NODE_ENV} environment`);
};
