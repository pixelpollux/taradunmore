/** Count words in a Contentful rich-text document (all text nodes). */
export function countWords(node: any): number {
	if (!node) return 0;
	if (node.nodeType === "text") {
		return (String(node.value ?? "").match(/\S+/g) ?? []).length;
	}
	return ((node.content ?? []) as any[]).reduce(
		(total, child) => total + countWords(child),
		0,
	);
}

/** Whole minutes at 200 words a minute, never less than 1. */
export function readingTime(json: any, wordsPerMinute = 200): number {
	return Math.max(1, Math.round(countWords(json) / wordsPerMinute));
}
