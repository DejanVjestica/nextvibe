import { fetchStrapi } from '@/lib/strapi/fetch';
import { StrapiResponse, Article } from '@/lib/strapi/types';

const populateArticle = {
	author: { populate: '*' },
	cover: { populate: '*' },
	category: { populate: '*' },
	blocks: { populate: '*' },
};

export const getArticles = async (locale: string): Promise<StrapiResponse<Article[]>> => {
	return fetchStrapi<Article[]>('/articles', {
		populate: populateArticle,
		locale,
		sort: ['createdAt:desc'],
	});
};
