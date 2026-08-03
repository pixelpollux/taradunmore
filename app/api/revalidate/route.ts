import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get("x-vercel-reval-key");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
// TODO: come back to this
// The revalidate tag is currently named "blog", but fetchGraphQL() is used for multiple Contentful content types (blog, resume, work, content blocks). Using a more generic tag name (e.g., "contentful") helps avoid confusion and accidental partial invalidation if you later add type-specific tags. 

  revalidateTag("blog");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
