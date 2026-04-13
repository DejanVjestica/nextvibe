import { getLocalizedPath, getAlternateLanguages } from './i18n-utils';

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

	describe('getAlternateLanguages', () => {
		it('should return the correct alternate languages object', () => {
			expect(getAlternateLanguages('about')).toEqual({
				en: 'http://localhost:3000/en/about',
				de: 'http://localhost:3000/about',
			});
		});

		it('should return the correct alternate languages object without slug', () => {
			expect(getAlternateLanguages()).toEqual({
				en: 'http://localhost:3000/en',
				de: 'http://localhost:3000',
			});
		});
	});
});
