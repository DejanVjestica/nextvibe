import { Locale } from "@/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ slug: Locale }>;
}) {
  const { slug } = await params;
  return (
    <div className="max-w-container mx-auto ">
      <h1>Locale main: {slug}</h1>
    </div>
  );
}
