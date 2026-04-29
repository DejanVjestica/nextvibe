import { parseGlobal } from './parse-global';
import { Global } from '@/lib/strapi/types';

describe('parseGlobal data', () => {
	it('should parse global data correctly', () => {
		const rawGlobal = {
			id: 1,
			siteName: 'My Site',
			siteDescription: 'A description of my site.',
			documentId: 'abc123',
			defaultSeo: {
				metaTitle: 'My Site - Home',
				metaDescription: 'Welcome to my site.',
				shareImage: {
					url: 'https://example.com/image.jpg',
					type: 'image',
					alternativeText: null,
					formats: {},
					height: 1000,
					width: 1000,
				},
			},
		} as Global;

		const expected = {
			id: 1,
			siteName: 'My Site',
			siteDescription: 'A description of my site.',
			defaultSeo: {
				metaTitle: 'My Site - Home',
				metaDescription: 'Welcome to my site.',
				shareImage: {
					url: 'https://example.com/image.jpg',
					type: 'image',
					alternativeText: null,
					formats: {},
					height: 1000,
					width: 1000,
				},
			},
		};

		expect(parseGlobal(rawGlobal)).toEqual(expected);
	});

	it('should handle missing defaultSeo shareImage', () => {
		const rawGlobal = {
			id: 1,
			siteName: 'My Site',
			siteDescription: 'A description of my site.',
			documentId: 'abc123',
			defaultSeo: {
				metaTitle: 'My Site - Home',
				metaDescription: 'Welcome to my site.',
				shareImage: null,
			},
		} as Global;

		const expected = {
			id: 1,
			siteName: 'My Site',
			siteDescription: 'A description of my site.',
			defaultSeo: {
				metaTitle: 'My Site - Home',
				metaDescription: 'Welcome to my site.',
				shareImage: null,
			},
		};

		expect(parseGlobal(rawGlobal)).toEqual(expected);
	});

	it('should handle missing defaultSeo', () => {
		const rawGlobal = {
			id: 1,
			siteName: 'My Site',
			siteDescription: 'A description of my site.',
			documentId: 'abc123',
			defaultSeo: null,
		} as Global;

		const expected = {
			id: 1,
			siteName: 'My Site',
			siteDescription: 'A description of my site.',
			defaultSeo: null,
		};

		expect(parseGlobal(rawGlobal)).toEqual(expected);
	});
});
