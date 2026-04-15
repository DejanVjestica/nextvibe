import { fetchStrapi } from '@/lib/strapi/fetch';
import { About } from '@/lib/strapi/types';
import { ParsedAbout } from '@/lib/strapi/types/parsed-about';
import { parseAbout } from '@/lib/strapi/parse-about';

const populate = {
	blocks: { populate: '*' },
};

export const getAbout = async (locale: string): Promise<ParsedAbout | null> => {
	const res = await fetchStrapi<About>('/about', {
		populate,
		locale,
	});

	const { id, title, blocks } = parseAbout(res.data);

	if (!title && !blocks) return null;

	return {
		id,
		title,
		blocks,
	};
};
