import { ComponentPropsWithoutRef } from 'react';
import ReactMarkdown, { ExtraProps } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface RichTextProps {
	body: string;
}

type ImageComponentProps = ComponentPropsWithoutRef<'img'> & ExtraProps;

const ImageComponent = ({ src, alt, width, height, className }: ImageComponentProps) => {
	const srcString = typeof src === 'string' && src;
	const altString = typeof alt === 'string' ? alt : '';
	const widthNumber = typeof width === 'number' ? width : 1000;
	const heightNumber = typeof height === 'number' ? height : 1000;

	return (
		<Image
			src={`${srcString}`}
			width={widthNumber}
			height={heightNumber}
			alt={altString}
			sizes="(max-width: 768px) 100vw, 800px"
			className={`${className} border-border mx-auto my-10 h-auto max-w-full rounded-2xl border shadow-md`}
		/>
	);
};

export const RichText = ({ body }: RichTextProps) => {
	return (
		<div className="rich-text-body">
			<ReactMarkdown
				components={{
					h1: ({ ...props }) => (
						<h1 className="text-primary mt-12 mb-8 text-[3rem] font-bold tracking-tight" {...props} />
					),
					h2: ({ ...props }) => (
						<h2
							className="border-border mt-10 mb-6 border-b pb-2 text-[2.25rem] font-semibold tracking-tight"
							{...props}
						/>
					),
					h3: ({ ...props }) => (
						<h3 className="text-foreground/90 mt-8 mb-4 text-[1.75rem] font-medium" {...props} />
					),

					p: ({ ...props }) => <p className="mb-6 text-[1.125rem] leading-relaxed" {...props} />,
					a: ({ ...props }) => (
						<a
							className="text-primary decoration-primary/30 hover:decoration-primary underline underline-offset-4 transition-all"
							{...props}
						/>
					),

					ul: ({ ...props }) => <ul className="mb-6 space-y-3 pl-0" {...props} />,
					ol: ({ ...props }) => (
						<ol
							className="marker:text-primary mb-6 list-decimal space-y-3 pl-8 marker:font-bold"
							{...props}
						/>
					),
					li: ({ ...props }) => (
						<li
							className="before:text-secondary relative pl-7 before:absolute before:left-0 before:font-bold before:content-['→']"
							{...props}
						/>
					),

					blockquote: ({ ...props }) => (
						<blockquote
							className="bg-second border-secondary my-10 rounded-r-lg border-l-4 py-2 pr-4 pl-6 text-lg italic"
							{...props}
						/>
					),
					hr: () => (
						<hr className="via-border my-12 h-px border-0 bg-linear-to-r from-transparent to-transparent" />
					),

					code: ({ children, ...props }) => {
						const isBlock = String(children).includes('\n');
						return isBlock ? (
							<pre className="my-8 overflow-x-auto rounded-xl border border-(--border) bg-(--second) p-6 shadow-sm">
								<code className="font-mono text-sm" {...props}>
									{children}
								</code>
							</pre>
						) : (
							<code
								className="rounded-md border border-(--border) bg-(--second) px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--danger)]"
								{...props}
							>
								{children}
							</code>
						);
					},

					img: ImageComponent,
				}}
				remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
				rehypePlugins={[rehypeRaw]}
			>
				{body}
			</ReactMarkdown>
		</div>
	);
};
