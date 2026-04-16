import { ImageLoader, ImageLoaderProps } from 'next/image';
import { strapiMediaUrl } from '@/lib/config/strapi-media-url';

const strapiLoader: ImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	const path = src.startsWith('http') ? new URL(src).pathname : src;
	const prefix = imagePrefix(width);

	const srcParts = path.split('/');
	const filename = srcParts.pop();
	const directory = srcParts.join('/');

	const finalPath = prefix ? `${directory}/${prefix}_${filename}?w=${width}&q=${quality || 75}` : path;
	return `${strapiMediaUrl()}${finalPath}`;
};

const imagePrefix = (width: number): string | null => {
	if (width <= 245) return 'thumbnail';
	if (width <= 500) return 'small';
	if (width <= 750) return 'medium';
	if (width <= 1000) return 'large';
	return null;
};

export default strapiLoader;
