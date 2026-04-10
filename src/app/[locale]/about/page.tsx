import { BlockRenderer } from '@/components/BlockRenderer';
import { Locale } from '@/i18n-config';
import { getAbout } from '@/services/about';
import { notFound } from 'next/navigation';

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await params;
	const about = await getAbout(locale);

	if (!about) notFound();

	const { title, blocks } = about;
	return (
		<div className="max-w-container mx-auto flex flex-col gap-6 p-8">
			{title && <h1>{title}</h1>}
			{blocks && <BlockRenderer blocks={blocks}></BlockRenderer>}
		</div>
	);
}
