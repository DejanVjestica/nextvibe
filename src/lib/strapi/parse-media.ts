import { strapiUrl } from '@/lib/config/strapi-url';
import { StrapiMedia } from '@/lib/strapi/types/media';
import { ParsedMediaImage, ParsedMediaApplication, ParsedMediaType, ParsedMediaVideo } from './types/parsed-media';

export const parseMedia = (media: StrapiMedia): ParsedMediaType | null => {
	const { url, width, height, alternativeText, mime, name, formats } = media;
	const fullUrl = url.startsWith('http') ? url : `${strapiUrl()}${url}`;

	switch (mime.split('/').shift()) {
		case 'image':
			return {
				alternativeText,
				formats,
				height,
				type: 'image',
				url,
				width,
			} satisfies ParsedMediaImage;
		case 'application':
			return {
				mime,
				name,
				type: 'application',
				url: fullUrl,
			} satisfies ParsedMediaApplication;
		case 'video':
			return {
				alternativeText,
				mime,
				type: 'video',
				url: fullUrl,
			} satisfies ParsedMediaVideo;
		default:
			return null;
	}
};
