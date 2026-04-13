import { trimTrailingSlash } from '@/utils/trim-trailing-slash';

export const strapiMediaUrl = () => trimTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || '');
