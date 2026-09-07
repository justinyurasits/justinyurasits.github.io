# Component spec — the product block

Products 01, 02 and 03 are **one component with three content sets**, not three
layouts. Today they render at three different scales because each section defines its own
grid, so the container-relative type resolves differently in each. This file is the single
definition; it overrides any per-section spec where they disagree.

---

## 1. The grid — identical in all three sections

This is the fix. Every product section uses exactly this:

```css
.cos-product-section {
  background: var(--cos-bond);          /* 01 and 03 on Bond, 02 on Bond — same */
  padding: 72px 40px 64px;
}
.cos-product {
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(340px, 1.15fr);
  gap: 48px;
  align-items: start;
  max-width: 1440px;
  margin: 0 auto;
}
.cos-product__col { container-type: inline-size; display: flex;
  flex-direction: column; gap: 26px; min-width: 0; }

@media (max-width: 900px) {
  .cos-product-section { padding: 56px 24px 48px; }
  .cos-product { grid-template-columns: 1fr; gap: 32px; }
}
```

No section may set its own column ratio, max-width, or gap. The text column is always
the `1fr` track and the artifact always the `1.15fr` track.

---

## 2. Type scale — identical in all three

| Element | Value |
|---|---|
| Tag number | mono 12px, Graphite |
| Tag rule | 40 × 1px, Ink — **always 40px**, never full-width |
| Tag label | Archivo 600 11px, .16em, uppercase, Steel |
| Product name | `600 clamp(22px, 7.2cqi, 38px)/1.05`, −.032em, `white-space: nowrap` |
| Name icon | `.72em` square, `flex: none`, inline in the heading |
| "In development" tag | Archivo 600 11px, .14em, uppercase, Steel, 1px Steel border, 4px 8px |
| Lead line | Archivo 500 20px/1.4, −.015em, Ink, max 30ch |
| Paragraph | Archivo 400 16px/1.6, Graphite, max 46ch |
| Primary CTA | Archivo 600 15px, −.01em, Ink fill, min-height 48px, padding 15px 26px |
| Secondary link | Archivo 600 15px, −.01em, Ink, 2px Ink underline, padding-bottom 3px |
| Proof row name | Archivo 600 20px/1.25, −.02em, Ink |
| Proof row figure | Archivo 600 28px/1.1, −.03em (only where a real figure exists) |
| Proof caption | Archivo 400 14px/1.5, Graphite |
| Caption row | mono 11px, left Graphite .04em, right Steel, both nowrap, min-height 26px |
| Next rail | "Next" Archivo 500 12px .12em uppercase Graphite; item mono 12px + Archivo 600 15px |

Because every text column is now the same width, `7.2cqi` resolves to the same size in
all three — that is what makes the names match. **Do not hard-code a px name size in any
section to compensate.**

---

## 3. Vertical spacing — identical in all three

```
tag row → heading            26px   (the column's flex gap)
heading → lead               14px   (they are one flex group, gap 14px)
lead → paragraph             26px
paragraph → CTA row          26px
CTA row → proof table        26px
proof table top rule         2px solid Ink
proof row padding            22px top / 20px bottom
proof row separators         1px Line gray, between rows only — none after the last
proof table → next rail      30px
next rail                    1px Line gray top rule, 22px padding-top
caption row → artifact       12px
```

Product 01's heading→lead gap is currently much tighter than 02's; both must be 14px.
Nothing in the block uses a spacing value that isn't in this list.

---

## 4. Per-product variables — the only things that differ

| | 01 | 02 | 03 |
|---|---|---|---|
| Tag | `01 —— DOCUMENTS` | `02 —— KNOWLEDGE` | `03 —— ATTENTION` |
| Icon | `icon-less-paperwork.svg` | `icon-fewer-bottlenecks.svg` | `icon-better-visibility.svg` |
| Status tag | — | — | "In development" |
| Secondary link | "See it work" | "See it work" | — |
| Proof figures | 2 (150+, 4–8 hours → ~30 minutes) | none | none |
| Artifact | document render, cropped | answer card | attention table |
| Caption row | Exhibit A — Scope of Work / Rev. 2 · Cost-plus w/ GMP | Construction Intelligence — answer / Example answer | Project attention / Example view |
| Next rail | 02, 03 | 03 | Operations Automation (extension layer) |

Everything else is the component.

---

## 5. Artifact frame — identical shell, different contents

```css
.cos-artifact { border: 1px solid var(--cos-ink); background: var(--cos-paper); }
```

- **Header band** (02's QUESTION block, 03's count line): `padding: 20px 24px 22px`,
  `border-bottom: 1px solid var(--cos-ink)`.
- **Ink footer band** (02's "What changes the answer", 03's "Manage by exception"):
  `padding: 18px 24px`, flush against the rule above it, no gap.
- 01 is the exception: a fixed-height cropped document with a fade and a page counter,
  because it shows a page of a document rather than a complete UI state.

### 03's table is too tall — cap it

Rows are running 75–95px because the project name wraps to two lines. Fix the columns,
not the padding:

```css
.cos-attn__row {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(180px, 1.4fr) 52px minmax(78px, .55fr);
  border-bottom: 1px solid var(--cos-line-gray);
}
.cos-attn__row > *          { padding: 14px 14px 16px; }
.cos-attn__row > *:first-child { padding-left: 24px; }
.cos-attn__row > *:last-child  { padding-right: 24px; }
.cos-attn__row:last-of-type { border-bottom: 1px solid var(--cos-ink); }

.cos-attn__project { font: 500 15px/1.3 Archivo, sans-serif; letter-spacing: -.01em;
  color: var(--cos-ink); }
.cos-attn__owner   { font: 400 13px/1.4 Archivo, sans-serif; color: var(--cos-graphite); }
.cos-attn__age     { font: 400 14px/1 ui-monospace, monospace; text-align: right; }
.cos-attn__status  { font: 500 13px/1 Archivo, sans-serif; color: var(--cos-graphite); }
.cos-attn__status--exception { font-weight: 600; color: var(--cos-revision); }
```

Target row height **56–62px**, five rows plus header plus the Ink band — the card should
finish around the same height as 02's answer card, not half again as tall.

---

## Acceptance check

1. Measure the rendered `font-size` of the three product names at a 1440px viewport.
   All three must be **identical** (they will be 38px). Any difference means a section
   is still overriding the grid.
2. Measure the text column width in all three sections — identical.
3. Measure the gap between heading and lead line in all three — 14px.
4. Measure section padding in all three — 72px top, 64px bottom.
5. Tag rules are 40px wide in all three, not full-column.
6. 03's table rows are ≤62px tall and its card's total height is within ~15% of 02's.
7. Proof tables: 2px Ink rule above, hairlines between rows only, none after the last.
8. Icons are `.72em` in all three, and each is the correct file from `brand-kit/svg/`.
