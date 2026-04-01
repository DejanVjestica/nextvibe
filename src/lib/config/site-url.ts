export const siteUrl = () =>
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT || 3000}` : undefined);
