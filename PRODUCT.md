# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A general audience with no single evaluative gatekeeper, spanning four overlapping groups:

- **Recruiters / hiring managers** scanning resume, work samples, and skills to evaluate Tara for a role.
- **Potential freelance/consulting clients** deciding whether to hire Tara directly, looking for proof of work and a way to make contact.
- **Peers — other developers & designers** browsing work, process, and (eventually) blog content; networking rather than hiring.
- **General personal audience** — friends, self-promotion, portfolio-as-record, with no single evaluative job.

The site does not optimize for one audience at the expense of the others; each group should be able to self-serve what they came for (resume, work, contact, skills) without a forced single funnel.

## Product Purpose

TaraDunmore.com is Tara Dunmore's personal portfolio and resume site: a single-page home (about, skills, resume, work, contact) plus a planned blog. It exists to represent Tara — her work, skills, and how to reach her — to whoever lands on it, whether they're hiring, considering a freelance engagement, or just looking.

## Positioning

"Design roots, developer instincts" — self-taught, self-driven, systems-minded, building the bridge between design and code. The differentiator is fluency on both sides of that line: someone who can operate as a designer and as a developer, not a developer who can also make things look okay.

## Operating Context

- Content for About copy, Resume items, and Work items is authored in **Contentful**, not hardcoded — treat these as live CMS data, not fixed strings, when reasoning about future changes.
- The header nav already links to `/blog`, but the blog is **planned, not built** — there is no live blog route/content yet. Don't assume it exists or is finished.
- Primary navigation sections live on the single homepage: about, skills, work, resume, contact (in-page anchors), plus the not-yet-live blog.

## Capabilities and Constraints

- Built with Next.js (App Router) + Contentful as the CMS/data source.
- Work items support: title, short blurb, cover image, tech tags, slug (detail page), optional live site URL, optional code repo URL, and a featured item.
- Skills are grouped by category (languages/frameworks, CMS/platforms, testing & CI/CD, accessibility, UI/UX, version control, project management/collaboration, AI tools).
- Contact surfaces GitHub (@pixelpollux), LinkedIn (in/tarajdunmore), and email (me@taradunmore.com) directly on the page.

## Evidence on Hand

- Real resume, work, and about content lives in Contentful (fetched via `lib/api.ts`); no placeholder/fabricated testimonials, case studies, or metrics should be introduced — only what's authored in the CMS or explicitly provided.
- Real social/contact handles are already wired up (GitHub, LinkedIn, email) — treat as accurate and don't invent additional channels.

## Product Principles

1. Serve multiple audiences without a forced single funnel — a recruiter, a client, and a peer should each find what they came for.
2. The design-to-dev bridge is the throughline — content and craft should demonstrate it, not just claim it in hero copy.
3. Content is data, not decoration — About, Resume, and Work stay CMS-driven; don't hardcode what's meant to be edited in Contentful.
4. Don't get ahead of what's built — the blog is a stated intention, not a shipped feature.

## Accessibility & Inclusion

Accessibility (semantic HTML, WCAG, ARIA) is listed as a genuine skill/practice area, not decorative claim — the site itself should hold to that bar, not just describe it in the Skills section.
