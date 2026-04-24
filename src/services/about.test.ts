import { getAbout } from './about';
import { fetchStrapi } from '@/lib/strapi/fetch';
import { mockImageFormats } from '@/lib/strapi/mocks/image.mock';

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
				title: 'Our Story',
				blocks: [
					{
						__component: 'shared.rich-text',
						id: 1,
						body: 'This is the required body content',
					},
					{
						__component: 'shared.media',
						id: 2,
						file: {
							alternativeText: 'lorem ipsum',
							formats: mockImageFormats,
							height: 800,
							mime: 'image/jpeg',
							url: '/mock-image.jpg',
							width: 1200,
						},
					},
				],
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
					body: 'This is the required body content',
				},
				{
					id: 2,
					type: 'media',
					file: {
						alternativeText: 'lorem ipsum',
						formats: mockImageFormats,
						height: 800,
						type: 'image',
						url: '/mock-image.jpg',
						width: 1200,
					},
				},
			],
		});
	});

	it('returns null when no title or blocks exist', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 2,
				title: null,
				blocks: [],
			},
			meta: {},
		});

		const result = await getAbout('en');

		expect(result).toBeNull();
	});
});
