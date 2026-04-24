import { getGlobal } from './global';
import { fetchStrapi } from '@/lib/strapi/fetch';

vi.mock('@/lib/strapi/fetch', () => ({
	fetchStrapi: vi.fn(),
}));

describe('getGlobal', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls fetchStrapi with the correct endpoint and locale', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 1,
				siteName: 'Test Site',
				siteDescription: 'A description of the test site',
				defaultSeo: {
					id: 1,
					metaTitle: 'Test Meta Title',
					metaDescription: 'Test Meta Description',
					shareImage: {
						url: '/share-image.png',
					},
				},
			},
			meta: {},
		});

		await getGlobal('en');

		expect(fetchStrapi).toHaveBeenCalledWith('/global', {
			populate: {
				defaultSeo: { populate: '*' },
			},
			locale: 'en',
		});
	});

	it('returns parsed global data when content exists', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 1,
				siteName: 'Test Site',
				siteDescription: 'A description of the test site',
				defaultSeo: {
					id: 1,
					metaTitle: 'Test Meta Title',
					metaDescription: 'Test Meta Description',
					shareImage: {
						url: '/share-image.png',
					},
				},
			},
			meta: {},
		});

		const result = await getGlobal('en');

		expect(result).toEqual({
			id: 1,
			siteName: 'Test Site',
			siteDescription: 'A description of the test site',
			defaultSeo: {
				id: 1,
				metaTitle: 'Test Meta Title',
				metaDescription: 'Test Meta Description',
				shareImage: {
					url: '/share-image.png',
				},
			},
		});
	});

	it('returns no shareImage when not provided', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 1,
				siteName: 'Test Site',
				siteDescription: 'A description of the test site',
				defaultSeo: {
					metaTitle: 'Test Meta Title',
					metaDescription: 'Test Meta Description',
					shareImage: null,
				},
			},
			meta: {},
		});

		const result = await getGlobal('en');

		expect(result).toEqual({
			id: 1,
			siteName: 'Test Site',
			siteDescription: 'A description of the test site',
			defaultSeo: {
				metaTitle: 'Test Meta Title',
				metaDescription: 'Test Meta Description',
				shareImage: null,
			},
		});
	});
});
