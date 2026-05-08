import { fetchStrapi } from '@/lib/strapi/fetch';
import { parseHome } from '@/lib/strapi/parse-home';
import { Home } from '@/lib/strapi/types';
import { ParsedHome } from '@/lib/strapi/types/parsed-home';

const populate = {
	hero: {
		populate: {
			imageLight: {
				populate: '*',
			},
			imageDark: {
				populate: '*',
			},
			primaryCta: {
				populate: {
					icon: {
						populate: '*',
					},
				},
			},
			secondaryCta: {
				populate: {
					icon: {
						populate: '*',
					},
				},
			},
		},
	},
};

export const getHome = async (locale: string): Promise<ParsedHome | null> => {
	const res = await fetchStrapi<Home>('/home', {
		populate,
		locale,
	});

	const { id, hero } = parseHome(res.data);

	if (!hero) return null;

	return {
		id,
		hero,
	};
};
