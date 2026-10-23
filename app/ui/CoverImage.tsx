import ContentfulImage from "../../lib/contentful-image";
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
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
      // Decorative: the title is always next to it, or on the wrapping link's aria-label.
      alt=""
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
        <Link href={`/blog/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
