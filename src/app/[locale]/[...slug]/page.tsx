export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <h1>Locale main: {slug}</h1>
    </div>
  );
}
