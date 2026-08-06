// Shim for app/ui/Avatar.tsx — identical except the ContentfulImage import.
// See .design-sync/build-src/contentful-image.tsx and NOTES.md for why.
// KEEP IN SYNC with app/ui/Avatar.tsx: mirror any prop/markup change here too.
// Named export, not default: .pkg-entry.mjs combines this dir via
// `export * from`, which never forwards a "default" binding (see Button.tsx).
import ContentfulImage from "./contentful-image";

export function Avatar({
  name,
  picture,
}: {
  name: string;
  picture: any;
}) {
  return (
    <div className="flex items-center">
      <div className="mr-4 w-12 h-12">
        <ContentfulImage
          alt={name}
          className="object-cover h-full rounded-full"
          height={48}
          width={48}
          src={picture.url}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
