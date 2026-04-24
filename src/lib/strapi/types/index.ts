import { StrapiMedia } from '@/lib/strapi/types/media';
import {
	ApiArticleArticle,
	ApiAuthorAuthor,
	ApiCategoryCategory,
	ApiAboutAbout,
	ApiGlobalGlobal,
} from '@/lib/strapi/types/generated/contentTypes';

import {
	SharedMedia,
	SharedQuote,
	SharedRichText,
	SharedSlider,
	SharedSeo,
} from '@/lib/strapi/types/generated/components';

export type GetAttributes<T> = T extends { attributes: infer A } ? A : never;

export type StrapiItem<T> = {
	id: number;
	documentId: string;
} & GetAttributes<T>;

export type Component<T, C extends string> = GetAttributes<T> & {
	id: number;
	__component: C;
};

export type Article = StrapiItem<ApiArticleArticle>;
export type Author = StrapiItem<ApiAuthorAuthor>;
export type Category = StrapiItem<ApiCategoryCategory>;

export type Global = StrapiItem<ApiGlobalGlobal>;
export type About = Omit<StrapiItem<ApiAboutAbout>, 'blocks'> & {
	blocks: ContentBlocks[];
};

export type ComponentMedia = Omit<Component<SharedMedia, 'shared.media'>, 'file'> & {
	file: StrapiMedia;
};

export type ComponentQuote = Component<SharedQuote, 'shared.quote'>;
export type ComponentRichText = Component<SharedRichText, 'shared.rich-text'>;
export type ComponentSlider = Component<SharedSlider, 'shared.slider'>;
export type ComponentCeo = Component<SharedSeo, 'shared.ceo'>;

export type ContentBlocks = ComponentMedia | ComponentQuote | ComponentRichText | ComponentSlider;

export interface StrapiResponse<T> {
	data: T;
	meta: {
		pagination?: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
