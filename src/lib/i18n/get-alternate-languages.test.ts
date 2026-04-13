import { getAlternateLanguages } from '@/lib/i18n/get-alternate-languages';

vi.mock('@/lib/config/site-url', () => ({
	siteUrl: vi.fn(() => 'http://localhost:3000'),
}));

describe('i18n-utils', () => {
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
