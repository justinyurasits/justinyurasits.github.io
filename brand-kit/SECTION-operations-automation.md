# Section spec — "Operations Automation" (Module ledger / 6a)

Implementation brief. Keeps the layout you already have — left rail, two columns of
three — and fixes the type hierarchy, the numbering, the rules, and the trailing
bottom third. Pair with `CONSTRUCTION-OS-BRAND-KIT.md` for tokens.

---

## Copy — unchanged, with one mechanical join

Every string below is **verbatim from the live section**. The only edit is a join:
the third line of each item (the pale gray one) becomes the **second sentence of the
same paragraph**, separated by a single space. Nothing is cut and nothing is reworded.

```
Invoice Intake
  "Stop rekeying invoices and receipts." + " " + "Get structured cost data ready for review."
Field Reports
  "Stop reconstructing the day at 5 PM." + " " + "Turn voice notes into a finished daily report."
Change Order Drafting
  "Capture the change while the details are fresh." + " " + "Turn field notes into a professional change-order draft."
Site Safety
  "Stop building safety paperwork form by form." + " " + "Generate the required documentation from project conditions."
Bid Comparison
  "Stop comparing apples to oranges." + " " + "Normalize bids so scope gaps and exclusions stand out."
Subcontractor Compliance
  "Know who is cleared to work." + " " + "See who is missing COIs, W-9s, licenses, or waivers."
```

Rail copy, also verbatim: eyebrow `CONSTRUCTION OS / EXTENSION LAYER`, heading
`Operations Automation`, lead `Automate the repetitive work around the job.`, body
`Construction OS can be extended with purpose-built automations for the workflows your
team still handles by hand—from invoices and field reports to billing, compliance, and
client decisions.`

### Two strings are NEW — approve or delete
These are the only additions. They exist to close the section's dead bottom third;
if you don't want new copy, delete both and the section still works.

1. Rail figure: **"6"** + `modules live today — turned on per company`
2. Footer row: `Modules run on your templates, your rates, and your approval chain.`
   and the link `See the extension layer`

---

## Numbering — renumber only, don't move anything

Module positions on screen stay exactly where they are. Today the numerals run
01, 03, 05 down the left and 02, 04, 06 down the right, which pairs items across a
gutter the eye never crosses. Renumber **down each column**:

| Position | Module | Was | Becomes |
|---|---|---|---|
| Left 1 | Invoice Intake | 01 | 01 |
| Left 2 | Field Reports | 03 | 02 |
| Left 3 | Change Order Drafting | 05 | 03 |
| Right 1 | Site Safety | 02 | 04 |
| Right 2 | Bid Comparison | 04 | 05 |
| Right 3 | Subcontractor Compliance | 06 | 06 |

---

## Type scale — exact

| Role | Font | Size | Weight | Tracking | Line height | Color |
|---|---|---|---|---|---|---|
| Eyebrow | Archivo | 12px | 600 | 0.14em, uppercase | 1 | Steel `#476776` |
| Heading | Archivo | 42px (clamp 30→42) | 600 | −0.035em | 1.04 | Ink `#111111` |
| Lead | Archivo | 19px | 500 | −0.015em | 1.4 | Ink `#111111` |
| Rail body | Archivo | 15px | 400 | 0 | 1.6 | Graphite `#5F6466` |
| Rail figure ("6") | Archivo | 34px | 600 | −0.03em | 1 | Ink `#111111` |
| Rail figure label | Archivo | 12px | 500 | 0.12em, uppercase | 1.4 | Graphite `#5F6466` |
| Module name | Archivo | 18px | 600 | −0.015em | 1.25 | Ink `#111111` |
| Module paragraph | Archivo | 15px | 400 | 0 | 1.55 | Graphite `#5F6466` |
| Row number | ui-monospace | 12px | 400 | 0 | 1 | Line gray `#B8B9B5` |
| Footer note | Archivo | 14px | 500 | 0 | 1.5 | Graphite `#5F6466` |
| Footer link | Archivo | 14px | 600 | −0.01em | 1.5 | Ink, 2px Ink underline |

**Two content levels only** — 18px/600 name, 15px/400 paragraph. There is no third
level anywhere in this section. Measures: heading `14ch`, lead `26ch`, rail body `40ch`.
No monospace in the stack? Set numbers in Archivo 500 12px with
`font-variant-numeric: tabular-nums` — never add a family.

### Contrast floor
Graphite `#5F6466` (≈5.4:1 on Paper) is the lightest text permitted. The current pale
gray third line is ≈2.5:1 and fails. Line gray `#B8B9B5` is for hairlines and row
numbers only — never for a sentence.

---

## Structure & spacing

```
section padding             76px top, 0 bottom (footer row supplies the bottom), 40px sides
grid                        3 tracks: rail | col A | col B, gap 44px
eyebrow rule                1px Line gray, full width of the rail, 14px below the eyebrow
column head rule            2px Ink across each column, above the first row
row padding                 24px top (first row) / 26px, hairline between rows
row hairline                1px Line gray, full column width
number → text               16px, number nudged 6px down to sit on the name's baseline
name → paragraph            8px
vertical divider            1px Line gray on col B's left edge, 44px of padding inside it
footer rule                 56px below the last row, 1px Line gray, 22px/30px padding
```

The **stray stub after the eyebrow goes away**: it becomes a 1px hairline spanning the
full rail width, sitting under the eyebrow. Every rule in this section terminates at a
column edge — no floating line segments.

---

## Markup

```html
<section class="cos-ops">
  <div class="cos-ops__grid">

    <aside class="cos-ops__rail">
      <p class="cos-ops__eyebrow">
        <svg viewBox="0 0 100 100" width="16" height="16" aria-hidden="true">
          <polyline points="12,58 12,12 58,12" fill="none" stroke="currentColor" stroke-width="16"/>
          <polyline points="88,42 88,88 42,88" fill="none" stroke="currentColor" stroke-width="16"/>
        </svg>
        Construction OS / Extension layer
      </p>
      <h2 class="cos-ops__title">Operations Automation</h2>
      <p class="cos-ops__lead">Automate the repetitive work around the job.</p>
      <p class="cos-ops__body">Construction OS can be extended with purpose-built
        automations for the workflows your team still handles by hand&mdash;from invoices
        and field reports to billing, compliance, and client decisions.</p>
      <p class="cos-ops__figure"><b>6</b><span>modules live today<br>&mdash; turned on per company</span></p>
    </aside>

    <div class="cos-ops__col">
      <div class="cos-ops__cap"></div>
      <article class="cos-mod">
        <span class="cos-mod__n">01</span>
        <div>
          <h3 class="cos-mod__name">Invoice Intake</h3>
          <p class="cos-mod__copy">Stop rekeying invoices and receipts. Get structured cost data ready for review.</p>
        </div>
      </article>
      <hr class="cos-rule">
      <!-- 02 Field Reports, hr, 03 Change Order Drafting -->
    </div>

    <div class="cos-ops__col cos-ops__col--divided">
      <div class="cos-ops__cap"></div>
      <!-- 04 Site Safety, hr, 05 Bid Comparison, hr, 06 Subcontractor Compliance -->
    </div>

  </div>

  <footer class="cos-ops__foot">
    <p>Modules run on your templates, your rates, and your approval chain.</p>
    <a href="/extension-layer">See the extension layer</a>
  </footer>
</section>
```

## CSS

```css
.cos-ops { background: var(--cos-paper); padding: 76px 40px 0; }
.cos-ops__grid { display: grid; gap: 44px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: start; }

.cos-ops__rail { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.cos-ops__eyebrow { margin: 0; display: flex; align-items: center; gap: 12px;
  padding-bottom: 14px; border-bottom: 1px solid var(--cos-line-gray);
  font: 600 12px/1 Archivo, sans-serif; letter-spacing: .14em;
  text-transform: uppercase; color: var(--cos-steel); }
.cos-ops__title { margin: 0; max-width: 14ch;
  font: 600 clamp(30px, 4vw, 42px)/1.04 Archivo, sans-serif;
  letter-spacing: -.035em; color: var(--cos-ink); text-wrap: balance; }
.cos-ops__lead { margin: 0; max-width: 26ch; font: 500 19px/1.4 Archivo, sans-serif;
  letter-spacing: -.015em; color: var(--cos-ink); }
.cos-ops__body { margin: 0; max-width: 40ch; font: 400 15px/1.6 Archivo, sans-serif;
  color: var(--cos-graphite); text-wrap: pretty; }
.cos-ops__figure { margin: 8px 0 0; display: flex; align-items: baseline; gap: 10px; }
.cos-ops__figure b { font: 600 34px/1 Archivo, sans-serif; letter-spacing: -.03em;
  color: var(--cos-ink); }
.cos-ops__figure span { font: 500 12px/1.4 Archivo, sans-serif; letter-spacing: .12em;
  text-transform: uppercase; color: var(--cos-graphite); }

.cos-ops__col { display: flex; flex-direction: column; min-width: 0; }
.cos-ops__col--divided { border-left: 1px solid var(--cos-line-gray); padding-left: 44px; }
.cos-ops__cap { height: 2px; background: var(--cos-ink); }

.cos-mod { display: flex; gap: 16px; padding: 26px 0; }
.cos-mod:first-of-type { padding-top: 24px; }
.cos-mod__n { flex: none; padding-top: 6px; font: 400 12px/1 ui-monospace, monospace;
  color: var(--cos-line-gray); font-variant-numeric: tabular-nums; }
.cos-mod__name { margin: 0 0 8px; font: 600 18px/1.25 Archivo, sans-serif;
  letter-spacing: -.015em; color: var(--cos-ink); }
.cos-mod__copy { margin: 0; font: 400 15px/1.55 Archivo, sans-serif;
  color: var(--cos-graphite); text-wrap: pretty; }
.cos-rule { border: 0; height: 1px; background: var(--cos-line-gray); margin: 0; }

.cos-ops__foot { margin-top: 56px; padding: 22px 0 30px;
  border-top: 1px solid var(--cos-line-gray);
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px; flex-wrap: wrap; }
.cos-ops__foot p { margin: 0; font: 500 14px/1.5 Archivo, sans-serif; color: var(--cos-graphite); }
.cos-ops__foot a { font: 600 14px/1.5 Archivo, sans-serif; letter-spacing: -.01em;
  color: var(--cos-ink); text-decoration: none;
  border-bottom: 2px solid var(--cos-ink); padding-bottom: 3px; }
.cos-ops__foot a:hover { color: var(--cos-steel); border-bottom-color: var(--cos-steel); }

@media (max-width: 900px) {
  .cos-ops { padding: 56px 24px 0; }
  .cos-ops__col--divided { border-left: 0; padding-left: 0;
    border-top: 1px solid var(--cos-line-gray); margin-top: 8px; }
  .cos-ops__col--divided .cos-ops__cap { display: none; }
}
```

The 16px mark in the eyebrow is `svg/cos-mark-sm.svg` inheriting `currentColor`
(so it comes out Steel). Optional — the section is correct without it.

---

## Don't

- No card, border, radius, shadow, or background fill on a module. Hairlines only.
- No red in this section. It shows no measured delta, so revision red does not appear.
- No third type level. If a module needs more detail, it goes in the paragraph.
- No serif, and no second family for the numbers.
- No hover state on modules unless they are genuinely links; if they are, the only
  permitted change is the name going to Steel.
- Don't equalize row heights. The hairline sits directly under whatever the paragraph ends at.
- Don't let the section end on the last row — the footer rule is what closes it.

---

## Acceptance check

1. Numerals read 01, 02, 03 down the left and 04, 05, 06 down the right; no module moved.
2. Every module has exactly two type levels, and every original sentence is still present.
3. No text lighter than Graphite `#5F6466` anywhere.
4. One 1px vertical hairline between the columns; two 2px Ink caps, one per column.
5. The eyebrow's rule spans the full rail width — no floating stub.
6. Zero red pixels in the section.
7. The section ends with a hairline footer row, not with whitespace.
8. At 375px: one column, columns separated by a horizontal hairline, nothing overflows.
