import type { Metadata } from "next";

// Drafts are for review only: keep them out of search results.
export const metadata: Metadata = {
	robots: { index: false, follow: false },
};

export default function DraftsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
