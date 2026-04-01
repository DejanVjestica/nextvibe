import { ContentBlock } from '@/types/strapi';
import { ParsedMediaType, parseStrapiMedia } from '@/utils/parse-strapi-media';

type ParsedBlockMedia = {
	type: 'media';
	id: number;
	file: ParsedMediaType | null;
};

type ParsedBlockQuote = {
	type: 'quote';
	id: number;
	title: string | null;
	body: string | null;
};

type ParsedBlockSlider = {
	type: 'slider';
	id: number;
	files: ParsedMediaType[] | null;
};

type ParsedBlockRichtext = {
	type: 'rich-text';
	id: number;
	body: string | null;
};

export type ParsedBlockType = ParsedBlockMedia | ParsedBlockQuote | ParsedBlockSlider | ParsedBlockRichtext;

const parseBlock = (block: ContentBlock): ParsedBlockType => {
	switch (block.__component) {
		case 'shared.media':
			return {
				type: 'media',
				id: block.id,
				file: block.file ? parseStrapiMedia(block.file) : null,
			} as ParsedBlockMedia;
		case 'shared.quote':
			return {
				type: 'quote',
				id: block.id,
				title: block.title,
				body: block.body,
			} as ParsedBlockQuote;
		case 'shared.slider':
			return {
				type: 'slider',
				id: block.id,
				files: block.files,
			} as ParsedBlockSlider;
		case 'shared.rich-text':
			return {
				type: 'rich-text',
				id: block.id,
				body: block.body,
			} as ParsedBlockRichtext;
	}
};

export const parseStrapiBlocks = (blocks: ContentBlock[]) => {
	return blocks.map(parseBlock).filter(Boolean);
};
