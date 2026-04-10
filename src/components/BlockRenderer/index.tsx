'use client';

import { ParsedBlockType } from '@/utils/parse-strapi-blocks';
import { Media } from '../Media';
import { ParsedMediaType } from '@/utils/parse-strapi-media';
import { RichText } from '../RichText';

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
