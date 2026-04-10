export default async function Home({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return (
		<div className="max-w-container mx-auto p-8">
			<h1>page slug: {slug}</h1>
		</div>
	);
}
