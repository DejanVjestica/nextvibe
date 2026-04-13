import { ParsedBlockType } from '@/lib/strapi/parse-blocks';
import { Media } from '@/components/Media';
import { ParsedMediaType } from '@/lib/strapi/parse-media';
import { RichText } from '@/components/RichText';

interface BlockRendererProps {
	blocks: ParsedBlockType[];
}

export const BlockRenderer = ({ blocks }: BlockRendererProps) => {
	return (
		<>
			{blocks &&
				blocks.map((block: ParsedBlockType) => {
					switch (block.type) {
						case 'media':
							return <Media key={block.id} media={block.file as ParsedMediaType}></Media>;
						case 'rich-text':
							return <RichText key={block.id} body={block.body as string}></RichText>;
						default:
							return null;
					}
				})}
		</>
	);
};
