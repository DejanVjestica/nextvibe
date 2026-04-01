import { fetchStrapi } from '@/lib/fetch-strapi';
import { StrapiResponse, Article } from '@/types/strapi';

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
