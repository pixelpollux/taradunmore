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
 * "results", "results-2". Every emitted id is tracked, so a heading whose own
 * text slugs to "results-2" cannot collide with a generated suffix. Make one
 * per render so ids stay stable.
 */
export function makeSlugger() {
	const used = new Set<string>();
	const lastSuffix = new Map<string, number>();
	return (text: string) => {
		const base = slugify(text);
		let suffix = lastSuffix.get(base) ?? 1;
		let candidate = base;
		while (used.has(candidate)) {
			suffix += 1;
			candidate = `${base}-${suffix}`;
		}
		lastSuffix.set(base, suffix);
		used.add(candidate);
		return candidate;
	};
}
