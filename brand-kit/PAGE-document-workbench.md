# Page spec — Document Workbench (product page)

Build order: read `brand-kit/README.md` → `CONSTRUCTION-OS-BRAND-KIT.md` →
`COMPONENT-product-block.md` → this file. Everything here uses tokens and components
already defined; where this file gives a value, it wins for this page.

**Route:** `/products/document-workbench`
**Copy:** verbatim below. Do not rewrite, shorten, or "improve" a single line.
Three placeholders are marked ⚠ — do not invent replacements.

---

## 0. Global prerequisites

These must already be in place; if any is missing, do it first:

```css
.cos-container { max-width:1280px; margin:0 auto; padding-inline:clamp(24px,6vw,96px); }
```

- Archivo 400/500/600 only. **Zero serif on this page** — the serif exists only inside a
  rendered document artifact, and this page's artifacts are schematic.
- Tokens: Ink `#111111`, Paper `#FFFFFF`, Bond `#EFEFEB`, Steel `#476776`,
  Graphite `#5F6466`, Line gray `#B8B9B5`, Revision red `#C43230`.
- Contrast pairing: on Paper/Bond, Graphite is the lightest text and Line gray is
  hairlines; **on Ink it inverts** — Line gray is the lightest text, Graphite draws rules.
- No radius, no shadow, no gradient anywhere except the artifact crop fade.

---

## 1. Section order and surfaces

Surfaces alternate; Ink is used for one full band plus two card footers.

| # | Section | Surface | Vertical padding |
|---|---|---|---|
| 1 | Header (shared component, sticky) | Paper | 72px bar |
| 2 | Hero | Paper | 72 / 64 |
| 3 | The current state | Bond | 72 / 76 |
| 4 | Lifecycle (five phases) | Paper | 76 / 0 |
| 4b | "150+" strip | **Ink** | 28px |
| 5 | How it works (three steps) | Bond | 76 / 80 |
| 6 | Configuration (five items) | Paper | 76 / 80 |
| 7 | See it work (live demo) | Bond | 76 / 80 |
| 8 | Built from inside construction operations | Paper | 76 / 80 |
| 9 | Configured around your company | Bond | 76 / 80 |
| 10 | Closing CTA | **Ink** | 88 / 80 |
| 11 | Footer (shared component) | Paper | 56 / 40 |

Adjacent sections never share a surface. No borders between differing surfaces.

---

## 2. Hero

Two-column `.cos-product` grid from `COMPONENT-product-block.md` — same grid, same type
scale, same spacing as the product blocks on the home page. Left column:

1. Tag: `01` (mono 12px Graphite) · 40×1px Ink rule · `DOCUMENTS` (Archivo 600 11px,
   .16em, uppercase, Steel).
2. Name, one line, icon inline at `.72em`:
   `Document Workbench` — `600 clamp(22px,7.2cqi,38px)/1.05`, −.032em, `white-space:nowrap`.
   Icon = `svg/icon-less-paperwork.svg`, `currentColor` structural + Steel hairline.
3. Lead — Archivo 500 20px/1.4, −.015em, max 30ch:
   > Produce the documents that run the job.
4. Paragraph — Archivo 400 16px/1.6, Graphite, max 46ch:
   > From first walkthrough through closeout, turn notes, scopes, estimates, decisions,
   > and project information into company-standard construction documents—without
   > rebuilding the same paperwork from scratch every time.
5. Kicker — 2px Steel left border, 16px padding-left, Archivo 600 15px/1.5:
   > Spend less time producing paperwork. More time managing the job.
6. CTA row — Ink button "Book a demo" (≥48px) + text link "See it work" (2px Ink underline).
   **Note the order flip from the source copy**: the source lists "See it work" first;
   the primary always leads.
7. Proof table — 2px Ink top rule; rows 22/20px, 1px Line gray between, none after the last:

   | figure/name | caption |
   |---|---|
   | `150+ standard document types` (28px/600, −.03em) | Across the full construction lifecycle |
   | `4–8 hours` Ink + `→ ~30 minutes` **red** (28px/600) | Initial contract package preparation |
   | `Built around how your company works` (20px/600) | Your templates, scope language, pricing structure, and terminology |

Right column: the **document artifact**, identical to the home page's product 01 —
mono caption row (`EXHIBIT A — SCOPE OF WORK` / `REV. 2 · COST-PLUS W/ GMP`, both
`nowrap`, `min-height:26px`), then the 1px Ink frame at 560px with registration corners,
two-pane render, 88px fade, and footer `Page 1 of 6 · Residential renovation` +
`Open the full exhibit`. One component, one dataset — see the artifact rules in
`SECTION-hero.md`.

---

## 3. The current state — Bond

Two columns: heading left (eyebrow `THE CURRENT STATE` in Steel; heading
`clamp(28px,8cqi,42px)`, −.035em, `text-wrap:balance`), body right under a 2px Ink rule
with 24px padding-top.

> Your PMs shouldn't be document-production machines.

> Every project creates a steady stream of paperwork: proposals, contracts, scopes, RFIs,
> submittals, change orders, meeting minutes, billing documentation, closeout packages,
> and more.

> **The documents matter. Rebuilding them manually every time doesn't.**  ← 19px/600, Ink

> Document Workbench gives your team a repeatable way to turn project information into
> consistent, professional documentation built around the way your company already works.

---

## 4. Lifecycle — Paper

Header row: eyebrow `COVERAGE`, heading "One workbench. From first walkthrough to
closeout.", right-aligned label `FIVE PHASES` (Archivo 500 12px .12em uppercase Graphite),
all above a 2px Ink rule.

**Five rows, not five cards.** Each row:

```css
display:grid;
grid-template-columns: 46px minmax(200px,1fr) minmax(240px,1.2fr);
column-gap:28px; padding:30px 0; border-bottom:1px solid #B8B9B5;
align-items:start;
```

Last row has no bottom border. Cells: mono 12px Graphite number (6px top padding) ·
phase name 22px/600 −.022em + description 15px/400 Graphite · the document list.

Document list is a nested grid, `repeat(auto-fit,minmax(180px,1fr))`, items
Archivo 500 14px/1.5 Ink, 4px vertical padding, 1px `#EFEFEB` separators — a light
separator, not the Line gray used for structural rules.

Rows are cards' opposite on purpose: the lists run 5–7 items and would produce ragged
card bottoms.

```
01  Preconstruction & sales
    Turn early project information into the documents that move an opportunity forward.
    Site visit reports · Existing conditions documentation · Preliminary estimates and
    budgets · Proposal letters · Scope documents · Contract exhibits

02  Contracting & buyout
    Build clear, consistent contract documentation without rebuilding every scope and
    agreement from scratch.
    Contract packages · Scopes of work · Contract exhibits · Subcontractor scope
    documents · Agreements and supporting documentation

03  Project execution
    Keep the documentation moving as the job changes.
    RFIs · Submittals · Change orders · Meeting minutes · Field reports · Decision
    documentation · Project correspondence

04  Billing & project controls
    Turn current project information into the documentation needed to manage cost and
    get paid.
    Billing documentation · Pay application support · Change documentation · Allowance
    and cost-control documents · Project reporting

05  Closeout & handoff
    Finish the paperwork with the same consistency you brought to the job.
    Punch documentation · Closeout packages · Warranty documentation · Handoff documents
    · Final project records
```

### 4b. The "150+" strip — Ink, full-bleed

Immediately after the last row, 12px gap, a full-bleed Ink band whose content sits in
`.cos-container`: `150+` at Archivo 600 34px −.03em Paper, then
"standard construction document types across the project lifecycle." at 17px/500 Paper,
baseline-aligned, 18px gap, 28px vertical padding.

This line is the summary of the five lists above it; do not leave it as body text.

---

## 5. How it works — Bond

Eyebrow `HOW IT WORKS`, heading "Start with the information you already have."
(max 22ch), 2px Ink rule.

Three equal columns, `repeat(auto-fit,minmax(260px,1fr))`, separated by 1px Line gray
verticals (first column no left padding/border, last no right). Each: number + 28px Ink
rule, then a 20px/600 title, then body.

```
01  Bring the project context
    Notes. Emails. Scopes. Estimates. Decisions. Existing forms. Project requirements.   ← 15px/500 Ink
    Document Workbench starts with the information your team is already producing
    and collecting.                                                                       ← 15px/400 Graphite
02  Apply how your company works
    Your templates, terminology, standard language, pricing structure, document
    conventions, and operating procedures become part of how the work is produced.
03  Produce a company-ready draft
    Turn that information into structured construction documentation ready for your
    team to review, revise, and issue.
```

Closing line under a 1px Line gray rule, 22px padding-top, Archivo 500 17px −.015em:

> Less blank-page work. Less copying and pasting. Less rebuilding the same document for
> the next job.

---

## 6. Configuration — Paper

Header: eyebrow `CONFIGURATION`, heading "Not a generic template library. Not a blank
chatbot." left; right column holds
"Your company already has a way of doing the work." (16px Graphite) and
"**Document Workbench is configured around it.**" (17px/600 Ink). 2px Ink rule under both.

Five rows, `46px minmax(200px,.9fr) minmax(240px,1.2fr)`, `align-items:baseline`,
24px padding, 1px Line gray between, none after the last. Name 19px/600 −.02em,
description 15px/400 Graphite.

```
01 Your contract templates            — Not generic agreements and exhibits.
02 Your scope language                — The way your team actually describes the work.
03 Your pricing and markup structure  — The rules and conventions your team already uses.
04 Your terminology and standards     — Documents that read like they came from your company.
05 Your project context               — The specific information that makes each document
                                        useful on the actual job.
```

Then a 2px Ink rule, 30px above / 24px below, and a two-column close:

> The result is not simply faster document drafting.   ← 16px Graphite
> **It is a more consistent way to turn how your company works into the paperwork that
> runs the project.**   ← 19px/600 Ink

---

## 7. See it work — Bond

Left: eyebrow `SEE IT WORK`, heading "Turn a field change into a professional
change-order draft." (`clamp(26px,7cqi,38px)`), body, then the Ink button
"Try the live Change Order demo →".

Right: an artifact card — mono caption `PCO-014 — MILLWORK CHANGE` / `DRAFT` (Steel),
then a 1px Ink frame containing:

1. **Input band** — `padding:20px 24px 22px`, 1px Ink bottom border. Mono 11px Steel
   label `FIELD INPUT`, then the quote at Archivo 500 16px/1.5 Graphite.
   ⚠ The quoted field note is **placeholder copy I wrote** — replace it with a real one:
   > "Owner wants the closet shelving switched to painted MDF. Shop needs an answer
   > before Friday."
2. **Draft schematic** — the generated document, same schematic language as the hero
   artifact (Ink title bar, Line gray body lines, a three-row priced table).
3. **Ink footer band** — label `TURNAROUND` (11px/600 .14em Line gray) and the value
   `~10 days` Paper + `→ ~3 days` **red**, 17px/600.

This is the only card on the page that shows input and output together — that pairing is
the section's argument, so don't split it into two cards.

---

## 8. Built from inside construction operations — Paper

Heading left, paragraph right. Then a 2px Ink rule and three stat cells,
`repeat(auto-fit,minmax(240px,1fr))`, divided by 1px Line gray verticals:

```
4–8 hrs →        ~30 min   (38px/600, RED)     Initial contract package preparation
~10 days →       ~3 days   (38px/600, RED)     Change-order turnaround
                 150+      (38px/600, INK)     Standard construction document types
```

Before-value in mono 12px Graphite above; a 1px Line gray rule between figure and caption.
The third cell needs an empty spacer where the others have their before-value, so all
three figures sit on one baseline.

**150+ is not red.** It states no change. Only the two before/after pairs are red.

Footer row under a 1px Line gray rule: `CASE-001 / RESIDENTIAL GC / BOSTON` in mono 11px
left, "Read the case study →" (Archivo 600 14px, 2px Ink underline) right.

---

## 9. Configured around your company — Bond

Heading left; right column under a 2px Ink rule:

> **You don't need to throw out the way your company works to use Document Workbench.**
> We configure it around the standards, documents, terminology, and operating practices
> you already rely on—then identify where the work can become faster, more consistent,
> and easier to repeat.
> Your company's way of working becomes the starting point, not something the software
> asks you to replace.

---

## 10. Closing CTA — Ink

Same component as the home page's closing band (`SECTION-hero.md` conventions, Ink
contrast pairing). Left column:

- Lockup row: 24px mark with the red plate, Paper strokes + `DOCUMENT WORKBENCH`
  (Archivo 600 14px .14em uppercase Paper) + a 1px Graphite rule filling the row.
- Heading `clamp(34px,12cqi,68px)`, −.042em, Paper: "Give your PMs time back."
- Two paragraphs, 19px then 16px, both Line gray, max 46ch.
- CTAs: Paper-filled "Book a demo" + "See it work →" with a 2px Paper underline. Both ≥48px.

Right column — "The rest of the system": label `THE REST OF THE SYSTEM` in Line gray,
then three hairline rows (1px Graphite) with reversed axis icons at 15px, mono numbers in
Line gray, names in Paper: 02 Construction Intelligence · 03 Project Intelligence
[IN DEVELOPMENT] · —— Operations Automation [EXTENSION LAYER].

Document Workbench is **not** listed — you're on it.

---

## 11. Footer

Shared component. Only change: the title block's `PAGE` cell reads `DOCUMENT WORKBENCH`.

---

## ⚠ Placeholders — do not invent replacements

1. The field-note quote in section 7.
2. `hello@constructionos.com` in the footer.
3. Privacy / Terms links, and the title block's `ISSUED` date.

Use real values or delete the element. Flag anything you removed.

---

## Acceptance check

1. Zero serif characters on the page.
2. `#C43230` appears exactly four times as text: the hero's `→ ~30 minutes`, the demo
   card's `→ ~3 days`, and the two stat figures in section 8 — plus the mark's plate in
   the header, the closing lockup and the footer. Never on `150+`.
3. No two adjacent sections share a background colour.
4. Every section's first content element has the same left x-position (they all use
   `.cos-container`). Verify at 1440px, 1280px and 1024px.
5. "Document Workbench" renders on one line with the icon at cap height, at every width
   ≥375px.
6. Both hero CTAs and the demo CTA compute to ≥48px tall; primary leads in every pair.
7. No section ends on whitespace — each closes on a rule, a strip, or a footer row.
8. Lifecycle rows and configuration rows have hairlines between rows only, never after
   the last.
9. At 375px nothing overflows; the document lists collapse to one column; the artifact
   cards keep their footers.
