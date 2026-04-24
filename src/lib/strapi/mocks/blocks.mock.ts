import { ComponentRichText, ComponentMedia, ComponentQuote } from '../types';

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
	file: {
		id: 1,
		documentId: 'media-doc-id',
		name: 'image.jpg',
		caption: null,
		hash: 'image-hash',
		ext: '.jpg',
		size: 500,
		url: 'https://example.com/image.jpg',
		previewUrl: null,
		provider: 'local',
		createdAt: '2026-03-16T16:22:11.570Z',
		updatedAt: '2026-04-24T13:16:17.532Z',
		publishedAt: '2026-04-24T13:16:17.495Z',
		alternativeText: null,
		formats: {},
		height: 1000,
		width: 1000,
		mime: 'image/png',
	},
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
