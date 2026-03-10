import qs from "qs";
import { StrapiResponse } from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export function getStrapiURL(path: string = "") {
  const baseUrl = STRAPI_URL?.replace(/\/$/, "") || "http://127.0.0.1:1337";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

export async function fetchStrapi<T>(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: RequestInit = {},
): Promise<StrapiResponse<T>> {
  const mergedOptions: RequestInit = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      ...(options.headers || {}),
    },
    next: {
      revalidate: 60,
      ...(options as RequestInit).next,
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
    arrayFormat: "brackets",
  });

  const requestUrl = getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`,
  );

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

    console.error("Fetch API Error:", errorMessage);
    throw new Error(`${errorMessage} (URL: ${requestUrl})`);
  }
}
