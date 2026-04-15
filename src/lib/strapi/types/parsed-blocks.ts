import { ParsedMediaType } from '@/lib/strapi/types/parsed-media';

export type ParsedBlockMedia = {
	type: 'media';
	id: number;
	file: ParsedMediaType | null;
};

export type ParsedBlockQuote = {
	type: 'quote';
	id: number;
	title: string | null;
	body: string | null;
};

export type ParsedBlockSlider = {
	type: 'slider';
	id: number;
	files: ParsedMediaType[] | null;
};

export type ParsedBlockRichtext = {
	type: 'rich-text';
	id: number;
	body: string | null;
};

export type ParsedBlockType = ParsedBlockMedia | ParsedBlockQuote | ParsedBlockSlider | ParsedBlockRichtext;
