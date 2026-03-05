import { Schema } from '@strapi/types';
import { 
  ApiArticleArticle, 
  ApiAuthorAuthor, 
  ApiCategoryCategory 
} from './generated/contentTypes';

export type GetAttributes<T> = T extends { attributes: infer A } ? A : never;

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

export type Article = ApiArticleArticle;

export type ArticleFields = GetAttributes<ApiArticleArticle>;

export type Author = ApiAuthorAuthor;
export type AuthorFields = GetAttributes<ApiAuthorAuthor>;

export type Category = ApiCategoryCategory;
export type CategoryFields = GetAttributes<ApiCategoryCategory>;