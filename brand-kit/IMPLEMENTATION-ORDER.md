# Construction OS — implementation order

Give Claude Code this file plus the `brand-kit/` folder. Work top to bottom; each step
lands independently and nothing later depends on unfinished work above it.

---

## Step 0 — foundations (do this first, one commit)

1. Read `CONSTRUCTION-OS-BRAND-KIT.md` and install the tokens block verbatim as global
   CSS custom properties, including the `.on-ink` override.
2. Load Archivo 400/500/600 from Google Fonts. **Remove every serif declaration from the
   site's CSS** — the serif survives only inside generated-document renders.
3. Copy `brand-kit/svg/` into the app's asset directory. Wire the six SVGs as inline
   components (they must inherit `currentColor`; do not load them as `<img>`).
4. Add the shared primitives used by every section below:
   - `.cos-btn--primary` / `.cos-btn--ghost` (min-height 48px, no radius, no shadow)
   - `.cos-rule` hairline, `.cos-eyebrow`, and the `.cos-doc` artifact frame
     (1px Ink border, registration corners, bottom fade, footer bar) from the hero spec

**Global rules that apply everywhere — enforce these in review, not per section:**

- Seven colors only. Graphite `#5F6466` is the lightest permitted text; Line gray
  `#B8B9B5` is for hairlines and nothing else.
- Revision red `#C43230` appears only on a measured change, one element per graphic.
  Sections with no delta get zero red.
- Archivo only. No condensed face, no italics, no second family.
- No card borders, radii, shadows, gradients, or app-icon tiles. Rules do the structure.
- Two lineweights in any drawn element: structural and hairline.
- Icons and marks match the size of the type beside them (cap height of the adjacent text).

---

## Step 1 — sections, in this order

Each spec is self-contained: verbatim copy, exact type scale, spacing, markup, CSS,
responsive behaviour, don'ts, and an acceptance check. Do them one per PR.

| Order | Spec file | What changes |
|---|---|---|
| 1 | `SECTION-hero.md` | Headline measure (22ch — fixes the orphaned "back."), Archivo body, kicker without italics, CTAs reordered at 48px, artifact framed + captioned + page counter, fold anchored with the three product names |
| 2 | `SECTION-products.md` | Promise row becomes the numbered index (kills the duplicate introduction), prose down to two levels, proof figures to 28px, artifact frame replaces the fake paper shadow, "Next 02/03" rail |
| 3 | `SECTION-construction-intelligence.md` | Product 02 on the same system; artifact set as **product UI in Archivo, not serif**; sources rail ends on its own content; "What changes the answer" reversed to Ink |
| 4 | `SECTION-does-this-sound-familiar.md` | Four cards → four full-width rows, numbering fixed, category labels promoted, closing Ink answer strip |
| 5 | `SECTION-configured-around-your-company.md` | Three cards → ledger columns, numbering runs down each column, item 06 sized as the punchline |
| 6 | `SECTION-operations-automation.md` | Three type levels → two, contrast floor fixed, numbering fixed, section closed with a footer rule |

Product 03 (Project Intelligence) has no spec yet — build it from
`SECTION-construction-intelligence.md`, swapping the tag to `03 / ATTENTION`, the icon to
`icon-better-visibility.svg`, and the artifact to whatever the real Project Intelligence
surface is. Same rule applies: it's software, so it's Archivo.

---

## Step 2 — the taxonomy pass

The four concept icons are the page's spine, not decoration. After the sections are in,
verify one axis reads consistently everywhere it appears:

| Axis | Pain row | Benefits band | Product / layer | Icon |
|---|---|---|---|---|
| Documents | Paperwork | Less paperwork | 01 Document Workbench | `icon-less-paperwork.svg` |
| Knowledge | Knowledge | Fewer bottlenecks | 02 Construction Intelligence | `icon-fewer-bottlenecks.svg` |
| Attention | Visibility | Better visibility | 03 Project Intelligence | `icon-better-visibility.svg` |
| Operations | Operations | Less repetitive work | Operations Automation | `icon-less-repetitive-work.svg` |

Sizes: 27px beside a product name, 26px in a pain row, 24px in the benefits band,
14px in an index cell. Red appears on these icons **only** in the benefits band.

---

## Step 3 — content decisions that need a human

Don't let these get invented in code. Three specs flag them:

1. **Construction Intelligence proof row 1** has no figure. Ship a real number
   (procedures indexed / average time to an answer) or ship the row without a figure.
   The "4 cited sources" placeholder and its red flag must not go live.
2. **Operations Automation** adds two new strings — the "6 modules live today" figure and
   the footer line. Approve or delete.
3. **Configured around your company** needs a sixth Company-knowledge item; the spec
   carries a placeholder.

---

## Definition of done

Run each spec's own acceptance check, then these across the site:

- Zero serif characters outside a generated-document render.
- No text below `#5F6466`; no Line gray text anywhere.
- Every instance of `#C43230` sits on a measured before/after.
- No element has a border-radius, box-shadow, or gradient except the artifact crop fade.
- Every primary CTA is ≥48px tall and leads its pair.
- At 375px no section overflows, and no section's structure collapses into cards.
