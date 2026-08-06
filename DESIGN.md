---
name: TaraDunmore.com
description: A pop-art portfolio built from thick outlines, pill shapes, and hard offset shadows that pop on touch.
colors:
  deep-eggplant: "#330036"
  paper-white: "#f2f2f2"
  warm-shade: "#e5e5e5"
  muted-grey: "#858585"
  electric-pink: "#fe019a"
  acid-lime: "#c9ff00"
typography:
  display:
    fontFamily: "var(--font-cherry), serif"
    fontSize: "156px"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "1rem"
  headline:
    fontFamily: "var(--font-Fredoka), sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "var(--font-Fredoka), sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-Fredoka), sans-serif"
    fontWeight: 700
    letterSpacing: "1px"
rounded:
  pill: "30px"
  lg: "1.5rem"
  xl: "2rem"
spacing:
  section-y-sm: "2.5rem"
  section-y-lg: "5rem"
  container-x-sm: "2rem"
  container-x-lg: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.deep-eggplant}"
    textColor: "color-mix(in oklch, {colors.electric-pink} 70%, #ffffff)"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.75rem"
  button-secondary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.deep-eggplant}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.75rem"
  button-disabled:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.muted-grey}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.75rem"
  card-default:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
---

# Design System: TaraDunmore.com

## Overview

**Creative North Star: "The Sticker Sheet"**

TaraDunmore.com looks like a sheet of stickers laid out by hand, not a template filled in: thick cartoon-outline borders, pill-shaped buttons, and section titles struck through with a highlighter-marker gradient. Hero elements sit slightly off-grid — the headshot rotated a few degrees inside two independently-tilted outline rings, the giant stroked "hi!" cocked at -4deg — the deliberate imperfection of something placed by hand rather than centered by a grid system. Nothing here is trying to look safe or corporate; it's a portfolio that argues its own case by being unmistakably made, not generated.

The palette does the same job in color: a stark, near-black-purple ink (Deep Eggplant) against a soft paper neutral, with exactly two accents — Electric Pink and Acid Lime — that never dilute into a third. Depth stays flat at rest; it only appears as a hard, no-blur, colored offset shadow the instant something becomes interactive, reinforcing the sticker-peel physicality rather than simulating real-world light.

This system explicitly rejects soft, muted, corporate-minimalist portfolio conventions — no gradients-as-glow, no frosted panels, no safe SaaS-dashboard palette. The bet is that "design roots, developer instincts" reads more convincingly through unapologetic, tactile craft than through restraint.

**Key Characteristics:**
- Thick 2px ink/accent outlines paired with generous rounded corners (pills, rounded-3xl)
- Flat at rest, hard offset "pop" shadow + translate on hover/click — never a soft blur
- Exactly two accents (Electric Pink, Acid Lime) against one ink neutral (Deep Eggplant)
- Deliberate off-grid rotation on hero elements (headshot rings, display headline)
- One display font reserved for a single hero word; Fredoka carries everything else

## Colors

A high-contrast, two-accent palette: a near-black-purple ink, a soft paper neutral, and exactly two saturated accents that are never allowed to become three.

### Primary
- **Electric Pink** (`#fe019a`): The system's one true accent. Drives primary button text, card borders, hover-shadow tint, active/current-state color, and the highlighter headline's gradient base. Used sparingly against neutral fields — its rarity is what makes it read as "the" color.

### Secondary
- **Acid Lime** (`#c9ff00`): The counter-accent. Used for the second outline ring behind the hero headshot, the highlighter headline's gradient top, and section background washes (resume section). Pink and lime never touch at full saturation in the same flat fill — they alternate roles (fill vs. outline, section vs. section) rather than blend.

### Neutral
- **Deep Eggplant** (`#330036`): The system's ink. Doing double duty as body text color, headline text, and the fill/border color for primary and secondary buttons and cards — the closest thing this system has to "black."
- **Paper White** (`#f2f2f2`): Base page background and button/card surface color.
- **Warm Shade** (`#e5e5e5`): Alternate section background band (About section), one step darker than Paper White for section-to-section rhythm without a hard line.
- **Muted Grey** (`#858585`): Disabled button text/border and secondary metadata text (e.g. handles under a name).

### Named Rules
**The Two-Accent Rule.** Electric Pink and Acid Lime are the only saturated accents in the system. A new UI need reaches for Deep Eggplant, Paper White, or Warm Shade before it reaches for a third hue.

## Typography

**Display Font:** Cherry Bomb One (`var(--font-cherry)`, with serif fallback)
**Body Font:** Fredoka (`var(--font-Fredoka)`, with sans-serif fallback)

**Character:** Fredoka is the workhorse — rounded, friendly, legible at every weight from body copy to bold nav labels. Cherry Bomb One is reserved entirely for spectacle: a single bubble-lettered word rendered as a giant stroked outline, never running text.

### Hierarchy
- **Display** (400, 156px desktop / responsive clamp on mobile, line-height 0.85, 1rem letter-spacing): The hero "hi!" only. Rendered as an outlined, transparent-fill glyph (`-webkit-text-stroke`) with a hard layered drop shadow in Electric Pink — never used for section titles or anywhere else.
- **Headline** (700, 2.5rem → 3.5rem at lg, line-height 1): Section titles (`h2.headline`), almost always paired with the highlighter variant.
- **Title** (700, 1.25rem–2rem): Card and list headings — work item titles, resume role titles.
- **Body** (400, 1rem, line-height 1.5, 1rem bottom margin on paragraphs): Default reading copy.
- **Label** (700, letter-spacing 1px, text-xs to text-xl depending on context): Buttons, nav links, tech-tag pills — always bold with tracked-out letter-spacing regardless of size.

### Named Rules
**The One-Word Display Rule.** The display face and its outline/shadow treatment appear on exactly one hero word per page. It is a signature moment, not a heading style.

## Layout

Sections stack as full-bleed color bands (`container--outer`), each wrapping a constrained inner column (`container--inner`, `max-w-7xl`, centered, `px-8` → `px-12` at `lg`). Vertical rhythm is generous and consistent: `py-10` → `py-20` at `lg` per section, with the hero section tightened to `py-4` → `py-6`. Alternating band backgrounds (Paper White → Warm Shade → accent-tinted washes) mark section boundaries instead of dividing rules.

Within a section, headers follow one shape: a highlighter-variant `Headline` on the left, optional actions on the right, wrapped and centered on small screens. The `lg` breakpoint (1024px) is the primary layout pivot for the whole site — mobile-first styles are the default and `lg:` utilities restructure `flex-col` to `flex-row`, rescale type, and reveal desktop-only affordances (e.g. the hero CTA buttons are `hidden` below `lg`). A custom `xs` breakpoint (`30rem` / 480px) exists for the smallest phones but is used sparingly.

Hero composition breaks the grid on purpose: the headshot sits inside a rotated container (`rotate-[5deg]`) layered with two independently-rotated outline rings, and the display headline is rotated `-4deg` — the system's one deliberate departure from its otherwise rectilinear section rhythm.

## Elevation & Depth

Flat by default, pop on interaction. Surfaces (cards, buttons) carry no shadow at rest. The moment something becomes interactive, it gains a hard-edged, zero-blur, accent-tinted offset shadow (`shadow-[.25rem_.25rem_0_0_...]` on Button, `.5rem_.5rem` on Card) paired with a small translate toward the shadow's origin (`hover:translate-x-[-.25rem] hover:translate-y-[-.25rem]`), over a 300ms ease-in-out transition. The shadow color is always the current accent at reduced opacity via `color-mix`, never a neutral black — depth here reads as "peeling off the page," not as ambient light.

The hero headshot layers this same flat, no-blur language statically: two solid-color outline rings (Electric Pink, Acid Lime), each independently rotated and offset behind the photo, simulate a stack of cut-out stickers rather than a drop shadow.

### Named Rules
**The Pop-on-Touch Rule.** Nothing casts a shadow at rest. A hard, accent-tinted, zero-blur offset shadow plus a small translate is the only depth cue, and it appears only in response to hover or interaction.

## Shapes

Corners are generous and consistent: buttons are true pills (30px radius), cards and hero images round at `1.5rem`–`2rem` (`rounded-3xl` / `rounded-[2rem]`), and contact-icon badges are circular. Borders are thick and graphic — a flat 2px solid stroke in either Deep Eggplant or Electric Pink outlines cards, buttons, and cover images, giving every surface a cut-out, cartoon-panel silhouette rather than a soft card edge. Straight rectilinear layout is the default; rotation is reserved for the hero elements described in Layout, never applied to grid or section-level containers.

## Components

Buttons, cards, and the highlighter headline all share one physical idea: tactile and hand-placed. Thick outlines and pill/rounded-3xl shapes read like something cut out and stuck down, and the shared hover pop (translate + hard offset shadow) reinforces that you're meant to press it, not just click it.

### Buttons
- **Shape:** True pill (`30px` radius / `rounded-full`).
- **Primary:** Deep Eggplant fill, Electric-Pink-tinted text (`color-mix(in oklch, var(--accent) 70%, #ffffff)`), 2px Deep Eggplant border. The default call-to-action treatment.
- **Secondary:** Paper White fill, Deep Eggplant text and 2px border — same silhouette as primary, inverted fill.
- **Tertiary:** No border or fill, Deep Eggplant text only — for the lowest-emphasis inline action.
- **Disabled / Disabled Pill:** Muted Grey text and border on a Paper White fill; used for non-interactive tech-tag chips as much as for actual disabled state.
- **Sizes:** `xs` (tight, tag-like), `sm` (default), `md` (bold, larger touch target).
- **Hover / Focus:** Hard offset shadow pop, see Elevation & Depth. Disabled variants render as a `<span aria-disabled>` and skip the hover physics entirely.

### Cards
- **Corner Style:** `rounded-3xl` (1.5rem).
- **Background:** Paper White by default; section-specific tints via `className` override (e.g. accent-mix wash on contact tiles).
- **Border:** 2px solid Electric Pink.
- **Shadow Strategy:** Flat at rest; clickable cards (`isClickable`) get the same hard offset-shadow pop as buttons, scaled up (`.5rem` offset vs. `.25rem`).
- **Internal Padding:** Variant-driven — `thick` (1.5rem → 2.5rem at `lg`), `slim` (1rem → 1.5rem), `tight` (0, for cards whose image bleeds to the edge).

### Navigation
- Sticky header, Paper White background, thick `0.15rem` solid Deep Eggplant bottom border. The wordmark ("TaraDunmore.com") uses a signature outline-fill trick: `-webkit-text-stroke` in Deep Eggplant with the fill color swapped to Electric Pink for "TaraDunmore" and back to Deep Eggplant for ".com" — one wordmark, two rendering tricks in one word.
- Nav links are bold, tracked-out labels at `text-lg` → `text-xl`; no visible hover/active state is currently defined beyond browser default.
- **Mobile:** Below `lg`, collapses to a 3-bar hamburger that morphs into an X (rotate + fade on the middle bar), revealing a full-width dropdown menu with the same thick-border treatment as the header itself.

### Contact Tiles (signature component)
Each social link (GitHub, LinkedIn, Email) renders as a clickable `Card` (`slim` padding, accent-wash background) containing a circular icon badge (`size-12`, `rounded-3xl`, accent-tinted fill) next to a bold label and a Muted Grey handle, with an arrow-out icon on wider screens. It's the Card and hard-shadow-pop system applied to a contact-specific layout rather than a distinct component.

## Do's and Don'ts

### Do:
- **Do** pair every clickable surface — button or card — with the same hard offset-shadow-plus-translate pop on hover; it's one interaction physic, not a per-component choice.
- **Do** keep Electric Pink and Acid Lime as the system's only two accents (**The Two-Accent Rule**); reach for Deep Eggplant, Paper White, or Warm Shade before introducing a third hue.
- **Do** reserve the Cherry Bomb One display treatment for a single hero word per page (**The One-Word Display Rule**); Fredoka carries every other typographic role.
- **Do** treat `lg` (1024px) as the layout's real pivot — build mobile-first, then restructure at `lg:`, matching the rest of the codebase.
- **Do** use the highlighter-gradient headline variant for section titles specifically; it's a title treatment, not a general emphasis style for body copy.
- **Don't** reintroduce soft, muted, corporate-minimalist styling — no soft-blurred shadows, no desaturated "safe" palette, no glassmorphism/glow. This system's whole thesis is that it doesn't look like a template.
- **Don't** treat `--accent-bg`, `--accent-border`, `--code-bg`, `--social-bg`, `--black`, `--text-h`, or `--shadow` as live tokens — they're declared in `globals.css` but not referenced by any component; verify a token is actually consumed before reusing it.
- **Don't** rely on the `font-display` class (nav wordmark) or `shadow-small` / `shadow-medium` classes (blog cover image) as real styles — none of the three are defined anywhere in the Tailwind config or CSS; they currently resolve to nothing.
- **Don't** treat the `<Footer>` rendered in `app/layout.tsx` as part of this system — it's unstyled Next.js-starter boilerplate (`bg-accent-1`, `border-accent-2`, `text-success`, "Read Documentation" / "View on GitHub") predating the current identity and uses none of its tokens.
- **Don't** assume `/blog` or `/work/[slug]` already carry this system — both still run bare Tailwind defaults (plain `container mx-auto px-5`, no color bands, no Button/Card treatment) and haven't been brought into the Sticker Sheet identity yet.
