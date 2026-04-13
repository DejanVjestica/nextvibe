import { fetchStrapi } from '@/lib/strapi/fetch';
import { About } from '@/types/strapi';
import { ParsedBlockType, parseBlocks } from '@/lib/strapi/parse-blocks';

export type ParsedAbout = {
	id: number;
	title: string | null;
	blocks: ParsedBlockType[] | null;
};

const populate = {
	blocks: { populate: '*' },
};

export const parseAbout = (raw: About): ParsedAbout => ({
	id: raw.id,
	title: raw.title ?? null,
	blocks: parseBlocks(raw.blocks).length > 0 ? parseBlocks(raw.blocks) : null,
});

export const getAbout = async (locale: string): Promise<ParsedAbout | null> => {
	const res = await fetchStrapi<About>('/about', {
		populate,
		locale,
	});

	const { id, title, blocks } = parseAbout(res.data);

	if (!title && !blocks) {
		return null;
	}

	return { id, title, blocks };
};
