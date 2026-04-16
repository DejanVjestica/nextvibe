import { trimTrailingSlash } from './trim-trailing-slash';

describe('trimTrailingSlash', () => {
	it('removes a single trailing slash from the end of a string', () => {
		expect(trimTrailingSlash('https://example.com/')).toBe('https://example.com');
	});

	it('does not modify a string that does not have a trailing slash', () => {
		expect(trimTrailingSlash('https://example.com')).toBe('https://example.com');
	});

	it('removes all trailing slashes if there are multiple', () => {
		expect(trimTrailingSlash('https://example.com///')).toBe('https://example.com');
	});

	it('returns an empty string if the input is empty string', () => {
		expect(trimTrailingSlash('')).toBe('');
	});
});
