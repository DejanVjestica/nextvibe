import { trimTrailingSlash } from '@/utils/trim-trailing-slash';

export const strapiUrl = () => trimTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337');
