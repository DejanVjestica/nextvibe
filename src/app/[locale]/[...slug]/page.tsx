import { Locale } from "@/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ slug: Locale }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <h1>Locale main: {slug}</h1>
    </div>
  );
}
