---
name: TaraDunmore.com
version: 2.0
description: A risograph-printed sticker sheet. Thick plum outlines, round shapes, grainy ink gradients and halftone dots, on warm paper.
supersedes: "v1 'The Sticker Sheet' (eggplant, electric pink, acid lime, Fredoka, Cherry Bomb One)"
colors:
  paper: "#F3EFEA"
  surface: "#FBF8F4"
  plum: "#3A1030"
  plum-muted: "#5E4057"
  lime: "#B8D43A"
  lime-100: "#E3EFB0"
  lime-800: "#4E6A0C"
  orchid: "#D79AD0"
  orchid-100: "#F0D7EC"
  orchid-800: "#7E3F76"
  amber: "#F2A65A"
  amber-100: "#FAD9B5"
  amber-800: "#8A4510"
  rule: "#E2D9DD"
typography:
  display:
    fontFamily: "var(--font-display), Georgia, serif"
    fontSize: "clamp(56px, 9vw, 108px)"
    fontWeight: 400
    lineHeight: 1.02
  page-title:
    fontFamily: "var(--font-display), Georgia, serif"
    fontSize: "clamp(46px, 8vw, 96px)"
    fontWeight: 400
    lineHeight: 1.04
  section-title:
    fontFamily: "var(--font-display), Georgia, serif"
    fontSize: "clamp(44px, 6vw, 64px)"
    fontWeight: 400
    lineHeight: 1.05
  card-title:
    fontFamily: "var(--font-display), Georgia, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.15
  lead:
    fontFamily: "var(--font-text), system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: "var(--font-text), system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  prose:
    fontFamily: "var(--font-text), system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.7
  small:
    fontFamily: "var(--font-text), system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-text), system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0.08em"
    textTransform: uppercase
rounded:
  field: "14px"
  figure: "24px"
  card: "30px"
  panel: "36px"
  pill: "999px"
borders:
  default: "4px"
  chip: "3px"
spacing:
  page-max: "1200px"
  page-x: "20px"
  section-gap: "140px"
  section-gap-mobile: "96px"
  template-gap: "96px"
  template-gap-mobile: "72px"
riso:
  offset: "3px"
  dot-pitch: "8px"
  dot-offset: "12px"
  grain-opacity: 0.15
  grain-opacity-mobile: 0.09
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.paper}"
    border: "4px solid {colors.plum}"
    rounded: "{rounded.pill}"
    shadow: "3px 3px 0 {colors.lime}"
    minHeight: "44px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.plum}"
    border: "4px solid {colors.plum}"
    rounded: "{rounded.pill}"
    shadow: "3px 3px 0 {colors.orchid}"
    minHeight: "44px"
  text-link:
    textColor: "{colors.orchid-800}"
    fontWeight: 700
    textDecoration: "underline 2px, offset 4px"
  static-card:
    backgroundColor: "{colors.surface}"
    border: "4px solid {colors.plum}"
    rounded: "{rounded.card}"
    shadow: "halftone dots, 12px offset"
  link-card:
    backgroundColor: "{colors.surface}"
    border: "4px solid {colors.plum}"
    rounded: "{rounded.card}"
    shadow: "5px 5px 0 {accent}"
---

# Design System: TaraDunmore.com (v2)

> **v2 replaces v1 entirely.** v1 ("The Sticker Sheet": Deep Eggplant, Electric Pink, Acid Lime, Fredoka, Cherry Bomb One, the "hi!" display word, the highlighter headline, the pop-on-hover rule) is retired. Where this file and older code disagree, this file wins. `docs/redesign-plan.md` lists every file that changes and in what order.

## Overview

**Creative North Star: "Printed by hand, built with care."**

The site looks like it came off a risograph: warm paper, a dark plum ink plus three bright spot inks, visible grain, slightly misregistered type, halftone dot shadows, and bright shapes that blend where they overlap. It keeps v1's sticker DNA (thick outlines, round shapes, a little tilt) and prints it.

Underneath, everything is systematic: tokenized, accessible, CMS-driven. That tension is the brand. Delight on the surface, rigor underneath. The site should prove "design roots, developer instincts" rather than claim it.

**Personality:** Playful (never gimmicky), Warm, Crafted, Precise.

**Principles**
1. **Ink with intention.** One dark ink, three spot inks, one paper. Every color has a job.
2. **Delight on top, rigor underneath.** Texture is a layer, never the structure.
3. **Texture never costs legibility.** No dots, overprints or accent-500 colors behind or as text. WCAG AA minimum everywhere; body text is AAA.
4. **Interaction announces itself.** A solid offset shadow means "you can click this." Halftone dots mean "this is just a container."

## Colors

Warm paper, one dark ink (Plum) for text and structure, and three spot inks (Lime, Orchid, Amber) for fills. Lime leads, orchid supports, amber is seasoning.

### Core inks
| Token | Hex | Role |
|---|---|---|
| `paper` | `#F3EFEA` | Page background |
| `surface` | `#FBF8F4` | Cards, fields, nav, panels |
| `plum` | `#3A1030` | All text, all borders, primary button fill, footer |
| `plum-muted` | `#5E4057` | Secondary text, meta, captions |
| `lime` | `#B8D43A` | Lead accent: primary button shadow, highlights, bullets |
| `orchid` | `#D79AD0` | Second accent: secondary shadow, ghost text, dots |
| `amber` | `#F2A65A` | Small pops only |
| `rule` | `#E2D9DD` | Hairlines inside tables |

### Accent scales
| Ink | 100 (tint fill) | 500 (ink) | 800 (text-safe) |
|---|---|---|---|
| Lime | `#E3EFB0` | `#B8D43A` | `#4E6A0C` |
| Orchid | `#F0D7EC` | `#D79AD0` | `#7E3F76` |
| Amber | `#FAD9B5` | `#F2A65A` | `#8A4510` |

- 500s are **fills only**. Never use an accent 500 as text on paper (1.5 to 2.0:1, fails).
- When an accent must be text, use its 800. Links are Orchid 800.
- 100s are chip and tint backgrounds.

### Gradients (ink blends)
| Token | Value | Typical use |
|---|---|---|
| `--grad-lime-amber` | `linear-gradient(135deg, lime, amber)` | Hero name block, featured image fill, Send button |
| `--grad-orchid-lime` | `linear-gradient(135deg, orchid, lime)` | Hero name block, About title tile |
| `--grad-amber-orchid` | `linear-gradient(160deg, amber, orchid)` | Blog nav pill, contact tile, CTA banner |

### Status (no new hues)
- Error: text and border `amber-800`, field background `amber-100`, always with a text message (never color alone).
- Success: text `lime-800`, background `lime-100`.

### Contrast (computed)
| Pair | Ratio | Use |
|---|---|---|
| Plum on Paper | 14.15 | All text |
| Plum on Surface | 15.30 | Text in cards |
| Plum-muted on Paper | 7.82 | Secondary text |
| Plum on Lime / Amber / Orchid | 9.65 / 8.00 / 7.27 | Text on accent fills and gradients |
| Paper on Plum | 14.15 | Primary buttons, footer |
| Orchid 800 on Paper | 6.42 | Links |
| Lime 800 on Paper | 5.41 | Success text |
| Amber 800 on Surface | 6.75 | Error text |

### Overprints
Accent shapes may use `mix-blend-mode: multiply`. Lime × Orchid `#9B802F`, Lime × Amber `#AF8A14`, Orchid × Amber `#CC6449`, all three `#935311`. Plum text on any overprint drops to 4.2:1 or lower, so **text never sits on an overprint.**

### Named rules
- **The Paper Rule.** Backgrounds are paper or surface. Spot inks are fills inside outlined shapes, never full-bleed section bands. (This replaces v1's alternating colored section bands.)
- **The Photo Rule.** Photos and project screenshots are always shown in natural color. No duotone for now (parked, see bottom).

## Typography

**Display:** Shrikhand 400 (`var(--font-display)`, fallback Georgia, serif)
**Text:** Work Sans 400 / 500 / 700, plus 400 italic for rich text (`var(--font-text)`, fallback system-ui, sans-serif)

Both load through `next/font/google` in `app/layout.tsx` with `display: "swap"` and the Latin subset. Fredoka and Cherry Bomb One are removed.

### Scale
| Role | Font | Size / line height | Used for |
|---|---|---|---|
| Display | Shrikhand | `clamp(56px, 9vw, 108px)` / 1.02 | Hero name blocks only |
| Page title | Shrikhand | `clamp(46px, 7vw, 84px)` detail, `clamp(52px, 8vw, 96px)` index / 1.04 | One `h1` per page |
| Section title | Shrikhand | `clamp(44px, 6vw, 64px)` / 1.05 | Homepage `h2`s |
| Prose H2 | Shrikhand | 40px (32px mobile) / 1.1 | Rich text headings |
| Feature title | Shrikhand | 34 to 36px / 1.1 | Featured project / latest post |
| Card title | Shrikhand | 24 to 26px / 1.15 | Cards, resume roles, list rows |
| Prose H3 | Work Sans 700 | 24px / 1.3 | Rich text sub-headings |
| Lead | Work Sans 500 | 22 to 24px / 1.45 | Intros, `shortBlurb`, `excerpt` |
| Body | Work Sans 400 | 18px / 1.55 | Default |
| Prose | Work Sans 400 | 19px (18px mobile) / 1.7 | Case study and post bodies, 740 to 760px measure |
| Small | Work Sans 400 | 15 to 16px / 1.5 | Card blurbs, captions, meta |
| Label | Work Sans 700 | 13px, uppercase, 0.08em tracking | Eyebrows, group labels, dates |

### Rules
- **Shrikhand is for headings and stickers only.** 24px minimum; never body, labels, nav links, form labels or buttons (exception: the round Download PDF sticker and the Send button).
- **The Ghost.** Display, page titles, section titles and prose H2s carry the misregistered riso shadow: `text-shadow: calc(var(--riso-offset) * -1) 0 0 var(--orchid), var(--riso-offset) var(--riso-offset) 0 var(--lime)`. Never on text under 32px, never on body.
- Sentence case everywhere. No all-caps Shrikhand.

## Layout

- Page container: `max-width: 1200px`, centered, `padding-inline: 20px` (16px for the header and footer shells).
- Homepage section order: **Hero → About → Work → Skills → Resume → Contact → Footer.**
- Vertical rhythm: 140px between homepage sections (96px on mobile); 96px on templates (72px on mobile).
- Layout is built with flex-wrap and `flex-basis` so columns stack naturally. Use `align-items: flex-start` on rows of differently sized boxes, so each box (and its dot shadow) keeps its own height.
- **Mobile rules apply below 768px** (Tailwind `max-md:`). Above that, fluid flex-wrap handles tablet.

## Elevation & Depth: the Shadow Rule

**Dots sit still. Solid ink moves.** This is the single most important rule in the system.

| Element | Shadow | Hover |
|---|---|---|
| **Interactive** (button, link pill, whole-card link, filter chip, nav Blog pill) | Solid, zero blur: `var(--riso-offset) var(--riso-offset) 0 <accent>` (larger cards use `+2px` to `+4px`) | `translate(-3px, -3px)`, 150ms ease |
| **Static container** (content card, panel, tile, form box, resume row, drawer) | Halftone dot layer behind the box, offset 10 to 16px | none |
| **Decorative sticker / tag** | none | none |
| **Floating nav bar** | none (it scrolls over text) | n/a |

How the dot shadow is built (the `<DotShadow>` component):
1. A `position: relative` wrapper sized by its child, carrying any rotation.
2. An `aria-hidden` layer: `position: absolute; inset: 0; border-radius` matching the child; `transform: translate(12px, 12px)`; `background-image: radial-gradient(circle, <ink> 42%, transparent 46%)`; `background-size: 8px 8px`; `mix-blend-mode: multiply`.
3. The child box, `position: relative`, with an **opaque background and no blend mode**, so dots can never show through it or behind text.

Offsets by size: resume rows and drawers 10px; cards 12px; panels and tiles 14px; featured card and cover images 16px. Use one dot ink per container and vary the ink between neighbors. A card with several links inside (for example, a project card with Case study + Live site + Code) is a static container: dots on the card, solid shadows on the buttons inside.

`prefers-reduced-motion: reduce` removes the hover translate; the shadow stays.

## Shapes

- Borders are 4px plum on every outlined box (3px on chips and small circles, 2px on bullet dots).
- Radius: fields 14px, figures and blockquotes 24px, cards 30px, panels and tiles 36px, buttons and chips fully round. A resume row is a pill when closed and softens to 32px when open (28px on mobile).
- **Tilt:** static containers rotate 0.5 to 1.5deg (the hero photo frame 4deg), alternating direction so no two neighbors match. Buttons, chips and paragraph text never tilt more than 1deg. **All container tilt goes to 0 on mobile.**
- Images inside a rounded card are clipped by the card (`overflow: hidden` on the card), and the image-to-text divider is drawn with `box-shadow: 0 0 0 4px var(--plum)` on the image pane so it lands correctly whether the layout is side by side or stacked.

## Riso effects

| Effect | Implementation | Hard rule |
|---|---|---|
| **Ghost (misregistration)** | `text-shadow` using `--riso-offset` (3px) | Shrikhand at 32px+ only |
| **Overprint** | Accent shapes with `mix-blend-mode: multiply` | Inside image placeholders, the monogram, the PDF sticker, corner circles in tiles. Never under text |
| **Halftone dots** | Radial-gradient dot screens | Shadows of static containers, and the prose `<hr>`. Never behind or through text |
| **Ink gradients** | The three `--grad-*` tokens | Fills only; text on them must be plum |
| **Paper grain** | One `<Grain />` SVG per page: `feTurbulence` (baseFrequency 0.8, 2 octaves) through a color matrix that keeps only dark specks; `position: absolute; inset: 0; pointer-events: none; aria-hidden`; opacity 0.15 (0.09 on mobile) | One layer per page, never per component |

## Components

All components read semantic tokens only (no raw hex in components).

### Monogram
"td" in Shrikhand over two 44px circles (orchid on top, lime offset by `--riso-offset`), both `multiply`. Used in the nav, at the start of the wordmark "Tara Dunmore".

### Navigation (`HeaderNav`)
- Sticky floating pill: surface background, 4px plum border, fully round, 16px from the top. No shadow.
- Left: Monogram + "Tara Dunmore" (Shrikhand 22px). Right: About, Work, Skills, Resume, Contact (Work Sans 700), then a **Blog** pill (amber-orchid gradient, solid lime shadow, arrow-up-right icon).
- Current page: `aria-current="page"` plus a lime-100 pill with a 2px border (the Blog pill keeps its own style).
- Mobile: links hide, a plum **Menu** button appears (hamburger icon, solid lime shadow). Keep the existing `aria-expanded` / `aria-controls` dropdown logic; restyle the dropdown as a surface panel with a 4px border and 30px radius.
- The construction ticker is removed.

### Buttons and links
| Variant | Look | Use |
|---|---|---|
| Primary | Plum fill, paper text, lime solid shadow | Main action in any area |
| Secondary | Surface fill, plum text, orchid solid shadow | Second action |
| Text link | Orchid 800, bold, underline 2px, offset 4px | Inline and low-emphasis actions (Live site, Code inside cards) |
| Sticker CTA | 220px circle: an orchid circle offset behind a radial lime-amber circle, both `multiply`, plum border, rotated 8deg, Shrikhand "Download PDF" with a download icon | One per page: the resume download |
| Filter chip | Toggle button with `aria-pressed`. Off: surface + plum shadow. On: plum fill + lime shadow | Work index filters |

All interactive elements: at least 44px tall, 3px dashed `currentColor` focus outline with a 3px offset, hover lift per the Shadow Rule. Disabled: plum-muted text, 4px dashed plum-muted border, no shadow, no lift. Replace the inline-style `Button` with a `class-variance-authority` component (already installed).

### Tags (static)
Rounded chips with tint fills (lime-100 / orchid-100 / amber-100, rotating), 3px plum border, Work Sans 700 14 to 15px. No shadow, no hover. Inside cards they may collapse to a plain "tag · tag · tag" line.

### Cards
- **Static card** (`<DotShadow>` + surface box, 30px radius): project cards on the homepage and Work index, content panels.
- **Link card** (the whole card is one `<a>`): previous/next project, blog cards, blog rows, the latest-post feature. Solid shadow and lift.
- Project card anatomy: cover (16:10, natural photo) / title (card title) / `shortBlurb` (small, plum-muted) / tags line / actions (primary "Case study" button, then text links "Live site" and "Code" only when the URLs exist).

### Featured project (homepage)
The work item with the lowest `order`. Wide static card: cover on the left (flex 3, min-height 360px), text on the right (flex 2), stacking on mobile. Title (34px Shrikhand), `shortBlurb`, tint-fill tags, then Case study (primary), Live site and Code (secondary). Card tilt -0.8deg, 16px dot shadow.

### Hero
- Left: "Hey there, I'm" (Work Sans 700 20px), then two display blocks, **"Tara"** (lime-amber gradient, -2deg) and **"Dunmore"** (orchid-lime gradient, +2deg). Each block has a plum border, 28px radius, the Ghost, and its own dot shadow (orchid and lime). Then the tagline (lead) with "bridge between design and code" marked by a lime-100 highlighter band. Then See my work (primary) and Get in touch (secondary).
- Right: the photo in a frame (surface, 4px border, 20px radius, 16px padding plus 60px bottom padding for the "that's me!" caption in Shrikhand), rotated 4deg, with a 16px lime dot shadow. The photo is 4:5, natural color, `object-position: 50% 30%`, 12px inner radius.
- A soft amber radial glow sits behind the top right of the section (decorative, `aria-hidden`).
- Mobile: the photo stacks above the headline; tilt goes to 0.

### About
Two tiles in a row, top-aligned. Left: "About me" title tile (orchid-lime gradient, an amber `multiply` circle in the corner, star icon, min-height 240px). Right: surface text tile rendering the Contentful `contentBlock` "About": first paragraph as the lead, the rest as body, links as text links. Each tile has its own dot shadow.

### Skills
One static panel (surface, 36px radius, 14px lime dot shadow) holding an auto-fit grid (`minmax(240px, 1fr)`) of the 8 skill groups. Each group: label (13px uppercase) with a small accent dot, then chips in that group's tint. Group accents rotate lime → orchid → amber. The data stays in `SkillsSection.tsx` (hardcoded, alphabetized as today).

### Resume
- Left: "Where I've been" title, then a group label per `resumeItemCategory` (Professional experience, Volunteer experience, in the existing fixed order).
- Each item is a native `<details>` row inside a `<DotShadow>`. The `<summary>` holds a text group (dates, role in Shrikhand 22px, company) and a separate 40px circular chevron (36px on mobile, `flex: none`, rotates 180deg when open). Open rows show `roleDescription` rich text below a 3px dashed orchid divider. The first row is open by default.
- Mobile: the text group stacks into three lines and the chevron stays pinned on the right.
- Right: the Sticker CTA linking to `/resume.pdf` (with the `download` attribute).
- This replaces the old "View Resume" toggle.

### Contact
Two boxes, top-aligned.
- Left (amber-orchid gradient tile, lime `multiply` corner circle): "Let's connect!" title, the existing intro copy, and three **contact pills** at the bottom: GitHub (@pixelpollux), LinkedIn (in/tarajdunmore), Email (me@taradunmore.com). Each pill: 40px circular icon badge (lime / orchid / amber) + bold label + handle, surface fill, plum solid shadow, opens in a new tab (email uses `mailto:`). **Mobile: icon-only 56px circles**, with `aria-label` carrying "GitHub, @pixelpollux" and so on.
- Right: the contact form (surface, 28px radius, orchid dot shadow). Fields: Name, Email, Message, with visible labels, `autocomplete`, 4px borders, paper fill, 14px radius. Submit: "Send!" in Shrikhand, lime-amber gradient, orchid solid shadow, -2deg. Errors use the Status rule and `aria-invalid` + `aria-describedby`. On success, replace the form with a success message in a `role="status"` region.

### Footer
Plum panel (36px radius, 16px from the page edges) with a faint lime radial glow at the top right. "Tara Dunmore" in Shrikhand, links (Work, Blog, Resume, Contact, Back to top) with 10px vertical padding for touch, and "© {year} Tara Dunmore". Replaces the starter-boilerplate footer in `layout.tsx`.

### Rich text (`fullDescription`, `post.content`, `roleDescription`, About)
One shared renderer (`lib/richText.tsx`) with a `.prose-riso` style set:

| Node | Style |
|---|---|
| `HEADING_2` | Shrikhand 40px (32px mobile), Ghost, `id` slugified from its text, `scroll-margin-top: 120px` |
| `HEADING_3` | Work Sans 700, 24px |
| `PARAGRAPH` | Prose size; blocks spaced 1.1em |
| `bold` / `italic` | Work Sans 700 / 400 italic |
| `HYPERLINK` / `ENTRY_HYPERLINK` | Text link style; external links get `target="_blank" rel="noopener noreferrer"` |
| `code` mark | 0.86em, lime-100 fill, 2px plum border, 8px radius, `white-space: nowrap` |
| `UL_LIST` | No default bullets: 12px lime dot with a 2px plum border, 30px hanging indent |
| `OL_LIST` | Numbers in Orchid 800, bold |
| `QUOTE` | Orchid-100 fill, 4px plum border, 24px radius, 22px Work Sans 500 |
| `HR` | 14px tall row of orchid halftone dots |
| `EMBEDDED_ASSET` | `<figure>`: `ContentfulImage` in a 24px-radius frame with a 12px dot shadow; the asset `description` is both the `alt` and the `<figcaption>` (15px, plum-muted) |
| `TABLE` | Inside an `overflow-x: auto` box with a 4px border and 20px radius; header cells lime-100 |

On the blog post page only, the first paragraph opens with a Shrikhand drop cap (4.2em, Ghost).

## Page templates

### Case study (`/work/[slug]`)
1. "All work" back link (text link with a left arrow), "Case study" label.
2. `title` (page title + Ghost), `shortBlurb` as the lead, `techTags` as tint chips, "Visit live site" (primary) and "View code" (secondary), each only if its URL exists.
3. `coverImage`: full container width, 16:8, 36px radius, 16px orchid dot shadow, -0.6deg, overlapping the header by 32px.
4. Body + rail: `fullDescription` in a 740px column; beside it a sticky (`top: 120px`) "On this page" card built from the H2s (amber dot shadow, the current section marked with `aria-current="location"` and a filled lime dot). Mobile: the rail moves above the body and is not sticky.
5. Previous / Next project: two link cards (96px thumbnail, label, title), ordered by `order`.
6. "Like what you see?" CTA banner (amber-orchid gradient, lime dot shadow) with "Get in touch" → `/#contact`.

### Blog post (`/blog/[slug]`)
1. "All posts" back link; meta line (date · "X min read", separated by a small orchid dot); `title`; `excerpt` as the lead; byline (52px round photo with a 3px border, `author.name`, "Front end developer").
2. `coverImage`: max 1000px wide, 16:9, 32px radius, amber dot shadow, +0.6deg.
3. `content` in a centered 760px column with the drop cap. No rail.
4. "More posts": the two posts from `getPostAndMorePosts` as link cards (cover, date · read time, title, excerpt) plus an "All posts" secondary button.

### Work index (`/work`)
1. "All work" page title, a one-line intro, and a small cluster of three `multiply` shapes (decorative).
2. Filters: "All" + one filter chip per unique `techTag` (alphabetical), in a `role="group"` labelled "Filter by tech". A `role="status"` line below: "Showing N projects".
   - **Mobile:** the chip row is replaced by a filter **drawer**: the same `<details>` pattern as the resume rows (label "Filter by tech", current choice, chevron), opening to a 2-column grid of squarer chips (16px radius, 44px min height). Picking a chip closes the drawer and updates the summary to the choice.
3. Grid: project cards, `repeat(auto-fill, minmax(300px, 1fr))`, every second card nudged 20px down, alternating tilt (0 on mobile). Ordered by `order`.
4. Empty state (only when a filter matches nothing): a dashed-border card, "Nothing printed in that ink yet." and a "Show all work" secondary button that resets the filter.
5. The CTA banner, then the footer.

### Blog index (`/blog`)
1. "Blog" page title, a one-line intro, two `multiply` circles (decorative).
2. "Latest": the newest post as one wide link card (cover left, text right; solid lime shadow; same clipping technique as the featured project).
3. "Earlier posts": an `<ol>` of link rows (date | title + excerpt | read time | 44px round arrow). Shadows rotate orchid, amber, lime. Mobile: the date moves above the title and the arrow hides.
4. **Empty state (zero posts):** a dashed card, "The first post is still on the press.", a short line, and "See my work" (primary) → `/work`. The blog is not live yet, so this is what ships until there's a post.

## Responsive (below 768px)
- Nav links → Menu button. Container tilt → 0. Hero photo above the headline.
- Section gaps 96px (templates 72px); big tile padding 24 to 28px.
- Contact pills → icon-only circles. Resume and drawer summaries stack text with the chevron pinned.
- Rail above the body; filter chips → drawer; blog row date above the title.
- Grain opacity × 0.6.
- Everything else reflows through flex-wrap. Check at 390, 768, 1024 and 1440.

## Accessibility
- WCAG 2.2 AA minimum; body text AAA (plum on paper 14:1).
- One `h1` per page; landmarks: header, nav (Main / Footer / On this page / More work), main, footer.
- Visible 3px dashed focus ring on every interactive element. Targets at least 44px.
- All riso layers (dots, glows, overprint shapes, grain, decorative clusters) are `aria-hidden`.
- Photos keep real alt text; embedded assets use their Contentful description.
- Accordions use native `<details>` / `<summary>`. Filter chips use `aria-pressed`, with a live status line.
- `prefers-reduced-motion`: no lift, no rotate on the chevron, no smooth scroll.
- Never rely on color alone (errors pair color with text; the current section in the rail pairs a dot with bold text).

## Do's and Don'ts

### Do
- Follow the **Shadow Rule**: solid = clickable, dots = static, nothing on stickers or the nav.
- Keep dot layers behind **opaque** boxes; never put `mix-blend-mode` on a box that sits on dots.
- Use accent 800s for any accent-colored text.
- Keep content in Contentful (About, Work, Resume, Posts). Skills stay hardcoded.
- Alternate tilt and dot ink between neighbors.

### Don't
- Don't use accent 500s as text, put text on overprints or dots, or add a fourth spot ink.
- Don't use Shrikhand under 24px, for body or labels, or the Ghost under 32px.
- Don't use soft or blurred shadows, glassmorphism, or full-bleed colored section bands.
- Don't bring back v1 pieces: Electric Pink, Fredoka, Cherry Bomb One, the stroked "hi!", the highlighter headline, the outline rings around the headshot, or the construction ticker.
- Don't add a per-component grain layer.

## Parked (not in v2; don't build yet)
- **Tape** strips on cards.
- **Photo duotone** (plum shadows + orchid or lime highlights). Might return for non-photo graphics.
- **Circle stickers** ("hi there!", "fresh off the press").
- **Dark mode** ("night print").
