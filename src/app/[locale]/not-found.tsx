import { NotFoundContent } from '@/app/[locale]/not-found/NotFoundContent';

export default async function NotFound() {
	return (
		<div className="flex flex-col items-center py-20 text-center">
			<NotFoundContent></NotFoundContent>
		</div>
	);
}
