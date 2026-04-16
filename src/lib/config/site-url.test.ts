import { siteUrl } from './site-url';

vi.mock('@/utils/trim-trailing-slash', () => ({
	trimTrailingSlash: (url: string) => url.replace(/\/+$/, ''),
}));

describe('siteUrl', () => {
	const originalEnv = { ...process.env };

	beforeEach(() => {
		vi.clearAllMocks();
		process.env = { ...originalEnv };
	});

	it('returns the site URL without a trailing slash', () => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com/';
		expect(siteUrl()).toBe('https://example.com');
	});

	it('returns the site URL without a trailing slash when there are multiple slashes', () => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com///';
		expect(siteUrl()).toBe('https://example.com');
	});

	it('returns the site URL as is when there is no trailing slash', () => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
		expect(siteUrl()).toBe('https://example.com');
	});

	it('returns localhost URL in development when NEXT_PUBLIC_SITE_URL is not set', () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'development',
			PORT: '3000',
		};
		expect(siteUrl()).toBe(`http://localhost:3000`);
	});

	it('returns undefined in production when NEXT_PUBLIC_SITE_URL is not set', () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'production',
		};

		expect(siteUrl()).toBeUndefined();
	});
});
