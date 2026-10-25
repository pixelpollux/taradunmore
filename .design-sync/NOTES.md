# design-sync notes: taradunmore-ui (v2)

Inputs for syncing this site's components to Claude Design. **Status: inputs rewritten for the v2 redesign on 2026-10-24 but not yet run.** The converter scripts (`.ds-sync/`, from the design-sync skill) are not in this repo, so nothing here has been built or rendered. The first run is the real test; expect to fix previews. What *was* checked: `build-src` and every preview type-check against the real components (a temporary tsconfig extending the root one), and the shims regenerate cleanly.

## Repo shape

A personal Next.js site, not a publishable package: no Storybook, no `dist/`. The synced "package" is `app/ui/`. `cfg.srcDir` is `.design-sync/build-src`, a directory of thin files that give the converter named exports.

- **`package.json` needs a `name`** (`taradunmore-ui`); `lib/dts.mjs` walks up to find it. Do not remove it.
- **No dist, so synth-entry mode.** Pass `--entry ./dist/index.js` (a path that does not exist) on every run so the directory walk lands on the repo root.
- **`.d.ts` extraction fails** because components type props inline, so `cfg.dtsPropsFor` holds hand-transcribed props for every component. **Update the matching entry whenever a prop changes.**

## The two kinds of build-src file

1. **Thin redirects** (Button, Headline, Tag, FilterChip, Disclosure, DotShadow, Monogram, StickerButton, ContactLink, Field, DateDisplay, MetaLine, BrandIcons): `export { default as X } from "../../app/ui/X"`. Relative path (the converter's discovery has no `@/` alias) and a **named** re-export (an `export *` barrel never forwards `default`, which silently drops the component).
2. **Generated shims** (Avatar, CoverImage, BackLink, Card): copies of the real component with `next/image` and `next/link` replaced by a plain `<img>` and `<a>`. Neither Next module runs in a standalone browser bundle (they read `process.env` at module init, which throws and takes the **whole bundle** down with it). Regenerate with `bash .design-sync/make-shims.sh` after editing any of those four files in `app/ui/`. `contentful-image.tsx` is the hand-kept `<img>` stand-in for `lib/contentful-image.tsx`.

`Card.tsx` exports two components, `StaticCard` and `LinkCard`; each has its own docs stub and `dtsPropsFor` entry. `cfg.componentSrcMap: { "ContentfulImage": null }` stops the shim being counted as a component.

## CSS and fonts

- No compiled stylesheet in the repo. `cfg.cssEntry` is `.design-sync/.cache/compiled-tailwind.css`, produced by `cfg.buildCmd` (Tailwind CLI over `tailwind-entry.css`, which `@import`s the real `app/globals.css`, which imports `app/styles/tokens.css`). `resync.mjs` runs the build; a bare `package-build.mjs` does not.
- `--font-display` and `--font-text` are normally injected by `next/font/google` on `<html>`. `tailwind-entry.css` redeclares them as literal family names.
- `brand-fonts.css` plus `brand-fonts/*.woff2` are self-hosted **latin-subset** copies of Shrikhand and Work Sans (variable, upright and italic), fetched from `fonts.gstatic.com` through the legacy `css2` endpoint with a desktop Chrome user agent. Non-Latin copy would need more subsets.

## Known risks to check on first run

- **Previews import `@/app/ui/...`** (the real components), as the v1 previews did. If the converter does not map those to the bundle, Card, BackLink, Avatar and CoverImage previews will pull in `next/link` or `next/image`; point them at `../build-src/...` instead.
- **`data:` image URLs are blocked** in the claude.ai/design preview iframe (CSP). `_fixtures.ts` uses HTTPS URLs (GitHub avatar CDN, a pinned picsum photo). If either host changes, Avatar and CoverImage previews show broken images.
- **`mix-blend-mode: multiply`** (dot shadows, overprints) blends with whatever sits behind the preview cell. If the host cell is not paper-coloured the dots look different from the site; wrap previews in `bg-paper` if so.
- **`Disclosure` is a client component** (`"use client"`); the redirect keeps the directive in the source file only, so confirm esbuild bundles it without a React Server Components error.
- **Dev-only pieces are not synced:** Grain, Shapes, the `/styleguide` page, and page blocks (nav, hero, forms).

## Re-sync

```bash
bash .design-sync/make-shims.sh
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./dist/index.js --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```

Re-copy the staged scripts into `.ds-sync/` first (`cp -r <skill-base-dir>/{package-build.mjs,package-validate.mjs,package-capture.mjs,resync.mjs,lib,storybook} .ds-sync/`): a stale `.ds-sync/` runs an old converter.

## History

- **2026-08-05:** first sync of the v1 "Sticker Sheet" components (Fredoka, Cherry Bomb One). Found and fixed three bugs that carry forward: `next/image` breaking the whole bundle, `export *` dropping default exports, and `data:` URLs blocked by CSP.
- **2026-10-24:** inputs rewritten for v2 (Shrikhand, Work Sans, plum and the three spot inks; 19 components). Not yet run.
