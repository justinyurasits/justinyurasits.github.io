# Fix list — Construction Intelligence (product 02)

Seven defects in the current build, with exact values. Each one is a discrepancy against
`SECTION-construction-intelligence.md` / `SECTION-products.md`; where they conflict, this
file wins.

---

## 1. The icon is wrong — it was invented, not used

The build shows a crosshair/target glyph. That is not one of ours. The product icon for
Construction Intelligence is **`brand-kit/svg/icon-fewer-bottlenecks.svg`** — a channel
stepping down to a neck with a flow line through it. Paste this exact markup:

```html
<svg viewBox="0 0 100 100" width="27" height="27" aria-hidden="true" style="flex:none">
  <line x1="6" y1="50" x2="96" y2="50" stroke="var(--cos-steel)" stroke-width="4"/>
  <polyline points="8,20 40,20 54,42 94,42" fill="none" stroke="currentColor" stroke-width="9"/>
  <polyline points="8,80 40,80 54,58 94,58" fill="none" stroke="currentColor" stroke-width="9"/>
</svg>
```

Never draw a new icon for this system. The four in `brand-kit/svg/` are the complete set.

## 2. The icon is outdented and the name is undersized

The icon is hanging in the left margin and the product name is rendering around 26px.
Correct: a flex row, both items in the same column as everything else, no negative margin.

```html
<div style="display:flex; align-items:center; gap:14px">
  <svg …27px…></svg>
  <h3 class="cos-product__name">Construction Intelligence</h3>
</div>
```
```css
.cos-product__name { font: 600 clamp(28px, 3.6vw, 38px)/1.05 Archivo, sans-serif;
  letter-spacing: -.032em; color: var(--cos-ink); margin: 0; }
```

38px at desktop. It should be the largest thing in the left column by a clear margin.

## 3. The tag row lost its layer label

The build shows `02` and a rule, then nothing. It must read **`02 —— KNOWLEDGE`**:

```html
<p class="cos-product__tag"><span>02</span><i></i>Knowledge</p>
```
```css
.cos-product__tag { display:flex; align-items:center; gap:12px; margin:0;
  font: 600 11px/1 Archivo, sans-serif; letter-spacing:.16em;
  text-transform: uppercase; color: var(--cos-steel); }
.cos-product__tag span { font: 400 12px/1 ui-monospace, monospace;
  letter-spacing: 0; color: var(--cos-graphite); }
.cos-product__tag i { width: 40px; height: 1px; background: var(--cos-ink); }
```

The label is what ties this block to index cell 02. Without it the number means nothing.

## 4. "Answered from" is sitting in the source list

It currently reads as a fifth source. It is the rail's **footer** and must be visually
separated and pinned to the bottom:

```css
.cos-sources { display: flex; flex-direction: column; height: 100%; }
.cos-sources__foot { margin-top: auto; padding-top: 14px;
  border-top: 1px solid var(--cos-line-gray); }
```

`margin-top: auto` only works if the rail is a full-height flex column — that's the bit
the build is missing. Its label is Steel 11px/600/0.14em uppercase; the value is
Graphite 13px. It must not carry the same styling as a source entry, and there must be a
visible gap between the last source and it.

## 5. The proof table has no top rule and a dangling bottom rule

```css
.cos-proof { border-top: 2px solid var(--cos-ink); }      /* currently missing */
.cos-proof > div { padding: 22px 0 20px; border-bottom: 1px solid var(--cos-line-gray); }
.cos-proof > div:last-child { border-bottom: 0; padding-bottom: 0; }  /* currently present */
```

Two internal hairlines, one 2px Ink rule on top, nothing after the last row.

## 6. Proof rows are still body-sized

Row names are rendering at ~15px, the same as the paragraph above them. Correct:

| Row | Name | Caption |
|---|---|---|
| 1 | figure 28px/600 −.03em when you have one, else name at 20px/600 −.02em | 14px/400 Graphite |
| 2 | "Source-backed reasoning" 20px/600, −.02em | 14px/400 Graphite |
| 3 | "Knowledge that doesn't walk out the door" 20px/600, −.02em | 14px/400 Graphite |

Row 1's figure is still an open content decision — see `SECTION-construction-intelligence.md`.
Do not ship "4 cited sources" as the figure.

## 7. The closing rail is missing

Every product block ends with a forward reference on a 1px Line gray top rule:

```html
<nav class="cos-products__next">
  <span>Next</span>
  <a href="#product-03"><i>03</i>Project Intelligence</a>
</nav>
```

Product 01 → 02, product 02 → 03, product 03 → Operations Automation (extension layer,
with the 14px `icon-less-repetitive-work.svg`). CSS is in `SECTION-products.md`.

## 8. The artifact has no caption row

Product 01's frame sits under a mono caption; 02's card starts cold, which is most of why
the two blocks don't feel like the same system. Add the same row above the card:

```html
<figcaption style="display:flex; align-items:center; justify-content:space-between;
                   gap:16px; min-height:26px">
  <span>Construction Intelligence &mdash; answer</span>
  <span class="is-steel">4 sources cited</span>
</figcaption>
```

Mono 11px, left in Graphite with `letter-spacing:.04em`, right in Steel. Both
`white-space: nowrap`; left truncates with an ellipsis. `min-height: 26px` so the card's
top edge lines up with the left column's tag row, exactly as in 01.

## 9. Proof-block parity with product 01 — the real reason it feels lighter

01 ends on two **28px figures**; 02 ends on three plain labels, so the block has no
landing.

**Decision: product 02 ships with no figure.** There is no measurable claim for it yet,
and a fabricated one is worse than none. So carry the weight with type instead:

1. All three row names at **20px/600/−.02em** — larger than the current build (~17px),
   so the block reads as a conclusion rather than a footnote.
2. Captions stay 14px/400 Graphite.
3. Do **not** ship "4 cited sources" or any other placeholder figure. It describes one
   example answer, not the product.
4. Structure, rules and spacing stay identical to 01, so the two blocks still read as the
   same component — only the figures differ.

If a real metric appears later (procedures indexed, time to a sourced answer, share of
answers citing a company document), drop it into row 1 at 28px/600/−.03em with the row
name at 16px/600 beneath — the same shape as "150+ standard document types".

---

## What the build got right — don't regress these

- Serif is gone; the answer card is Archivo. This was the main call and it landed.
- Answer ¶1 is heavier and darker than ¶2–¶3.
- The `QUESTION` mono tag and the tightened question band.
- "What changes the answer" reversed to a full-width Ink band.
- CTAs swapped: "Explore Construction Intelligence →" as the Ink button, "See it work" as a link.
- Two prose levels in the left column.
- Zero red in the section.

---

## Acceptance check

1. The icon beside the product name is the bottleneck channel from `icon-fewer-bottlenecks.svg`
   at 27px, inline with the name, no negative margin.
2. Product name computes to 38px at ≥1200px viewport.
3. Tag row reads `02 —— KNOWLEDGE`.
4. "Answered from" is below a hairline, pinned to the bottom of the sources rail, and is
   not styled like a source entry.
5. Proof table: one 2px Ink rule above row 1, hairlines between rows only, none after row 3.
6. Proof row names are 20px or larger — visibly larger than the 16px paragraph.
7. Section ends with a "Next — 03 Project Intelligence" rail.
8. A mono caption row sits above the answer card, `min-height: 26px`, aligning the card's
   top edge with the left column's tag row.
9. All three proof row names render at 20px; no figure and no placeholder figure appears
   anywhere in the block.
