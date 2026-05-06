import { ComponentButton } from './types';
import { ParsedCtaButton } from './types/parsed-button';

export const parseButton = (raw: ComponentButton): ParsedCtaButton => ({
	label: raw.label,
	ariaLabel: raw.ariaLabel,
	kind: raw.kind,
	size: raw.size,
	icon: raw.icon ? raw.icon.name : null,
	as: raw.as,
	href: raw.href,
	openInNewTab: raw.openInNewTab,
});
