import { parseHome } from './parse-home';
import { Home } from './types';
import { ParsedHome } from './types/parsed-home';

describe('parseHome', () => {
	it('should parse about data correctly', () => {
		const raw = {
			id: 9,
			documentId: 'frqhnrreev16jmtxbakgts2b',
			createdAt: '2026-04-30T09:36:01.168Z',
			updatedAt: '2026-04-30T12:14:43.188Z',
			publishedAt: '2026-04-30T12:14:43.204Z',
			locale: 'de',
			createdBy: null,
			updatedBy: null,
			localizations: {
				data: [],
				meta: {
					pagination: {
						page: 1,
						pageSize: 25,
						pageCount: 0,
						total: 0,
					},
				},
			},

			hero: {
				id: 9,
				__component: 'shared.hero',
				eyebrow: 'lorem ipsum 1',
				title: 'Main page',
				subtitle: 'Lorem ipsum dolor',
				variant: 'main',
				imageLight: null,
				imageDark: null,

				primaryCta: {
					id: 18,
					__component: 'shared.button',
					ariaLabel: 'ddsadsads',
					as: 'button',
					href: null,
					icon: {
						id: 4,
						documentId: 'z7y7ronn5twbw1vbi13v8pzq',
						name: 'MoveLeft',
						createdAt: '2026-04-30T09:33:36.390Z',
						publishedAt: '2026-04-30T09:33:36.395Z',
						updatedAt: '2026-04-30T09:33:36.390Z',
					},
					kind: 'primary',
					label: 'asddsadsa',
					openInNewTab: false,
					size: 'large',
				},
				secondaryCta: {
					id: 17,
					__component: 'shared.button',
					label: 'Learn more',
					as: 'link',
					href: 'https://developer.mozilla.org/en-US/',
					openInNewTab: true,
					kind: 'secondary',
					ariaLabel: 'Learn more',
					size: 'large',
					icon: {
						id: 4,
						documentId: 'z7y7ronn5twbw1vbi13v8pzq',
						name: 'MoveLeft',
						createdAt: '2026-04-30T09:33:36.390Z',
						publishedAt: '2026-04-30T09:33:36.395Z',
						updatedAt: '2026-04-30T09:33:36.390Z',
					},
				},
			},
		} satisfies Home;

		const expected = {
			id: 9,
			hero: {
				eyebrow: 'lorem ipsum 1',
				title: 'Main page',
				subtitle: 'Lorem ipsum dolor',
				variant: 'main',
				imageLight: null,
				imageDark: null,
				primaryCta: {
					ariaLabel: 'ddsadsads',
					as: 'button',
					icon: 'MoveLeft',
					kind: 'primary',
					label: 'asddsadsa',
					size: 'large',
				},
				secondaryCta: {
					ariaLabel: 'Learn more',
					as: 'link',
					href: 'https://developer.mozilla.org/en-US/',
					icon: 'MoveLeft',
					kind: 'secondary',
					label: 'Learn more',
					openInNewTab: true,
					size: 'large',
				},
			},
		} satisfies ParsedHome;

		expect(parseHome(raw)).toEqual(expected);
	});
});
