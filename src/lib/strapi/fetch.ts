import qs from 'qs';
import { StrapiResponse } from '@/types/strapi';
import { strapiUrl } from '@/lib/config/strapi-url';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export const fetchStrapi = async <T>(
	path: string,
	query: Record<string, unknown> = {},
	options: RequestInit = {},
): Promise<StrapiResponse<T>> => {
	const { headers, next, ...restOptions } = options;

	const mergedOptions: RequestInit = {
		...restOptions,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...headers,
			Authorization: `Bearer ${STRAPI_TOKEN}`,
		},
		next: {
			revalidate: 3600,
			...next,
		},
	};

	const queryString = qs.stringify(query, {
		encodeValuesOnly: true,
		arrayFormat: 'brackets',
	});

	const requestUrl = `${strapiUrl()}/api${path}${queryString ? `?${queryString}` : ''}`;

	try {
		const response = await fetch(requestUrl, mergedOptions);

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`[Strapi Error] ${response.status}: ${errorText}`);
			throw new Error(`Strapi request failed at ${path}`);
		}

		return await response.json();
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);

		console.error('Fetch API Error:', errorMessage);
		throw new Error(`${errorMessage} (URL: ${requestUrl})`);
	}
};
