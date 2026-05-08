import { createMockMedia } from './mocks/image.mock';
import { createMockParsedImage } from './mocks/parsedImage.mock';
import { parseHero } from './parse-hero';
import { ComponentHero } from './types';
import { ParsedHero } from './types/parsed-hero';

const rawHero = {
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
} satisfies ComponentHero;

const parsedHero = {
	eyebrow: 'lorem ipsum 1',
	title: 'Main page',
	subtitle: 'Lorem ipsum dolor',
	variant: 'main',
	imageLight: null,
	imageDark: null,
	primaryCta: {
		ariaLabel: 'ddsadsads',
		as: 'button',
		kind: 'primary',
		label: 'asddsadsa',
		size: 'large',
		icon: 'MoveLeft',
	},
	secondaryCta: {
		ariaLabel: 'Learn more',
		as: 'link',
		href: 'https://developer.mozilla.org/en-US/',
		kind: 'secondary',
		label: 'Learn more',
		size: 'large',
		icon: 'MoveLeft',
		openInNewTab: true,
	},
} satisfies ParsedHero;

describe('parseHero', () => {
	it('should parse hero data correctly image null', () => {
		expect(parseHero(rawHero)).toEqual(parsedHero);
	});

	it('should parse hero data correctly with image', () => {
		expect(
			parseHero({
				...rawHero,
				imageLight: createMockMedia(),
				imageDark: createMockMedia(),
			}),
		).toEqual({ ...parsedHero, imageLight: createMockParsedImage(), imageDark: createMockParsedImage() });
	});

	it('should parse hero data correctly with no primaryCta', () => {
		expect(
			parseHero({
				...rawHero,
				primaryCta: null,
				imageLight: createMockMedia(),
				imageDark: createMockMedia(),
			}),
		).toEqual({
			...parsedHero,
			primaryCta: null,
			imageLight: createMockParsedImage(),
			imageDark: createMockParsedImage(),
		});
	});
	it('should parse hero data correctly with no buttons', () => {
		expect(
			parseHero({
				...rawHero,
				primaryCta: null,
				secondaryCta: null,
				imageLight: createMockMedia(),
				imageDark: createMockMedia(),
			}),
		).toEqual({
			...parsedHero,
			primaryCta: null,
			secondaryCta: null,
			imageLight: createMockParsedImage(),
			imageDark: createMockParsedImage(),
		});
	});
});
