"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The current year. Static pages are rendered once at build, so a year read
 * on the server goes stale; this one renders the build year in the HTML and
 * switches to the visitor's year as soon as the page hydrates.
 */
export default function CurrentYear({ buildYear }: { buildYear: number }) {
	const year = useSyncExternalStore(
		subscribe,
		() => new Date().getFullYear(),
		() => buildYear,
	);
	return <>{year}</>;
}
