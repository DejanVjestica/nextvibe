import { Schema } from "@strapi/types";
import {
  ApiArticleArticle,
  ApiAuthorAuthor,
  ApiCategoryCategory,
} from "./generated/contentTypes";

export type GetAttributes<T> = T extends { attributes: infer A } ? A : never;

export type StrapiItem<T> = {
  id: number;
  documentId: string;
} & GetAttributes<T>;

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

export type Article = StrapiItem<ApiArticleArticle>;
export type Author = StrapiItem<ApiAuthorAuthor>;
export type Category = StrapiItem<ApiCategoryCategory>;
