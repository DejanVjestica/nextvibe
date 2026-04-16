import { strapiUrl } from './strapi-url';

vi.mock('@/utils/trim-trailing-slash', () => ({
	trimTrailingSlash: (url: string) => url.replace(/\/+$/, ''),
}));

describe('strapiUrl', () => {
	const originalEnv = { ...process.env };

	beforeEach(() => {
		vi.clearAllMocks();
		process.env = { ...originalEnv };
	});

	it('returns the Strapi URL without a trailing slash', () => {
		process.env.NEXT_PUBLIC_STRAPI_URL = 'https://example.com/';
		expect(strapiUrl()).toBe('https://example.com');
	});

	it('returns the Strapi URL without a trailing slash when there are multiple slashes', () => {
		process.env.NEXT_PUBLIC_STRAPI_URL = 'https://example.com///';
		expect(strapiUrl()).toBe('https://example.com');
	});

	it('returns the site URL as is when there is no trailing slash', () => {
		process.env.NEXT_PUBLIC_STRAPI_URL = 'https://example.com';
		expect(strapiUrl()).toBe('https://example.com');
	});

	it('returns localhost URL in development when NEXT_PUBLIC_STRAPI_URL is not set', () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'development',
		};
		expect(strapiUrl()).toBe(`http://localhost:1337`);
	});

	it('returns undefined in production when NEXT_PUBLIC_STRAPI_URL is not set', () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'production',
		};

		expect(() => strapiUrl()).toThrow('NEXT_PUBLIC_STRAPI_URL is not set in production environment');
	});
});
