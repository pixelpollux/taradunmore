## Using this design system

No provider or root wrapper is required — every component is a plain,
context-free function; just import and render.

**Styling idiom: Tailwind utility classes + this system's own CSS custom
properties for color/type, referenced via Tailwind's arbitrary-value
syntax** (`bg-[var(--accent)]`, `text-[var(--text)]`) rather than Tailwind's
default palette. Never reach for Tailwind's stock colors (`bg-blue-500`,
`text-gray-700`, …) — this system doesn't use them; always go through the
tokens below.

**Tokens** (defined in `styles.css`'s import closure — real names, use
these exactly):

| Token | Value | Use for |
|---|---|---|
| `--text` | `#330036` (eggplant) | primary text/foreground |
| `--text-inverse` | `#f2f2f2` (white) | text on dark/filled backgrounds |
| `--text-h` | `#08060d` | heading text (near-black) |
| `--bg` | `#f2f2f2` | page/card background |
| `--bg-shaded` | `#e5e5e5` | secondary surface |
| `--accent` | `#fe019a` (pink) | brand accent, links, primary actions |
| `--accent-secondary` | `#c9ff00` (lime) | secondary accent, highlights |
| `--accent-bg` / `--accent-border` | translucent purple | tinted fills/borders on accent surfaces |
| `--social-bg` | translucent cream | social/contact card fills |
| `--border` | `#e5e4e7` | default border color |
| `--code-bg` | `#f4f3ec` | code block background |
| `--grey` | `#858585` | disabled/muted state |
| `--shadow` | multi-layer box-shadow value | standard elevation |
| `--sans` | `var(--font-Fredoka), sans-serif` | body font stack |
| `--cherry` | `var(--font-cherry), serif` | display/headline font stack |
| `--breakpoint-xs` | `30rem` | extra-small breakpoint |

Apply via Tailwind arbitrary values on any element: `className="bg-[var(--bg)] text-[var(--text)] border-[var(--border)]"`.
`Button` and `Headline` also use named CSS classes for variants (`.headline--highlighter`,
`.headline--display`) — those come from `styles.css` too, don't recreate them
with utilities.

**Where the truth lives**: read `styles.css` (and what it `@import`s —
`_ds_bundle.css` has every token and utility class actually shipped) before
styling anything, and each component's own `.prompt.md` for its real prop
values and variants.

**Build snippet** (a real composed example, adapted from this sync's own
verified-to-compile `Card` preview):

```tsx
import { Card, Headline, Button, CoverImage } from "<this design system>";

<Card cardVariant="tight" className="flex flex-col gap-3">
  <CoverImage title="Post title" url={coverUrl} slug="post-slug" />
  <div className="p-4 flex flex-col gap-2">
    <h3 className="text-xl font-bold">Post title</h3>
    <p className="text-sm">Short summary text.</p>
    <Button buttonVariant="primary" buttonSize="xs" text="More Info" />
  </div>
</Card>
```

`Card`'s `cardVariant` controls padding (`thick` | `slim` | `tight`); reach
for `tight` when a component fills the card edge-to-edge (like a cover
image), `thick`/`slim` otherwise. `Button`'s `buttonVariant` is `primary` |
`secondary` | `tertiary` | `disabled` | `disabledPill`, `buttonSize` is
`xs` | `sm` | `md`.
