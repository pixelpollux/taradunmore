"use client";

import Image from "next/image";

interface ContentfulImageProps {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

const contentfulLoader = ({ src, width, quality }: ContentfulImageProps) => {
  // Files served from /public ignore resize params, so pass them through as-is
  // and keep the source file itself web-sized.
  if (src.startsWith("/")) return src;
  // fm=webp: Contentful serves the uploaded format (often PNG/JPEG) otherwise.
  return `${src}?w=${width}&q=${quality || 75}&fm=webp`;
};

export default function ContentfulImage(props: ContentfulImageProps) {
  return <Image alt={props.alt} loader={contentfulLoader} {...props} />;
}
