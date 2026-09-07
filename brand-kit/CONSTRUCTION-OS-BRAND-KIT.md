# Construction OS — mark, icon & concept icon kit

Everything an implementer needs. Palette is seven colors, typeface is Archivo only,
geometry is drawing-set linework at two weights. No gradients, no rounded containers,
no icon tiles, no drop shadows, no second typeface.

---

## 1. Tokens

```css
:root {
  --cos-ink:        #111111; /* primary text, figures, primary buttons */
  --cos-paper:      #FFFFFF; /* default surface */
  --cos-bond:       #EFEFEB; /* document / section surface */
  --cos-steel:      #476776; /* structure only: rules, frames, mats */
  --cos-graphite:   #5F6466; /* secondary text */
  --cos-line-gray:  #B8B9B5; /* hairlines */
  --cos-revision:   #C43230; /* a measured change or delta ONLY */

  /* aliases the SVGs consume */
  --cos-hairline:   var(--cos-steel);    /* on Paper/Bond */
  --cos-revision:   #C43230;
}

/* on Ink surfaces, the hairline must switch — Steel is too close to Ink */
.on-ink { --cos-hairline: var(--cos-line-gray); color: var(--cos-paper); }
```

### The two grays swap by surface — this is a paired rule

| Surface | Lightest permitted text | Hairlines and 1px rules |
|---|---|---|
| Paper / Bond | Graphite `#5F6466` (≈5.4:1) | Line gray `#B8B9B5` |
| Ink | Line gray `#B8B9B5` (≈8:1) | Graphite `#5F6466` |

Getting it backwards on either surface is the same bug: Line gray text on Bond reads at
1.7:1, Graphite text on Ink at 3.1:1. Both fail. The one exception is **icon strokes**:
a reversed icon's hairline stays Line gray so the glyph stays legible; only structural
rules take Graphite on Ink.

### Revision red rule
Red marks a measured change or delta. In the concept icons it is always exactly one
element — the thing that changed — never a fill behind content, never a brand accent,
never a background. If a graphic isn't showing a before/after, red does not appear.

---

## 2. Typeface

Archivo only. Weight 600 for the wordmark and headings, 500 for labels and eyebrows,
400 for body. Sentence case everywhere, including the wordmark: **Construction OS**.
Never set "OS" apart in caps, another color, or a block.

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&display=swap');

.cos-wordmark { font: 600 clamp(24px, 3vw, 44px)/1 Archivo, Helvetica, sans-serif;
                letter-spacing: -0.025em; color: var(--cos-ink); }
```

Wordmark tracking by size: 44px+ `-0.03em` · 24–38px `-0.025em` · 15–20px `-0.015em` · 12px `0`.

---

## 3. The mark — "Registration"

Two corner brackets locating a plate. Reads as the registration corners on a drawing
sheet and as a plate held in position; the red plate is the delta being tracked.

Grid: 100×100. Structural stroke 7 (Ink or Paper). Plate 36×36 centered, Steel outline 4.

```html
<svg viewBox="0 0 100 100" width="24" height="24" role="img" aria-label="Construction OS">
  <polyline points="16,54 16,16 54,16" fill="none" stroke="currentColor" stroke-width="7"/>
  <polyline points="84,46 84,84 46,84" fill="none" stroke="currentColor" stroke-width="7"/>
  <rect x="32" y="32" width="36" height="36" fill="var(--cos-revision)" stroke="var(--cos-hairline)" stroke-width="4"/>
</svg>
```

### Size reduction — this is not optional

| Rendered size | Structural stroke | Plate | Hairline |
|---|---|---|---|
| 72px+ | 7 | 36×36 with outline | Steel 4 |
| 44px  | 9 | 36×36 with outline | Steel 5 |
| 32px  | 10 | 32×32 solid, no outline | merged into plate |
| 22px and below | 13–16, corners pulled to 12/88 | dropped | none |

The 16px form is `svg/cos-mark-sm.svg` — two corners only, single color.

### Lockup

```html
<span style="display:inline-flex;align-items:center;gap:10px">
  <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true" style="color:var(--cos-ink)">
    <polyline points="14,56 14,14 56,14" fill="none" stroke="currentColor" stroke-width="13"/>
    <polyline points="86,44 86,86 44,86" fill="none" stroke="currentColor" stroke-width="13"/>
  </svg>
  <span class="cos-wordmark" style="font-size:15px;letter-spacing:-0.015em">Construction OS</span>
</span>
```

- **Clear space:** one plate width (36/100 of the mark's height) on all four sides.
- **Gap between mark and wordmark:** 0.45× the wordmark's cap height (10px at a 15px wordmark, 24px at a 38px wordmark).
- **Vertical alignment:** mark's optical center to the wordmark's x-height center.
- **Minimum sizes:** mark alone 16px · lockup 15px wordmark · PDF header 12–15px.
- **Reversed:** Paper strokes, hairline switches to Line gray. Nothing else changes.
- **Single-color:** drop the plate entirely, keep the two corners.

---

## 4. Concept icons

Four icons for the benefits band. Each states a before and an after — that is what makes
them legible without a caption. Structural stroke 8, hairline 4, on the same 100×100 grid.
Red is the changed element only.

| Icon | Construction | Red element |
|---|---|---|
| Less paperwork | Front sheet full; the sheet behind reduced to its two visible edges | the eliminated sheet |
| Fewer bottlenecks | Channel steps down to a neck; flow line runs clear through it | the flow line |
| Better visibility | Elevation read off a baseline inside a hairline sheet | the tallest bar (needs attention) |
| Less repetitive work | Three separate runs above, one continuous run below | the consolidated run |

Source: `svg/icon-less-paperwork.svg`, `svg/icon-fewer-bottlenecks.svg`,
`svg/icon-better-visibility.svg`, `svg/icon-less-repetitive-work.svg`.

### Reduction
At 40px use the strokes as authored. At 34px bump structural to 9 and hairline to 5.
At 24px and below drop the hairline elements entirely and set structural to 11 —
each icon is drawn to survive that (the paperwork icon becomes one sheet, the
repetitive-work icon becomes two runs).

### React component

```jsx
// One component, four names. Strokes scale with the rendered size.
const PATHS = {
  paperwork: (w, h) => (<>
    <polyline points="30,14 86,14 86,72" fill="none" stroke="var(--cos-revision)" strokeWidth={h}/>
    <rect x="14" y="26" width="52" height="60" fill="none" stroke="currentColor" strokeWidth={w}/>
  </>),
  bottlenecks: (w, h) => (<>
    <line x1="6" y1="50" x2="96" y2="50" stroke="var(--cos-revision)" strokeWidth={h}/>
    <polyline points="8,20 40,20 54,42 94,42" fill="none" stroke="currentColor" strokeWidth={w}/>
    <polyline points="8,80 40,80 54,58 94,58" fill="none" stroke="currentColor" strokeWidth={w}/>
  </>),
  visibility: (w, h) => (<>
    <rect x="6" y="18" width="88" height="64" fill="none" stroke="var(--cos-hairline)" strokeWidth={h}/>
    <line x1="18" y1="70" x2="82" y2="70" stroke="currentColor" strokeWidth={w}/>
    <line x1="30" y1="70" x2="30" y2="56" stroke="currentColor" strokeWidth={w}/>
    <line x1="50" y1="70" x2="50" y2="44" stroke="currentColor" strokeWidth={w}/>
    <line x1="70" y1="70" x2="70" y2="32" stroke="var(--cos-revision)" strokeWidth={w}/>
  </>),
  repetitive: (w, h) => (<>
    <line x1="14" y1="28" x2="34" y2="28" stroke="currentColor" strokeWidth={w}/>
    <line x1="42" y1="28" x2="62" y2="28" stroke="currentColor" strokeWidth={w}/>
    <line x1="70" y1="28" x2="90" y2="28" stroke="currentColor" strokeWidth={w}/>
    <line x1="24" y1="34" x2="24" y2="66" stroke="var(--cos-hairline)" strokeWidth={h}/>
    <line x1="52" y1="34" x2="52" y2="66" stroke="var(--cos-hairline)" strokeWidth={h}/>
    <line x1="80" y1="34" x2="80" y2="66" stroke="var(--cos-hairline)" strokeWidth={h}/>
    <line x1="14" y1="74" x2="90" y2="74" stroke="var(--cos-revision)" strokeWidth={w}/>
  </>),
};

export function CosIcon({ name, size = 40, ...rest }) {
  const w = size >= 40 ? 8 : size >= 30 ? 9 : 11;   // structural
  const h = size >= 40 ? 4 : size >= 30 ? 5 : 0;    // hairline, 0 = dropped
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" {...rest}>
      {PATHS[name](w, h)}
    </svg>
  );
}
```

---

## 5. Benefits band

Ink surface, four equal columns, 1px `--cos-graphite` vertical rules between them,
icon → heading → body stacked with a 22px gap, 44px top / 52px bottom padding.
Heading Archivo 600 24px `-0.02em` in Paper; body Archivo 400 13px/1.55 in Line gray.
Columns collapse at `minmax(220px, 1fr)`.

```html
<section class="on-ink" style="background:var(--cos-ink);display:grid;
         grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
  <div style="padding:44px 32px 52px;display:flex;flex-direction:column;gap:22px;
              border-left:1px solid var(--cos-graphite)">
    <!-- svg/icon-less-paperwork.svg, color: var(--cos-paper) -->
    <h3 style="margin:0;font:600 24px/1.2 Archivo,sans-serif;letter-spacing:-.02em;
               color:var(--cos-paper)">Less paperwork</h3>
    <p style="margin:0;font:400 13px/1.55 Archivo,sans-serif;color:var(--cos-line-gray)">
      PMs spend more time managing projects and less time producing documents.</p>
  </div>
  <!-- repeat for Fewer bottlenecks, Better visibility, Less repetitive work -->
</section>
```

---

## 6. Don't

- No red fill, red background, or red as an accent where nothing changed.
- No rounded-corner container, app-icon tile, gradient, or shadow behind the mark.
- No condensed or display typeface; no second family.
- No "OS" in caps, in a block, or in a different color.
- No third lineweight, and no Steel hairline on an Ink surface.
- Don't scale the SVGs without applying the stroke table — the marks are optically
  corrected per size, not linearly scaled.

---

## Files

```
brand-kit/
  CONSTRUCTION-OS-BRAND-KIT.md
  svg/
    cos-mark.svg                    24px+ mark, red plate, steel outline
    cos-mark-sm.svg                 16px mark, two corners, single color
    icon-less-paperwork.svg
    icon-fewer-bottlenecks.svg
    icon-better-visibility.svg
    icon-less-repetitive-work.svg
```

SVGs use `currentColor` for the structural stroke, so `color:` on the parent flips them
Ink → Paper. `--cos-hairline` and `--cos-revision` are the only other inputs.
