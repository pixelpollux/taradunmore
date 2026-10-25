## Using this design system (v2, "printed by hand")

No provider or root wrapper is required: every component is a plain function, so just import and render. Components are Tailwind-styled; the page must load the system's stylesheet (`styles.css`), which defines the tokens below.

**Styling idiom.** Tailwind utility classes mapped to CSS custom properties. Use the semantic names (`bg-paper`, `text-plum`, `border-plum`, `rounded-card`, `shadow-pop-lime`, `font-display`, `text-section-title`). Never use Tailwind's stock palette (`bg-blue-500`, `text-gray-700`) and never raw hex.

**Core rule: dots sit still, solid ink moves.** Clickable things (Button, FilterChip, ContactLink, LinkCard) get a solid, zero-blur offset shadow and lift on hover. Static containers (StaticCard, Disclosure, CoverImage with `ink`) get a halftone dot layer behind an opaque box. Stickers and the nav get nothing.

| Token | Value | Use for |
|---|---|---|
| `paper` / `surface` | `#f3efea` / `#fbf8f4` | page background / cards, fields, nav |
| `plum` | `#3a1030` | all text and borders, primary button fill |
| `plum-muted` | `#5e4057` | secondary text |
| `lime`, `orchid`, `amber` | `#b8d43a`, `#d79ad0`, `#f2a65a` | spot inks: **fills only**, never text |
| `*-100` | tints | chip and highlight backgrounds |
| `lime-800`, `orchid-800` (`text-link`), `amber-800` | text-safe inks | success text, links, error text |
| `font-display` | Shrikhand | headings and stickers only, 24px minimum |
| `font-sans` | Work Sans | everything else |

**Headings.** Use `Headline` (`display`, `page`, `section`, `card`, `pageDetail`, `feature`). Display, page and section titles carry the "Ghost" (a misregistered orchid and lime text-shadow); never put it on text under 32px.

**Accessibility floor.** 44px minimum targets (`min-h-tap`), 3px dashed focus ring, text on paper or surface in plum, accent text in its 800, and never text over dots or overprints.

**Where the truth lives.** `DESIGN.md` in the repository is the source of truth; `styles.css` has every token and utility class actually shipped; each component's `.prompt.md` lists its real props.

**A composed example.**

```tsx
import { StaticCard, Headline, Tag, Button } from "<this design system>";

<StaticCard ink="orchid" tilt={-0.8}>
  <Headline variant="card" level="h3">Project title</Headline>
  <p className="mt-2 text-small text-plum-muted">A short blurb in small muted text.</p>
  <div className="mt-3 flex gap-2"><Tag tone="lime">Next.js</Tag><Tag tone="amber">Contentful</Tag></div>
  <Button href="/work/project" className="mt-4">Case study</Button>
</StaticCard>
```
