import { ContentBlocks } from '@/lib/strapi/types';
import { parseMedia } from '@/lib/strapi/parse-media';
import {
	ParsedBlockMedia,
	ParsedBlockQuote,
	ParsedBlockRichtext,
	ParsedBlockSlider,
	ParsedBlockType,
} from './types/parsed-blocks';

const parseBlock = (block: ContentBlocks): ParsedBlockType => {
	switch (block.__component) {
		case 'shared.media':
			return {
				type: 'media',
				id: block.id,
				file: block.file ? parseMedia(block.file) : null,
			} satisfies ParsedBlockMedia;
		case 'shared.quote':
			return {
				type: 'quote',
				id: block.id,
				title: block.title,
				body: block.body,
			} satisfies ParsedBlockQuote;
		case 'shared.slider':
			return {
				type: 'slider',
				id: block.id,
				files: block.files,
			} satisfies ParsedBlockSlider;
		case 'shared.rich-text':
			return {
				type: 'rich-text',
				id: block.id,
				body: block.body,
			} satisfies ParsedBlockRichtext;
	}
};

export const parseBlocks = (blocks: ContentBlocks[]) => {
	return blocks.map(parseBlock).filter(Boolean);
};
