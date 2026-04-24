import { ParsedAbout } from './types/parsed-about';
import { parseAbout } from './parse-about';
import { About } from './types';
import { mockSelectedBlocks } from './mocks/blocks.mock';

describe('parseAbout', () => {
	it('should parse about data correctly', () => {
		const raw = {
			createdAt: '2026-03-16T16:22:11.570Z',
			documentId: 'yyauxnbz57281i3m9vyummpd',
			id: 3,
			locale: 'de',
			publishedAt: '2026-04-24T13:16:17.495Z',
			title: 'about me',
			updatedAt: '2026-04-24T13:16:17.532Z',
			createdBy: null,
			updatedBy: null,
			localizations: {
				data: [],
				meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
			},
			blocks: mockSelectedBlocks({ richText: true, media: true }),
		} satisfies About;

		const expected: ParsedAbout = {
			id: 3,
			title: 'about me',
			blocks: [
				{
					id: 1,
					type: 'rich-text',
					body: 'This is a text block.',
				},
				{
					id: 2,
					type: 'media',
					file: {
						url: 'https://example.com/image.jpg',
						type: 'image',
						alternativeText: null,
						formats: {},
						height: 1000,
						width: 1000,
					},
				},
			],
		};

		expect(parseAbout(raw)).toEqual(expected);
	});

	it('should return null for title and blocks if they are missing', () => {
		const raw = {
			createdAt: '2026-03-16T16:22:11.570Z',
			documentId: 'yyauxnbz57281i3m9vyummpd',
			id: 3,
			locale: 'de',
			publishedAt: '2026-04-24T13:16:17.495Z',
			title: null,
			updatedAt: '2026-04-24T13:16:17.532Z',
			createdBy: null,
			updatedBy: null,
			localizations: {
				data: [],
				meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
			},
			blocks: [],
		} satisfies About;

		expect(parseAbout(raw)).toEqual({
			id: 3,
			title: null,
			blocks: null,
		});
	});
});
