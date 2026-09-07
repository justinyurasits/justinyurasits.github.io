# Section spec — "Does any of this sound familiar?" (Punch list / 7a)

Implementation brief. Replaces the four bordered cards with four full-width rows and
closes the section with an answer strip. Pair with `CONSTRUCTION-OS-BRAND-KIT.md`
for tokens and the four concept icons.

---

## Copy — verbatim, nothing rewritten

All eight strings are exactly as they run today. Order is unchanged.

```
01  PAPERWORK
    "Your PMs spend their best hours producing paperwork."
    "Change orders, RFIs, meeting minutes, reports, submittals, billing documentation, contract packages."

02  KNOWLEDGE
    "Your best people are the only ones who know how the company works."
    "The senior PM everyone calls. The COO who answers every operational question. The estimator with thirty years of pricing judgment."

03  VISIBILITY
    "You're chasing people to figure out what needs attention."
    "Open changes, aging RFIs, missing approvals, unsigned contracts, schedule issues, unresolved decisions."

04  OPERATIONS
    "Too much routine operational work is still being done by hand."
    "Invoices and receipts get entered manually. Safety documentation gets assembled one form at a time. Field reports, bid comparisons, pay apps, and other repetitive workflows still depend on someone remembering to do them."
```

Heading: `Does any of this sound familiar?` — verbatim.

### New strings — all four are already on your site
The closing strip reuses the benefits band verbatim: `Less paperwork`,
`Fewer bottlenecks`, `Better visibility`, `Less repetitive work`.
Two labels are genuinely new and optional: the eyebrow `The current state` and the
right-aligned `Four places it shows up`. Delete both if you don't want new copy —
the section still reads.

---

## The structural idea

Paperwork / Knowledge / Visibility / Operations are the same four axes as the benefits
band, in the same order. So: number the rows 01–04, put the band's matching icon next
to each category, and end the section with the band's four phrases. The problem section
and the benefit section become one argument instead of two lists.

Icon → row mapping (files from the brand kit):

| Row | Category | Icon file |
|---|---|---|
| 01 | Paperwork | `svg/icon-less-paperwork.svg` |
| 02 | Knowledge | `svg/icon-fewer-bottlenecks.svg` |
| 03 | Visibility | `svg/icon-better-visibility.svg` |
| 04 | Operations | `svg/icon-less-repetitive-work.svg` |

**Red rule:** in the four problem rows the icons carry **no red** — nothing has changed
yet, so `--cos-hairline` renders Steel. In the closing Ink strip the same icons render
with their red element, because that strip is the delta. This is the only red in the
section.

---

## Row anatomy

Four columns, one grid, same tracks on every row:

```
46px            number, ui-monospace 12px, Graphite
minmax(160px,.7fr)  icon + category label
minmax(240px,1.3fr) statement — Archivo 600 22px
minmax(240px,1.3fr) detail — Archivo 400 15px, Graphite
column gap 28px
```

Because statement and detail sit side by side rather than stacked, the long Operations
detail no longer forces three empty cells to match it. Row height is just the taller of
two columns — no equalization anywhere.

---

## Type scale — exact

| Role | Font | Size | Weight | Tracking | Line height | Color |
|---|---|---|---|---|---|---|
| Eyebrow | Archivo | 12px | 600 | 0.16em, uppercase | 1 | Steel `#476776` |
| Heading | Archivo | 44px (clamp 30→44) | 600 | −0.035em | 1.02 | Ink `#111111` |
| Head right label | Archivo | 12px | 500 | 0.12em, uppercase | 1 | Graphite `#5F6466` |
| Row number | ui-monospace | 12px | 400 | 0 | 1 | Graphite `#5F6466` |
| Category label | Archivo | 12px | 600 | 0.14em, uppercase | 1 | Ink `#111111` |
| Statement | Archivo | 22px | 600 | −0.02em | 1.3 | Ink `#111111` |
| Detail | Archivo | 15px | 400 | 0 | 1.6 | Graphite `#5F6466` |
| Strip item | Archivo | 15px | 600 | −0.015em | 1 | Paper `#FFFFFF` |

Heading measure `18ch`. Graphite is the contrast floor — the current light gray detail
text is ≈2.5:1 and fails. No serif anywhere; no monospace beyond the row numbers
(if the stack has none, use Archivo 500 with `font-variant-numeric: tabular-nums`).

---

## Spacing

```
section padding        72px top / 76px bottom, 40px sides (24px under 900px)
head → rows            40px (the head's own 2px Ink rule sits 24px under the heading)
row padding            30px bottom on row 1; 30px top+bottom on rows 2-3; 30px top on row 4
row hairline           1px Line gray, full width, between rows only
number top offset      8px (sits on the statement's first baseline)
icon → category        12px
statement → detail     n/a (side by side); detail gets 4px top padding for baseline match
rows → answer strip    40px
strip cell padding     26px 24px, 1px Graphite rule between cells
```

Icon size in rows: **26px**, with structural stroke 9 and hairline 5 (the 24-and-under
step from the icon reduction table). Icons in the strip: 24px, same strokes.

---

## Markup

```html
<section class="cos-familiar">
  <header class="cos-familiar__head">
    <div>
      <p class="cos-eyebrow">The current state</p>
      <h2 class="cos-familiar__title">Does any of this sound familiar?</h2>
    </div>
    <p class="cos-familiar__count">Four places it shows up</p>
  </header>

  <div class="cos-familiar__rows">

    <article class="cos-pain">
      <span class="cos-pain__n">01</span>
      <p class="cos-pain__cat">
        <svg viewBox="0 0 100 100" width="26" height="26" aria-hidden="true">
          <polyline points="30,14 86,14 86,72" fill="none" stroke="var(--cos-hairline)" stroke-width="5"/>
          <rect x="14" y="26" width="52" height="60" fill="none" stroke="currentColor" stroke-width="9"/>
        </svg>
        Paperwork
      </p>
      <h3 class="cos-pain__stmt">Your PMs spend their best hours producing paperwork.</h3>
      <p class="cos-pain__detail">Change orders, RFIs, meeting minutes, reports, submittals,
        billing documentation, contract packages.</p>
    </article>
    <hr class="cos-rule">

    <!-- 02 Knowledge (bottlenecks icon), hr,
         03 Visibility (visibility icon), hr,
         04 Operations (repetitive icon) — same structure -->

  </div>

  <div class="cos-familiar__answer on-ink">
    <p><svg width="24" height="24" aria-hidden="true"><!-- paperwork icon --></svg>Less paperwork</p>
    <p><svg width="24" height="24" aria-hidden="true"><!-- bottlenecks icon --></svg>Fewer bottlenecks</p>
    <p><svg width="24" height="24" aria-hidden="true"><!-- visibility icon --></svg>Better visibility</p>
    <p><svg width="24" height="24" aria-hidden="true"><!-- repetitive icon --></svg>Less repetitive work</p>
  </div>
</section>
```

## CSS

```css
.cos-familiar { background: var(--cos-bond); padding: 72px 40px 76px;
  --cos-hairline: var(--cos-steel); }

.cos-familiar__head { display: grid; gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: end;
  border-bottom: 2px solid var(--cos-ink); padding-bottom: 24px; margin-bottom: 40px; }
.cos-eyebrow { margin: 0 0 14px; font: 600 12px/1 Archivo, sans-serif;
  letter-spacing: .16em; text-transform: uppercase; color: var(--cos-steel); }
.cos-familiar__title { margin: 0; max-width: 18ch;
  font: 600 clamp(30px, 4.6vw, 44px)/1.02 Archivo, sans-serif;
  letter-spacing: -.035em; color: var(--cos-ink); text-wrap: balance; }
.cos-familiar__count { margin: 0; font: 500 12px/1 Archivo, sans-serif;
  letter-spacing: .12em; text-transform: uppercase; color: var(--cos-graphite); }

.cos-pain { display: grid; column-gap: 28px; align-items: start;
  grid-template-columns: 46px minmax(160px, .7fr) minmax(240px, 1.3fr) minmax(240px, 1.3fr);
  padding: 30px 0; }
.cos-pain:first-child { padding-top: 0; }
.cos-pain:last-child  { padding-bottom: 0; }
.cos-rule { border: 0; height: 1px; background: var(--cos-line-gray); margin: 0; }

.cos-pain__n { padding-top: 8px; font: 400 12px/1 ui-monospace, monospace;
  color: var(--cos-graphite); font-variant-numeric: tabular-nums; }
.cos-pain__cat { margin: 0; padding-top: 4px; min-width: 0;
  display: flex; align-items: center; gap: 12px;
  font: 600 12px/1 Archivo, sans-serif; letter-spacing: .14em;
  text-transform: uppercase; color: var(--cos-ink); }
.cos-pain__cat svg { flex: none; }
.cos-pain__stmt { margin: 0; min-width: 0; font: 600 22px/1.3 Archivo, sans-serif;
  letter-spacing: -.02em; color: var(--cos-ink); text-wrap: pretty; }
.cos-pain__detail { margin: 0; padding-top: 4px; min-width: 0;
  font: 400 15px/1.6 Archivo, sans-serif; color: var(--cos-graphite); text-wrap: pretty; }

.cos-familiar__answer { margin-top: 40px; background: var(--cos-ink);
  display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
.cos-familiar__answer p { margin: 0; padding: 26px 24px;
  display: flex; align-items: center; gap: 14px;
  border-left: 1px solid var(--cos-graphite);
  font: 600 15px/1 Archivo, sans-serif; letter-spacing: -.015em; color: var(--cos-paper); }
.cos-familiar__answer p:first-child { border-left: 0; }
.cos-familiar__answer svg { flex: none; color: var(--cos-paper); }

@media (max-width: 900px) {
  .cos-familiar { padding: 56px 24px 64px; }
  .cos-pain { grid-template-columns: 1fr; row-gap: 14px; }
  .cos-pain__n { padding-top: 0; }
  .cos-familiar__answer p { border-left: 0; border-top: 1px solid var(--cos-graphite); }
  .cos-familiar__answer p:first-child { border-top: 0; }
}
```

On the answer strip, `.on-ink` (from the brand kit) flips `--cos-hairline` to Line gray
so the visibility icon's frame stays visible; the red element in each icon comes from
`--cos-revision` unchanged.

### Responsive
Four grid columns → one column per row at 900px, in the order number, category,
statement, detail. Hairlines stay between rows at every width. Nothing becomes a card.

---

## Don't

- No border, background fill, radius, or shadow on a row. Bond stays the surface.
- No red in rows 01–04. Red appears only in the answer strip's icons.
- No serif, no second family, and nothing lighter than Graphite for text.
- Don't stack statement over detail — that's what forced the ragged card bottoms.
- Don't set the four statements at different sizes to create emphasis; they're equal claims.
- No hover states — none of these are links.
- Don't drop the answer strip. Without it the section asks a question and walks away.

---

## Acceptance check

1. Zero card borders; the only lines are three row hairlines and one 2px Ink head rule.
2. Rows 01–04 in order, each with the icon that matches its benefits-band counterpart.
3. Statement and detail sit side by side on desktop; no row has empty space below its text.
4. No text lighter than `#5F6466` — including the row numerals; no serif in the section.
   Line gray is for hairlines only; on Bond it reads at ~1.7:1 and disappears.
5. Red appears in exactly four places, all inside the Ink answer strip.
6. Heading is 44px max, tracked −0.035em, breaking at ~18 characters.
7. At 375px each row stacks to four stacked blocks and the strip becomes four stacked cells.
