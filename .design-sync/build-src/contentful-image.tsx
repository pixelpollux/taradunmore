// Shim for lib/contentful-image.tsx, used ONLY by design-sync's Avatar/CoverImage
// shims (see .design-sync/NOTES.md "next/image incompatible with standalone bundle").
// The real component wraps next/image with a custom loader that already bypasses
// Next's own optimization API — next/image itself is what's incompatible with a
// standalone browser bundle (its client code reads process.env.* at module-init
// time; `process` doesn't exist outside a webpack/Next build). This shim keeps the
// exact same loader URL logic and prop contract, rendering a plain <img> instead.
// Loses next/image's automatic responsive srcset/lazy-observer — acceptable for a
// synced design system; not a change to the real site.

interface ContentfulImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	quality?: number;
	className?: string;
	priority?: boolean;
	[key: string]: any;
}

function contentfulLoader({
	src,
	width,
	quality,
}: {
	src: string;
	width?: number;
	quality?: number;
}) {
	return `${src}?w=${width}&q=${quality || 75}`;
}

export default function ContentfulImage({
	src,
	alt,
	width,
	height,
	quality,
	className,
	priority,
	...rest
}: ContentfulImageProps) {
	return (
		<img
			src={contentfulLoader({ src, width, quality })}
			alt={alt}
			width={width}
			height={height}
			className={className}
			loading={priority ? undefined : "lazy"}
			{...rest}
		/>
	);
}
