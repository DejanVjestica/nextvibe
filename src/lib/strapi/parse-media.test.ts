import { strapiUrl } from '../config/strapi-url';
import { mockImageFormats } from './mocks/image.mock';
import { parseMedia } from './parse-media';
import { StrapiMedia } from './types/media';

describe('parseMedia', () => {
	it('should parse image/jpeg media correctly', () => {
		const media = {
			url: '/uploads/image.jpg',
			width: 800,
			height: 600,
			alternativeText: 'An image',
			mime: 'image/jpeg',
			name: 'image.jpg',
			formats: mockImageFormats,
		} as StrapiMedia;

		const parsed = parseMedia(media);

		expect(parsed).toEqual({
			type: 'image',
			url: '/uploads/image.jpg',
			width: 800,
			height: 600,
			alternativeText: 'An image',
			formats: mockImageFormats,
		});
	});

	it('should parse application/pdf media correctly', () => {
		const media = {
			url: '/uploads/document.pdf',
			mime: 'application/pdf',
			name: 'document.pdf',
		} as StrapiMedia;

		const parsed = parseMedia(media);

		expect(parsed).toEqual({
			type: 'application',
			url: `${strapiUrl()}/uploads/document.pdf`,
			mime: 'application/pdf',
			name: 'document.pdf',
		});
	});

	it('should parse video/mp4 media correctly', () => {
		const media = {
			url: '/uploads/video.mp4',
			alternativeText: 'A video',
			mime: 'video/mp4',
		} as StrapiMedia;

		const parsed = parseMedia(media);

		expect(parsed).toEqual({
			type: 'video',
			url: `${strapiUrl()}/uploads/video.mp4`,
			alternativeText: 'A video',
			mime: 'video/mp4',
		});
	});

	it('should return null for unsupported media types', () => {
		const media = {
			url: '/uploads/audio.mp3',
			mime: 'audio/mpeg',
			name: 'audio.mp3',
		} as StrapiMedia;

		const parsed = parseMedia(media);

		expect(parsed).toBeNull();
	});
});
