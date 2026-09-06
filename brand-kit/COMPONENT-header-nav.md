# Component spec — Header nav (Products menu)

**Applies to:** every page on the site. The header is one shared component — change it here, not
per page.
**Trigger:** the product family has outgrown a flat `Products` link. There are five destinations
in two tiers, and Custom Solutions has no way in.

Read with `CONSTRUCTION-OS-BRAND-KIT.md`.

> **Note:** §1 below reflects the original spec. The work order (`WORKORDER-header-rollout.md`
> §3) supersedes the nav label: the third item is `Services` routing to `/services`, not
> `Engagements`. All other spec details apply as written.

---

## 1. What changes

The header's `Products` item becomes a **menu**. Everything else in the header is unchanged:
mark + wordmark left; `Work` · `Products` · `Services` · `About` and the `Book a demo` CTA
right; `min-height: 72px`; 1px `#B8B9B5` bottom rule; sticky
(`position: sticky; top: 0; z-index: 50`); no scroll-state change, no shadow, no shrink.

### ⚠ Menu rows are the product name only

**No descriptors, taglines, status tags, or supporting sentences in the menu.** A row is a
marker and the product name. Nothing else — including no `IN DEVELOPMENT` tag on Project
Intelligence. The product's promise and its maturity belong on its page, not in the nav.

### The two tiers are the only structure

| Tier | Marker | Items |
|---|---|---|
| Core products | `01` `02` `03` | Document Workbench · Construction Intelligence · Project Intelligence |
| Extension layer | `——` `——` | Operations Automation · Custom Solutions |

**The markers are load-bearing.** Extension-layer items are never numbered `04`/`05` — they use
`——`, exactly as they do in the footer product list, every hero tag row, and every cross-product
list on the site. A visitor should be able to tell from the menu alone that three things are
products and two are layers around them.

---

## 2. Structure and copy

```
PRODUCTS ▾
┌────────────────────────────────────────────────┐
│ CORE PRODUCTS                                  │
│ 01  Document Workbench                         │
│ 02  Construction Intelligence                  │
│ 03  Project Intelligence                       │
│────────────────────────────────────────────────│
│ EXTENSION LAYER                                │
│ ——  Operations Automation                      │
│ ——  Custom Solutions                           │
└────────────────────────────────────────────────┘
```

| Marker | Name | Route |
|---|---|---|
| 01 | Document Workbench | `/products/document-workbench` |
| 02 | Construction Intelligence | `/products/construction-intelligence` |
| 03 | Project Intelligence | `/products/project-intelligence` |
| —— | Operations Automation | `/products/operations-automation` |
| —— | Custom Solutions | `/products/custom-solutions` |

Group labels: `CORE PRODUCTS` · `EXTENSION LAYER`.

### ⚠ There is no products index page — do not link to one
The site has no `/products` route. The five product pages are the only destinations, and the
homepage's products section is the closest thing to an overview. So: **no `All products →` row
in the menu**, and `Explore Construction OS →` resolves to the homepage products section anchor
(`/#products`), not to a products index. If an index page is built later, add the row back as
the panel's last item above a 1px Ink rule.

The `EXTENSION LAYER` group label does the tier work, so extension-layer rows carry no per-row
tier tag — the marker plus the group heading is enough. **No row carries any tag.**

---

## 3. Geometry

A **flat technical panel, not a floating card.** It reads as an extension of the header.

- Anchored flush to the header's bottom edge: `position: absolute; top: 100%`.
- Paper `#FFFFFF` fill, `border: 1px solid #111111`, `border-top: 0` (the header's own rule is
  the panel's top edge). **Radius 0. No shadow. No blur. No overlay tint.**
- Width `min(340px, calc(100vw - 48px))`, left-aligned to the `Products` trigger, clamped to the
  viewport so it never overflows. Name-only rows need a narrow panel — do not stretch it to
  mega-menu width.
- Inner padding: `18px 20px`.
- **One column.** Each row is a flex line: `align-items: baseline`, `gap: 0`, `padding: 11px 0`,
  `border-top: 1px solid #B8B9B5` — uniform on every row (no verticals, no `gap:1px` lattice;
  both patterns have caused real bugs — see any page spec's grid rules). No rule after the last
  row of a group; the group label below provides the separation.
- Marker: mono 11px Graphite `#5F6466` in a `width: 28px; flex: none` block, so every name's
  left edge aligns.
- Name: **16px/600, −.015em, Ink** — the row's only voice.
- Group label: 11px/600, .14em, uppercase, Steel `#476776`; 20px above the group's first row,
  8px below the label.

Total panel height with five rows and two labels is roughly 300px — it should feel like a
compact index, not a page.

---

## 4. States and behavior

- **Trigger.** `Products` keeps its current type (15px/500). When the menu is open or the
  current page is any product page, it wears the existing active treatment: Ink text with
  `border-bottom: 2px solid #111111; padding-bottom: 2px`. Other nav items stay Graphite
  `#5F6466`. Add a `▾` caret at 9px Graphite, 6px after the label, rotating 180° when open —
  that is the **only** motion permitted in the header.
- **Open on hover** (pointer, ≥900px) with ~120ms open and ~200ms close delay so a diagonal
  mouse path doesn't dismiss it. **Also open on click / Enter / Space** — hover alone is not
  accessible.
- **Keyboard.** Trigger is a `<button aria-expanded aria-controls>`; the panel is a `<nav>` of
  real `<a>`s. Arrow keys move between items, `Escape` closes and returns focus to the trigger,
  `Tab` out closes. Visible focus ring on every item, in the site's convention.
- **Row hover/focus:** background goes Bond `#EFEFEB`, name stays Ink. Bleed the highlight to
  the panel's inner edges (`margin-inline: -20px; padding-inline: 20px`) so it reads as a full
  row. No underline-on-hover, no slide, no scale, no lift.
- **Current page:** its marker and name render in Ink with `aria-current="page"`. Do not hide
  the current page from the menu.
- Closes on outside click, `Escape`, and route change.

### Mobile / narrow (< 900px)
The header collapses to mark + wordmark + a `Menu` button (text, not a hamburger glyph — this
system uses no pictographic UI icons). The panel becomes a full-width in-flow disclosure below
the header: Paper fill, 1px Ink top rule, same two tiers, group labels, markers, and name-only
rows, one per line at `padding: 14px 0` for a 44px touch target. `Book a demo` is the last item
at full CTA scale (Ink fill, 14px/600, 13×20 padding, 44px min-height). No off-canvas drawer, no
slide-in animation.

---

## 5. Prohibitions

- **No descriptors, taglines, or status tags on menu rows.**
- No icons or product glyphs in the menu — the glyphs are for page heroes, cross-product lists,
  and lockups; at 15px in a dense list they turn to mush.
- No rounded corners, shadows, gradients, or translucency on the panel.
- No promo tile, screenshot, thumbnail, "New" badge, or marketing image.
- No red anywhere in the header except the plate inside the Construction OS mark.
- No mega-menu columns, no third tier, no nested submenus.

---

## 6. Links audit — do this in the same pass

Every product page currently renders its nav and cross-links as static text. Wire them all:

| Link text | Destination |
|---|---|
| Book a demo (header, hero, closing) | the site's demo route/modal |
| Explore Document Workbench → | `/products/document-workbench` |
| Explore Construction Intelligence → | `/products/construction-intelligence` |
| Explore Project Intelligence → | `/products/project-intelligence` |
| Explore Operations Automation → | `/products/operations-automation` |
| Explore Construction OS → | `/#products` (homepage products section) |
| Footer product list (5 items) | the five product routes |
| Footer: Work · Services · About | their routes |
| justin@justinyurasits.com | `mailto:` |
| LinkedIn · Privacy · Terms | their destinations |

Rules for these links: **the current page's own name is never a link** — in the footer product
list and in any cross-product section it renders as Ink-weight plain text (in the nav it is a
row with `aria-current="page"`). In-page secondary CTAs ("See an answer", "See it work", "See
example workflows", "See how we work", "See the attention view") are same-page anchors to the
section named in that page's spec. Global `a`/`a:hover` colors are Steel `#476776` → Ink
`#111111`; every link and CTA needs a visible keyboard focus ring.

---

## 7. Acceptance check

1. Menu rows show the product name only — no descriptor, tagline, tag, or sentence anywhere in
   the panel.
2. The panel never causes horizontal overflow at 375px, 800px, or 1440px, open or closed.
3. Extension-layer items show `——`, never `04`/`05`; both group labels are present and the tiers
   are separated.
4. Menu opens on hover **and** click; `Escape` closes and restores focus; arrow keys navigate;
   `aria-expanded` tracks state; the current product row carries `aria-current="page"`.
5. Square corners, no shadow, top edge flush with the header's bottom rule.
6. The caret is the only animated element in the header.
7. Every link in §6 resolves, and no page links to itself. Nothing links to `/products` — that
   route does not exist.
