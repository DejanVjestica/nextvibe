'use client';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

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
	const currentLocale = useCurrentLocale();

	return (
		<>
			<h2 className="text-2xl font-bold">{i18n[currentLocale].title}</h2>
			<p className="mt-4 text-gray-600">{i18n[currentLocale].description}</p>
		</>
	);
};
