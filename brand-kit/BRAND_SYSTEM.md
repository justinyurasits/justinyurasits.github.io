# Brand system

**Sheet:** BRAND-002
**Issued:** 2026-09-04
**Revision:** 02
**Supersedes:** BRAND-001 (specimen)

This file is the authority on what this brand looks like. It governs the website, PDFs, Word documents, decks, and carousels. When a rule here conflicts with anything else in this repository, or with an existing stylesheet, this file wins.

**For Claude Code:** read this file before changing anything visual. Replace existing styles rather than reconciling with them — the previous site was built to different rules and merging the two produces neither. If you need a visual treatment that is not defined here, add it to this file first, with its reasoning, and increment the revision. Do not invent one-off treatments in page code.

---

## 1. The idea

Construction runs on drawings, and drawings have a visual discipline almost no one in construction software uses: a title block that identifies every sheet, a lineweight hierarchy that encodes what matters, dimensions that state measured facts, and revision marks that flag what changed.

We borrow those conventions as a restrained system for a professional consulting business. We do not imitate a blueprint. No gridline overlays, no drafting marks as decoration, no paper texture, no blueprint blue. The site behaves like a modern responsive website that happens to be organized like a document set.

The reason to hold this line: the buyer reads real drawings. Cosplay reads as an outsider imitating his trade, which is the exact opposite of the credibility being sold. Precision reads as respect for it.

---

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FBFBF8` | Default page and document background |
| `bond` | `#EFEFEB` | Sheet substrate — case studies, diagram fields, document covers, evidence zones |
| `ink` | `#111111` | All primary text, cut lines, primary buttons |
| `annotation` | `#70706B` | Secondary text, metadata, field labels, dimension text |
| `object` | `#A9A79E` | Medium rules, table borders, object lines |
| `dimension` | `#CCCAC2` | Hairlines, extension lines, table zebra edges |
| `revision` | `#C73A32` | Change only — see §4 |

Two substrates, not one. `paper` is the default; `bond` marks things that behave like documents. A page entirely in `bond` reads as a government specification manual. As a rule of thumb, `bond` should cover less than half of any given page.

There is no other color. No tints, no ramps, no state colors. Success, warning, and error states use ink with an annotation label; only error may use `revision`, because an error is a changed state.

---

## 3. Type

**Archivo** — display, headings, all metadata, UI labels, numerals.
**Source Serif 4** — body prose only.

Both are free and embeddable, which is required: these tokens have to survive into ReportLab, python-docx, and pptxgenjs, and a licensed face would kill the multi-artifact system on day one.

Archivo is deliberately restrained. The personality of this brand comes from the drawing language, not the typeface. Do not substitute a more distinctive display face — that turns the identity into typography cosplay and it will fight the dimension system for attention.

| Role | Family | Size / line-height | Weight | Tracking |
|---|---|---|---|---|
| Display | Archivo | 40 / 1.05 | 600 | −0.022em |
| Head | Archivo | 24 / 1.2 | 500 | −0.015em |
| Subhead | Archivo | 18 / 1.35 | 500 | −0.01em |
| Body | Source Serif 4 | 16 / 1.62 | 400 | 0 |
| Small | Archivo | 14 / 1.5 | 400 | 0 |
| Annotation | Archivo | 11 / 1.35 | 400 | +0.06em |

Body prose sets to a maximum of 68 characters. All numerals use `font-variant-numeric: tabular-nums` — figures in this system are data and must align in columns.

Sentence case everywhere in language. Capitals are reserved for identifiers that genuinely are codes: `CASE-003`, `REV 02`. Never `PALETTE`, never `OUR PROCESS`, never a capitalized label above a headline.

---

## 4. Revision red

`revision` means change. Specifically: a before-and-after pair, a reduction, a delta, a revised state, a flagged exception, or a failure.

It does not mean emphasis. It is not the accent color. Buttons are ink. Links are ink with an underline. Nothing is red because a section felt flat.

Target: at most one red element per screen or page. The restraint is what makes it register.

---

## 5. Line hierarchy

Three weights, each carrying meaning. Never a fourth.

| Weight | Web | Print / PDF | Word (sz, eighths pt) | Use |
|---|---|---|---|---|
| Cut | 1.5px `ink` | 1.0pt | 12 | Sheet frame, title block top edge, major division |
| Object | 1px `object` | 0.6pt | 8 | Section division, table rules |
| Dimension | 0.5px `dimension` | 0.35pt | 4 | Extension lines, cell borders, subtle separation |

A rule at the wrong weight is a lie about hierarchy. Do not use a cut line as decoration between paragraphs.

---

## 6. Technical metadata

Metadata may identify a sheet, an object, a system, a revision, a date, or a measurement. It may not exist to decorate a headline.

This is the rule that stops the old pattern from returning in a new costume. `SECTION 03` sitting above a centered headline above three cards is the same page it always was, and no palette fixes it.

Register prefixes:

| Prefix | Document |
|---|---|
| `BRAND` | Brand and system documents |
| `CASE` | Case studies |
| `AOS` | Operational architecture assessments |
| `SOW` | Statements of work and proposals |
| `SPEC` | Operational architecture specifications (Phase 1 deliverable) |
| `FN` | Field notes — LinkedIn carousels, short posts |

Format is `PREFIX-NNN`, revisions are `REV NN`, dates are ISO `YYYY-MM-DD`.

**Numbers must be real.** A register that never increments is decoration, and an operator will identify it as decoration quickly. Maintain the register in `/content/register.json`. When a document is revised, the revision number increments and the issue date changes.

---

## 7. Primitives

Seven. Pages are composed from these. Adding an eighth requires editing this file.

**`Sheet`** — substrate wrapper. Props: `substrate` (paper | bond), `framed` (bool). A framed sheet carries a cut-line border and internal padding of 26px (mobile) to 40px (desktop).

**`TitleBlock`** — the identity object. Four ruled fields: Project, Sheet, Issued, Revision. Sits at the foot of a sheet, separated by a cut line above it. Field labels are annotation-styled sentence case; values are Archivo small with tabular figures. Fields are separated by cell structure, not by punctuation.

An inline single-line variant exists for contexts too small for a grid (carousel footers, page footers). It separates fields with a spaced forward slash — `Construction OS / CASE-003 / 2026-09-04 / REV 01` — never a middle dot, and never a pipe.

**`Dimension`** — measured evidence. See §8.

**`Register`** — inline technical identifier. Renders a code, optionally with revision. Annotation styling.

**`Rule`** — a horizontal division at one of the three defined weights. Props: `weight` (cut | object | dimension).

**`Zone`** — a page section. Optional `marker` (annotation-styled label). Markers appear only on pages with more than three zones, where they perform navigation. On shorter pages the heading is sufficient and the marker is decoration.

**`SiteNav`** — the seventh, added because it appears on every page and would otherwise have to be invented in page code. Left mark in Archivo 500, right-side ink links, one ghost button. Bottom edge is a dimension rule. Mobile collapses to a text toggle — no icon library, and no third-party JS framework for a single boolean.

CTAs, tables, and diagrams are not primitives. They are compositions built from tokens and the six above. A CTA is a `Zone` with a heading and an ink button. Making them primitives is how a system grows to twenty components that each drift independently.

---

## 8. The dimension system

The signature element. A measured transformation is drawn as two dimensioned spans on a shared scale, so the argument lands as a length before the number is read.

**Rules:**

1. **A dimension is an evidentiary claim.** Use it only for a measured pair from real delivered work. Never for an illustrative, projected, or aspirational figure. If the number cannot be sourced to an engagement, it is set as ordinary text.
2. **Both spans share one scale, and the scale is stated.** Where the source value is a range, the span is drawn to the maximum and the label states the bound: `up to 8 hrs`, not `4–8 hrs`. A range label on a to-scale span is an inconsistency someone will eventually notice.
3. **Minimum span is 24px.** Where the ratio would push the shorter span below that, draw it at 24px with a break mark — two short parallel diagonals crossing the span — and label the figure `not to scale`. This is the real drafting convention for a span that will not fit, and it is more honest than silently distorting the scale.
4. **Ticks, not arrowheads.** Spans terminate in 45-degree architectural ticks, drawn as lines. Never a Unicode arrow or an arrowhead marker.
5. **The changed state is red; the original is annotation gray.** One red span per figure.
6. **At most two dimension figures per page.** Beyond that it stops being evidence and becomes a motif.

Applies equally to non-time measures: step counts, document counts, days to turnaround, headcount touchpoints.

---

## 9. Composition

The strongest tell of a generated page is not any single decoration. It is that every section has the same shape: label, centered headline, three cards, repeat. These rules exist to prevent that shape from returning.

- **Left alignment by default.** Centering is reserved for the contents of a framed sheet.
- **No two consecutive zones may share the same structure.** If one is a three-up grid, the next is prose, or a table, or a dimension figure, or an asymmetric split.
- **At most one three-up grid per page.**
- **Spend boldness once.** One element per page is the memorable thing. Everything around it stays quiet.
- **Asymmetry is the default for content splits** — a 7/5 or 8/4 column relationship rather than 6/6.
- **No card wrapper unless the content is genuinely a bounded object.** Prose does not need a container. A rule and whitespace divide content adequately.

---

## 10. Prohibited

Each of these has a reason. A prohibition without a reason gets argued around.

- **Gradients, glows, drop shadows, blur** — nothing in a document set has depth.
- **Rounded cards as a default container** — the SaaS-kit tell. Corner radius is 0 throughout, except 2px on buttons and inputs.
- **Pill badges** — status belongs in a title block field or a table cell.
- **Middle-dot meta strings** (`A · B · C`) — a generated-page convention. Use ruled cells or spaced slashes.
- **A trailing arrow appended to link text** (`Read more →`) — same reason.
- **Numbered markers (01 / 02 / 03) on content that is not a sequence** — numbering is information. The three-step method may be numbered. A list of services may not.
- **All-caps labels** — see §3.
- **Monospace for data labels** — the reflexive technical-brand move, and inaccurate: drafting lettering was single-stroke gothic, never monospaced. Archivo with tabular figures does this job.
- **Blueprint motifs** — grid overlays, drafting compasses, paper texture, blueprint blue, faux stamps.
- **Icon sets** — no generic line-icon library. Where a mark is needed it is drawn from the line vocabulary in §5.
- **Entrance animation on scroll** — fade-and-slide-up on every section is the generated default. Motion responds to a user action or does not exist.

---

## 11. Rendering outside the browser

The tokens are canonical; each renderer maps to them. If a token exists only as CSS, the multi-artifact system dies the first time a proposal is generated.

**ReportLab (PDF, carousels)**
Register Archivo and Source Serif 4 TTFs via `pdfmetrics.registerFont` at startup. Do not fall back to Helvetica — Unicode above basic ASCII is unreliable in it, which is why dimension ticks and break marks are drawn as lines rather than typed as characters. Colors via `HexColor`. Line weights in points per §5.

**python-docx (proposals, SOWs, specifications)**
Colors via `RGBColor`. Rules are implemented as single-cell table borders with `sz` in eighths of a point per §5. Define paragraph styles for Display, Head, Subhead, Body, and Annotation once in the template rather than formatting runs inline. The title block is a four-column borderless table with a cut-weight top border.

**pptxgenjs (decks)**
Hex without the leading `#`. Line widths in points. Slide masters carry the title block as a footer element.

**Web**
Tokens as CSS custom properties in `/styles/tokens.css`. Content — copy, metrics, case study data, the document register — lives in `/content` as data files, so changing `8 hrs` to `6 hrs` is a data edit, not a component edit.

---

## 12. Change control

This file is versioned. Any change to a token, primitive, or rule increments the revision and is noted below.

Claude Code may not introduce a visual treatment not defined here. If a page needs something new, the sequence is: add it to this file with its reasoning, increment the revision, then implement it.

| Rev | Date | Change |
|---|---|---|
| 01 | 2026-09-04 | Initial system. Adopted from BRAND-001 specimen with two substrates, dimension scaling convention, and register scheme added. |
| 02 | 2026-09-04 | Added SiteNav as a seventh primitive. Navigation appears on every page and had no definition, which would have forced page-level invention. |
