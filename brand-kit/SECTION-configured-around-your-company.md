# Section spec — "Configured around your company" (Ledger / 5a)

Implementation brief. Replaces the three bordered cards with a rules-based ledger.
Uses only the Construction OS palette and Archivo. Pair this with
`CONSTRUCTION-OS-BRAND-KIT.md` for the tokens.

---

## Intent

This content is an **index of the customer's own material**, not three feature cards.
Cards imply parallel products; rules imply one continuous list, grouped. So: no card
borders, no shadows, no radius. Structure comes from
(a) full-height 1px hairlines between the three column groups,
(b) a 1px hairline between the two rows inside a group,
(c) a 2px Ink rule under the heading block that the columns hang from.

One red element in the whole section, on item 06 only — it is the delta between a
template and the customer's actual company. Nothing else is red.

---

## Content order — fix this first

The current numbering runs 01, 04 / 02, 03 / 05, 06 across the three cards, which
can't be followed. Number **down each column, left to right**:

| # | Item | Group |
|---|---|---|
| 01 | Your contract templates, scope language, and document standards | Documents & delivery |
| 02 | Your project phases, logs, and handoff process | Documents & delivery |
| 03 | Your pricing rules, markups, and rate cards | Pricing & operations |
| 04 | Your SOPs, approvals, and operating procedures | Pricing & operations |
| 05 | Your historical project knowledge and lessons learned | Company knowledge |
| 06 | The judgment your best people carry around in their heads | Company knowledge |

---

## Type scale — exact

| Role | Font | Size | Weight | Tracking | Line height | Color |
|---|---|---|---|---|---|---|
| Eyebrow ("Configuration") | Archivo | 12px | 600 | 0.16em, uppercase | 1 | Steel `#476776` |
| Heading | Archivo | 48px (clamp 32→48) | 600 | −0.035em | 1.02 | Ink `#111111` |
| Deck / subhead | Archivo | 18px | 400 | 0 | 1.5 | Graphite `#5F6466` |
| Group label | Archivo | 12px | 600 | 0.12em, uppercase | 1 | Ink `#111111` |
| Item | Archivo | 17px | 500 | −0.01em | 1.45 | Ink `#111111` |
| Item 06 (punchline) | Archivo | 22px | 600 | −0.02em | 1.3 | Ink `#111111` |
| Row number | ui-monospace | 12px | 400 | 0 | 1 | Line gray `#B8B9B5` (06: `#C43230`) |

Measure limits: heading `max-width: 15ch`, deck `max-width: 34ch`.
If there is no monospace in the stack, set the numbers in Archivo 500 12px with
`font-variant-numeric: tabular-nums` — do not introduce a new font family.

---

## Spacing

```
section padding            72px top / 80px bottom, 40px sides (24px sides under 768px)
heading block → columns    44px
heading block bottom rule  2px solid Ink, 26px above it
group label → first item   30px
item → hairline            26px
hairline → next item       26px
column gutter              36px each side of the 1px hairline (72px total between text)
number → item text         16px
group dot → label          10px
```

The 7×7px square before each group label is Ink; on the third group it is
Revision red `#C43230` — that is the single red cue that sets up item 06.

---

## Markup

```html
<section class="cos-config">
  <header class="cos-config__head">
    <div>
      <p class="cos-eyebrow">Configuration</p>
      <h2 class="cos-config__title">Configured around your company</h2>
    </div>
    <p class="cos-config__deck">
      Your company already has a way of working. Construction OS uses it.
    </p>
  </header>

  <div class="cos-config__cols">
    <div class="cos-group">
      <p class="cos-group__label"><span class="cos-group__dot"></span>Documents &amp; delivery</p>
      <div class="cos-row"><span class="cos-row__n">01</span>
        <p class="cos-row__t">Your contract templates, scope language, and document standards</p></div>
      <hr class="cos-rule">
      <div class="cos-row"><span class="cos-row__n">02</span>
        <p class="cos-row__t">Your project phases, logs, and handoff process</p></div>
    </div>

    <div class="cos-group">
      <p class="cos-group__label"><span class="cos-group__dot"></span>Pricing &amp; operations</p>
      <div class="cos-row"><span class="cos-row__n">03</span>
        <p class="cos-row__t">Your pricing rules, markups, and rate cards</p></div>
      <hr class="cos-rule">
      <div class="cos-row"><span class="cos-row__n">04</span>
        <p class="cos-row__t">Your SOPs, approvals, and operating procedures</p></div>
    </div>

    <div class="cos-group">
      <p class="cos-group__label"><span class="cos-group__dot cos-group__dot--rev"></span>Company knowledge</p>
      <div class="cos-row"><span class="cos-row__n">05</span>
        <p class="cos-row__t">Your historical project knowledge and lessons learned</p></div>
      <hr class="cos-rule">
      <div class="cos-row"><span class="cos-row__n cos-row__n--rev">06</span>
        <p class="cos-row__t cos-row__t--lead">The judgment your best people carry around in their heads</p></div>
    </div>
  </div>
</section>
```

## CSS

```css
.cos-config { background: var(--cos-bond); padding: 72px 40px 80px; }

.cos-config__head {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px; align-items: end;
  border-bottom: 2px solid var(--cos-ink); padding-bottom: 26px; margin-bottom: 44px;
}
.cos-eyebrow { margin: 0 0 16px; font: 600 12px/1 Archivo, sans-serif;
  letter-spacing: .16em; text-transform: uppercase; color: var(--cos-steel); }
.cos-config__title { margin: 0; max-width: 15ch;
  font: 600 clamp(32px, 4.4vw, 48px)/1.02 Archivo, sans-serif;
  letter-spacing: -.035em; color: var(--cos-ink); text-wrap: balance; }
.cos-config__deck { margin: 0; max-width: 34ch;
  font: 400 18px/1.5 Archivo, sans-serif; color: var(--cos-graphite); }

.cos-config__cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.cos-group { display: flex; flex-direction: column; padding: 0 36px;
  border-left: 1px solid var(--cos-line-gray); min-width: 0; }
.cos-group:first-child { padding-left: 0; border-left: 0; }
.cos-group:last-child { padding-right: 0; }

.cos-group__label { margin: 0 0 30px; display: flex; align-items: baseline; gap: 10px;
  font: 600 12px/1 Archivo, sans-serif; letter-spacing: .12em;
  text-transform: uppercase; color: var(--cos-ink); }
.cos-group__dot { width: 7px; height: 7px; flex: none; background: var(--cos-ink); }
.cos-group__dot--rev { background: var(--cos-revision); }

.cos-row { display: flex; gap: 16px; }
.cos-rule { border: 0; height: 1px; background: var(--cos-line-gray); margin: 26px 0; }
.cos-row__n { flex: none; padding-top: 5px; font: 400 12px/1 ui-monospace, monospace;
  color: var(--cos-line-gray); font-variant-numeric: tabular-nums; }
.cos-row__n--rev { color: var(--cos-revision); padding-top: 7px; }
.cos-row__t { margin: 0; font: 500 17px/1.45 Archivo, sans-serif;
  letter-spacing: -.01em; color: var(--cos-ink); text-wrap: pretty; }
.cos-row__t--lead { font: 600 22px/1.3 Archivo, sans-serif; letter-spacing: -.02em; }

@media (max-width: 900px) {
  .cos-config { padding: 56px 24px 64px; }
  .cos-group { padding: 32px 0; border-left: 0; border-top: 1px solid var(--cos-line-gray); }
  .cos-group:first-child { padding-top: 0; border-top: 0; }
}
```

### Responsive behaviour
Three columns → one column. When it stacks, the vertical hairline becomes a
**horizontal** hairline above each group (rules must never disappear — they are the
only structure). Group labels stay; nothing becomes a card at any width.

---

## Don't

- No border, radius, shadow, or background fill on the groups. The hairlines are the design.
- No red anywhere but the third group's dot and item 06's number.
- No third type size in the items — 17px for five of them, 22px for 06, nothing between.
- Don't center anything. Everything is flush left on the same grid as the heading.
- Don't equalize the two rows in a group to the same height; the hairline sits directly
  under the first item's last line, wherever that falls.
- No hover state on the rows — they aren't links. If any item becomes a link, the only
  change allowed is the item text going to Steel.

---

## Acceptance check

1. Numbers read 01–06 top-to-bottom, left-to-right.
2. Exactly two 1px vertical hairlines on desktop, exactly one 2px Ink rule under the heading.
3. Item 06 is visibly larger and heavier than items 01–05.
4. Exactly two red pixels' worth of the section: the third dot, the 06 number.
5. Heading breaks to two or three lines at ~15 characters, tracking visibly tight.
6. At 375px wide nothing overflows and every group is separated by a horizontal rule.
