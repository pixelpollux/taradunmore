import type { Config } from "tailwindcss";
import base from "../tailwind.config";

/**
 * The design-sync CSS build: the site's config plus the preview files, so
 * layout utilities that only a preview uses (w-48, max-w-xs, ...) are
 * generated. Kept out of the root config so the site's own CSS never carries
 * preview-only classes. Paths resolve from the repo root, where buildCmd runs.
 */
export default {
	...base,
	content: [...(base.content as string[]), "./.design-sync/previews/**/*.tsx"],
} satisfies Config;
