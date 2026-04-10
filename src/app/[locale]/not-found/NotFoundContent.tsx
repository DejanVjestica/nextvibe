'use client';
import { usePathname } from 'next/navigation';

const i18n = {
	en: {
		title: 'Page Not Found',
		description: 'Sorry, the content you are looking for does not exist.',
	},
	de: {
		title: 'Seite nicht gefunden',
		description: 'Entschuldigung, der gesuchte Inhalt existiert nicht.',
	},
};

export const NotFoundContent = () => {
	const pathname = usePathname();
	const locale = pathname?.startsWith('/en') ? 'en' : 'de';

	return (
		<>
			<h2 className="text-2xl font-bold">{i18n[locale].title}</h2>
			<p className="mt-4 text-gray-600">{i18n[locale].description}</p>
		</>
	);
};
