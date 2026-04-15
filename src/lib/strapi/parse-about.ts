import { parseBlocks } from './parse-blocks';
import { About } from './types';
import { ParsedAbout } from './types/parsed-about';

export const parseAbout = (raw: About): ParsedAbout => ({
	id: raw.id,
	title: raw.title ?? null,
	blocks: parseBlocks(raw.blocks).length > 0 ? parseBlocks(raw.blocks) : null,
});
