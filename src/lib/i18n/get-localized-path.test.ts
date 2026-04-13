import { getLocalizedPath } from './get-localized-path';

vi.mock('./config/site-url', () => ({
	siteUrl: vi.fn(() => 'http://localhost:3000'),
}));

describe('i18n-utils', () => {
	describe('getLocalizedPath', () => {
		it('should return the path without prefix de', () => {
			expect(getLocalizedPath('/en/about', 'de')).toBe('/about');
		});

		it('should return the path with prefix en', () => {
			expect(getLocalizedPath('/about', 'en')).toBe('/en/about');
		});
	});
});
