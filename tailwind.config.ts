import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Proposed replacement for the repo's tailwind.config.ts (DESIGN.md v2).
 * Every value reads a CSS custom property from app/styles/tokens.css,
 * so tokens stay the single source of truth and utilities stay readable:
 *   bg-paper, text-plum, border-plum, shadow-pop-lime, rounded-card, font-display, bg-grad-orchid-lime
 * Raw hex values and Tailwind's stock palette should not appear in components.
 */
export default {
	content: [
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./lib/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				paper: "var(--paper)",
				surface: "var(--surface)",
				plum: { DEFAULT: "var(--plum)", muted: "var(--plum-muted)" },
				rule: "var(--rule)",
				lime: { DEFAULT: "var(--lime)", 100: "var(--lime-100)", 800: "var(--lime-800)" },
				orchid: { DEFAULT: "var(--orchid)", 100: "var(--orchid-100)", 800: "var(--orchid-800)" },
				amber: { DEFAULT: "var(--amber)", 100: "var(--amber-100)", 800: "var(--amber-800)" },
				link: "var(--color-link)",
			},
			fontFamily: {
				display: ["var(--font-display)", "Georgia", "serif"],
				sans: ["var(--font-text)", "system-ui", "sans-serif"],
			},
			fontSize: {
				label: ["13px", { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "700" }],
				small: ["15px", { lineHeight: "1.5" }],
				body: ["18px", { lineHeight: "1.55" }],
				prose: ["19px", { lineHeight: "1.7" }],
				lead: ["22px", { lineHeight: "1.45", fontWeight: "500" }],
				"card-title": ["24px", { lineHeight: "1.15" }],
				"section-title": ["clamp(44px, 6vw, 64px)", { lineHeight: "1.05" }],
				"page-title": ["clamp(46px, 8vw, 96px)", { lineHeight: "1.04" }],
				display: ["clamp(56px, 9vw, 108px)", { lineHeight: "1.02" }],
			},
			borderWidth: {
				DEFAULT: "var(--border-width)",
				chip: "var(--border-width-chip)",
			},
			borderRadius: {
				field: "var(--radius-field)",
				figure: "var(--radius-figure)",
				card: "var(--radius-card)",
				panel: "var(--radius-panel)",
			},
			boxShadow: {
				"pop-lime": "var(--shadow-pop-lime)",
				"pop-orchid": "var(--shadow-pop-orchid)",
				"pop-amber": "var(--shadow-pop-amber)",
				"pop-plum": "var(--shadow-pop-plum)",
				divider: "0 0 0 var(--border-width) var(--plum)",
			},
			backgroundImage: {
				"grad-lime-amber": "var(--grad-lime-amber)",
				"grad-orchid-lime": "var(--grad-orchid-lime)",
				"grad-amber-orchid": "var(--grad-amber-orchid)",
				"dot-lime": "var(--riso-dot-lime)",
				"dot-orchid": "var(--riso-dot-orchid)",
				"dot-amber": "var(--riso-dot-amber)",
			},
			backgroundSize: {
				dot: "var(--riso-dot-pitch) var(--riso-dot-pitch)",
			},
			maxWidth: {
				page: "var(--page-max)",
				measure: "760px",
			},
			spacing: {
				section: "var(--space-section)",
				template: "var(--space-template)",
				tap: "var(--tap-min)",
			},
			minHeight: {
				tap: "var(--tap-min)",
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [typography],
} satisfies Config;
