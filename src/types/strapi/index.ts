import { StrapiMedia } from "@/types/strapi/media";
import { ApiArticleArticle, ApiAuthorAuthor, ApiCategoryCategory, ApiAboutAbout } from "@/types/strapi/generated/contentTypes";

import { SharedMedia, SharedQuote, SharedRichText, SharedSlider } from "./generated/components";

export type GetAttributes<T> = T extends { attributes: infer A } ? A : never;

export type StrapiItem<T> = {
  id: number;
  documentId: string;
} & GetAttributes<T>;

export type BlockItem<T, C extends string> = GetAttributes<T> & {
  id: number;
  __component: C;
};

export type Article = StrapiItem<ApiArticleArticle>;
export type Author = StrapiItem<ApiAuthorAuthor>;
export type Category = StrapiItem<ApiCategoryCategory>;
export type About = Omit<StrapiItem<ApiAboutAbout>, "blocks"> & {
  blocks: ContentBlock[];
};

export type ComponentMedia = Omit<BlockItem<SharedMedia, "shared.media">, "file"> & {
  file: StrapiMedia;
};

export type ComponentQuote = BlockItem<SharedQuote, "shared.quote">;
export type ComponentRichText = BlockItem<SharedRichText, "shared.rich-text">;
export type ComponentSlider = BlockItem<SharedSlider, "shared.slider">;

export type ContentBlock = ComponentMedia | ComponentQuote | ComponentRichText | ComponentSlider;

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
