// Thin redirect so cfg.srcDir can point here (see NOTES.md — Avatar/CoverImage
// need a real shim in this dir; the rest just re-export the real component so
// there's exactly one source of truth for their actual implementation).
// Relative import (not @/): the converter's discovery scan has no path-alias
// config of its own. Named re-export (not `export { default }`): the
// synthesized .pkg-entry.mjs combines every file in this dir via
// `export * from`, which per the ES spec never forwards a "default" binding
// — a literal default export here would silently vanish from the bundle.
export { default as Button } from "../../app/ui/Button";
