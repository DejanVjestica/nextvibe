import { StrapiImageFormat, StrapiImageFormats } from '@/lib/strapi/types/media';

export const createMockFormat = (overrides: Partial<StrapiImageFormat> = {}): StrapiImageFormat => ({
	name: 'mock-image.jpg',
	hash: 'mock_hash_123',
	ext: '.jpg',
	mime: 'image/jpeg',
	path: null,
	width: 1000,
	height: 1000,
	size: 50,
	sizeInBytes: 51200,
	url: '/uploads/mock-image.jpg',
	...overrides,
});

export const mockImageFormats: StrapiImageFormats = {
	thumbnail: createMockFormat({
		width: 245,
		height: 245,
		url: '/uploads/thumbnail_mock.jpg',
	}),
	small: createMockFormat({
		width: 500,
		height: 500,
		url: '/uploads/small_mock.jpg',
	}),
	medium: createMockFormat({
		width: 750,
		height: 750,
		url: '/uploads/medium_mock.jpg',
	}),
	large: createMockFormat({
		width: 1000,
		height: 1000,
		url: '/uploads/large_mock.jpg',
	}),
};
