import { getAbout } from './about';
import { fetchStrapi } from '@/lib/strapi/fetch';
import { mockSelectedBlocks } from '@/lib/strapi/mocks/blocks.mock';

vi.mock('@/lib/strapi/fetch', () => ({
	fetchStrapi: vi.fn(),
}));

describe('getAbout Service', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls fetchStrapi with the correct endpoint and locale', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 2,
				documentId: 'frqhnrreev16jmtxbakgts2b',
				createdAt: '2026-04-30T09:36:01.168Z',
				updatedAt: '2026-04-30T12:14:43.188Z',
				publishedAt: '2026-04-30T12:14:43.204Z',
				locale: 'en',
				title: 'Our Story',
				blocks: [],
			},
			meta: {},
		});

		await getAbout('en');

		expect(fetchStrapi).toHaveBeenCalledWith('/about', {
			populate: {
				blocks: { populate: '*' },
			},
			locale: 'en',
		});
	});

	it('returns parsed about data when content exists', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 2,
				documentId: 'frqhnrreev16jmtxbakgts2b',
				createdAt: '2026-04-30T09:36:01.168Z',
				updatedAt: '2026-04-30T12:14:43.188Z',
				publishedAt: '2026-04-30T12:14:43.204Z',
				locale: 'en',
				title: 'Our Story',
				blocks: mockSelectedBlocks({ richText: true, media: true }),
			},
			meta: {},
		});

		const result = await getAbout('en');

		expect(result).toEqual({
			id: 2,
			title: 'Our Story',
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
						alternativeText: null,
						formats: {},
						height: 1000,
						type: 'image',
						url: 'https://example.com/image.jpg',
						width: 1000,
					},
				},
			],
		});
	});

	it('returns null when no title or blocks exist', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 2,
				documentId: 'frqhnrreev16jmtxbakgts2b',
				createdAt: '2026-04-30T09:36:01.168Z',
				updatedAt: '2026-04-30T12:14:43.188Z',
				publishedAt: '2026-04-30T12:14:43.204Z',
				locale: 'en',
				title: null,
				blocks: [],
			},
			meta: {},
		});

		const result = await getAbout('en');

		expect(result).toBeNull();
	});
});
