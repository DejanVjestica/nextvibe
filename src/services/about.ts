import { fetchStrapi } from '@/lib/fetch-strapi';
import { About } from '@/types/strapi';
import { ParsedBlockType, parseStrapiBlocks } from '@/utils/parse-strapi-blocks';

export type ParsedAbout = {
	id: number;
	title: string | null;
	blocks: ParsedBlockType[];
};

const populate = {
	blocks: { populate: '*' },
};

export const parseAbout = (raw: About): ParsedAbout => ({
	id: raw.id,
	title: raw.title ?? null,
	blocks: parseStrapiBlocks(raw.blocks),
});

export const getAbout = async (locale: string): Promise<ParsedAbout | null> => {
	const res = await fetchStrapi<About>('/about', {
		populate,
		locale,
	});

	const { title, blocks } = res.data;

	if (!res?.data && !title && !blocks?.length) return null;

	return parseAbout(res.data);
};
