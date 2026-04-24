import { fetchStrapi } from '@/lib/strapi/fetch';
import { parseGlobal } from '@/lib/strapi/parse-global';
import { Global } from '@/lib/strapi/types';
import { ParsedGlobal } from '@/lib/strapi/types/parsed-global';
import { cache } from 'react';

const populate = {
	defaultSeo: { populate: '*' },
};

export const getGlobal = cache(async (locale: string): Promise<ParsedGlobal | null> => {
	const res = await fetchStrapi<Global>('/global', {
		populate,
		locale,
	});

	return parseGlobal(res.data);
});
