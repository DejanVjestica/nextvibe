import { ParsedMediaImage } from '@/lib/strapi/parse-media';
import Image from 'next/image';

interface StrapiImageProps {
	image: ParsedMediaImage;
}

export const StrapiImage = ({ image }: StrapiImageProps) => {
	if (!image) return;

	const { url, alternativeText, width, height } = image;
	return (
		<Image
			src={url}
			alt={alternativeText}
			width={width}
			height={height}
			quality={75}
			sizes="(max-width: 768px) 100vw, 800px"
		/>
	);
};
