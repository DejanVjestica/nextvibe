import { parseBlocks } from './parse-blocks';
import { mockSelectedBlocks } from '@/lib/strapi/mocks/blocks.mock';
import { ContentBlocks } from './types';
import { createMockParsedImage } from './mocks/parsedImage.mock';

describe('parseBlocks', () => {
	it('should parse blocks correctly', () => {
		const rawBlocks = mockSelectedBlocks({ richText: true, media: true, quote: true });

		const expected = [
			{
				id: 1,
				type: 'quote',
				title: 'This is a quote block.',
				body: 'This is a text block.',
			},
			{
				id: 1,
				type: 'rich-text',
				body: 'This is a text block.',
			},
			{
				id: 2,
				type: 'media',
				file: createMockParsedImage(),
			},
		];

		expect(parseBlocks(rawBlocks)).toEqual(expected);
	});

	it('should return null if no blocks are provided', () => {
		expect(parseBlocks([])).toBeNull();
	});

	it('returns null when blocks have null values', () => {
		const rawBlocks = [
			{
				__component: 'shared.rich-text',
				id: 1,
				body: null,
			},
			{
				__component: 'shared.media',
				id: 2,
				file: null,
			},
			{
				__component: 'shared.quote',
				id: 3,
				title: null,
				body: null,
			},
		] as ContentBlocks[];

		expect(parseBlocks(rawBlocks)).toBeNull();
	});

	it('keeps valid blocks and removes invalid ones', () => {
		const rawBlocks = [
			{
				__component: 'shared.rich-text',
				id: 1,
				body: 'Hello',
			},
			{
				__component: 'shared.media',
				id: 2,
				file: null,
			},
		] as ContentBlocks[];

		expect(parseBlocks(rawBlocks)).toEqual([
			{
				type: 'rich-text',
				id: 1,
				body: 'Hello',
			},
		]);
	});
});
