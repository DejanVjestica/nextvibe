import { ParsedBlockType } from '@/lib/strapi/types/parsed-blocks';

export type ParsedAbout = {
	id: number;
	title: string | null;
	blocks: ParsedBlockType[] | null;
};
