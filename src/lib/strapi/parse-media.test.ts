import { strapiUrl } from '../config/strapi-url';
import { createMockMedia, mockImageFormats } from './mocks/image.mock';
import { parseMedia } from './parse-media';

describe('parseMedia', () => {
	it('should parse image/jpeg media correctly', () => {
		expect(parseMedia(createMockMedia())).toEqual({
			type: 'image',
			url: '/uploads/mock-image.jpg',
			width: 1000,
			height: 1000,
			alternativeText: 'mock alt',
			formats: mockImageFormats,
		});
	});

	it('should parse application/pdf media correctly', () => {
		expect(
			parseMedia(
				createMockMedia({ url: '/uploads/document.pdf', mime: 'application/pdf', name: 'document.pdf' }),
			),
		).toEqual({
			type: 'application',
			url: `${strapiUrl()}/uploads/document.pdf`,
			mime: 'application/pdf',
			name: 'document.pdf',
		});
	});

	it('should parse video/mp4 media correctly', () => {
		expect(
			parseMedia(createMockMedia({ url: '/uploads/video.mp4', alternativeText: 'A video', mime: 'video/mp4' })),
		).toEqual({
			type: 'video',
			url: `${strapiUrl()}/uploads/video.mp4`,
			alternativeText: 'A video',
			mime: 'video/mp4',
		});
	});

	it('should return null for unsupported media types', () => {
		expect(
			parseMedia(createMockMedia({ url: '/uploads/audio.mp3', mime: 'audio/mpeg', name: 'audio.mp3' })),
		).toBeNull();
	});
});
