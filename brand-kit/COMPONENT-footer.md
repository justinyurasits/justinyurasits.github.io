# Component spec — Site footer

**Applies to:** every page on the site. The footer is one shared component — change it here, not
per page.

Read with `CONSTRUCTION-OS-BRAND-KIT.md` and **`COMPONENT-header-nav.md`** (the footer's link set
must match the nav's). The rollout mechanics — which branch to build, the review gate, the page
manifest — are in **`WORKORDER-header-rollout.md`**; this file is the footer's design and content
contract.

**Design reference:** `Site Footer.dc.html`. It takes exactly the five inputs in §3.

---

## 1. The rule: one footer

There must be exactly **one** copy of the footer's markup, one copy of its CSS, and one copy of
any script it needs when you're done. It is ~70 lines repeated on every page — the same
divergence risk the header had, one section lower. Same branch decision as the header (build-step
partial, or a single JS-rendered block, or a committed generator writing between
`<!-- footer:start -->` / `<!-- footer:end -->` markers). **Use the same branch you used for the
header.**

When it's in place, delete each page's own footer markup and footer CSS. If that empties a
`<style>` block, delete the block.

---

## 2. Structure

Four columns above a title block above a legal line. Full width, Paper `#FFFFFF`, with a **1px
`#B8B9B5` top rule** separating it from the page.

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ ▣ Construction OS      PRODUCTS            COMPANY         TALK TO US        │
│ Three products. One    01 Document…        Services        justin@…          │
│ construction           02 Construction…    About           LinkedIn          │
│ operating system.      03 Project…                                           │
│                        —— Operations…                                        │
│                        —— Custom Solutions                                   │
│                                                                              │
│ ┌──────────┬──────────────┬────────────┬────────┬────────────────┐           │
│ │ SHEET    │ PAGE         │ ISSUED     │ REV    │ STATUS         │           │
│ │ CONST OS │ SERVICES     │ 2026-09-06 │ 01     │ ISSUED FOR REV │           │
│ └──────────┴──────────────┴────────────┴────────┴────────────────┘           │
│ © 2026 Justin Yurasits. All rights reserved.        Privacy    Terms         │
└───────────────────────────────────────────────────────────────────────────────┘
```

Container: `max-width:1280px; margin:0 auto; padding:56px clamp(24px,6vw,96px) 0`.

Column grid: `repeat(auto-fit, minmax(min(200px,100%),1fr))`, `gap:40px`, `padding-bottom:48px`.
**Four columns is the intent; wrapping to three or two at narrow widths is expected and fine** —
"Talk to us" dropping to its own row below ~1000px is correct behavior, not a defect. Do not
switch to fixed columns or add breakpoint gymnastics to prevent it.

⚠ Never floor a grid track at a bare px value — `minmax(200px,1fr)` overflows the page at phone
width. It reads `minmax(min(200px,100%),1fr)`. Same for the title block's `150px`.

### Column 1 — brand
Mark at 22px (with its red plate) + `Construction OS` at 17px/600, −.02em, 10px gap. Below, 14px/400
Graphite `#5F6466`, `max-width:30ch`: "Three products. One construction operating system."

**That tagline says three products on purpose** — the two extension layers are not counted. Don't
"correct" it to five.

### Columns 2–4 — link lists
Each has a heading: 11px/600, .14em, uppercase, Ink, `padding-bottom:12px`, over a **1px
`#B8B9B5` rule**. Items follow at `padding-top:12px`, 14px/500.

**Products** — five items, each a mono 11px Graphite marker + the name, 10px gap:

| Marker | Name | Route |
|---|---|---|
| 01 | Document Workbench | `/products/document-workbench` |
| 02 | Construction Intelligence | `/products/construction-intelligence` |
| 03 | Project Intelligence | `/products/project-intelligence` |
| —— | Operations Automation | `/products/operations-automation` |
| —— | Custom Solutions | `/products/custom-solutions` |

**The markers are load-bearing.** Extension-layer items use `——`, never `04`/`05` — same as the
nav menu, the hero tag rows, and every cross-product list on the site.

**Company** — `Services` → `/services`, `About` → `/about`. Two items, no markers.

**Talk to us** — the email at 17px/600, −.015em, with a **2px Ink bottom rule**,
`align-self:flex-start`, then `LinkedIn` at 14px/500 Graphite, `padding-top:14px`.

### ⚠ The link set must match the nav
The footer's five products are the nav menu's five products, same order, same markers. Company is
the nav's non-product items. Specifically:

- **There is no `Work` item.** No such page exists — it is not in the header, and not here.
- **There is no "Engagements".** That label is retired; it is `Services`.
- **Nothing links to `/products`** — there is no products index page.
- Email is **`justin@justinyurasits.com`**, the only address site-wide. Remove
  `hello@constructionos.com` wherever it appears.

If you add a page to the nav, add it here in the same commit. These two components are the pair
that has already drifted once.

### Title block
The drawing-set stamp, and the one piece that varies per page. `border:1px solid #111111`, five
cells in `repeat(auto-fit, minmax(min(150px,100%),1fr))`, each `padding:12px 16px` with a 1px
`#B8B9B5` right border (none on the last). Per cell: a label at 9px/600, .16em, uppercase,
Graphite, `padding-bottom:5px`, then the value in **mono 12px Ink**.

`SHEET` is always `CONSTRUCTION OS`. `PAGE`, `ISSUED`, `REV`, `STATUS` come from props (§3).

### Legal line
`padding:18px 0 40px`, a wrapping flex row, `justify-content:space-between`:

- left: **"© 2026 Justin Yurasits. All rights reserved."** — 13px/400 Graphite
- right: `Privacy` and `Terms`, 13px/400 Graphite, 24px gap → `/privacy`, `/terms`

Both legal pages need to exist. If the site runs analytics or a demo form that collects a name or
email, a privacy policy is required, not optional.

---

## 3. The five inputs

| Input | Type | Drives | Example |
|---|---|---|---|
| `current` | enum | which item renders Ink-weight instead of Graphite, and is not a link | `construction-intelligence` |
| `page` | string | the `PAGE` cell | `CONSTRUCTION INTELLIGENCE` |
| `issued` | string | the `ISSUED` cell | `2026-09-06` |
| `rev` | string | the `REV` cell | `03` |
| `status` | string | the `STATUS` cell | `ISSUED FOR REVIEW` |

`current` accepts `document-workbench` · `construction-intelligence` · `project-intelligence` ·
`operations-automation` · `custom-solutions` · `services` · `about` · `none`.

**`current` does exactly two things**: that item loses its Graphite `#5F6466` and renders Ink
`#111111`, and it renders as plain text rather than a link (with `aria-current="page"` on the
nav's matching row). Nothing else changes — no bold, no underline, no marker recolor.

Per-page values for the six built pages:

| Page | `current` | `page` | `issued` | `rev` | `status` |
|---|---|---|---|---|---|
| Document Workbench | `document-workbench` | DOCUMENT WORKBENCH | 2026-09-05 | 01 | ISSUED FOR REVIEW |
| Construction Intelligence | `construction-intelligence` | CONSTRUCTION INTELLIGENCE | 2026-09-06 | 03 | ISSUED FOR REVIEW |
| Project Intelligence | `project-intelligence` | PROJECT INTELLIGENCE | 2026-09-06 | 01 | **IN DEVELOPMENT** |
| Operations Automation | `operations-automation` | OPERATIONS AUTOMATION | 2026-09-06 | 01 | ISSUED FOR REVIEW |
| Custom Solutions | `custom-solutions` | CUSTOM SOLUTIONS | 2026-09-06 | 01 | ISSUED FOR REVIEW |
| Services | `services` | SERVICES | 2026-09-06 | 01 | ISSUED FOR REVIEW |

Home: `current: none`, `page: HOME`. About: `current: about`, `page: ABOUT`. Any other page
follows the same convention. Project Intelligence's `IN DEVELOPMENT` status is the only outlier —
it is deliberate, matching that product's maturity, and must not be normalized.

---

## 4. Behavior and prohibitions

- Every list item is a real `<a>`; the current page's item is plain text, not a disabled link.
- Hover/focus in the site's convention, quiet: Graphite → Ink on hover, no underline-on-hover
  appearing from nothing, no slide, no scale. Global `a`/`a:hover` are Steel `#476776` → Ink
  `#111111`; every link needs a visible keyboard focus ring.
- Semantics: `<footer>`, `<nav>` around each link column with its heading as the accessible name,
  `<ul>`/`<li>` for the lists.
- **No animation.** Nothing fades or slides in on scroll.
- **Never:** rounded corners (radius 0 everywhere), box shadows, gradients, a newsletter signup, a
  cookie banner in the footer, social icon rows (LinkedIn is a text link), app-store badges, a
  language selector, a sitemap link, a back-to-top button, awards or logo walls, or a second CTA
  button. The page's own closing CTA does that job.
- **No red** anywhere except the plate inside the Construction OS mark.
- No text lighter than `#5F6466` on Paper.

---

## 5. Optional additions — confirm before adding

Not in the current design; each needs a decision:

- **Business location** — one line under the tagline, e.g. "Boston, MA". Worth adding: geography
  is a trust signal for a services business selling to regional contractors.
- **Phone number** — under the email in Talk to us, 14px/500 Graphite.
- **Legal entity** in the copyright if you operate as an LLC.

Do not add these on your own initiative — ask.

---

## 6. Acceptance check

1. Footer markup appears in the repo **once** (or once per generator template); `grep` for the
   `Sheet` title-block label hits one file.
2. No page has its own footer markup or footer CSS.
3. `grep -r "Engagements"`, `grep -r "hello@constructionos.com"`, and
   `grep -rn 'href="/products"'` all return nothing. No `Work` item in header or footer.
4. Products column has five items with `01 02 03 —— ——`; Company has `Services` and `About`.
5. The footer's product list matches the nav menu's, in the same order.
6. Every page's `current`/`page`/`rev`/`status` matches §3, and the current page's footer item is
   Ink-weight plain text, not a link.
7. `document.documentElement.scrollWidth === clientWidth` at 375 / 800 / 1440px.
8. Four columns at ≥1000px; wrapping below that is expected and must not overflow or leave a
   stranded partial rule.
9. Legal line reads "© 2026 Justin Yurasits. All rights reserved." and Privacy + Terms resolve.
10. Tagline still says "Three products."
11. Zero rounded corners, zero shadows, zero gradients; no red outside the mark's plate.
