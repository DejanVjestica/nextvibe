import { fetchStrapi } from "@/lib/fetchStrapi";
import { StrapiResponse, About } from "@/types/strapi";

const populate = {
  blocks: { populate: "*" },
};

export async function getAbout(locale: string): Promise<StrapiResponse<About> | null> {
  const res = await fetchStrapi<About>("/about", {
    populate,
    locale,
  });

  const about = res?.data ?? null;

  if (!about || !about.title) {
    return null;
  }

  return res;
}
