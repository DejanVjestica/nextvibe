import { ComponentRichText, ComponentMedia, ComponentQuote } from '../types';
import { createMockMedia } from './image.mock';

// TODO: Add slider block

export const mockQuoteBlock = {
	id: 1,
	__component: 'shared.quote',
	title: 'This is a quote block.',
	body: 'This is a text block.',
} satisfies ComponentQuote;

export const mockRichTextBlock = {
	id: 1,
	__component: 'shared.rich-text',
	body: 'This is a text block.',
} satisfies ComponentRichText;

export const mockMediaBlock = {
	id: 2,
	__component: 'shared.media',
	file: createMockMedia(),
} satisfies ComponentMedia;

export const mockSelectedBlocks = ({
	quote = false,
	richText = false,
	media = false,
}: {
	quote?: boolean;
	richText?: boolean;
	media?: boolean;
}) => {
	const blocks = [];
	if (quote) blocks.push(mockQuoteBlock);
	if (richText) blocks.push(mockRichTextBlock);
	if (media) blocks.push(mockMediaBlock);
	return blocks;
};

export const mockBlocks = () => {
	return [mockQuoteBlock, mockRichTextBlock, mockMediaBlock];
};
