# Section spec — "One workbench. From first walkthrough to closeout." (Coverage / lifecycle)

**Version 2 — supersedes the earlier two-track version of this file entirely.** Document
Workbench page. Pair with `CONSTRUCTION-OS-BRAND-KIT.md`. Archivo everywhere except the mono
phase numbers.

The section is a **three-track schedule**: phase number in a narrow rail, phase name and
description in the middle, the document types the phase produces two-up on the right. Tight
metrics — this is a dense reference table, not a feature section.

---

## Structure

```
COVERAGE                                                          FIVE PHASES
One workbench. From first
walkthrough to closeout.
════════════════════════════════════════════════════════════════════ 2px Ink
01   Preconstruction & sales          Site visit reports    Existing conditions
     Turn early project information   ──────────────────    documentation
     into the documents that move     Preliminary           ─────────────────
     an opportunity forward.          estimates and         Proposal letters
                                      budgets               ─────────────────
                                      ──────────────────    Contract exhibits
                                      Scope documents       ─────────────────
                                      ──────────────────
──────────────────────────────────────────────────────────────────── 1px Line gray
02   Contracting & buyout             …
```

Five phase rows, a 1px Line gray rule between them, **none after the fifth**.

---

## Header block

```css
display: grid;
grid-template-columns: minmax(0, 1fr) auto;
gap: 16px 36px;
align-items: start;                 /* not end — otherwise the label drops beside line 2 */
border-bottom: 2px solid #111111;
padding-bottom: 20px;
```

- Left cell: `container-type: inline-size`, `min-width: 0`.
  - Eyebrow `COVERAGE` — Archivo 600 11px, `.16em`, uppercase, Steel `#476776`,
    `padding-bottom: 14px`.
  - Heading — Archivo 600 `clamp(28px, 8cqi, 42px)`, `-0.035em`, `1.05`, Ink, `max-width: 22ch`,
    `text-wrap: balance`.
- Right cell: `FIVE PHASES` — Archivo 500 12px, `line-height: 1`, `.12em`, uppercase, Graphite
  `#5F6466`, `white-space: nowrap`, `text-align: right`. One string, non-breaking space between
  the words. No mono number, no icon, no rule.

---

## Phase row

```css
display: grid;
grid-template-columns: 34px minmax(0, 0.8fr) minmax(0, 1.3fr);
gap: 0 32px;
padding: 22px 0;
border-bottom: 1px solid #B8B9B5;   /* omit on the fifth row */
```

The right track is deliberately the widest — the document names are the substance of this
section. Every track uses a `minmax(0, …)` floor so long names can't force an overflow.

**Track 1 — number.** `ui-monospace, monospace` 12px, `.04em`, Graphite `#5F6466`,
`padding-top: 5px` to sit on the title's cap height. Graphite, not Line gray: at 12px on white,
Line gray fails contrast.

**Track 2 — phase text.** `min-width: 0; display: flex; flex-direction: column; gap: 8px;`
- Title — Archivo 600 **20px**, `-0.025em`, `1.2`, Ink, `text-wrap: balance`.
- Description — Archivo 400 **14px**, `1.55`, Graphite, `max-width: 44ch`.

**Track 3 — document types.**
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
gap: 0 28px;
align-content: start;
```
Each item — Archivo 500 **14px**, `1.45`, `-0.006em`, Ink,
`border-bottom: 1px solid #B8B9B5`, `padding: 5px 0 6px`.

The 150px floor is what makes this two-up at desktop and three-up on a wide screen. Do not
raise it to 190px+ — the track collapses to a single column and the section doubles in height.

---

## Content — verbatim

| # | Phase | Description | Document types |
|---|---|---|---|
| 01 | Preconstruction & sales | Turn early project information into the documents that move an opportunity forward. | Site visit reports · Existing conditions documentation · Preliminary estimates and budgets · Proposal letters · Scope documents · Contract exhibits |
| 02 | Contracting & buyout | Build clear, consistent contract documentation without rebuilding every scope and agreement from scratch. | Contract packages · Scopes of work · Contract exhibits · Subcontractor scope documents · Agreements and supporting documentation |
| 03 | Project execution | Keep the documentation moving as the job changes. | RFIs · Submittals · Change orders · Meeting minutes · Field reports · Decision documentation · Project correspondence |
| 04 | Billing & project controls | Turn current project information into the documentation needed to manage cost and get paid. | Billing documentation · Pay application support · Change documentation · Allowance and cost-control documents · Project reporting |
| 05 | Closeout & handoff | Finish the paperwork with the same consistency you brought to the job. | Punch documentation · Closeout packages · Warranty documentation · Handoff documents · Final project records |

Mid-dots are separators in this table only — each document type is its own grid item. Counts are
uneven on purpose (6 / 5 / 7 / 5 / 5); do not pad them to match.

---

## Responsive

The `minmax(min(150px, 100%), 1fr)` floor carries the document grid on its own: three across on a
wide screen, two at desktop, one below ~330px of track width. Nothing rewrites the row structure
at any breakpoint and the 34px number rail never changes.

Section band: `padding: 76px 0 0`, inner container `max-width: 1280px; margin: 0 auto;
padding-inline: clamp(24px, 6vw, 96px)` — same as every other section on the page.

---

## Don't

- No card, box, fill, or radius on the phase rows. Rules only.
- No red in this section at all.
- No third type size in the document items — 14px, all of them.
- Don't reword `FIVE PHASES` or add a count next to it.
- Don't give the phase numbers Ink or a background plate.
- Don't collapse the three tracks into two, and don't move the document grid below the phase
  text — that arrangement was rejected.
- No hover state; these aren't links.

---

## Acceptance check

1. Each phase row has exactly **three** grid tracks: `34px`, `0.8fr`, `1.3fr`.
2. The document grid renders **two columns** at a 1280px container, and no document name is
   clipped or hyphenated.
3. `FIVE PHASES` sits on the same line as the `COVERAGE` eyebrow, flush right.
4. No rule after the fifth phase row.
5. Type: titles 20px, descriptions 14px, document items 14px, numbers mono 12px Graphite.
6. At 1280 / 900 / 640 / 375px: `scrollWidth === clientWidth`.
7. No text node in the section computes to a serif family; the only mono is the phase numbers.
