import { fetchStrapi } from "@/lib/fetchStrapi";
import { StrapiResponse, Article } from "@/types/strapi";

const populateArticle = {
  author: { populate: "*" },
  cover: { populate: "*" },
  category: { populate: "*" },
  blocks: { populate: "*" },
};

export async function getArticles(
  locale: string,
): Promise<StrapiResponse<Article[]>> {
  return fetchStrapi<Article[]>("/articles", {
    populate: populateArticle,
    locale,
    sort: ["createdAt:desc"],
  });
}
