# TaraDunmore.com

Tara Dunmore's portfolio and resume: a Next.js (App Router) site with content in Contentful, styled as a risograph-printed sticker sheet. Live at [taradunmore.com](https://taradunmore.com).

- **Stack:** Next.js 16, React, Tailwind CSS 3, Contentful (GraphQL), Resend, deployed on Vercel.
- **Design system:** [`DESIGN.md`](DESIGN.md) is the source of truth for color, type, shadows, components and page templates. Tokens live in `app/styles/tokens.css` and are mapped into `tailwind.config.ts`.
- **Product context:** [`PRODUCT.md`](PRODUCT.md) says who the site is for and what it is not.
- **Build history:** [`docs/redesign-plan.md`](docs/redesign-plan.md) records how the v2 redesign was built, phase by phase, with notes on what changed.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Needs Node 20.9 or newer.

### Environment variables

| Variable | What it is |
|---|---|
| `CONTENTFUL_SPACE_ID` | Contentful space |
| `CONTENTFUL_ACCESS_TOKEN` | Content Delivery API token (published content) |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Content Preview API token (draft mode) |
| `CONTENTFUL_PREVIEW_SECRET` | URL-friendly secret that enables draft mode via `/api/draft` |
| `CONTENTFUL_REVALIDATE_SECRET` | Value of the `x-vercel-reval-key` header the Contentful webhook sends to `/api/revalidate` |
| `RESEND_API_KEY` | Resend API key for the contact form |
| `CONTACT_TO_EMAIL` | Where contact-form messages go |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend |

Without the three Resend variables the contact form still validates but shows a "something went wrong" message instead of sending.

## Content

Everything below is edited in Contentful, not in code:

| Content type | Used for |
|---|---|
| `contentBlock` (title "About") | About text; the first paragraph renders as the lead |
| `resumeItem` | Resume rows, grouped by `resumeItemCategory` |
| `workItem` | Homepage cards, Work index, case study pages. The lowest `order` is the featured project |
| `post` (with `author`) | Blog index and posts |

Skills are hardcoded in `app/blocks/homepageSections/SkillsSection.tsx`. The resume PDF is `public/resume.pdf`.

Publishing in Contentful triggers a webhook to `/api/revalidate`, which refreshes every cached query (they share the `contentful` cache tag). Set the webhook up with the `x-vercel-reval-key` header.

### Draft mode

Add a content preview in Contentful pointing at `https://<site>/api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&slug={entry.fields.slug}` to preview unpublished posts. Leave draft mode at `/api/disable-draft`.

## Project layout

```
app/
  (pages)/work, (pages)/blog   Index and detail templates
  blocks/                      Page sections: Hero, nav, footer, forms, cards
  ui/                          Design-system components: Button, Card, Headline, Tag...
  actions/contact.ts           Server action that sends the contact form
  styles/tokens.css            Design tokens (CSS custom properties)
  styleguide/                  Every component and state; 404s in production
lib/
  api.ts                       Contentful queries (fail fast, one cache tag)
  richText.tsx                 The shared rich-text renderer
  readingTime.ts, slugify.ts   Small helpers
docs/redesign-plan.md          Phase-by-phase build record
```

## Scripts

| Command | |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (webpack) |
| `npm start` | Serve the production build |

Before opening a PR: `npx tsc --noEmit` and `npm run build`.

## Accessibility

The site targets WCAG 2.2 AA, with body text at AAA. Every interactive element has a visible 3px dashed focus ring and a 44px minimum target, decorative layers are `aria-hidden`, and reduced-motion preferences remove the hover lift and smooth scrolling. See the Accessibility section of `DESIGN.md` for the full list.
