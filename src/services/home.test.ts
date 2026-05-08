import { fetchStrapi } from '@/lib/strapi/fetch';
import { getHome } from './home';

vi.mock('@/lib/strapi/fetch', () => ({
	fetchStrapi: vi.fn(),
}));

describe('getHome Service', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls fetchStrapi with the correct endpoint and locale', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 2,
				documentId: 'frqhnrreev16jmtxbakgts2b',
				createdAt: '2026-04-30T09:36:01.168Z',
				updatedAt: '2026-04-30T12:14:43.188Z',
				publishedAt: '2026-04-30T12:14:43.204Z',
				locale: 'en',
				hero: {
					eyebrow: null,
				},
			},
			meta: {},
		});

		await getHome('en');

		expect(fetchStrapi).toHaveBeenCalledWith('/home', {
			populate: {
				hero: {
					populate: {
						image: {
							populate: '*',
						},
						primaryCta: {
							populate: {
								icon: {
									populate: '*',
								},
							},
						},
						secondaryCta: {
							populate: {
								icon: {
									populate: '*',
								},
							},
						},
					},
				},
			},
			locale: 'en',
		});
	});

	it('returns parsed home data when content exists', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 9,
				documentId: 'frqhnrreev16jmtxbakgts2b',
				createdAt: '2026-04-30T09:36:01.168Z',
				updatedAt: '2026-04-30T12:14:43.188Z',
				publishedAt: '2026-04-30T12:14:43.204Z',
				locale: 'de',
				hero: {
					id: 9,
					eyebrow: null,
					title: 'Main page',
					subtitle: 'Lorem ipsum dolor',
					variant: 'main',
					image: null,
					primaryCta: {
						id: 16,
						label: 'asddsadsa',
						as: 'button',
						href: null,
						openInNewTab: false,
						kind: 'primary',
						ariaLabel: 'ddsadsads',
						size: 'large',
					},
					secondaryCta: {
						id: 17,
						label: 'Learn more',
						as: 'link',
						href: 'https://developer.mozilla.org/en-US/',
						openInNewTab: true,
						kind: 'secondary',
						ariaLabel: 'Learn more',
						size: 'large',
					},
				},
			},
			meta: {},
		});

		const result = await getHome('de');

		expect(result).toEqual({
			id: 9,
			hero: {
				eyebrow: null,
				title: 'Main page',
				subtitle: 'Lorem ipsum dolor',
				variant: 'main',
				imageLight: null,
				imageDark: null,
				primaryCta: {
					label: 'asddsadsa',
					ariaLabel: 'ddsadsads',
					as: 'button',
					kind: 'primary',
					size: 'large',
					icon: null,
				},
				secondaryCta: {
					label: 'Learn more',
					ariaLabel: 'Learn more',
					as: 'link',
					href: 'https://developer.mozilla.org/en-US/',
					openInNewTab: true,
					kind: 'secondary',
					size: 'large',
					icon: null,
				},
			},
		});
	});

	it('returns null when hero do not exist', async () => {
		vi.mocked(fetchStrapi).mockResolvedValue({
			data: {
				id: 2,
				documentId: 'frqhnrreev16jmtxbakgts2b',
				createdAt: '2026-04-30T09:36:01.168Z',
				updatedAt: '2026-04-30T12:14:43.188Z',
				publishedAt: '2026-04-30T12:14:43.204Z',
				locale: 'en',
				hero: null,
			},
			meta: {},
		});

		const result = await getHome('en');

		expect(result).toBeNull();
	});
});
