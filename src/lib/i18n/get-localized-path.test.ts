import { getLocalizedPath } from '@/lib/i18n/get-localized-path';

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
