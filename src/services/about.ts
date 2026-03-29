import { fetchStrapi } from "@/lib/fetchStrapi";
import { About } from "@/types/strapi";
import { ParsedBlockType, parseStrapiBlocks } from "@/utils/parseStrapiBlocks";

export type ParsedAbout = {
  id: number;
  title: string | null;
  blocks: ParsedBlockType[];
};

const populate = {
  blocks: { populate: "*" },
};

export const parseAbout = (raw: About): ParsedAbout => ({
  id: raw.id,
  title: raw.title ?? null,
  blocks: parseStrapiBlocks(raw.blocks),
});

export async function getAbout(locale: string): Promise<ParsedAbout | null> {
  const res = await fetchStrapi<About>("/about", {
    populate,
    locale,
  });

  const { title, blocks } = res.data;

  if (!res?.data && !title && !blocks?.length) return null;

  return parseAbout(res.data);
}
