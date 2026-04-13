import { Metadata } from 'next';
import { getAlternateLanguages } from '@/lib/i18n/get-alternate-languages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const localizedUrl = getAlternateLanguages('about')[locale];

	return {
		title: locale === 'de' ? 'NextVibe - Über uns' : 'NextVibe - About',
		description: `${locale === 'de' ? 'Über NextVibe: Erfahren Sie mehr über unsere Mission und unser Team.' : 'About page for NextVibe, learn more about our mission and team.'}`,
		alternates: {
			canonical: localizedUrl,
			languages: {
				...getAlternateLanguages('about'),
				'x-default': localizedUrl,
			},
		},
	};
}

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
