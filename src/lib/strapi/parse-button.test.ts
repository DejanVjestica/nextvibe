import { parseButton } from './parse-button';

describe('parseButton', () => {
	it('parse link button', () => {
		const result = parseButton({
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
				id: 8,
				documentId: 'natmtymicl8h40cvdk6hzsu5',
				name: 'MoveUpLeft',
				createdAt: '2026-04-30T09:34:13.473Z',
				updatedAt: '2026-04-30T09:34:13.473Z',
				publishedAt: '2026-04-30T09:34:13.477Z',
			},
		});

		expect(result).toEqual({
			label: 'Learn more',
			ariaLabel: 'Learn more',
			kind: 'secondary',
			size: 'large',
			icon: 'MoveUpLeft',
			as: 'link',
			href: 'https://developer.mozilla.org/en-US/',
			openInNewTab: true,
		});
	});

	it('parse regular button', () => {
		const result = parseButton({
			id: 17,
			__component: 'shared.button',
			label: 'Learn more',
			as: 'button',
			href: null,
			openInNewTab: true,
			kind: 'secondary',
			ariaLabel: 'Learn more',
			size: 'large',
			icon: {
				id: 8,
				documentId: 'natmtymicl8h40cvdk6hzsu5',
				name: 'MoveUpLeft',
				createdAt: '2026-04-30T09:34:13.473Z',
				updatedAt: '2026-04-30T09:34:13.473Z',
				publishedAt: '2026-04-30T09:34:13.477Z',
			},
		});

		expect(result).toEqual({
			label: 'Learn more',
			ariaLabel: 'Learn more',
			kind: 'secondary',
			size: 'large',
			icon: 'MoveUpLeft',
			as: 'button',
			href: null,
			openInNewTab: true,
		});
	});
});
