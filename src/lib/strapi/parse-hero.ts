import { parseButton } from './parse-button';
import { parseMedia } from './parse-media';
import { ComponentHero } from './types';
import { ParsedHero } from './types/parsed-hero';

export const parseHero = (raw: ComponentHero): ParsedHero => ({
	eyebrow: raw.eyebrow,
	subtitle: raw.subtitle,
	title: raw.title,
	variant: raw.variant,
	image: raw.image ? parseMedia(raw.image) : null,
	primaryCta: raw.primaryCta ? parseButton(raw.primaryCta) : null,
	secondaryCta: raw.secondaryCta ? parseButton(raw.secondaryCta) : null,
});
