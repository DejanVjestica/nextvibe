import { trimTrailingSlash } from '@/utils/trim-trailing-slash';

export const siteUrl = () =>
	trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || '') ||
	(process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT || 3000}` : undefined);
