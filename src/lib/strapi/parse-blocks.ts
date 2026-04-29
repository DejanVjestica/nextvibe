import { ContentBlocks } from '@/lib/strapi/types';
import { parseMedia } from '@/lib/strapi/parse-media';
import {
	ParsedBlockMedia,
	ParsedBlockQuote,
	ParsedBlockRichtext,
	ParsedBlockSlider,
	ParsedBlockType,
} from './types/parsed-blocks';
import { ParsedMediaType } from './types/parsed-media';

const parseBlock = (block: ContentBlocks): ParsedBlockType | null => {
	switch (block.__component) {
		case 'shared.media':
			if (!block.file) return null;
			return {
				type: 'media',
				id: block.id,
				file: parseMedia(block.file) as ParsedMediaType,
			} satisfies ParsedBlockMedia;
		case 'shared.quote':
			if (!block.title || !block.body) return null;
			return {
				type: 'quote',
				id: block.id,
				title: block.title,
				body: block.body,
			} satisfies ParsedBlockQuote;
		case 'shared.slider':
			if (!block.files || block.files.length === 0) return null;
			return {
				type: 'slider',
				id: block.id,
				files: block.files,
			} satisfies ParsedBlockSlider;
		case 'shared.rich-text':
			if (!block.body) return null;
			return {
				type: 'rich-text',
				id: block.id,
				body: block.body,
			} satisfies ParsedBlockRichtext;
	}
};

export const parseBlocks = (blocks: ContentBlocks[]): ParsedBlockType[] | null => {
	const parsedBlocks = blocks.map(parseBlock).filter(Boolean);
	return parsedBlocks.length > 0 ? (parsedBlocks as ParsedBlockType[]) : null;
};
