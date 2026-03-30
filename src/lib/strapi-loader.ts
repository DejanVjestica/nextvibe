import { ImageLoader, ImageLoaderProps } from "next/image";

const strapiLoader: ImageLoader = ({ src, width }: ImageLoaderProps) => {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL;
  if (!STRAPI_URL) throw new Error("NEXT_PUBLIC_STRAPI_MEDIA_URL is not defined");

  if (src.startsWith("http")) return src;

  const prefix = imagePrefix(width);

  const srcParts = src.split("/");
  const filename = srcParts.pop();
  const directory = srcParts.join("/");

  const finalPath = prefix ? `${directory}/${prefix}_${filename}` : src;
  return `${STRAPI_URL}${finalPath}`;
};

const imagePrefix = (width: number): string | null => {
  if (width <= 245) return "thumbnail";
  if (width <= 500) return "small";
  if (width <= 750) return "medium";
  if (width <= 1000) return "large";
  return null;
};

export default strapiLoader;
