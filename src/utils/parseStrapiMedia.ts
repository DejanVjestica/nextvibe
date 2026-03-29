import { StrapiMedia, StrapiImageFormats } from "@/types/strapi/media";

type ParsedMediaImage = {
  alternativeText: string | "";
  formats: StrapiImageFormats;
  height: number;
  type: "image";
  url: string;
  width: number;
};

type ParsedMediaApplication = {
  mime: string;
  name: string;
  type: "application";
  url: string;
};

type ParsedMediaVideo = {
  alternativeText: string | "";
  mime: string;
  type: "video";
  url: string;
};

export type ParsedMediaType = ParsedMediaImage | ParsedMediaApplication | ParsedMediaVideo;

export const parseStrapiMedia = (media: StrapiMedia): ParsedMediaType | null => {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const { url, width, height, alternativeText, mime, name, formats } = media;
  const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

  switch (mime.split("/").shift()) {
    case "image":
      return {
        alternativeText,
        formats,
        height,
        type: "image",
        url,
        width,
      } as ParsedMediaImage;
    case "application":
      return {
        mime,
        name,
        type: "application",
        url: fullUrl,
      } as ParsedMediaApplication;
    case "video":
      return {
        alternativeText,
        mime,
        type: "video",
        url: fullUrl,
      } as ParsedMediaVideo;
    default:
      return null;
  }
};
