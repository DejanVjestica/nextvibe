import { ParsedMediaType } from './parsed-media';
import { ParsedCtaButton } from './parsed-button';

export type ParsedHero = {
	eyebrow: string | null;
	title: string | null;
	subtitle: string | null;
	imageLight: ParsedMediaType | null;
	imageDark: ParsedMediaType | null;
	variant: 'main' | 'minimal';
	primaryCta: ParsedCtaButton | null;
	secondaryCta: ParsedCtaButton | null;
};
