/** Lowercase, strip accents and punctuation, spaces to hyphens. */
export function slugify(text: string) {
	return (
		text
			.toLowerCase()
			.normalize("NFKD")
			.replace(/[̀-ͯ]/g, "")
			.replace(/[^a-z0-9\s-]/g, "")
			.trim()
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-") || "section"
	);
}

/**
 * A slugger that de-duplicates within one page: "Results", "Results" becomes
 * "results", "results-2". Make one per render so ids stay stable.
 */
export function makeSlugger() {
	const seen = new Map<string, number>();
	return (text: string) => {
		const base = slugify(text);
		const count = (seen.get(base) ?? 0) + 1;
		seen.set(base, count);
		return count === 1 ? base : `${base}-${count}`;
	};
}
