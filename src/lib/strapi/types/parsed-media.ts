import { StrapiImageFormats } from '@/lib/strapi/types/media';

export type ParsedMediaImage = {
	alternativeText: string | null;
	formats: StrapiImageFormats;
	height: number;
	type: 'image';
	url: string;
	width: number;
};

export type ParsedMediaApplication = {
	mime: string;
	name: string;
	type: 'application';
	url: string;
};

export type ParsedMediaVideo = {
	alternativeText: string | null;
	mime: string;
	type: 'video';
	url: string;
};

export type ParsedMediaType = ParsedMediaImage | ParsedMediaApplication | ParsedMediaVideo;
