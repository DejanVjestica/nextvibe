import { ParsedMediaType } from './parsed-media';
import { ParsedCtaButton } from './parsed-button';

export type ParsedHero = {
	eyebrow: string | null;
	title: string | null;
	subtitle: string | null;
	image: ParsedMediaType | null;
	variant: 'main' | 'minimal';
	primaryCta: ParsedCtaButton | null;
	secondaryCta: ParsedCtaButton | null;
};
