import { strapiMediaUrl } from './strapi-media-url';

vi.mock('@/utils/trim-trailing-slash', () => ({
	trimTrailingSlash: (url: string) => url.replace(/\/+$/, ''),
}));

describe('strapiMediaUrl', () => {
	const originalEnv = { ...process.env };

	beforeEach(() => {
		vi.clearAllMocks();
		process.env = { ...originalEnv };
	});

	it('returns the NEXT_PUBLIC_STRAPI_MEDIA_URL without a trailing slash', () => {
		process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL = 'https://example.com/media/';
		expect(strapiMediaUrl()).toBe('https://example.com/media');
	});

	it('returns the NEXT_PUBLIC_STRAPI_MEDIA_URL without a trailing slash when there are multiple slashes', () => {
		process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL = 'https://example.com/media///';
		expect(strapiMediaUrl()).toBe('https://example.com/media');
	});

	it('returns the NEXT_PUBLIC_STRAPI_MEDIA_URL as is when there is no trailing slash', () => {
		process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL = 'https://example.com/media';
		expect(strapiMediaUrl()).toBe('https://example.com/media');
	});

	it('returns localhost URL in development when NEXT_PUBLIC_STRAPI_MEDIA_URL is not set', () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'development',
		};
		expect(strapiMediaUrl()).toBe(`http://localhost:1337`);
	});

	it('throws error in production when NEXT_PUBLIC_STRAPI_MEDIA_URL is not set', () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'production',
		};

		expect(() => strapiMediaUrl()).toThrow('NEXT_PUBLIC_STRAPI_MEDIA_URL is not set in production environment');
	});
});
