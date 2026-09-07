# Section spec — Products (Indexed / 9a)

Implementation brief for the "Construction OS — three products" section. Fixes the
duplicate introduction, the flat prose hierarchy, the buried proof stats, and the
artifact treatment. Pair with `CONSTRUCTION-OS-BRAND-KIT.md` for tokens and the mark.

---

## Copy — verbatim

```
Masthead
  "Construction OS"
  "Three products. One construction operating system."

Index row (three cells)
  DOCUMENTS   "Produce the documents."        → Document Workbench
  KNOWLEDGE   "Get the right answer."          → Construction Intelligence
  ATTENTION   "Know what needs attention."     → Project Intelligence

Product 01
  "Document Workbench"
  "Produce the documents that run the job."
  "From first walkthrough through closeout, turn project information into
   company-standard construction documents without starting from scratch every time."
  "Spend less time producing paperwork and more time managing the job."

CTAs
  "Explore Document Workbench →"   (primary — promoted)
  "See it work"                    (text link — demoted)

Proof
  "150+ standard document types" / "Across the full construction lifecycle"
  "4–8 hours → ~30 minutes"      / "Initial contract package preparation"
  "Built around how your company works" /
    "Your templates, scope language, pricing structure, and terminology"
```

### The one copy decision to make
The two sentences `From first walkthrough…` and `Spend less time producing paperwork…`
are joined into one paragraph (verbatim, space-separated) so the block has two levels
instead of three. **Or** cut the second sentence entirely — the lead line
"Produce the documents that run the job." already makes that promise. Joining is the
safe default; both are implemented identically apart from that.

### New strings — all optional
Artifact caption `EXHIBIT A — SCOPE OF WORK` / `REV. 2 · COST-PLUS W/ GMP`, crop footer
`Page 1 of 6 · Residential renovation` + `Open the full exhibit`, and the closing rail
label `Next`. Use your real document values.

---

## Fix 1 — the index (the important one)

Today the Documents / Knowledge / Attention row and the numbered products below are the
**same three things introduced twice under different names**, with nothing tying them
together. Convert the row into the section's index:

Each cell becomes: number `01` + layer label `DOCUMENTS` (Steel, uppercase) + the promise
at 20px/600 + the product name at 13px/500 in Graphite. Cells are separated by 1px
Line gray verticals; the row sits under a 2px Ink rule and over a 1px Line gray rule.

Each cell should anchor-link to its product block (`#product-01` etc.), and each product
block repeats its `01 —— DOCUMENTS` tag at the top so the pairing is unmistakable.

---

## Fix 2 — hierarchy inside the product block

Five stacked blocks at similar sizes become four with distinct jobs:

| Order | Element | Size / weight |
|---|---|---|
| 1 | Tag: `01` + 40px rule + `DOCUMENTS` | mono 12px + Archivo 11px/600, 0.16em, Steel |
| 2 | Product name | 38px/600, −0.032em |
| 3 | Lead line | 20px/500, −0.015em, Ink, max 30ch |
| 4 | Paragraph (the two joined sentences) | 16px/400, 1.6, Graphite, max 46ch |
| 5 | CTA row | primary button + text link |
| 6 | Proof table | see below |

---

## Fix 3 — promote the proof

The three proof rows are the most persuasive lines in the section and are currently the
smallest type on screen. Rebuild as a bordered list under a 2px Ink rule:

```
row 1   "150+ standard document types"        28px/600, −0.03em, Ink
        "Across the full construction lifecycle"   14px/400, Graphite
row 2   "4–8 hours"  Ink 28px  +  "→ ~30 minutes"  Revision red 28px
        "Initial contract package preparation"     14px/400, Graphite
row 3   "Built around how your company works"      20px/600, −0.02em, Ink
        "Your templates, scope language, pricing structure, and terminology"  14px/400
```

Rows separated by 1px Line gray, 22px top / 20px bottom padding each.

**Red rule:** `→ ~30 minutes` is the only red in the section, and it is correct as-is —
a measured delta, red on the after-value only, never on the before-value or the label.
Do not extend red to the other two rows; they state no delta.

---

## Fix 4 — the artifact

Remove the offset panel behind the document. It fakes stacked paper and is the only soft
edge in the whole system. Replace with the same treatment as the hero:

- 1px Ink frame, Paper fill, fixed height **560px**, `overflow: hidden`
- 14px registration corners in Line gray, top-right and bottom-left
- Mono caption above the frame: sheet name left, revision/contract type right in Steel
- 88px white gradient fade at the bottom, then a footer bar:
  `Page 1 of 6 · Residential renovation` + `Open the full exhibit`

Inside, the real render at natural width, top-aligned, two-pane (scope left, side panels
right) exactly as it is now. Never scale it down to fit; the crop is the point, and the
counter is what makes the crop legible as page 1 of 6 rather than a broken layout.

---

## Fix 5 — CTAs and the closing rail

`Explore Document Workbench →` is the specific action, so it takes the Ink button at
48px minimum. `See it work` becomes a text link with a 2px Ink underline — it duplicates
the hero's primary and shouldn't compete here.

Close the block with a hairline rail: label `Next` in Graphite on the left, then
`02 Construction Intelligence` and `03 Project Intelligence` on the right. Without it,
the section reads as if it ends after one product.

---

## Type scale — exact

| Role | Font | Size | Weight | Tracking | Line height | Color |
|---|---|---|---|---|---|---|
| Masthead | Archivo | 52px (clamp 34→52) | 600 | −0.035em | 1 | Ink |
| Masthead sub | Archivo | 20px | 500 | −0.015em | 1.4 | Graphite |
| Index number | ui-monospace | 12px | 400 | 0 | 1 | Ink |
| Index layer label | Archivo | 11px | 600 | 0.16em, uppercase | 1 | Steel |
| Index promise | Archivo | 20px | 600 | −0.02em | 1.25 | Ink |
| Index product name | Archivo | 13px | 500 | −0.005em | 1 | Graphite |
| Product name | Archivo | 38px (clamp 28→38) | 600 | −0.032em | 1.05 | Ink |
| Lead line | Archivo | 20px | 500 | −0.015em | 1.4 | Ink |
| Paragraph | Archivo | 16px | 400 | 0 | 1.6 | Graphite |
| Proof figure | Archivo | 28px | 600 | −0.03em | 1.1 | Ink (delta: `#C43230`) |
| Proof caption | Archivo | 14px | 400 | 0 | 1.5 | Graphite |
| Button / link | Archivo | 15px | 600 | −0.01em | 1 | — |
| Doc caption / counter | ui-monospace | 11px | 400 | 0.04em / 0 | 1 | Graphite / Steel |

Archivo only. The serif goes — it lives inside the document artifact, which is exactly
why the page copy must not be serif.

---

## Layout & spacing

```
section padding      64px top / 76px bottom, 40px sides (24px under 900px)
masthead → index     30px   (mark at 28px beside the title, 16px gap)
index cells          20px top / 22px bottom, 28px horizontal, 1px Line gray verticals
index → product      18px above the two-column grid
grid                 repeat(auto-fit, minmax(340px, 1fr)), gap 48px, align-items: start
left column gap      26px between tag / name+lead / paragraph / CTA / proof table
name → lead          14px (inside one flex group)
proof table          2px Ink top rule; rows 22px/20px, 1px Line gray between
caption → frame      12px
closing rail         1px Line gray top rule, 22px padding
```

---

## Markup skeleton

```html
<section class="cos-products">
  <header class="cos-products__head">
    <h2><svg class="cos-mark" width="28" height="28">…</svg>Construction OS</h2>
    <p>Three products. One construction operating system.</p>
  </header>

  <ol class="cos-index">
    <li><a href="#product-01">
      <span class="cos-index__n">01</span><span class="cos-index__layer">Documents</span>
      <span class="cos-index__promise">Produce the documents.</span>
      <span class="cos-index__product">Document Workbench</span>
    </a></li>
    <!-- 02 Knowledge / Construction Intelligence,
         03 Attention / Project Intelligence -->
  </ol>

  <div class="cos-product" id="product-01">
    <div class="cos-product__col">
      <p class="cos-product__tag"><span>01</span><i></i>Documents</p>
      <div>
        <h3 class="cos-product__name">Document Workbench</h3>
        <p class="cos-product__lead">Produce the documents that run the job.</p>
      </div>
      <p class="cos-product__body">From first walkthrough through closeout, turn project
        information into company-standard construction documents without starting from
        scratch every time. Spend less time producing paperwork and more time managing the job.</p>
      <p class="cos-product__cta">
        <a class="cos-btn cos-btn--primary" href="/document-workbench">Explore Document Workbench &rarr;</a>
        <a class="cos-link" href="/demo">See it work</a>
      </p>
      <dl class="cos-proof">
        <div><dt>150+ standard document types</dt><dd>Across the full construction lifecycle</dd></div>
        <div><dt><b>4&ndash;8 hours</b> <b class="is-delta">&rarr; ~30 minutes</b></dt>
             <dd>Initial contract package preparation</dd></div>
        <div><dt class="is-sm">Built around how your company works</dt>
             <dd>Your templates, scope language, pricing structure, and terminology</dd></div>
      </dl>
    </div>

    <figure class="cos-product__doc">
      <figcaption><span>Exhibit A &mdash; Scope of Work</span><span class="is-steel">Rev. 2 &middot; Cost-plus w/ GMP</span></figcaption>
      <div class="cos-doc">
        <span class="cos-doc__corner cos-doc__corner--tr"></span>
        <span class="cos-doc__corner cos-doc__corner--bl"></span>
        <!-- real two-pane document render -->
        <span class="cos-doc__fade"></span>
        <div class="cos-doc__foot">
          <span>Page 1 of 6 &middot; Residential renovation</span>
          <a href="/exhibit">Open the full exhibit</a>
        </div>
      </div>
    </figure>
  </div>

  <nav class="cos-products__next">
    <span>Next</span>
    <a href="#product-02"><i>02</i>Construction Intelligence</a>
    <a href="#product-03"><i>03</i>Project Intelligence</a>
  </nav>
</section>
```

## CSS

```css
.cos-products { background: var(--cos-bond); padding: 64px 40px 76px; }

.cos-products__head h2 { margin: 0 0 12px; display: flex; align-items: center; gap: 16px;
  font: 600 clamp(34px, 5vw, 52px)/1 Archivo, sans-serif;
  letter-spacing: -.035em; color: var(--cos-ink); }
.cos-products__head p { margin: 0; font: 500 20px/1.4 Archivo, sans-serif;
  letter-spacing: -.015em; color: var(--cos-graphite); }

.cos-index { list-style: none; margin: 30px 0 0; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  border-top: 2px solid var(--cos-ink); border-bottom: 1px solid var(--cos-line-gray); }
.cos-index a { display: flex; flex-direction: column; gap: 12px;
  padding: 20px 28px 22px; border-left: 1px solid var(--cos-line-gray);
  text-decoration: none; }
.cos-index li:first-child a { padding-left: 0; border-left: 0; }
.cos-index__n { font: 400 12px/1 ui-monospace, monospace; color: var(--cos-ink); }
.cos-index__layer { font: 600 11px/1 Archivo, sans-serif; letter-spacing: .16em;
  text-transform: uppercase; color: var(--cos-steel); }
.cos-index__promise { font: 600 20px/1.25 Archivo, sans-serif;
  letter-spacing: -.02em; color: var(--cos-ink); }
.cos-index__product { font: 500 13px/1 Archivo, sans-serif; color: var(--cos-graphite); }
.cos-index a:hover .cos-index__promise { color: var(--cos-steel); }

.cos-product { display: grid; gap: 48px; padding-top: 18px;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); align-items: start; }
.cos-product__col { display: flex; flex-direction: column; gap: 26px; min-width: 0; }
.cos-product__tag { margin: 0; display: flex; align-items: center; gap: 12px;
  font: 600 11px/1 Archivo, sans-serif; letter-spacing: .16em;
  text-transform: uppercase; color: var(--cos-steel); }
.cos-product__tag span { font: 400 12px/1 ui-monospace, monospace; color: var(--cos-graphite);
  letter-spacing: 0; }
.cos-product__tag i { width: 40px; height: 1px; background: var(--cos-ink); }
.cos-product__name { margin: 0 0 14px; font: 600 clamp(28px, 3.6vw, 38px)/1.05 Archivo, sans-serif;
  letter-spacing: -.032em; color: var(--cos-ink); }
.cos-product__lead { margin: 0; max-width: 30ch; font: 500 20px/1.4 Archivo, sans-serif;
  letter-spacing: -.015em; color: var(--cos-ink); }
.cos-product__body { margin: 0; max-width: 46ch; font: 400 16px/1.6 Archivo, sans-serif;
  color: var(--cos-graphite); text-wrap: pretty; }
.cos-product__cta { margin: 0; display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }

.cos-proof { margin: 0; border-top: 2px solid var(--cos-ink); }
.cos-proof > div { padding: 22px 0 20px; border-bottom: 1px solid var(--cos-line-gray); }
.cos-proof > div:last-child { border-bottom: 0; padding-bottom: 0; }
.cos-proof dt { margin: 0 0 6px; font: 600 28px/1.1 Archivo, sans-serif;
  letter-spacing: -.03em; color: var(--cos-ink); }
.cos-proof dt.is-sm { font-size: 20px; letter-spacing: -.02em; line-height: 1.25; }
.cos-proof dt .is-delta { color: var(--cos-revision); }
.cos-proof dd { margin: 0; font: 400 14px/1.5 Archivo, sans-serif; color: var(--cos-graphite); }

.cos-doc { position: relative; height: 560px; overflow: hidden;
  border: 1px solid var(--cos-ink); background: var(--cos-paper); }
/* corners, fade, foot: identical to the hero spec */

.cos-products__next { margin-top: 30px; padding-top: 22px;
  border-top: 1px solid var(--cos-line-gray);
  display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.cos-products__next span { font: 500 12px/1 Archivo, sans-serif; letter-spacing: .12em;
  text-transform: uppercase; color: var(--cos-graphite); }
.cos-products__next a { display: flex; align-items: baseline; gap: 10px;
  font: 600 15px/1 Archivo, sans-serif; letter-spacing: -.015em;
  color: var(--cos-ink); text-decoration: none; }
.cos-products__next i { font: 400 12px/1 ui-monospace, monospace;
  font-style: normal; color: var(--cos-graphite); }

@media (max-width: 900px) {
  .cos-products { padding: 56px 24px 64px; }
  .cos-index a { padding-left: 0; border-left: 0;
    border-top: 1px solid var(--cos-line-gray); }
  .cos-index li:first-child a { border-top: 0; }
  .cos-doc { height: 420px; }
}
```

### Responsive
Two columns → one; the artifact sits below the proof table and keeps its fade and
counter at 420px tall. Index cells stack with horizontal hairlines. Nothing becomes a card.

---

## Don't

- No offset panel, shadow, radius, or gradient behind the artifact — only the crop fade.
- No serif and no italics outside the document render.
- No red beyond `→ ~30 minutes`. Not on "150+", not on the CTA, not on the index.
- Don't let the proof stats stay smaller than the body copy.
- Don't give "See it work" a button — one primary per product block.
- Don't repeat the Documents/Knowledge/Attention row as an unnumbered preamble.
- Don't end the section after product 01 with no forward reference.

---

## Acceptance check

1. The index row is numbered 01–03, names the product in each cell, and anchor-links to it.
2. Product 01's tag reads `01 —— DOCUMENTS`, matching index cell 01.
3. Exactly two prose levels in the product block: 20px lead and 16px paragraph.
4. Proof figures render at 28px; "150+ standard document types" is larger than the paragraph above it.
5. `→ ~30 minutes` is the only `#C43230` in the section.
6. The artifact has a 1px Ink frame, two registration corners, a mono caption, a fade,
   and a page counter — and no panel behind it.
7. No serif anywhere outside the document render.
8. The section ends with a "Next: 02 / 03" hairline rail.
9. At 375px nothing overflows and the document keeps its footer bar.


---

## Icon mapping — one icon set, four places

The four concept icons are not decoration for the benefits band; they are the page's
taxonomy. The same four axes appear in four sections, and each axis keeps its icon
everywhere it shows up:

| Axis | Pain section | Benefits band | Product / layer | Icon file |
|---|---|---|---|---|
| Documents | Paperwork | Less paperwork | 01 Document Workbench | `svg/icon-less-paperwork.svg` |
| Knowledge | Knowledge | Fewer bottlenecks | 02 Construction Intelligence | `svg/icon-fewer-bottlenecks.svg` |
| Attention | Visibility | Better visibility | 03 Project Intelligence | `svg/icon-better-visibility.svg` |
| Operations | Operations | Less repetitive work | Operations Automation (extension layer) | `svg/icon-less-repetitive-work.svg` |

The product icon sits **beside the product name at 27px** (cap height of the 38px name, structural stroke 9, hairline 4) — that is where it identifies the product. In the index cells it sits with the number and layer label at **14px**. It does not appear in the tag row; at label size it is too small to read as anything. Sizing rule: **an icon or mark matches the size of the type it sits beside** — 14px against the 11px label, and the 38px mark against the 52px masthead (its cap height). Anything larger competes with the type instead of tagging it:

```html
<p class="cos-product__tag">
  <span>01</span><i></i>
  <svg viewBox="0 0 100 100" width="14" height="14" aria-hidden="true">…</svg>
  Documents
</p>
```

The rule shortens from 40px to 28px to make room. Index cells switch from
`align-items: baseline` to `center` so the icon sits with the number and label.

Red rule is unchanged: these icons carry **no red** in the pain rows or the product tags —
only in the benefits band, where they state the change.
