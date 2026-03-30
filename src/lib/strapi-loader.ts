import { ImageLoader, ImageLoaderProps } from "next/image";

const strapiLoader: ImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!STRAPI_URL) throw new Error("NEXT_PUBLIC_STRAPI_MEDIA_URL is not defined");

  const path = src.startsWith("http") ? new URL(src).pathname : src;
  const prefix = imagePrefix(width);

  const srcParts = path.split("/");
  const filename = srcParts.pop();
  const directory = srcParts.join("/");

  const finalPath = prefix ? `${directory}/${prefix}_${filename}?w=${width}&q=${quality || 75}` : path;
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
