import { ParsedMediaType } from '@/utils/parse-strapi-media';
import { StrapiImage } from '../StrapiImage';

interface MediaProps {
	media: ParsedMediaType;
}

export const Media = ({ media }: MediaProps) => {
	if (!media) return;
	const { type } = media;

	if (type === 'image') {
		return <StrapiImage image={media}></StrapiImage>;
	}

	if (type === 'video') {
		const { url, alternativeText, mime } = media;
		return (
			<video controls className="h-auto w-full rounded-lg" aria-label={alternativeText || ''}>
				<source src={url} type={mime} />
				Your browser does not support the video tag.
			</video>
		);
	}

	if (type === 'application') {
		const { url, name, mime } = media;
		return (
			<div className={`flex items-center gap-3 rounded-lg border p-4`}>
				<span className="text-2xl">📄</span>
				<div className="flex-1 overflow-hidden">
					<p className="truncate font-medium">{name}</p>
					<p className="text-xs uppercase">{mime?.split('/')[1]}</p>
				</div>
				<a
					href={url}
					download
					rel="noopener noreferrer"
					className="rounded bg-(--primary) px-4 py-2 text-sm text-(--second) transition hover:opacity-90"
				>
					Download
				</a>
			</div>
		);
	}

	return null;
};
