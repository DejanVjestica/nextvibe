type ParsedButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ParsedButtonSize = 'small' | 'medium' | 'large';

type BaseButton = {
	label: string;
	ariaLabel: string | null;
	kind: ParsedButtonVariant;
	size: ParsedButtonSize;
	icon: string | null;
};

type ParsedLinkButton = BaseButton & {
	as: 'link';
	href: string;
	openInNewTab: boolean;
};

type ParsedButton = BaseButton & {
	as: 'button';
};

export type ParsedCtaButton = ParsedLinkButton | ParsedButton;
