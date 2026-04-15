import { fetchStrapi } from '@/lib/strapi/fetch';
import { Article } from '@/lib/strapi/types';

vi.mock('@/lib/config/strapi-url', () => ({
	strapiUrl: vi.fn(() => 'http://localhost:1337'),
}));

describe('fetchStrapi', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should include query parameters in the URL', async () => {
		const mockResponse = {
			ok: true,
			json: async () => ({ data: [] }),
		} satisfies Partial<Response>;

		global.fetch = vi.fn().mockResolvedValue(mockResponse);

		await fetchStrapi<Article>('/articles', { locale: 'de' });

		expect(fetch).toHaveBeenCalledWith('http://localhost:1337/api/articles?locale=de', expect.any(Object));
	});

	it('should be able to handle empty query parameters', async () => {
		const mockResponse = {
			ok: true,
			json: async () => ({ data: [] }),
		} satisfies Partial<Response>;

		global.fetch = vi.fn().mockResolvedValue(mockResponse);

		await fetchStrapi<Article>('/articles', {});

		expect(fetch).toHaveBeenCalledWith('http://localhost:1337/api/articles', expect.any(Object));
	});

	it('should be able to handle no query parameters', async () => {
		const mockResponse = {
			ok: true,
			json: async () => ({ data: [] }),
		} satisfies Partial<Response>;

		global.fetch = vi.fn().mockResolvedValue(mockResponse);

		await fetchStrapi<Article>('/articles');

		expect(fetch).toHaveBeenCalledWith('http://localhost:1337/api/articles', expect.any(Object));
	});

	it('should return res.text() when response is not ok', async () => {
		const mockResponse = {
			ok: false,
			status: 404,
			text: async () => 'Not Found',
		} satisfies Partial<Response>;

		global.fetch = vi.fn().mockResolvedValue(mockResponse);

		await expect(fetchStrapi<Article>('/articles')).rejects.toThrow('Strapi request failed at /articles');
	});

	it('should return res.json() when response is ok', async () => {
		const mockData = { data: [{ id: 1, attributes: { title: 'Test Article' } }] };
		const mockResponse = {
			ok: true,
			json: async () => mockData,
		} satisfies Partial<Response>;

		global.fetch = vi.fn().mockResolvedValue(mockResponse);

		const result = await fetchStrapi<Article>('/articles');
		expect(result).toEqual(mockData);
	});

	it('should include Authorization header', async () => {
		const mockResponse = {
			ok: true,
			json: vi.fn().mockResolvedValue({ data: [] }),
		} satisfies Partial<Response>;

		global.fetch = vi.fn().mockResolvedValue(mockResponse);

		await fetchStrapi<Article>('/articles');

		expect(fetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				headers: expect.objectContaining({
					Authorization: expect.stringContaining('Bearer'),
				}),
			}),
		);
	});

	it('should correctly encode array query params', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue({ data: [] }),
		});

		await fetchStrapi<Article>('/articles', {
			filters: { tags: ['news', 'tech'] },
		});

		expect(fetch).toHaveBeenCalledWith(expect.stringContaining('filters'), expect.any(Object));
	});

	it('should include request URL in thrown error', async () => {
		global.fetch = vi.fn().mockRejectedValue(new Error('Network fail'));

		await expect(fetchStrapi<Article>('/articles')).rejects.toThrow('URL: http://localhost:1337/api/articles');
	});

	it('should include error message in thrown error', async () => {
		global.fetch = vi.fn().mockRejectedValue(new Error('Network fail'));
		await expect(fetchStrapi<Article>('/articles')).rejects.toThrow('Network fail');
	});
});
