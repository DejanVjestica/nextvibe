import { fetchStrapi } from '@/lib/fetch-strapi';
import { About } from '@/types/strapi';
import { ParsedBlockType, parseStrapiBlocks } from '@/utils/parse-strapi-blocks';

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
	blocks: parseStrapiBlocks(raw.blocks).length > 0 ? parseStrapiBlocks(raw.blocks) : null,
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
