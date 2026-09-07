# Fix set — Document Workbench page

**Route:** `/products/document-workbench`
**Scope:** four broken sections. Everything else on the page stays as built — hero, exhibit
specimen, CTAs, and the shared header/footer are not in scope.
Read with `CONSTRUCTION-OS-BRAND-KIT.md` and `PAGE-document-workbench.md`.

---

## 0. The root cause, which is the same in all four

Every one of these is **chrome or width keyed to column position inside an `auto-fit` grid.**

Two rules fix the class of bug, not just these instances:

1. **In any `auto-fit` grid, every cell carries identical padding and identical borders.** A
   `border-top` on "the second and third cells" lands on the wrong cells the moment the track
   count changes — which is why rules currently start and stop mid-row.
2. **Anything that spans the section — a rule, a heading, a closing statement — belongs to the
   container, not to a cell.** And never put a `max-width` on a grid child that is supposed to
   fill its track.

Apply both while making the four fixes below.

---

## 1. "One workbench. From first walkthrough to closeout." — phase lists are trapped

**Symptom:** each phase's document-type list renders about 180px wide on the far left, under the
number, while ~75% of the row sits empty. "Existing conditions documentation" and "Preliminary
estimates and budgets" wrap onto two lines for no reason. The list is nested inside the number's
grid track, or carrying a `max-width`.

**Fix — restructure each phase as two stacked parts, not one grid row.**

**Phase header:** a flex row, `align-items: baseline` —

- mono 12px Graphite `#5F6466` number in a `width: 46px; flex: none` block
- then a stack: phase title at `600 20px`, −.02em, Ink, and its description at 15px/400 Graphite

**Document list:** its own grid **below** the header, indented to align with the phase title
(`padding-left: 46px`):

```css
grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
column-gap: 40px;
```

Each item: `border-top: 1px solid #B8B9B5; padding: 10px 0`, 15px/400 Ink. **No `max-width` on
the list or its items** — width comes from the track.

Result: the six document types in phase 01 flow across three or four columns instead of stacking
in a gutter. Phases stay separated by the existing 1px rule; the section keeps its `FIVE PHASES`
caption and 2px header rule.

Phase content is unchanged — 01 Preconstruction & sales · 02 Contracting & buyout · 03 Project
execution · 04 Billing & project controls · 05 Closeout & handoff, with their existing
descriptions and document types.

---

## 2. "Start with the information you already have." — steps misaligned, partial rules

**Symptom:** step 01 starts higher than 02 and 03; a hairline spans only columns 2–3; the closing
line's rule stops halfway across; the small vertical Ink bars beside the numbers appear
inconsistently.

**Fix:**

- Every step cell gets **identical** chrome — same top rule (or none), same `padding: 26px 0 0` —
  and the grid gets `align-items: start`.
- If the steps need a rule above them, put **one** rule on the grid container. Per-cell
  `border-top` is what's producing the two-of-three span.
- The vertical Ink bars beside `01 / 02 / 03`: all three cells or none. Right now they read as
  artifacts. If kept, they're a 2px Ink bar, same height on every cell, same offset from the
  number.
- The closing line — "Less blank-page work. Less copying and pasting. Less rebuilding the same
  document for the next job." — gets a **full-container-width** 1px Line gray rule above it, not
  one scoped to a grid cell, and sits at 16px/500 Ink.

Step content is unchanged: 01 Bring the project context · 02 Apply how your company works ·
03 Produce a company-ready draft.

---

## 3. "Built in real construction operations." — stat row is stacked and mis-ruled

**Symptom:** one stat per full-width row instead of three across, and a 1px rule between each
number and its own caption — so the rules separate things that belong together and group things
that don't.

**Fix — one 3-up grid:**

- Container: `repeat(auto-fit, minmax(min(240px, 100%), 1fr))`, `column-gap: 40px`, with **one
  2px Ink rule on the container** above it. No rules between rows, none inside cells.
- Each cell: `padding: 26px 0`, a 6px-gap vertical stack, and the grid set to `align-items: start`:
  1. before value — mono 12px Graphite, e.g. `4–8 hrs →`
  2. after value — `600 clamp(28px, 3.4vw, 36px)`, −.03em
  3. caption — 15px/400 Graphite

| Before | After | Caption |
|---|---|---|
| 4–8 hrs → | ~30 min | Initial contract package preparation |
| ~10 days → | ~3 days | Change-order turnaround |
| — | 150+ | Standard construction document types |

The third cell has no before value — start it at the after value. **Do not emit an empty mono
line as a spacer**; `align-items: start` handles the top alignment.

### ⚠ Red budget for this section
`~30 min` and `~3 days` stay red `#C43230` — they are measured changes, which is precisely what
revision red exists for. **`150+` stays Ink**: it is a capability count, not a change, and red
there dilutes the two figures that matter. The `→` arrows stay Graphite.

The `CASE-001 / RESIDENTIAL GC / BOSTON` line and `Read the case study →` stay as one
container-width row with a single 1px Line gray rule above.

---

## 4. "Configured around your company" — restructure to the standard section pattern

**Symptom:** bare heading left, a 2px rule floating above the right column only, a paragraph
whose first sentence is bolded inline, and an empty left column below the heading — the section
has no floor.

**Fix:**

**Header block** — two columns, `repeat(auto-fit, minmax(min(320px, 100%), 1fr))`,
`gap: 40px 48px`, `align-items: start`, above a **single 2px Ink rule spanning the container**,
`padding-bottom: 30px`. The rule must not be scoped to a column — that's the main visual error.

- Left: the heading, **with a period**: "Configured around your company." Every other section
  heading on the site is a sentence. **No eyebrow** — the heading is already the label, so
  `CONFIGURATION` above it says the same word twice. Nothing sits above the heading.
- Right: two beats, **not one paragraph with inline bold**:
  1. 17px/500 Ink: "You don't need to throw out the way your company works to use Document
     Workbench."
  2. 16px/400 Graphite: "We configure it around the standards, documents, terminology, and
     operating practices you already rely on—then identify where the work can become faster, more
     consistent, and easier to repeat."

  Bolding a clause inside a Graphite paragraph reads as an error. Promote it to its own line at
  500 and let the paragraph follow.

**Below the rule**, the closing statement at `600 19px`, −.015em, `max-width: 70ch`: "Your
company's way of working becomes the starting point, not something the software asks you to
replace."

That gives the section the same shape as every other one on the page — eyebrow + heading,
supporting copy, a rule, then a statement that lands — and fills the dead space under the
heading.

---

## 3b. ⚠ The provenance section is using the wrong fonts and the wrong sizes

The built version doesn't match the rest of the page. Four separate problems — fix all four.

### The body paragraph is rendering in a serif
"Construction OS grew out of hands-on construction management…" is coming out in a serif face,
so Archivo is not reaching it — either the `font-family` is missing on that element and it's
inheriting a browser default, or the declared stack ends in `serif`. **Every text element on
this site is Archivo.** Set the paragraph to `font-family: Archivo, Helvetica, sans-serif` and
audit the whole page for any other element missing it — confirm in the check below that no text
node on the page computes to a serif family. The only non-Archivo text allowed is the mono
labels named below.

### Type scale — exact, and it must match the other sections

| Role | Family | Size | Weight | Tracking | Line height | Color |
|---|---|---|---|---|---|---|
| Heading | Archivo | `clamp(26px, 7cqi, 38px)` on a `container-type: inline-size` parent | 600 | −.032em | 1.08 | Ink |
| Body paragraph | Archivo | **16px** | 400 | 0 | 1.6 | Graphite `#5F6466` |
| Before value (`4–8 hrs →`) | `ui-monospace, monospace` | 12px | 400 | 0 | 1 | Graphite |
| Stat number | Archivo | **38px** | 600 | −.035em | 1 | see red budget |
| Caption | Archivo | **14px** | 400 | 0 | 1.5 | Graphite |
| Case line / CTA | mono 11px, .04em, Graphite / Archivo 600 14px, −.01em, Ink | | | | | |

The heading must read as the largest type in the section's header block and the stat numbers must
not out-weigh it — in the built version the heading looks smaller than the numbers, which inverts
the hierarchy. Heading 38px at desktop, numbers 38px, and the heading wins on position, not size.

### The captions have grown a second line
Cell 03's caption is running two lines — "Standard construction document types" plus "Across the
full project lifecycle." That second line isn't in the spec and only cell 03 has one, so the
three cells no longer match. **Delete it.** Captions are one line of 14px Graphite, exactly the
strings in the §3 table.

### The in-cell hairline is back
There is still a 1px rule between each number and its own caption. §3 removed those: **no rule
inside any cell.** The 2px Ink rule on the container is the only rule above the stats, and the
1px Line gray rule above the case-study row is the only one below them. The vertical column
hairlines run the full height of the grid — they currently stop short of the bottom of the tallest
cell, which reads as a rendering error.

---

## Checks to report

1. `scrollWidth === clientWidth` at 375 / 800 / 1024 / 1440px.
2. **No rule anywhere on the page starts or stops mid-row.** Every rule either spans its
   container or sits uniformly on every cell of its grid.
3. No grid child carries a `max-width` that keeps it from filling its track; phase 01's list
   shows three or four columns at desktop.
4. The three steps in §2 top-align, and their accent bars are present on all three or none.
5. The stat row in §3 is three across at desktop, two then one as it narrows, with no rule
   between any number and its caption.
6. `#C43230` on this page appears only on `~30 min`, `~3 days`, and the mark's plate in the
   header and footer. `150+` is Ink.
7. **No text node on the page computes to a serif `font-family`.** Archivo everywhere except the
   mono labels (before values, `CASE-001 …`, and other spec'd mono strings).
8. In the provenance section: body paragraph 16px, stat numbers 38px, captions 14px and one line
   each, and the heading is not visually smaller than the numbers.
9. Every section heading ends in a period. No section carries an eyebrow above
   "Configured around your company."
10. No section ends on whitespace — each closes on a rule, a statement, or a footer row.
