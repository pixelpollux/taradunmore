# TaraDunmore.com redesign plan (DESIGN.md v2)

This is the build plan for moving the site from v1 ("The Sticker Sheet") to v2 (risograph, Plum + Lime). **`DESIGN.md` is the source of truth for how things look and behave. This file says where each change goes and in what order.**

## How to use this with Claude Code

1. Put the handoff files in the repo:
   - `DESIGN.md` → repo root (replaces the current one)
   - `redesign-plan.md` → `docs/redesign-plan.md`
   - `tokens.css` → `app/styles/tokens.css`
   - `tailwind.config.ts` → repo root (replaces the current one)
2. Suggested opening prompt:
   > Read `DESIGN.md` and `docs/redesign-plan.md`. We're implementing the v2 redesign phase by phase. Start with Phase 0 and Phase 1. Work on a branch, keep each phase in its own commit, and check off items in `docs/redesign-plan.md` as you finish them. Stop after each phase so I can review.
3. One phase per review. Phases 1 and 2 change shared foundations, so review them before any page work.

## Decisions (locked)

| Topic | Decision |
|---|---|
| Palette | Plum + Lime (Plum ink, Lime / Orchid / Amber spot inks on paper) |
| Type | Shrikhand (display) + Work Sans (text). Fredoka and Cherry Bomb One are removed |
| Styling | Keep Tailwind 3. Tokens are CSS variables in `app/styles/tokens.css`, mapped into the Tailwind theme |
| Homepage order | Hero → About → Work → Skills → Resume → Contact |
| Work ordering | New `order` (Integer) field on `workItem`. Lowest = featured on home. Drives the Work index and previous/next |
| Contact form | Next.js server action that sends through Resend |
| Resume PDF | `/public/resume.pdf`, linked from the round Download PDF sticker |
| Status colors | Error = Amber 800 on Amber 100; success = Lime 800 on Lime 100 |
| Blog byline subtitle | Hardcoded "Front end developer" |
| Construction ticker | Removed |
| Dark mode | Not in v2 |
| Parked | Tape, photo duotone, circle stickers |

## Phase 0: Prep (outside the codebase)

- [x] **Contentful:** add `order` (Integer, optional) to the `workItem` content type. Fill it in for every item (1 = featured).
- [x] **Resend:** create an API key and verify the sending domain (`taradunmore.com`) or use Resend's test sender while building.
- [ ] **Env vars** (`.env.local` and Vercel): `RESEND_API_KEY`, `CONTACT_TO_EMAIL=me@taradunmore.com`, `CONTACT_FROM_EMAIL` (for example `site@taradunmore.com`).
- [x] Add the resume file at `public/resume.pdf`.
- [x] `npm i resend`.

## Phase 1: Foundations

| File | Change |
|---|---|
| `app/styles/tokens.css` | **New.** From the handoff |
| `tailwind.config.ts` | **Replace** with the handoff version |
| `app/globals.css` | Import `./styles/tokens.css` at the top. Delete the v1 `:root` block (`--white`, `--pink`, `--eggplant`, `--accent*`, `--social-bg`, `--shadow`, `--code-bg`, `--sans`, `--cherry`...), the commented `@theme` block, `.construction-banner__track`, `.nav__home-link`, `.headline--highlighter`, `.headline--display`, `h2.headline`, `.card__featured-image--hero`. Add the base and utility layers below |
| `app/layout.tsx` | Load `Shrikhand` (weight 400) as `--font-display` and `Work_Sans` (400, 500, 700, italic 400) as `--font-text` via `next/font/google`, both `display: "swap"`, `subsets: ["latin"]`. Put both variables on `<html>`. Remove Fredoka. Body classes: `bg-paper text-plum font-sans text-body`. Delete the boilerplate `Footer` function. Render `<HeaderNav />`, `<main>`, the new `<SiteFooter />` and `<Grain />` here so every page shares them. Fix `metadata.description` (it still says "This is a blog built with Next.js and Contentful") |
| `app/page.tsx` | Remove the `Cherry_Bomb_One` import, the unused `Intro` function, and its own `<HeaderNav />` (the root layout renders it now) |
| `app/blocks/HiHero.tsx` | **Delete.** Unused, and it is the v1 Cherry Bomb "hi!" |
| `app/ui/Grain.tsx` | **New.** One SVG noise layer, see DESIGN.md "Riso effects" |

Add to `app/globals.css`:

```css
@layer base {
	html { scroll-behavior: smooth; }
	body { background: var(--color-bg-page); color: var(--color-text); }
	:where(a, button, input, textarea, select, summary):focus-visible {
		outline: var(--focus-ring);
		outline-offset: var(--focus-offset);
	}
	details > summary { list-style: none; }
	details > summary::-webkit-details-marker { display: none; }
	@media (prefers-reduced-motion: reduce) {
		html { scroll-behavior: auto; }
	}
}

@layer utilities {
	.ghost { text-shadow: var(--riso-ghost); }
	.multiply { mix-blend-mode: multiply; }
	.lift {
		transition: transform var(--lift-duration) ease, box-shadow var(--lift-duration) ease;
	}
	.lift:hover { transform: var(--lift); }
	@media (prefers-reduced-motion: reduce) {
		.lift:hover { transform: none; }
	}
	/* static containers lose their tilt on mobile */
	@media (max-width: 767px) {
		.tilt { transform: none !important; }
	}
}
```

`Grain.tsx` reference:

```tsx
export default function Grain() {
	return (
		<svg aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
			style={{ opacity: "var(--riso-grain-opacity)" }}>
			<filter id="riso-grain">
				<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" />
				<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3 0 0 0 -1.5" />
			</filter>
			<rect width="100%" height="100%" filter="url(#riso-grain)" />
		</svg>
	);
}
```

(The mockups used `position: absolute` over the page; `fixed` is cheaper because the filter only paints one viewport.)

**Check:** the site builds, the background is paper, the type is Shrikhand / Work Sans, and nothing references a deleted v1 token (search for `var(--accent`, `var(--pink`, `var(--text)`, `var(--bg)`, `font-cherry`).

## Phase 2: Core components (`app/ui/`)

| File | Change |
|---|---|
| `Button.tsx` | **Rewrite** with `class-variance-authority`. Variants `primary`, `secondary`, `text`, plus `disabled`. Renders `<a>` when `href` is set, otherwise `<button>`. No inline styles. Keep the external-link handling (`target` / `rel`). Min height 44px. `primary` / `secondary` get the `lift` class and their `shadow-pop-*` |
| `StickerButton.tsx` | **New.** The round Download PDF sticker (DESIGN.md "Buttons and links"). Props: `href`, `download?`, `children` |
| `DotShadow.tsx` | **New.** Props: `ink: "lime" \| "orchid" \| "amber"`, `offset?: number` (default 12), `radius: string`, `tilt?: number`, `className?`, `children`. Wrapper (relative, carries the rotation and the `tilt` class) → `aria-hidden` dot layer (`bg-dot-{ink} bg-dot multiply`, translated by `offset`) → the child. The child must have an opaque background |
| `Card.tsx` | **Rewrite** as `StaticCard` (uses `DotShadow`) and add `LinkCard` (whole-card `<a>`, solid shadow, `lift`). Drop the pink border and the `isClickable` hover |
| `Headline.tsx` | **Rewrite.** Variants: `display`, `page`, `section`, `card`. All Shrikhand; `display` / `page` / `section` add `ghost`. Remove `highlighter`, `display` (stroked), `primary` / `secondary` / `tertiary` |
| `Tag.tsx` | **New.** Static tint chip; `tone: "lime" \| "orchid" \| "amber"`. Replaces `Button buttonVariant="disabledPill"` used as tags |
| `FilterChip.tsx` | **New.** `<button aria-pressed>`; two sizes (`pill` for desktop, `tile` for the mobile drawer) |
| `Disclosure.tsx` | **New.** Shared `<details>` row with a separate chevron circle. Used by resume rows and the mobile filter drawer |
| `Monogram.tsx` | **New.** "td" over two `multiply` circles |
| `ContactLink.tsx` | **New.** Icon badge + label + handle pill; label and handle hide below 768px, and the `aria-label` always carries both |
| `Field.tsx` | **New.** Label + input or textarea with error state (`aria-invalid`, `aria-describedby`, Amber 800 message) |
| `CoverImage.tsx` | Remove the undefined `shadow-small` / `shadow-medium` classes. Accept `radius` and render inside `DotShadow` |
| `Avatar.tsx` | Restyle: 52px circle, 3px plum border, name bold, optional subtitle |
| `DateDisplay.tsx` | Format `MMM d, yyyy` (the current format string contains a stray tab character) |
| `BrandIcons.tsx` | Keep |

Also update `.design-sync/` docs and previews for the changed components, and regenerate `.impeccable/design.json` from the new `DESIGN.md` (both are tied to the v1 component APIs).

**Check:** build a scratch page (or Storybook story) with every variant and every state from DESIGN.md "Components"; tab through it to confirm the focus rings and 44px targets.

## Phase 3: Homepage sections (`app/blocks/`)

| File | Change |
|---|---|
| `HeaderNav.tsx` | Rebuild as the floating pill nav (DESIGN.md "Navigation"). Keep the mobile open/close logic and ARIA. **Delete the construction banner** and the `--nav-height` / `--nav-only-height` measuring effect if nothing else needs it (anchor offsets become `scroll-margin-top: 110px` on sections). Links: About, Work, Skills, Resume, Contact, Blog (pill). Add `aria-current` |
| Hero markup in `app/page.tsx` | Move the hero into `blocks/Hero.tsx`: "Hey there, I'm", the "Tara" and "Dunmore" display blocks, tagline with the lime-100 highlight on "bridge between design and code", See my work + Get in touch, the photo frame (natural color, 4:5), amber glow. Remove the "hi!" display word and the outline rings. Photo: use whichever headshot file is current (`public/assets/imgs/headshot-4x5.png` today; swap in the newer photo if it isn't already that file) |
| `homepageSections/Layout.tsx` | Replace the full-bleed band wrapper with a plain `<section>` inside the 1200px container. Title via `Headline variant="section"`. Remove `bgColor` |
| `AboutSection.tsx` | Two-tile layout. Render the About `contentBlock` through the shared rich text renderer: first paragraph as the lead |
| `WorkSection.tsx` | Featured = lowest `order`; next three in a grid. Project card per DESIGN.md. Add the "All work" secondary button (the old `headerActions` button was commented out) |
| `SkillsSection.tsx` | One `StaticCard` panel with the auto-fit group grid and tint chips. Data unchanged. Drop the comma-joined text list and the trailing-border logic |
| `ResumeSection/ResumeList.tsx` | Replace the View/Hide toggle with grouped `Disclosure` rows (first open). Keep `groupAndSortByCategory` and `formatDate`. Add the `StickerButton` → `/resume.pdf` (`download`). Can likely become a server component now that the toggle is gone |
| `ContactSection.tsx` | Left gradient tile with title, copy and three `ContactLink`s; right `ContactForm` (client component) |
| `blocks/ContactForm.tsx` | **New.** Client form using `useActionState` (React 19, which the App Router runs on) with the server action below. Include a visually hidden `company` honeypot input with `tabIndex={-1}` and `autoComplete="off"` |
| `app/actions/contact.ts` | **New.** Server action (below) |
| `blocks/SiteFooter.tsx` | **New.** Plum footer panel |
| `app/page.tsx` | Section order: Hero, About, Work, Skills, Resume, Contact. Give each section its `id` (`about`, `work`, `skills`, `resume`, `contact`) and update the nav hrefs to match |

Contact server action outline:

```ts
"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(_prev: unknown, formData: FormData) {
	const name = String(formData.get("name") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();
	const honeypot = String(formData.get("company") ?? ""); // hidden field, bots fill it

	const errors: Record<string, string> = {};
	if (!name) errors.name = "Add your name so I know who's saying hi.";
	if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "That email doesn't look quite right.";
	if (message.length < 10) errors.message = "Add a quick message so I know what's up.";
	if (honeypot) return { ok: true }; // silently drop
	if (Object.keys(errors).length) return { ok: false, errors };

	await resend.emails.send({
		from: process.env.CONTACT_FROM_EMAIL!,
		to: process.env.CONTACT_TO_EMAIL!,
		replyTo: email,
		subject: `Portfolio message from ${name}`,
		text: message,
	});
	return { ok: true };
}
```

(The error strings are placeholders in the site's voice; edit freely.)

**Check:** compare against the Home v1 boards at 1440 and 390: section order, the Shadow Rule, dot shadows matching each box's own height, the resume chevron staying on the row's right edge on mobile, the contact pills becoming icons on mobile, the form's error and success states.

## Phase 4: Data layer (`lib/`)

| File | Change |
|---|---|
| `lib/api.ts` | (1) `fetchGraphQL`: throw when `!res.ok` or `json.errors` is present (the existing TODO), and rename the cache tag from `"blog"` to something generic like `"contentful"` (update `app/api/revalidate/route.ts` to match). (2) Add `order` to `WORK_ITEM_FIELDS` and sort with `order: order_ASC`. (3) Add `getWorkItemList()`: a light query without `fullDescription` for the homepage and Work index; this should clear the "removing the limit breaks things" TODO, which is most likely GraphQL query complexity from the nested rich text. Raise the limit to 50. (4) Add `getAdjacentWorkItems(slug)` for previous/next. (5) Add the posts' `content.json` word count to the list query, or fetch it, for reading time |
| `lib/richText.tsx` | **New.** The one shared renderer (DESIGN.md "Rich text"): every node in the table, embedded assets through `ContentfulImage` inside a `<figure>`, H2 ids via `slugify`. Export `renderRichText(content, { variant: "prose" \| "compact" })` (`compact` for resume descriptions and About) and `getHeadings(content)` for the "On this page" rail |
| `lib/markdown.tsx` | **Delete** once the blog uses `richText.tsx`. Its `next/image` `layout="fill"` prop is the legacy API and the likely cause of the broken embedded images in posts |
| `lib/readingTime.ts` | **New.** Walk the rich text JSON, count words, `Math.max(1, Math.round(words / 200))` |
| `lib/slugify.ts` | **New.** Lowercase, strip punctuation, spaces → hyphens, de-duplicate within a page |

## Phase 5: Page templates (`app/(pages)/`)

| Route / file | Change |
|---|---|
| `work/[slug]/page.tsx` | Case study template (DESIGN.md "Page templates"). Move the inline `getRichTextOptions` into `lib/richText.tsx`. Add `OnThisPage` (client component: `IntersectionObserver` on the H2 ids sets `aria-current="location"`), previous/next `LinkCard`s, and the CTA banner |
| `work/page.tsx` | Work index (currently a placeholder string). Server component fetches `getWorkItemList()`, derives the unique sorted tags, and passes items to `WorkGrid` (client: chip row at md+ and the `Disclosure` drawer below md, `aria-pressed`, a `role="status"` count, an empty state) |
| `blog/[slug]/page.tsx` | Blog post template. Swap `Markdown` for `renderRichText(..., { variant: "prose" })`, add the drop cap class, reading time, byline subtitle, and the "More posts" `LinkCard`s |
| `blog/page.tsx` | Blog index: latest feature `LinkCard`, earlier posts as an `<ol>` of row links, the zero-posts empty state. Remove the commented-out experiments and the local `HeroPost` |
| `blocks/MoreStories.tsx` | Replace with the new post card / row components, or delete if unused |
| `work/layout.tsx`, `blog/layout.tsx` | Both currently render `<HeaderNav />`. Remove it (or delete these layouts) now that the root `layout.tsx` owns the nav and footer, or the nav renders twice |
| `app/not-found.tsx` | Optional, new: a simple 404 in the same style ("This page didn't make it through the press." + Back home) |

**Check:** each template against its canvas board at 1440 and 390, using real Contentful entries (long titles, items with no live or code URL, posts with embedded images, a work item with no cover).

## Phase 6: QA and cleanup

- [ ] Lighthouse accessibility 100 on home, a case study, the Work index, a post, and the Blog index.
- [ ] Keyboard pass: nav, the mobile menu, the resume rows, the filter drawer, the form, the "On this page" rail.
- [ ] Screen reader spot check: the filter count announces, contact pills read "GitHub, @pixelpollux", decorative layers are skipped.
- [ ] Contrast spot check against DESIGN.md "Contrast".
- [ ] `prefers-reduced-motion` on: no lift, no smooth scroll.
- [ ] Widths 390, 768, 1024, 1440: no horizontal scroll; dot shadows don't get clipped by a parent's `overflow: hidden`.
- [ ] Search the codebase for v1 leftovers: `--accent`, `--pink`, `--eggplant`, `Fredoka`, `cherry`, `headline--`, `construction`, `disabledPill`.
- [ ] Update `PRODUCT.md` "Operating Context" (the blog routes exist now, with an empty state) and `README.md` (still the Vercel example's readme).
- [ ] Regenerate `.impeccable/design.json`; rerun design-sync against the new `app/ui`.

## Carry-overs from the v1 PRs (branch started from `main`)

The v2 branch starts from `main`, so the earlier v1 fix PRs are not part of it. Re-applied in Phase 1: the 393 KB `headshot-4x5.jpg` (and loader passthrough for `/public` paths), `https://` normalization for Contentful URLs and JSON-escaped slugs in `lib/api.ts`, real site metadata, and a skip link. To re-apply as each piece is rebuilt:

- [x] **Phase 2:** empty `alt` on decorative `CoverImage` and `Avatar`; `Button` `external` prop (new tab plus "opens in new tab" text); `Headline` `level="decorative"` for purely visual text.
- [x] **Phase 3:** nav: Escape closes the mobile menu and returns focus, `aria-label`s on the primary and footer navs, `aria-current`; hero `h1` is the name, not "hi!"; contact links say when they open a new tab; resume uses native `<details>`.
- [x] **Phase 4:** blog list guards zero posts (`extractPostEntries` already returns `[]`).
- [ ] **Phase 5:** no nested links in post cards (a `LinkCard` must not contain another `<a>`).
- [x] **Temporary:** delete the "TEMPORARY v1 compatibility aliases" block at the bottom of `app/globals.css` once no component reads the v1 token names.

## Phase 2 notes

- Dev-only scratch page at `/styleguide` (404s in production) shows every variant and state. Remove it in Phase 6, or keep it as a living styleguide.
- Existing homepage, blog and work pages were moved onto the new components with minimal edits so the build stays green; Phases 3 and 5 replace them.
- **Deferred:** `.design-sync/` (previews, build-src shims, docs stubs, `dtsPropsFor`) and `.impeccable/design.json` still describe the v1 components. Both need their own tooling to regenerate and verify.
- `Disclosure` keeps its dot layer in state (not CSS) because content inside a closed `<details>` is hidden by the browser, so a dot layer inside it would vanish.

## Phase 3 notes

- **`order` is not on the `WorkItem` type in the Contentful Delivery API yet** (`Cannot query field "order" on type "WorkItem"`). `getAllWorkItems` tries `order: order_ASC` first and falls back to Contentful's default order, so the site works either way and starts using `order` the moment the field is published. Check the content model was saved and published, and that the field id is `order`.
- `lib/richText.tsx` and `lib/slugify.ts` were pulled forward from Phase 4: About and the resume rows need the shared renderer. Phase 4 still owes `getHeadings`, `readingTime`, and moving the case study and blog onto it.
- The contact form uses `useActionState`. The installed React is 18.3 (the Contentful renderer's peer range stops at 18), but the App Router runs its own React 19, so it works at runtime; types come from `react-canary.d.ts`.
- Not tested end to end: sending a real email (no `RESEND_API_KEY` in `.env.local`). Validation, the honeypot path, the "not configured" error, and value retention were exercised.
- v1 compatibility aliases are gone from `globals.css`.

## Phase 4 notes

- `fetchGraphQL` now throws on a bad status or a real GraphQL error (the message carries Contentful's reason: it answers invalid queries with HTTP 400 and the detail in the body). `UNRESOLVABLE_LINK` errors only warn, since a link to an unpublished entry is data, not a bug. A thrown error fails the build, so a broken query can no longer ship an empty page.
- Cache tag is `"contentful"` (revalidate route updated). Check the Contentful webhook does not depend on the old `"blog"` tag name (it posts to `/api/revalidate`, so it should not).
- New: `getWorkItemList` (light, limit 50, no rich text; this clears the old "removing the limit breaks things" TODO), `getAdjacentWorkItems` (previous/next, no wraparound), `readingMinutes` on every post, `getHeadings`, `lib/readingTime.ts`. `getAllWorkItems` is gone.
- Post lists fetch `content.json` only to count words, then drop it. The single-post query keeps `links` for embedded assets.
- `order` is still not exposed by the Delivery API. Until it is, `getWorkItemList` falls back to Contentful's default order (one warning per build).
- Blog post and case study bodies already render through `renderRichText`; `lib/markdown.tsx` is deleted. Phase 5 restyles the page chrome around them.
- Untested: embedded images inside rich text (no entry has one yet).
