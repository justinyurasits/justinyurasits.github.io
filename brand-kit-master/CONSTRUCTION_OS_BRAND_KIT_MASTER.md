# Construction OS — brand kit

**Purpose of this file:** one reference for color, type, the mark, and rule hierarchy that works the same way across the website, Word documents, PowerPoint decks, PDFs, and email. Implementation (actually wiring this into templates) comes later — this is the source of truth those implementations should be built from.

If any other file disagrees with this one — `BRAND_SYSTEM.md`, `tokens.css`, an older brand PDF, a Design canvas — this file wins. Note the date you finalize it and treat everything older as superseded.

---

## 1. Palette

Seven colors. No others, in any medium.

| Role | Hex | RGB | Use |
|---|---|---|---|
| Ink | `#111111` | 17, 17, 17 | Primary text, figures, primary buttons, structural strokes |
| Paper | `#FFFFFF` | 255, 255, 255 | Default surface |
| Bond | `#EFEFEB` | 239, 239, 235 | Document / section surface |
| Steel | `#476776` | 71, 103, 118 | Structure only — rules, frames, mats. Never a fill behind content, never decorative |
| Graphite | `#5F6466` | 95, 100, 102 | Secondary text |
| Line gray | `#B8B9B5` | 184, 185, 181 | Hairlines |
| Revision red | `#C43230` | 196, 50, 48 | A measured change or delta **only** |

**The revision red rule, restated because it's the one most often broken under time pressure:** red marks a before/after, a delta, an exception state. It is never a brand accent, never a background fill, never used because a layout looks flat. If there's no change being shown, red does not appear. This rule applies identically on the website, in a proposal, in a deck, and in an email — a red font color used for emphasis in an email breaks the system exactly as much as a red button on the site.

**On dark (ink) surfaces:** steel is too close to ink in value to read as a hairline — swap the hairline color to line gray whenever the surface is ink. This applies in web CSS and in a dark PowerPoint slide equally.

**RGB values above are for Word, PowerPoint, and anywhere hex isn't accepted directly.** They're exact conversions of the hex values, not approximations.

---

## 2. Typography

**Archivo** for everything structural: headings, labels, metadata, numerals, UI text, table content.
**Source Serif 4** for body prose only — paragraphs of actual writing, not labels or data.

Both are free, embeddable, and available on Google Fonts. This matters more than it sounds: a licensed or system-only font breaks the moment this system has to render in PowerPoint or export to PDF from Word, so every renderer needs an explicit fallback stack.

### Fallback stacks by medium

| Medium | Archivo fallback | Source Serif fallback |
|---|---|---|
| Web (CSS) | `Archivo, Helvetica Neue, Helvetica, Arial, sans-serif` | `'Source Serif 4', 'Source Serif Pro', Georgia, 'Times New Roman', serif` |
| Word / PowerPoint | Install Archivo and Source Serif 4 locally (free from Google Fonts) so the real faces render. If distributing to someone without them installed, fallback is **Arial** (Archivo) and **Georgia** (Source Serif) | — |
| PDF generation (ReportLab, etc.) | Register the actual TTF files via `pdfmetrics.registerFont` — do not rely on Helvetica as a substitute, its Unicode support is unreliable | Same — register the real file |

### Scale

| Role | Size / line-height | Weight | Tracking |
|---|---|---|---|
| Display | 40–84px web (context-dependent) / 40pt+ in decks | 600 | −0.022em |
| Head | 24px / 1.18 / 24–28pt in decks | 500 | −0.015em |
| Subhead | 18px / 1.35 | 500 | −0.01em |
| Body | 16px / 1.62 (web) — 11–12pt in Word/decks | 400 | 0 |
| Small | 14px / 1.5 | 400 | 0 |
| Annotation | 11px / 1.35 | 400 | +0.06em |

Sentence case throughout, in every medium — headlines, slide titles, email subject lines, document headers. Capitals are reserved for register codes only (`CASE-001`, `PRE-04`, `REV 02`) — never for a headline, a slide title, or a section label. This is one of the most-broken rules under time pressure and one of the most visible when broken.

Tabular (aligned) figures wherever numbers appear in a column — pricing, dates, metrics. In Word and PowerPoint this usually means selecting a tabular-figure-enabled font feature or a monospaced-width numeral option if the app supports it; check before shipping a table of numbers that doesn't align.

---

## 3. Line hierarchy

Three weights. No fourth, in any medium.

| Weight | Web | Print / PDF | Word (eighths of a point) | Use |
|---|---|---|---|---|
| Cut | 1.5px, Ink | 1.0pt | 12 | Frame edges, title block top edge, major division |
| Object | 1px, Steel or Line gray | 0.6pt | 8 | Section division, table rules |
| Dimension | 0.5px, Line gray | 0.35pt | 4 | Extension lines, cell borders, subtle separation |

A rule at the wrong weight misstates hierarchy — don't use a cut-weight line as decoration between paragraphs, in a slide or a document any more than on the site.

---

## 4. The mark

Two registration corners locating a plate — reads as the registration marks on a drawing sheet, with the red plate as the tracked delta.

**Wordmark:** "Construction OS," sentence case, Archivo 600. Never "OS" set apart in capitals, a different color, or a block.

**Minimum sizes:** mark alone 16px, full lockup 15px wordmark, PDF/document header 12–15px.

**Clear space:** one plate-width on all sides (roughly 36% of the mark's height).

**Reversed (on dark):** strokes switch to paper, hairline switches to line gray.

**Single color contexts** (letterhead watermark, fax-safe, single-color print): drop the red plate, keep the two corners only.

Full construction detail, the size-reduction stroke table, and SVG source are in the companion file `CONSTRUCTION-OS-BRAND-KIT.md` (mark and icon implementation kit) — that file is the implementation reference for the mark specifically; this file is the cross-medium summary.

**Where the mark goes:** website nav, document title blocks, PowerPoint title slides and footers, email signature. Not on every slide or every page — use it where a document or deck is identified, not as a repeating watermark.

---

## 5. Register and title-block convention

Every substantial deliverable — case study, proposal, SOW, deck, spec — carries a title block with four fields: Project / Sheet / Issued / Revision. This is true whether the deliverable is a web page, a PDF, or a PowerPoint's closing slide.

Sheet codes by document type:

| Prefix | Document |
|---|---|
| `BRAND` | Brand and system documents |
| `CASE` | Case studies |
| `AOS` | Operational architecture assessments |
| `SOW` | Statements of work and proposals |
| `SPEC` | Specifications |
| `FN` | Field notes — carousels, short posts |

Format: `PREFIX-NNN`, revision as `REV NN`, dates as ISO `YYYY-MM-DD`. Numbers must be real and must increment on actual revision — a register that never increments reads as decoration within seconds to anyone paying attention, and precision here is itself part of what's being sold.

---

## 6. What this system never does

These apply identically on the website, in a Word document, in a PowerPoint deck, and in an email — the medium doesn't change the rule.

- Revision red as a decorative accent, a fill, a background, or an emphasis color where nothing changed.
- Rounded-corner containers, drop shadows, gradients, pill badges, or app-icon-style tiles.
- All-caps headings, titles, or labels — capitals are for register codes only.
- A second typeface beyond Archivo and Source Serif 4.
- Middle-dot separators in metadata strings (`A · B · C`) — use ruled cells or a spaced slash instead.
- A fourth line weight.
- Steel used as a dominant background field, except the one documented exception (a large mat behind a document artifact on the website's product section) — that exception does not extend to other media without the same reasoning being made explicit again.
- Icon sets used decoratively. Where a mark is genuinely needed, it's drawn from this system's own linework, not a generic icon library.

---

## 7. Per-medium notes

**Word.** Set up paragraph styles once (Display, Head, Subhead, Body, Small, Annotation) in a template rather than formatting runs by hand each time. The title block is a four-column borderless table with a cut-weight top border. Table headers use the object-weight rule beneath them, not a filled color band.

**PowerPoint.** Slide masters carry the title-block footer. Section headers stay sentence case even though PowerPoint's default templates often push toward title case or caps — override the default. Use the hex-to-RGB values above directly in the theme color picker.

**Email.** Signature uses the lockup at 15–18px. Body copy in email doesn't need to hit the exact type scale (email clients are unreliable renderers), but sentence case and the palette still apply — no red text for emphasis, no all-caps subject lines.

**PDF.** Register real font files rather than relying on a PDF library's default face. Dimension figures, tick marks, and rules are drawn as vector lines, not typed Unicode characters — this avoids the font-substitution problems that break special characters in some PDF renderers.

---

## Revision log

| Rev | Date | Change |
|---|---|---|
| 01 | 2026-09-05 | Initial consolidated cross-medium kit, incorporating the palette correction (revision red to `#C43230`), the registration-corners mark system, and per-medium implementation notes for Word, PowerPoint, PDF, and email. |
