// Shared demo fixtures for authored /design-sync previews.
// Not a component — plain data, imported by the preview .tsx files.

// A real photo of Tara Dunmore: her GitHub avatar (github.com/pixelpollux),
// via the stable, ID-keyed avatars.githubusercontent.com CDN URL (doesn't
// change even if the username does). Originally an inlined base64 data URI —
// switched to this HTTPS URL because claude.ai/design's sandboxed preview
// iframe blocks `data:` image sources via CSP (confirmed empirically: data
// URIs rendered as broken images live; this HTTPS URL renders correctly).
// See .design-sync/NOTES.md.
export const AVATAR_PHOTO_URL = "https://avatars.githubusercontent.com/u/30328414?v=4";

// A placeholder banner (no real "work/blog cover image" asset exists in the
// repo) — a specific, pinned picsum.photos photo ID so it's the same image
// on every load, not a random one. Also an HTTPS URL for the same CSP reason
// as above (a hand-drawn brand-colored SVG data URI was tried first, same
// data: blocking issue).
export const COVER_IMAGE_URL = "https://picsum.photos/id/943/800/400";
