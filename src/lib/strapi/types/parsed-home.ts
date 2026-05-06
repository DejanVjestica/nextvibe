import { ParsedHero } from './parsed-hero';

export type ParsedHome = {
	id: number;
	hero: ParsedHero | null;
};
