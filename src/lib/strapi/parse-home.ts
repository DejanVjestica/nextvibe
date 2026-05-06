import { parseHero } from './parse-hero';
import { Home } from './types';
import { ParsedHome } from './types/parsed-home';

export const parseHome = (raw: Home): ParsedHome => ({
	id: raw.id,
	hero: raw.hero ? parseHero(raw.hero) : null,
});
