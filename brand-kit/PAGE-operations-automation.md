# Page spec — Operations Automation (extension-layer page)

Read first: `README.md` → `CONSTRUCTION-OS-BRAND-KIT.md` → `COMPONENT-product-block.md`
→ `SECTION-operations-automation.md`. This file wins where it gives a value.

**Route:** `/products/operations-automation`
**Copy:** approved and verbatim. Do not rewrite, expand, shorten, reorder, or invent claims.
**Reference build:** `Operations Automation Page.dc.html` (rev 01). The build is the tiebreaker
for geometry; this file is the tiebreaker for copy.
**Sibling pages:** `/products/document-workbench`, `/products/construction-intelligence`,
`/products/project-intelligence`. Header, footer, CTA scale, section rhythm and grid patterns
are shared — build them once.

---

## 0. The three ideas this page must make unmistakable

Everything below serves these. If an implementation choice weakens one, it is wrong.

**1. Operations Automation is the extension layer around Construction OS. It is not a fourth
equal core product.** This is carried *structurally*, not just stated:

- Its slot marker is `——`, **never `04`** — in the hero tag row, the footer product list, and
  every cross-product list on the site.
- It always wears an `EXTENSION LAYER` tag (Steel outline on Paper, Graphite outline on Ink).
- In §8 the three core products are numbered 01/02/03 as equal cards on Paper; Operations
  Automation then appears **below them in a full-bleed Ink band**. The hierarchy is spatial —
  it wraps around them rather than sitting beside them. Do not restructure that section into a
  four-up grid.

**2. These are purpose-built workflows configured around how the contractor already operates
— not eight generic bots and not eight mature off-the-shelf products.**

- The section eyebrow reads `EXAMPLE AUTOMATION WORKFLOWS` and the intro says these are
  examples of the kinds of workflows the product can support. Keep both.
- **No robot, agent, bot, gear, brain, spark, wand, or lightning iconography anywhere.** No
  product logos or per-workflow app icons.
- §7 opens by naming what it isn't ("not a collection of generic bots") and then leads with the
  five configuration questions at heading weight. That ordering is the argument.

**3. The value is taking repetitive production, tracking, evidence capture, document assembly,
information handling, and routine coordination away from skilled construction people — while
keeping judgment and approval with the team.**

- Every workflow entry leads with the **pain removed** and closes on the **business outcome**;
  the technical transformation sits between them at the lowest weight. See §6.
- §5 ("Not every workflow should be automated") is load-bearing credibility. Never cut it to
  save length.

### Visual system

Archivo + Source Serif 4 is the house pairing, but **this page sets zero serif** — it has no
document artifacts. Archivo 400/500/600 plus a mono (`ui-monospace, monospace`) for numerals.
No weight above 600.

Bond / white / ink / graphite, technical rules, square geometry.

**Never:** rounded corners (radius is 0 everywhere), box shadows, gradients, glowing AI
imagery, fake software dashboards or screenshots, chat bubbles, stock photography,
illustration.

### ⚠ Red: this page has none

The rule is that revision red `#C43230` marks a measured change or a breached commitment. This
copy contains neither, so red appears **exactly twice** — the plate inside the Construction OS
mark in the header and in the footer. The hero and closing lockups use the product icon, which
has no plate. No red text, numerals, rules, or emphasis anywhere else.

### ⚠ Grid rules — each caused a real, shipped bug on a sibling page

**(a) Never floor a track at a bare px value.** `repeat(auto-fit, minmax(320px,1fr))` does not
collapse below 320px — it overflows the page at phone width. Every floor on this page reads
`minmax(min(320px, 100%), 1fr)`. Same for 340 / 300 / 280 / 260 / 240 / 200 / 150 / 120.

**(b) Never place two or more px-floored tracks side by side in one row.** Two 220px+260px
floors in a 264px column can never collapse.

**(c) No position-dependent cell chrome on an `auto-fit` grid.** A 3-column grid on desktop is
2 columns at ~800px, so any cell styled for "the third column" (`border-left`, asymmetric
padding, `:nth-child`) lands on the wrong cell. **And never draw dividers with `gap:1px` over
a gray container background** — an unfilled slot in the last row paints as a solid gray block.
The page pattern for divided lists is horizontal rules only, uniform on every cell:
`border-top:1px solid #B8B9B5; padding:<n>px 0` with `column-gap:40px`.

**(d) Space above a full-bleed Ink band is `padding-bottom` on the wrapper**, never
`margin-bottom` on the last grid — the margin collapses out of the section and the grid butts
the band.

### CTA scale — site-wide, both CTA rows
Primary: Ink fill (Paper fill on Ink), `600 14px`, −.01em, `padding:13px 20px`,
`min-height:44px`. Secondary: text only, `600 14px`, `border-bottom:2px solid` (Ink on Paper,
Paper on Ink), `padding-bottom:3px`, `min-height:40px`. Row: `display:flex;
align-items:center; gap:22px; flex-wrap:wrap`.

---

## 1. Section order and surfaces

| # | Section | Surface | Its one job |
|---|---|---|---|
| — | Header (shared, sticky) | Paper | Navigation |
| 1 | Hero | Paper | Extension layer, purpose-built, judgment stays with the team |
| 2 | The work around the job has become a job of its own | Bond | Make the repetition feel expensive |
| 2b | "That's where automation can earn its keep." | **Ink** | Turn problem into premise |
| 3 | Automate the work that follows a pattern | Paper | Explain the mechanism generically, once |
| 4 | Where automation can earn its keep | Bond | **The workflow catalogue** — the page's centerpiece |
| 5 | Not every workflow should be automated | Paper | Credibility: state the limits |
| 6 | Built around how your company already works | Bond | Configuration, not off-the-shelf |
| 7 | The extension layer around Construction OS | Paper | Position against the three core products |
| 7b | Operations Automation's role | **Ink** | Show the layer wrapping the products |
| 8 | Start with the workflow everyone is tired of doing by hand | Bond | Lower the barrier to entry |
| 9 | Closing CTA | **Ink** | Convert |
| — | Footer (shared) | Paper | — |

Section padding 76/80 (hero 76/64, closing 88/80). Ink bands 34px vertical (§7b is 38px — it
carries two columns). No two adjacent sections share a surface; no border between differing
surfaces.

---

## 2. Hero — Paper

**Single column**, `max-width:64ch`, `container-type:inline-size`, `gap:26px`.

1. Tag row (wraps): mono 12px **`——`** · 40px Ink rule · `CONSTRUCTION OS` 11px/600 .16em
   uppercase Steel · **`EXTENSION LAYER`** tag, 11px/600 .14em uppercase Steel in a 1px Steel
   box, 4×8px padding
2. Product name: `Operations Automation`, one line, `white-space:nowrap`,
   `600 clamp(22px,6cqi,34px)/1.05`, −.032em, with `icon-less-repetitive-work.svg` inline at
   `.72em` (three dashes over a rule — **not** the Construction OS bracket mark)
3. Headline `600 clamp(30px,9cqi,48px)/1.02`, −.038em, `balance`: "Automate the repetitive work
   around the job."
4. 17px/400 Graphite, max 56ch: "Your PMs, superintendents, estimators, and operations teams
   still spend valuable time rekeying information, assembling paperwork, tracking requirements,
   comparing files, and following up on routine processes."
5. 18px/500, max 56ch: "Operations Automation adds purpose-built workflows to Construction OS
   that take more of that repeatable work off the team."
6. Kicker — 2px Steel left border, 16px padding-left, 18px/600: "Automate the predictable work.
   Keep judgment where it belongs."
7. CTA row: Ink "Book a demo" + underlined "See example workflows" (anchors to §4)

Then, full width under a **2px Ink rule** (`margin-top:48px`), three capability points —
`repeat(auto-fit, minmax(min(260px,100%),1fr))`, `column-gap:40px; row-gap:8px`, each cell
`padding:26px 0`, **no verticals**: mono number, 20px/600 −.02em title, 15px/400 Graphite body.

| # | Title | Body |
|---|---|---|
| 01 | Built around your process | Automate the way your company actually works—not somebody else's generic workflow. |
| 02 | Start where the pain is | Fix one repetitive bottleneck first. Prove the value. Expand from there. |
| 03 | Keep people in control | Automate production, tracking, and information handling while keeping review, approval, and judgment with your team. |

**No figures, no time-saved percentages, no counts.** Nothing on this page may imply a measured
result.

---

## 3. The work around the job has become a job of its own. — Bond

Eyebrow `THE PROBLEM`, heading `600 clamp(28px,8cqi,42px)/1.05`, −.035em, max 26ch, over a
2px Ink rule.

**The seven frictions** as a uniform divided grid:
`repeat(auto-fit, minmax(min(300px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:18px 0`, 16px/500. Rule (c) — no verticals, no lattice.

An invoice arrives and someone rekeys it. · The superintendent finishes the day and still has to
write the report. · Three subcontractor bids come in three different formats. · A pay app is due
and somebody rebuilds the package. · Safety requirements need to be understood, documented,
trained, and tracked. · A vendor's paperwork is missing and somebody has to notice. · A client
selection is late and somebody has to chase it.

Then a 2px Ink rule (30px above) and a two-column close, 24px padding-top, 46px padding-bottom:

- left, a 10px-gap stack: "None of these tasks is especially complicated." (16px/400 Graphite) +
  "The problem is that they happen over and over." (17px/500 Ink)
- right, 16px/400 Graphite: "Every time they do, someone on your team stops managing
  construction to handle another repeatable administrative task."

### 3b. The premise band — Ink
Full-bleed Ink **inside the same Bond section** so it butts the close with no gap. Content in
`.cos-container`, 34px vertical padding. One line, `600 clamp(22px,3.4vw,30px)/1.25`, −.028em,
Paper, `max-width:32ch`, `balance`: "That's where automation can earn its keep."

Nothing else in the band.

---

## 4. Automate the work that follows a pattern. — Paper

Header: left eyebrow `THE SHAPE OF THE WORK` + heading; right 16px/400 Graphite: "Most good
automation opportunities have the same basic shape." Over a 2px Ink rule, 30px padding-bottom.

**Three steps**, `repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:26px 0`, 12px gap: mono 12px number → title 21px/600
−.022em → body 15px/400 Graphite. `padding-bottom:30px` on the grid.

| # | Title | Body |
|---|---|---|
| 01 | Information comes in. | A bid. An invoice. A field note. A photo. A form. A regulation. A project update. A client decision. |
| 02 | Your company's rules and project context get applied. | What matters? What needs to be checked? What standard applies? Who reviews it? What needs to happen next? |
| 03 | Something useful comes out. | Structured information. A draft. A comparison. A plan. A compliance record. A status. A billing package. A workflow ready for the next step. |

Close under a 2px Ink rule, 19px/600 −.015em, max 70ch: "Stop paying skilled people to manually
repeat work the company already knows how to do."

**This section explains the mechanism once, generically.** That is why the workflow entries in
§6 don't need to explain how they work — do not re-explain per workflow.

---

## 5. Where automation can earn its keep. — Bond

**The centerpiece.** An earlier revision ran this as eight text blocks in a bare divided grid
and it read as visually weak — a run of paragraphs with no objects. The approved treatment
("specimen plates") borrows the answer-card language from the Construction Intelligence page so
the section has real artifacts, and it gives Site Safety flagship status.

Header: left eyebrow `EXAMPLE AUTOMATION WORKFLOWS` + heading; right 16px/400 Graphite: "The
right starting point depends on where your company is losing time. These are examples of the
kinds of workflows Operations Automation can support." Over a 2px Ink rule with
`margin-bottom:34px`.

### 5a. Site Safety — the featured panel

A full-width plate: 1px Ink border, Paper fill, `margin-bottom:30px`. It comes **first**,
before the eight-plate grid, and keeps its `02` number so the numbering still matches the copy
order.

- **Header bar** — 20/24px padding, 1px Ink bottom rule, a baseline-aligned flex row that wraps:
  left, mono 12px `02` · `SITE SAFETY` 11px/600 .14em uppercase Steel · a `FULL LIFECYCLE` tag
  (10px/600 .12em Steel in a 1px Steel box); right, mono 11px Graphite
  `PLAN → TRAIN → TRACK → RECORD`.
- **Body** — `repeat(auto-fit, minmax(min(300px,100%),1fr))`:
  - Left cell, 24px padding, 14px gap: the pain headline at `600 clamp(22px,3vw,26px)/1.25`,
    −.025em, then the three approved paragraphs at 15px/400 Graphite, then pinned to the bottom
    (`margin-top:auto`) the limitation note at 13px/400 Graphite.
  - Right cell — Bond fill, `border-top:1px solid #B8B9B5; border-left:1px solid #B8B9B5`
    (both, so the seam reads in either orientation), 24/20px padding: `THE LIFECYCLE` 11px/600
    .14em over a 1px Ink rule, then the five stages as numbered rows (mono 11px Graphite +
    15px/500), 13px padding, hairline between, none after the fifth.
- **Ink footer band** — 18/24px, `repeat(auto-fit, minmax(min(200px,100%),1fr))`: `WHAT YOU GET`
  11px/600 .14em Line gray + the outcome spanning two tracks at 15px/500 Paper.

Copy, verbatim:

- Pain headline: "Plan the work. Know the requirements. Keep the record."
- Para 1: "Use project conditions and relevant OSHA requirements to help develop the site safety
  plan and training plan before work begins."
- Para 2: "Then track day-to-day safety activity by vendor using field photos, uploaded
  documentation, training records, and other required evidence."
- Para 3: "See what has been completed, what is missing, and where follow-up is needed—while
  maintaining a record by vendor and by day."
- Lifecycle: 01 OSHA requirements · 02 Safety planning · 03 Training plan · 04 Daily vendor
  evidence · 05 Ongoing compliance record
- Outcome: "Better planning up front. Clearer daily compliance tracking. A documented safety
  record throughout the job."

#### ⚠ The OSHA limitation note is approved copy and must ship
Under the left column, at 13px/400 Graphite:

> Supports planning, documentation, and recordkeeping. Your team determines compliance.

**Nothing on this page may imply that the system independently certifies, guarantees,
determines, or verifies legal OSHA compliance.** Permitted verbs: *help develop*, *track*,
*maintain a record*, *see what is missing*. Forbidden: *ensures compliance*, *certifies*,
*guarantees*, *OSHA-approved*, *compliant by default*, or any check/shield/badge iconography
that reads as certification. The lifecycle rail is a scope diagram, not a status tracker — no
green ticks, no percentages, no "compliant" state.

### 5b. The seven remaining workflows — plate grid

`repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:30px`. Each plate: 1px Ink border, Paper
fill, `display:flex; flex-direction:column` so the outcome strip sits flush at the bottom of
equal-height cards.

Plate anatomy — three bands:

1. **Label bar** — 14/20px padding, 1px Line gray bottom rule: mono 12px Graphite number +
   the workflow name at 11px/600 .14em uppercase Steel
2. **Body** — 20px padding, 12px gap, `flex:1`: the **pain headline** at 22px/600 −.024em with
   `text-wrap:balance`, then the mechanism at 15px/400 Graphite (one or two paragraphs)
3. **Outcome strip** — `border-top:1px solid #B8B9B5`, **Bond fill**, 16/20px padding,
   15px/500 Ink

The reading order is deliberate: **name → pain → mechanism → outcome.** The pain headline is
the largest type in the plate and the outcome is the only tinted band, so both outrank the
mechanism. Never promote the mechanism to headline weight.

| # | Workflow | Pain headline | Mechanism | Outcome |
|---|---|---|---|---|
| 01 | Invoice Intake | Stop rekeying invoices and receipts. | Turn incoming invoices and receipts into structured cost information ready for review. | Less data entry. Faster access to usable cost information. |
| 03 | Field Reports | Stop reconstructing the day after it's over. | Capture what happened while it is still fresh and turn voice notes or field notes into a structured daily report ready for review. | Less end-of-day paperwork. Better documentation of what actually happened in the field. |
| 04 | Bid Comparison | Stop comparing apples to oranges. | Normalize subcontractor proposals into a consistent comparison so scope differences, exclusions, allowances, and gaps are easier to spot. | Spend less time formatting bids. More time evaluating what you're actually buying. |
| 05 | Pay App Preparation | Stop rebuilding the billing package every month. | Use the schedule of values, current progress, and project information to help prepare the next billing package. | Spend less time assembling billing. Get it ready for review faster. |
| 06 | Change Order Drafting | Capture the change while the details are still fresh. | Turn field information, scope changes, pricing details, and project context into a professional change-order draft for review. | Reduce the gap between recognizing a change and documenting it properly. |
| 07 | Subcontractor Compliance | Know who's ready—and who needs follow-up. | Track COIs, W-9s, licenses, waivers, and other required vendor documentation. *(second para)* See what is current, what is missing, and what needs attention without repeatedly checking folders and spreadsheets. | Stop chasing paperwork. Focus on the exceptions. |
| 08 | Client Selections | Keep decisions from becoming schedule problems. | Track selections, allowances, approvals, and lead times so unresolved client decisions are easier to see before they affect procurement or schedule. | Turn scattered selections into decisions the project team can actually manage. |

Numbers run 01, 03–08 because Site Safety (02) is the featured panel above. Keep the gap — it
ties the panel to the list.

**Every plate is an example, not a shipped SKU.** No pricing, no "available now", no per-plate
CTA, no "learn more" link, no screenshot inside the plate.

---

## 6. Not every workflow should be automated. — Paper

Two columns, `minmax(min(320px,100%),1fr)`, 48px gap, `align-items:start`.

**Left:** eyebrow `THE LIMITS`, heading `clamp(28px,8cqi,42px)`; under a 1px Line gray rule
(28px above, 20px below), 16px/400 Graphite: "If every situation is different and judgment
drives the work, automation may not be the answer."

**Right:** 2px Ink top rule, then "The best candidates:" at 16px/500 (16px top / 14px bottom
padding), then the four criteria as numbered rows — mono 11px Graphite + 16px/500, 14px
padding, `border-top:1px solid #B8B9B5` on each:

01 happen frequently, · 02 follow repeatable steps, · 03 use understood rules, · 04 and consume
skilled time without requiring skilled judgment at every step.

Then the kicker, 2px Steel left border, 19px/600: "Automate the predictable parts. Keep judgment
where it creates value."

This section is why the rest of the page is believable. **Do not cut, shorten, or move it below
§8.**

---

## 7. Built around how your company already works. — Bond

Header: left eyebrow `CONFIGURATION` + heading `clamp(26px,7cqi,38px)` −.032em; right, two
beats — 16px/400 Graphite "Operations Automation is not a collection of generic bots that forces
your team into somebody else's process." + 17px/500 "We start with the workflow you already
have:". Over a 2px Ink rule.

**The five questions** at heading weight: `repeat(auto-fit, minmax(min(240px,100%),1fr))`,
`column-gap:32px`, each cell `border-top:1px solid #B8B9B5; padding:20px 0`, 19px/600 −.02em:

What triggers it? · What information comes in? · What rules apply? · Who reviews it? · What needs
to happen next?

Setting these at heading weight rather than as body text is the point — they are the intake
interview, and they make configuration concrete.

Close under a 2px Ink rule (30px above), two columns: "Then we identify where the process can
become faster, more consistent, and less manual." (16px/400 Graphite) + **"Your operation is the
starting point. Automation is applied where it actually helps."** (19px/600).

---

## 8. The extension layer around Construction OS. — Paper, closing on an Ink band

**The positioning section.** Header: left eyebrow `THE SYSTEM` + heading; right 16px/400
Graphite: "Operations Automation handles repeatable work around the three core Construction OS
products." Over a 2px Ink rule, 30px padding-bottom.

**The three core products** as equal cards: `repeat(auto-fit, minmax(min(280px,100%),1fr))`,
`column-gap:40px`, each `border-top:1px solid #B8B9B5; padding:26px 0 0`, 12px gap.
`padding-bottom:44px` on the grid (rule (d)).

Each card: header row (mono 12px number · the product's own icon at 15px · product name
17px/600 −.015em, plus the `IN DEVELOPMENT` tag on Project Intelligence) → role line 21px/600
−.022em → description 15px/400 Graphite → a 1px rule → the product's own tagline 15px/500 → the
`Explore … →` secondary link (14px/600, 2px Ink underline, `align-self:flex-start`).

| # | Product / icon | Role | Description | Tagline |
|---|---|---|---|---|
| 01 | Document Workbench · `icon-less-paperwork` | Produce what the work requires. | When a workflow needs a construction document, Document Workbench provides the document-production layer. | Produce the documents that run the job. |
| 02 | Construction Intelligence · `icon-fewer-bottlenecks` | Apply how your company does the work. | When a workflow depends on procedures, standards, pricing rules, regulatory requirements, or company knowledge, Construction Intelligence provides the context behind the decision. | Get the answer. See what it's based on. Know what comes next. |
| 03 | Project Intelligence · `icon-better-visibility` `[IN DEVELOPMENT]` | Surface what needs intervention. | Project Intelligence is designed to identify the open items, aging issues, missing approvals, and other exceptions across active projects that need attention. | Know what needs attention. |

The four roles must stay crisply distinct: **Document Workbench produces. Construction
Intelligence informs. Project Intelligence surfaces exceptions. Operations Automation handles
the repeatable work around them.** Do not blur or reword these.

### 8b. Operations Automation's own band — Ink
Full-bleed Ink inside the same Paper section, content in `.cos-container`, **38px** vertical
padding, `repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:24px 48px`, `align-items:start`:

- **Left:** a header row that wraps — mono 12px Line gray `——` · the product icon at 15px
  (Paper strokes, Line gray baseline) · `Operations Automation` 17px/600 Paper · the
  `EXTENSION LAYER` tag (10px/600 .12em Line gray in a 1px Graphite box). Then the role at
  22px/600 −.022em Paper: "Handle the repeatable work around it."
- **Right:** 16px/400 Line gray: "Move information. Capture evidence. Prepare drafts. Structure
  data. Track recurring requirements. Maintain records. Reduce manual steps." then, above a 1px
  Graphite rule, 15px/500 Paper: "Take repetitive operational work off the team."

**This band is the whole positioning argument in one move** — three numbered products on Paper,
then the unnumbered layer beneath them in Ink. It gets no `Explore` link (you're on it) and no
number. Do not lift it into the card grid.

---

## 9. Start with the workflow everyone is tired of doing by hand. — Bond

Two columns. **Left:** eyebrow `WHERE TO START`, heading `clamp(28px,8cqi,42px)`; under a 1px
Line gray rule, 17px/500: "You don't need to automate the whole company."

**Right:** 2px Ink top rule, then four candidate lines at 17px/500, 16px padding, hairline
between (none after the fourth):

Start with the process that happens every week. · The task everyone complains about. · The work
that gets delayed because nobody wants to do it. · The administrative process that consumes
skilled time without requiring skilled judgment.

Then the kicker, 2px Steel left border, 19px/600: "Solve one real problem. Prove the value.
Expand from there."

---

## 10. Closing CTA — Ink

Two columns, `minmax(min(340px,100%),1fr)`, 56px gap, `align-items:start`, padding 88/80.

**Left:** lockup row (wraps) — the product icon at 24px (Paper strokes, Line gray baseline,
**no red plate**) · `OPERATIONS AUTOMATION` 14px/600 .14em Paper · the `EXTENSION LAYER` tag ·
a 1px Graphite rule filling the rest of the row. Then:

- heading `600 clamp(34px,11cqi,64px)/0.98`, −.042em, Paper, `balance`: "Take repetitive work
  off the team."
- 19px/400 Line gray, max 46ch: "Your project managers, superintendents, estimators, and
  operations leaders should spend their time managing construction—not rebuilding the same
  administrative workflows over and over."
- 16px/400 Line gray, max 46ch: "See where purpose-built automation can remove manual work from
  your operation."
- CTA row: Paper-filled "Book a demo" + Paper-underlined "Explore Construction OS →"

**Right:** "The core products" (12px/500 .12em Line gray — note: *core products*, not "the rest
of the system", because this page is the layer around them) then three rows separated by 1px
Graphite rules — icons at 15px, mono numbers Line gray, names 17px/600 Paper: 01 Document
Workbench · 02 Construction Intelligence · 03 Project Intelligence `[IN DEVELOPMENT]`.

---

## 11. Footer

Shared component. Title-block cells: `SHEET CONSTRUCTION OS` · `PAGE OPERATIONS AUTOMATION` ·
`ISSUED 2026-09-06` · `REV 01` · `STATUS ISSUED FOR REVIEW`. In the Products column, Operations
Automation is the Ink-weight item and its marker is **`——`**, listed after 01/02/03.

The footer tagline stays "Three products. One construction operating system." — Operations
Automation is not counted as a fourth.

---

## 12. Behavior

- Header `position:sticky; top:0; z-index:50`, 1px bottom rule. No scroll-state change, no
  shadow, no shrink.
- "Book a demo" (both) → the site's demo route/modal. "See example workflows" → anchor to §5.
  The four `Explore … →` links → the respective product routes; "Explore Construction OS →" →
  the products overview.
- Hover/focus states are not in the prototype — add them in the site's convention, quiet: no
  lifts, no scale, no color washes. Plates do **not** get a hover state; they are not clickable.
  Global `a`/`a:hover` are Steel `#476776` → Ink `#111111`. Every CTA needs a visible keyboard
  focus ring.
- **No animation.** Nothing enters on scroll, counts up, parallaxes, or types itself out.
- Semantics: the prototype renders everything as `<div>`. In production use `<header>`, `<nav>`,
  `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`, `<a>`/`<button>` for CTAs, `<ul>`/`<ol>` for
  the friction list, criteria, lifecycle, and plate grid.
- The prototype's inline styles are an artifact of our preview tool — convert to the codebase's
  normal styling layer.

---

## Acceptance check

1. `document.documentElement.scrollWidth === clientWidth` at **375px**, 800px, 909px and
   1440px. Probe every grid, not just the page shell.
2. No grid track is floored at a bare px value; no row places two or more px-floored tracks side
   by side.
3. At 800px content width every `auto-fit` grid resolves cleanly: no cell shows a left border, a
   left indent, a half-width rule, or a gray block in an unfilled slot.
4. The Site Safety panel's lifecycle rail wraps below the copy in a narrow column and is never
   clipped; the plate grid reflows 3 → 2 → 1 with the outcome strip still flush at each plate's
   bottom.
5. `#C43230` appears exactly **twice** — the mark's plate in the header and footer. No red text,
   numerals, or rules.
6. Operations Automation is never numbered `04`, and always carries an `EXTENSION LAYER` tag.
7. §8's Ink band sits **below** the three numbered product cards, full-bleed, and is not part of
   the card grid.
8. Zero serif characters, zero rounded corners, zero box shadows, zero gradients.
9. No robot, agent, gear, brain, spark, wand, or lightning iconography; no fake dashboards or
   screenshots.
10. The OSHA limitation note is present at full size under the Site Safety copy, and no wording
    or icon anywhere implies certification or guaranteed compliance.
11. In every workflow plate the pain headline is the largest type and the outcome strip is the
    only tinted band.
12. No text lighter than `#5F6466` on Paper/Bond; on Ink nothing darker than `#B8B9B5`.
13. No two adjacent sections share a background; no border between differing surfaces.
14. Both CTA rows use the 14px / 13×20 / 44px primary and the 2px-underlined 14px secondary.
15. Every section closes on a rule, a band, or a footer row — none ends on whitespace.
