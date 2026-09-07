# Section spec — Hero (Split plate / 8a)

Implementation brief. Keeps your two-column composition and fixes the headline rag,
the type families, the buttons, and the artifact crop. Pair with
`CONSTRUCTION-OS-BRAND-KIT.md` for tokens and the mark.

---

## Copy — verbatim

```
H1      "Give your construction team time back."

Body    "Your best people shouldn't spend their day producing paperwork, answering
         the same questions, and chasing project status. Construction OS gives them
         the documents, company knowledge, and project visibility to keep work moving."

Kicker  "Built around how construction works."
        "Configured around how your company works."

CTAs    "Book a demo"   (primary — order swapped)
        "See it work"   (secondary)
```

### New strings — all lifted from elsewhere on your site
- Eyebrow: `Construction OS`
- Artifact caption: `EXHIBIT A — SCOPE OF WORK` (left) and `CON-15` (right, Steel)
- Crop footer: `4 of 11 pages · Generated from project data` + link `Open the full exhibit`
- Fold row: `Document Workbench`, `Construction Intelligence`, `Project Intelligence`

The caption and page counter carry real weight — they're what turn a cropped document
into evidence. Use your true values, not these placeholders.

---

## The headline — measure, not size

Today it renders "Give your / construction / team time / back." with **back.** orphaned.
The instinct is to shrink the type; that's wrong. `construction` is 12 characters on its
own, so any measure under ~22ch can never seat it with `Give your`.

A `max-width` in `ch` does **not** fix it either: the hero column is always narrower than
22ch, so the cap never binds. "Give your construction" needs ≈9.5× the font size in width
(645px at 68px), which no half-width hero column has. Size the headline against its
**column**, not the viewport:

```css
.cos-hero__col { container-type: inline-size; }   /* the text column */

.cos-hero__title {
  font: 600 clamp(30px, 10.2cqi, 68px)/0.98 Archivo, sans-serif;
  letter-spacing: -.042em;
  text-wrap: balance;
}
```

At a 387px column that resolves to ~39px and "Give your construction" fits in ~372px; at a
652px desktop column it resolves to ~66px and still fits. Result at every width:
`Give your construction / team time back.` — **two lines, nothing orphaned**. Two clean
lines beat three with a widow, and this holds from 375px up.
The H1 carries **no `max-width`** — the column is the constraint, and a `ch` cap only
re-introduces the bug.
**Verify by counting rendered lines** (element height ÷ line-height) at 375px, 924px and
1440px — not by reading the CSS.
Tracking matters as much: Archivo at 68px untracked reads soft next to a tight
document; −0.042em is the display setting.

---

## Type & families

**Archivo for every word outside the artifact.** The document is set in serif because
contracts are — that contrast is the point, and it disappears when the page copy is
also serif. The kicker's emphasis comes from weight 600 plus a 2px Steel rule, never
from bold italics.

| Role | Font | Size | Weight | Tracking | Line height | Color |
|---|---|---|---|---|---|---|
| Eyebrow | Archivo | 14px | 600 | 0.14em, uppercase | 1 | Ink `#111111` |
| H1 | Archivo | `clamp(30px, 10.2cqi, 68px)` | 600 | −0.042em | 0.98 | Ink |
| Body | Archivo | 17px | 400 | 0 | 1.6 | Graphite `#5F6466` |
| Kicker line 1 | Archivo | 15px | 400 | 0 | 1.5 | Graphite |
| Kicker line 2 | Archivo | 15px | 600 | −0.01em | 1.5 | Ink |
| Button | Archivo | 15px | 600 | −0.01em | 1 | Paper on Ink / Ink on Paper |
| Artifact caption | ui-monospace | 11px | 400 | 0.04em | 1 | Graphite / Steel |
| Crop footer | ui-monospace | 11px | 400 | 0 | 1 | Graphite |
| Fold row number | ui-monospace | 11px | 400 | 0 | 1 | Steel `#476776` |
| Fold row name | Archivo | 15px | 600 | −0.015em | 1 | Ink |

Measures: body `46ch`. The H1 takes no `max-width` — its column is the constraint.

---

## Buttons

Primary first. Both at least **48px** tall — the current pair sits around 36px, under
the touch-target minimum.

```css
.cos-btn { display: inline-flex; align-items: center; min-height: 48px;
  padding: 15px 26px; font: 600 15px/1 Archivo, sans-serif;
  letter-spacing: -.01em; text-decoration: none; border: 1px solid transparent; }
.cos-btn--primary { background: var(--cos-ink); color: var(--cos-paper); }
.cos-btn--primary:hover { background: var(--cos-steel); }
.cos-btn--ghost { border-color: var(--cos-ink); color: var(--cos-ink); background: transparent; }
.cos-btn--ghost:hover { background: var(--cos-ink); color: var(--cos-paper); }
```

No radius, no shadow, no gradient. Order in the DOM: primary, then ghost.

---

## The artifact — the important part

That Exhibit A is the most convincing thing on the page. Three changes turn it from
decoration into evidence:

1. **Frame it.** 1px Ink border, Paper fill, with 14px registration corners in Line gray
   at top-right and bottom-left — the mark's own geometry doing structural work.
2. **Caption it.** One mono line above the frame, on a single row: sheet name left,
   sheet number right in Steel. Both `white-space: nowrap`; the left string truncates
   with an ellipsis rather than wrapping. Anything longer belongs in the crop footer —
   a caption that wraps to two ragged lines reads as a layout accident.
   The caption row and the left column's eyebrow row both take `min-height: 26px`, so the
   frame's top edge and the headline's cap line start on the same horizontal.
3. **Crop on purpose.** Fixed frame height (520px desktop), `overflow: hidden`, an 84px
   white gradient fade at the bottom, and a footer bar reading `4 of 11 pages ·
   Division 1 of 6` with an `Open the full exhibit` link. A document that ends in a page
   counter reads as page 4 of 11. One that ends at the viewport fold reads as a bug.

Never let the artifact be clipped by the viewport, and never let it bleed off the right
edge unlabelled. The frame is the crop.

```css
.cos-doc { position: relative; height: 520px; overflow: hidden;
  border: 1px solid var(--cos-ink); background: var(--cos-paper); }
.cos-doc__corner { position: absolute; width: 14px; height: 14px; }
.cos-doc__corner--tr { top: 10px; right: 10px;
  border-top: 2px solid var(--cos-line-gray); border-right: 2px solid var(--cos-line-gray); }
.cos-doc__corner--bl { bottom: 10px; left: 10px;
  border-bottom: 2px solid var(--cos-line-gray); border-left: 2px solid var(--cos-line-gray); }
.cos-doc__fade { position: absolute; inset: auto 0 0 0; height: 84px; pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,255,255,0), var(--cos-paper) 62%); }
.cos-doc__foot { position: absolute; inset: auto 0 0 0;
  border-top: 1px solid var(--cos-line-gray); background: var(--cos-paper);
  padding: 10px 30px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
```

Inside the frame goes the real render (an `<img>`, an iframe, or live DOM) top-aligned
at natural width. Don't scale it down to fit — cropping at full size is what proves
it's a real document.

---

## Fold anchor

The hero currently ends in mid-air with a large empty patch under the left column.
Close it with a hairline row across the full width, above the fold: the three product
names, numbered 01–03, separated by 1px Line gray verticals, sitting under a 1px Ink rule.
It both terminates the hero and previews the page.

---

## Layout & spacing

```
section padding        64px top, 0 bottom (the fold row closes it), 40px sides
grid                   repeat(auto-fit, minmax(340px, 1fr)), gap 56px, align-items: start
left column gap        28px between eyebrow / H1 / body / kicker / buttons
eyebrow rule           1px Line gray, fills the remaining width after the label
kicker                 2px Steel left border, 16px padding-left, 4px between its two lines
caption → frame        12px
frame → note           12px
fold row               60px above it, 1px Ink top rule, cells 22px/26px padding
```

---

## Markup skeleton

```html
<section class="cos-hero">
  <div class="cos-hero__grid">
    <div class="cos-hero__col">
      <p class="cos-hero__eyebrow">
        <svg viewBox="0 0 100 100" width="18" height="18" aria-hidden="true">
          <polyline points="14,56 14,14 56,14" fill="none" stroke="currentColor" stroke-width="14"/>
          <polyline points="86,44 86,86 44,86" fill="none" stroke="currentColor" stroke-width="14"/>
        </svg>
        Construction OS<i></i>  <!-- mark at 24px WITH the red plate: this is the page's
                                     primary lockup, not a reduced tag -->
      </p>
      <h1 class="cos-hero__title">Give your construction team time back.</h1>
      <p class="cos-hero__body">Your best people shouldn't spend their day producing
        paperwork, answering the same questions, and chasing project status. Construction OS
        gives them the documents, company knowledge, and project visibility to keep work moving.</p>
      <div class="cos-hero__kicker">
        <p>Built around how construction works.</p>
        <p><b>Configured around how your company works.</b></p>
      </div>
      <div class="cos-hero__cta">
        <a class="cos-btn cos-btn--primary" href="/demo">Book a demo</a>
        <a class="cos-btn cos-btn--ghost" href="/product">See it work</a>
      </div>
    </div>

    <figure class="cos-hero__doc">
      <figcaption class="cos-doc__cap">
        <span>Exhibit A &mdash; Scope of Work &middot; CON-15</span>
        <span class="is-steel">Generated from project data</span>
      </figcaption>
      <div class="cos-doc">
        <span class="cos-doc__corner cos-doc__corner--tr"></span>
        <span class="cos-doc__corner cos-doc__corner--bl"></span>
        <!-- real document render, top-aligned, natural width -->
        <span class="cos-doc__fade"></span>
        <div class="cos-doc__foot">
          <span>4 of 11 pages &middot; Division 1 of 6</span>
          <a href="/exhibit">Open the full exhibit</a>
        </div>
      </div>
    </figure>
  </div>

  <ol class="cos-hero__fold">
    <li><span>01</span>Document Workbench</li>
    <li><span>02</span>Construction Intelligence</li>
    <li><span>03</span>Project Intelligence</li>
  </ol>
</section>
```

`.cos-doc__cap` is `display:flex; justify-content:space-between`, mono 11px.
`.cos-hero__eyebrow i` is the 1px Line gray rule (`flex:1; height:1px; background:var(--cos-line-gray)`).

### Responsive
Two columns → one at 340px minimum track. On stack: document frame drops to 380px
tall, keeps the fade and footer, and sits **below** the CTAs. Fold row goes to one
column with horizontal hairlines. H1 clamps to 38px but keeps −0.042em and 22ch.

---

## Don't

- No serif outside the artifact, and no italics anywhere in the hero.
- No red. Nothing in a hero is a measured change.
- No radius, shadow, or gradient — except the single white crop fade, which is
  functional, not decorative.
- Don't scale the document down to fit the frame, and don't let it touch a viewport edge.
- Don't put the secondary CTA first, and don't let either drop under 48px.
- Don't add a `max-width` to the H1 to fix the rag — the column is already narrower than any
  sensible `ch` cap, so it does nothing. Size against the container.
- Don't end the section on whitespace; the fold row is the terminator.

---

## Acceptance check

1. H1 breaks to exactly two lines with no word alone on a line, at 1440px / 1024px / 768px / 375px —
   measured as rendered line count (element height ÷ line-height), not assumed from the CSS.
   The H1 has `max-width: none`.
2. Tracking is visibly tight — −0.042em, not default.
3. Every word outside the document frame is Archivo; no italic type in the section.
4. Primary CTA is "Book a demo", is first, is Ink-filled, and measures ≥48px tall.
5. The artifact is inside a 1px Ink frame with two registration corners, a mono caption
   above, and a fade + page counter at the crop.
6. Nothing is clipped by the viewport edge at any width.
7. The hero ends on a 1px Ink rule with three numbered product names, not whitespace.
8. Zero red pixels.
