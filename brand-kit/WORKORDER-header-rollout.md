# Work order — header rollout (read before editing any page)

You are implementing `COMPONENT-header-nav.md` across the whole site. The feedback we got back
says you started hand-editing nav markup, CSS, and JS page by page. **Stop and do it once.**
This file is the build order.

---

## 1. The rule: one header, one stylesheet block, one script

The header is a **shared component**. There must be exactly one copy of its markup, one copy of
its CSS, and one copy of its JS in the repo when you're done. Fourteen pages × four edits is
fourteen chances to diverge — and divergence is what caused the bug we already hit (one page
said `Engagements`, five said `Products · Services`).

Pick the branch that matches the repo:

**Branch A — there is a build step or templating (Astro/11ty/Next/Handlebars/PHP includes).**
Create one partial/component, e.g. `components/site-header.html` (or `.astro`/`.jsx`), taking a
single input: `active` — one of `work` · `products` · `services` · `about` · `none`. Every page
renders `<SiteHeader active="products" />` and contains **no nav markup of its own**.

**Branch B — plain static HTML with no build step.**
Do **not** hand-maintain 14 copies. Instead:
1. Put the header CSS in the shared stylesheet (one block, not per page).
2. Put the header markup + behavior in one file, `js/site-header.js`, that renders the header
   into a single placeholder element and reads its active state from a data attribute:
   ```html
   <div id="site-header" data-active="products"></div>
   <script src="/js/site-header.js" defer></script>
   ```
   The script owns the markup, the menu open/close, and the keyboard handling.
3. If a JS-rendered header is unacceptable (SEO/no-JS), then generate the markup with a
   one-off script that writes the same block into all 14 pages between
   `<!-- header:start -->` and `<!-- header:end -->` markers, and commit the generator. Never
   edit the block by hand afterwards — re-run the generator.

**Tell us which branch you took in your first reply.** If the repo has a build step, A is the
answer.

### Delete, don't patch
When the component is in place, remove from every page: the old nav `<ul>`/`<div>` markup, any
per-page nav CSS, any per-page mobile-toggle CSS, and any per-page nav JS. If a page ends up
with an empty `<style>` or `<script>` block, delete the block.

---

## 2. Page manifest — the `active` value for every page

| Page | `active` |
|---|---|
| `index.html` (home) | `none` |
| `products/document-workbench.html` | `products` |
| `products/construction-intelligence.html` | `products` |
| `products/project-intelligence.html` | `products` |
| `products/operations-automation.html` | `products` |
| `products/custom-solutions.html` | `products` |
| `services.html` | `services` |
| `about.html` | `about` |
| anything else (legal, 404, etc.) | `none` |

Adjust paths to the repo's actual filenames — the point is the mapping, not the paths. **Report
back the real list of 14 pages with the value you assigned each one**, so we can confirm nothing
was missed or mislabeled.

`active` does two things and nothing else: the matching top-level item renders Ink with a 2px Ink
bottom rule (others Graphite `#5F6466`), and on product pages the `Products` trigger also wears
that active treatment.

---

## 3. Nav label set — do not improvise

`Products` · `Services` · `About` + the `Book a demo` CTA. **No `Work` item** — that page does not exist; remove it from any header or footer that still has one.

- The third item is **`Services`**, routing to `/services`. It is **not** "Engagements" — that
  label existed in an earlier build and is retired. Search the repo for `Engagements` and
  replace every instance (header **and** the footer Company column).
- No other top-level items.

---

## 4. The Products menu — the only new behavior

Everything in `COMPONENT-header-nav.md` §2–§4 applies. The short version:

- Rows are **marker + product name only.** No descriptors, no taglines, no status tags, no
  icons. Five rows in two groups: `CORE PRODUCTS` (`01` `02` `03`) and `EXTENSION LAYER`
  (`——` `——`).
- Markers are load-bearing: extension-layer items use `——`, never `04`/`05`.
- Flat panel, `min(340px, calc(100vw - 48px))`, flush under the header's bottom rule, 1px Ink
  border with `border-top: 0`. Square corners, no shadow, no blur.
- Opens on hover (≥900px, ~120ms open / ~200ms close delay) **and** on click/Enter/Space.
  `Escape` closes and returns focus to the trigger. `aria-expanded` on the trigger,
  `aria-current="page"` on the current page's row.
- Row hover/focus: background Bond `#EFEFEB`, bled to the panel's inner edges.
- The caret is the only animated thing in the header.
- **There is no `/products` index route.** No `All products →` row, and nothing anywhere links
  to `/products`.

---

## 5. Footer + links, same pass

The footer is a component too — same branch decision, same "one copy" rule. It is ~70 lines
repeated on every page, so hand-maintaining it has exactly the divergence risk the header had.

It takes **five inputs**, all of which vary per page:

| Input | What it drives | Example |
|---|---|---|
| `current` | which item renders Ink-weight instead of Graphite, and gets no link | `construction-intelligence` |
| `page` | the title block's `PAGE` cell | `CONSTRUCTION INTELLIGENCE` |
| `issued` | the `ISSUED` cell | `2026-09-06` |
| `rev` | the `REV` cell | `03` |
| `status` | the `STATUS` cell | `ISSUED FOR REVIEW` |

`current` accepts any of `document-workbench` · `construction-intelligence` ·
`project-intelligence` · `operations-automation` · `custom-solutions` · `services` · `about` ·
`none`. Everything else in the footer is identical on every page.

Per-page values for the six built pages:

| Page | `current` | `page` | `issued` | `rev` | `status` |
|---|---|---|---|---|---|
| Document Workbench | `document-workbench` | DOCUMENT WORKBENCH | 2026-09-05 | 01 | ISSUED FOR REVIEW |
| Construction Intelligence | `construction-intelligence` | CONSTRUCTION INTELLIGENCE | 2026-09-06 | 03 | ISSUED FOR REVIEW |
| Project Intelligence | `project-intelligence` | PROJECT INTELLIGENCE | 2026-09-06 | 01 | **IN DEVELOPMENT** |
| Operations Automation | `operations-automation` | OPERATIONS AUTOMATION | 2026-09-06 | 01 | ISSUED FOR REVIEW |
| Custom Solutions | `custom-solutions` | CUSTOM SOLUTIONS | 2026-09-06 | 01 | ISSUED FOR REVIEW |
| Services | `services` | SERVICES | 2026-09-06 | 01 | ISSUED FOR REVIEW |

Home, about and any other page: `current` per the manifest in §2, `page` set to that
page's name, and the same issued/rev/status convention.

Content rules:

- Products column lists **five** items: `01` Document Workbench · `02` Construction
  Intelligence · `03` Project Intelligence · `——` Operations Automation · `——` Custom
  Solutions.
- Company column is `Services` · `About`.
- Tagline stays "Three products. One construction operating system." — the two extension layers
  are not counted as products.
- Wire every link per `COMPONENT-header-nav.md` §6, and honor the rule that **the current page
  never links to itself** — Ink-weight plain text in the footer product list, `aria-current` in
  the nav.
- **Contact email is `justin@justinyurasits.com`, site-wide.** It is the only address; remove
  `hello@constructionos.com` wherever it appears.
- Legal line reads **"© 2026 Justin Yurasits. All rights reserved."**
- Add **Privacy Policy** and **Terms** links to the legal row. If the site runs analytics or a
  demo form that collects names or email addresses, the privacy policy is required, not optional.

The design reference is `Site Footer.dc.html`, which takes exactly these five props. **Full
footer spec: `COMPONENT-footer.md`** — geometry, the link set, the title block, prohibitions, and
its own acceptance check.

---

## 6. Order of work

1. Decide the branch. Say which one.
2. Build the header component + its CSS/JS in one place. Get it right on one page.
3. Build the footer component the same way — five inputs, per §5.
4. Swap all 14 pages to both components and **delete** their old markup/CSS/JS.
5. Run the checks in §7 and report the results.

Do not start step 4 until steps 2–3 are reviewed — that's the step that costs us if the pattern
is wrong.

---

## 7. Checks to report back

1. `grep -r "Engagements"` returns nothing.
2. `grep -r "All products"` and `grep -rn 'href="/products"'` return nothing.
3. Header markup appears in the repo **once** (or once per generator template). Same for the
   footer — `grep` for the footer's title-block label `Sheet` should hit one file.
4. No page has its own nav CSS, nav JS, or footer markup.
5. Every page's `active` value matches the manifest, the current top-level item is
   Ink-underlined, and the footer's `page`/`rev`/`status` cells match §5.
6. Menu opens on hover and click; `Escape` closes and restores focus; arrows navigate;
   `aria-expanded` tracks state.
7. `document.documentElement.scrollWidth === clientWidth` at 375 / 800 / 1440px with the menu
   both closed and open.
8. Extension-layer rows show `——` in both the menu and the footer.
9. No page links to itself.

---

## 8. If something here conflicts with the page specs

`COMPONENT-header-nav.md` wins for the header and the links audit. The page specs
(`PAGE-*.md`) win for their own body content. The prototypes (`*.dc.html`) are design
references — the header block inside them was replaced by a shared component too, so if you see
an old flat header in an older prototype, ignore it.
