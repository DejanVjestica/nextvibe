import { fetchStrapi } from '@/lib/strapi/fetch';
import { ComponentCeo, Global } from '@/types/strapi';
import { cache } from 'react';

export type ParsedGlobal = {
	id: number;
	siteName: string;
	siteDescription: string;
	defaultCeo: ComponentCeo | null;
};

const populate = {
	defaultSeo: { populate: '*' },
};

export const parseGlobal = (raw: Global): ParsedGlobal => ({
	id: raw.id,
	siteName: raw.siteName,
	siteDescription: raw.siteDescription,
	defaultCeo: raw.defaultSeo,
});

export const getGlobal = cache(async (locale: string): Promise<ParsedGlobal | null> => {
	const res = await fetchStrapi<Global>('/global', {
		populate,
		locale,
	});

	const { siteName, siteDescription } = res.data;

	if (!res?.data && !siteName && !siteDescription?.length) return null;

	return parseGlobal(res.data);
});
