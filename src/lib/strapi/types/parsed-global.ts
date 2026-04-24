import { ComponentCeo } from '@/lib/strapi/types';

export type ParsedGlobal = {
	id: number;
	siteName: string;
	siteDescription: string;
	defaultSeo: ComponentCeo | null;
};
