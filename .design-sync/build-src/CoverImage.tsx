// Shim for app/ui/CoverImage.tsx — identical except the ContentfulImage import
// (and dropping next/link, which this design-sync build doesn't need routed;
// slug still renders as a real <a> so the link affordance is faithful).
// See .design-sync/build-src/contentful-image.tsx and NOTES.md for why.
// KEEP IN SYNC with app/ui/CoverImage.tsx: mirror any prop/markup change here too.
// Named export, not default: .pkg-entry.mjs combines this dir via
// `export * from`, which never forwards a "default" binding (see Button.tsx).
import ContentfulImage from "./contentful-image";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function CoverImage({
  title,
  url,
  slug,
  priority = false,
}: {
  title: string;
  url: string;
  slug?: string;
  priority?: boolean;
}) {
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority={priority}
      width={2000}
      height={1000}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <a href={`/blog/${slug}`} aria-label={title}>
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
}
