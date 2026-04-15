import { ParsedGlobal } from './types/parsed-global';
import { Global } from '@/lib/strapi/types';

export const parseGlobal = (raw: Global): ParsedGlobal => ({
	id: raw.id,
	siteName: raw.siteName,
	siteDescription: raw.siteDescription,
	defaultCeo: raw.defaultSeo,
});
