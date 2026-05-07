export interface StrapiImageFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
}

export interface StrapiImageFormats {
	thumbnail?: StrapiImageFormat;
	small?: StrapiImageFormat;
	medium?: StrapiImageFormat;
	large?: StrapiImageFormat;
}

export interface StrapiMedia {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: StrapiImageFormats;
	focalPoint: unknown | null;
	provider_metadata: unknown | null;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}
