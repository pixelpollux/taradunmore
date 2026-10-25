const INLINE_NODES = new Set([
	"text",
	"hyperlink",
	"entry-hyperlink",
	"asset-hyperlink",
	"embedded-entry-inline",
]);

/**
 * Visible text of a rich-text document. Inline nodes (text, links) are joined
 * as written, so `Use **TypeScript**.` reads "Use TypeScript."; every block
 * (paragraph, heading, list item, table cell) ends with a space so words in
 * neighbouring blocks never run together.
 */
function extractText(node: any): string {
	if (!node) return "";
	if (node.nodeType === "text") return String(node.value ?? "");
	const text = ((node.content ?? []) as any[]).map(extractText).join("");
	return INLINE_NODES.has(node.nodeType) ? text : `${text} `;
}

/** Count words in a Contentful rich-text document. */
export function countWords(node: any): number {
	return (extractText(node).match(/\S+/g) ?? []).length;
}

/** Whole minutes at 200 words a minute, never less than 1. */
export function readingTime(json: any, wordsPerMinute = 200): number {
	return Math.max(1, Math.round(countWords(json) / wordsPerMinute));
}
