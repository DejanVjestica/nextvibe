import { ComponentButton } from './types';
import { ParsedCtaButton } from './types/parsed-button';

export const parseButton = (raw: ComponentButton): ParsedCtaButton => {
	const base = {
		label: raw.label,
		ariaLabel: raw.ariaLabel,
		kind: raw.kind,
		size: raw.size,
		icon: raw.icon ? raw.icon.name : null,
	};

	if (raw.as === 'link') {
		return {
			...base,
			as: 'link',
			href: raw.href ?? '',
			openInNewTab: raw.openInNewTab,
		};
	}

	return {
		...base,
		as: 'button',
	};
};
