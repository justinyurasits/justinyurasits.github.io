# Page spec — Construction Intelligence (product page)

Read first: `README.md` → `CONSTRUCTION-OS-BRAND-KIT.md` → `COMPONENT-product-block.md`
→ `SECTION-construction-intelligence.md` (the answer-specimen anatomy lives there).
This file wins where it gives a value.

**Route:** `/products/construction-intelligence`
**Copy:** approved and verbatim. Do not rewrite, expand, shorten, or reorder a line.
**Reference build:** `Construction Intelligence Page.dc.html` (rev 03). The build is the
tiebreaker for geometry; this file is the tiebreaker for copy.
**Supersedes** the 12-section rev 02 (`archive/Construction Intelligence Page rev02.dc.html`).
If you have seen that structure, discard it — sections were merged and cut deliberately.
**Sibling pages:** `/products/document-workbench`, `/products/project-intelligence`. Header,
footer, CTA scale, section rhythm and grid patterns are shared — build them once.

---

## 0. What this page has to accomplish

The product story, in order, and the page is built to walk it exactly once:

> **company-specific answer → source-backed reasoning → next action**

The business problem: **too much valuable company knowledge is trapped in a few experienced
people, scattered documents, and past projects.**

It must read as part of Construction OS, not as a generic AI chatbot or a
knowledge-management tool. It should feel substantive but never long or repetitive — **every
section has a distinct marketing job, listed in §1. If a section starts duplicating another's
job, cut it rather than restyle it.**

### Visual system — the prohibitions matter as much as the tokens

Technical rules, square geometry, real knowledge artifacts, restrained red.

**Never:** rounded SaaS cards, any border radius, box shadows, gradients, glowing "AI"
visuals, chat bubbles, avatars, sparkle/wand iconography, stock photography, illustration, or
invented UI. The one product visual on this page is the **real answer specimen** in §4.

### Typography — Archivo only on this page

The house system is Archivo + Source Serif 4, but **this page sets zero serif.** The specimen
is product UI, not a document, and the serif is reserved for document artifacts on the
Document Workbench page. Archivo 400/500/600 plus a mono (`ui-monospace, monospace`) for
numerals and document codes. No weight above 600.

### ⚠ Red: this page has almost none

The rule: **revision red `#C43230` marks a measured change or a breached commitment. Never a
status merely in progress, never decoration.** This copy contains neither a measured change
nor a breach, so red appears **exactly twice** — the plate inside the Construction OS mark in
the header and in the footer. The closing lockup uses the *product* icon, which has no plate.
No red text, numerals, rules, or emphasis anywhere else.

---

## 1. Section order, surfaces, and each section's job

| # | Section | Surface | Its one job |
|---|---|---|---|
| — | Header (shared, sticky) | Paper | Navigation |
| 1 | Hero | Paper | Establish that this is not generic AI retrieval |
| 2 | Your best people shouldn't be the only path to an answer | Bond | Make the business problem feel personal and expensive |
| 2b | "Your company already knows more than it can consistently use." | **Ink** | Transition from problem to product |
| 3 | Turn what your company knows into something the whole team can use | Paper | Explain the product in three steps |
| 4 | Get the answer—and see what it's based on | Bond | **Prove it** with the real specimen |
| 5 | Ask how your company does the work | Paper | Show which questions are actually valuable |
| 6 | The answer shouldn't be the end of the workflow | Bond | Explain why it belongs inside Construction OS |
| 6b | "Ask the question. Understand the requirement…" | **Ink** | Land the knowledge-to-action claim |
| 7 | Keep what your company has learned | Paper | Continuity + onboarding, combined |
| 8 | Not a generic chatbot | Bond | Differentiate, then show what configuration means |
| 9 | Closing CTA | **Ink** | Convert |
| — | Footer (shared) | Paper | — |

Section padding 76/80 (hero 76/64, closing 88/80). Ink bands 34px vertical. No two adjacent
sections share a surface; no border between differing surfaces.

**§7 is deliberately one section, not three.** Retirement, succession and onboarding were
separate chapters in rev 02 and the page felt repetitive. Do not re-split them.

---

## 2. Prerequisites

- `.cos-container { max-width:1280px; margin:0 auto; padding-inline:clamp(24px,6vw,96px); }`
  on the inner wrapper of **every** section, including full-bleed Ink bands.
- Contrast pairing: on Paper/Bond, Graphite `#5F6466` is the lightest legal text and Line gray
  `#B8B9B5` draws hairlines. **On Ink, Line gray is the lightest legal text and Graphite draws
  the rules.** Inverting this is the most common error on these pages.
- Rules: `2px solid #111111` under a section header and above a closing statement;
  `1px solid #B8B9B5` between rows. **Hairlines between rows only — never after the last row.**
- Two-column sections: `repeat(auto-fit, minmax(min(320px,100%),1fr))`, 40–48px gap,
  `align-items:start`.

### ⚠ Grid rules — each of these caused a real, shipped bug

**(a) Never floor a track at a bare px value.** `repeat(auto-fit, minmax(320px,1fr))` does not
collapse below 320px — it overflows the page at phone width. Every floor on this page reads
`minmax(min(320px, 100%), 1fr)`. Same for 340 / 300 / 280 / 260 / 240 / 200 / 150.

**(b) Never place two or more px-floored tracks side by side in one row.** The rev-02 ledger
was `46px minmax(220px,1fr) minmax(260px,1.3fr)` — a 582px minimum inside a 264px column,
which can never collapse. Ledger rows are now
`repeat(auto-fit, minmax(min(300px,100%),1fr))` with **the row number moved inside the first
cell** as a `width:46px; flex:none` mono block. The title's left edge is unchanged at wide
widths and the row stacks cleanly on a phone.

**(c) No position-dependent cell chrome on an `auto-fit` grid.** A 3-column grid on desktop is
2 columns at ~800px; any cell styled for "the third column" (`border-left`, asymmetric
padding, `:nth-child`) then lands on the wrong cell — stray vertical rules at the section edge,
indented text. **And never draw dividers with `gap:1px` over a gray container background** —
an unfilled slot in the last row paints as a solid gray block. The page pattern is horizontal
rules only, uniform on every cell:

```css
.cos-cells { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));
             column-gap:40px; }
.cos-cells > * { border-top:1px solid #B8B9B5; padding:26px 0; }
```

**(d) Space above a full-bleed Ink band is `padding-bottom` on the wrapper**, never
`margin-bottom` on the last grid — the margin collapses out of the section and the grid butts
the band.

### CTA scale — site-wide, both CTA rows
Primary: Ink fill (Paper fill on Ink), `600 14px`, −.01em, `padding:13px 20px`,
`min-height:44px`, flex-centered — identical to the header CTA.
Secondary: text only, `600 14px`, `border-bottom:2px solid` (Ink on Paper, Paper on Ink),
`padding-bottom:3px`, `min-height:40px`.
Row: `display:flex; align-items:center; gap:22px; flex-wrap:wrap`.
No rounded corners, no shadows, no ghost/outline variants.

---

## 3. Hero — Paper

**Single column**, `max-width:64ch`, `container-type:inline-size`, `gap:26px`. The specimen is
**not** in the hero — it has its own section (§4) and appears once on the page.

1. Masterbrand tag row: mono 12px `02` · 40px Ink rule · `CONSTRUCTION OS` 11px/600 .16em
   uppercase Steel `#476776`
2. Product name: `Construction Intelligence`, one line, `white-space:nowrap`,
   `600 clamp(22px,6cqi,34px)/1.05`, −.032em, with `icon-fewer-bottlenecks.svg` inline at
   `.72em` (the two-path flow icon — **not** the Construction OS bracket mark)
3. Headline `600 clamp(30px,9cqi,48px)/1.02`, −.038em, `text-wrap:balance`:
   "Put your company's knowledge to work."
4. Body 17px/400 Graphite, max 56ch — one paragraph, exactly as approved: "Your company has
   spent years learning how to price work, manage changes, write scopes, solve problems, and
   run projects. Construction Intelligence combines that know-how with your procedures,
   pricing rules, standards, templates, and project history—so your team can get
   company-specific answers without tracking down the person who knows."
5. Outcome line — 2px Steel left border, 16px padding-left, 18px/600:
   "Get the answer. See what it's based on. Know what comes next."
   *(This line is the page's thesis. It gets the accent rule; nothing else in the hero does.)*
6. CTA row: Ink "Book a demo" + underlined "See an answer" (anchors to §4)

Then, full width under a **2px Ink rule** (`margin-top:48px`), the three capability points —
`repeat(auto-fit, minmax(min(260px,100%),1fr))`, `column-gap:40px; row-gap:8px`, each cell
`padding:26px 0`, **no verticals**: mono number, 20px/600 −.02em title, 15px/400 Graphite body.

| # | Title | Body |
|---|---|---|
| 01 | Company-specific answers | Grounded in your procedures, pricing rules, standards, templates, and project history. |
| 02 | Source-backed reasoning | See the procedure, standard, or reference behind the answer. |
| 03 | From answer to action | When the answer requires a document or next step, guide the PM to the right workflow in Document Workbench. |

**No figures or metrics.** This product has no measurable claim yet and a placeholder must not
ship.

---

## 4. Your best people shouldn't be the only path to an answer. — Bond

Header block: two columns, 40/48px gap, over a **2px Ink rule** with 30px padding-bottom.
Left — eyebrow `THE PROBLEM`, heading `600 clamp(28px,8cqi,42px)/1.05`, −.035em, `balance`.
Right — the intro as two beats:

- 16px/400 Graphite: "Every construction company has people everyone depends on. The senior PM
  who knows how a difficult change should be handled. The estimator whose pricing judgment
  everyone trusts. The COO who knows the procedure nobody else can find."
- 17px/500 Ink: "Their experience is valuable. The problem is when the whole company has to go
  through them to use it."

**The four pains are an editorial ledger, not four cards.** Rows:
`repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:0 28px`, `align-items:baseline`, 28px
vertical padding, hairline between rows only, 46px padding-bottom under the last.

Cell 1 = flex pair: mono 12px Graphite number in a `width:46px; flex:none` block, then the
statement at **21px/600 −.022em** — these are claims, so they are set at question weight.
Cell 2 = the consequence at 16px/400 Graphite.

| # | Statement | Consequence |
|---|---|---|
| 01 | Your best people become bottlenecks. | The same experienced people get interrupted all day to answer questions the company has already answered before. |
| 02 | Experienced people leave—and the knowledge leaves with them. | Retirement, turnover, and succession can take decades of accumulated judgment out of the business. |
| 03 | New people know construction. They don't know your company yet. | They still need to learn your pricing philosophy, standards, contract practices, approval requirements, and the lessons your team learned the hard way. |
| 04 | The answer exists. Nobody can find it. | Procedures, pricing guidance, examples, and project lessons are scattered across folders, documents, and past jobs—so asking a person is often easier than finding the answer. |

### 4b. The transition band — Ink
Full-bleed Ink **inside the same Bond section** so it butts the rows with no gap. Content in
`.cos-container`, 34px vertical padding. One line, `600 clamp(22px,3.4vw,30px)/1.25`, −.028em,
Paper, `max-width:32ch`, `text-wrap:balance`:

> Your company already knows more than it can consistently use.

**It must set on two lines**, not three — that is what the 32ch cap and `balance` are for.
Nothing else in this band: no eyebrow, no supporting line, no CTA. This band is the hinge
between problem and product; do not demote it to body copy.

---

## 5. Turn what your company knows into something the whole team can use. — Paper

Header block: left eyebrow `THE PRODUCT` + heading; right, 16px/400 Graphite: "Construction
Intelligence combines construction know-how with the knowledge specific to your business: your
procedures, pricing rules, standards, templates, contract language, project examples, and
documented operating judgment." Over a 2px Ink rule, 30px padding-bottom.

**Three steps**, `repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:26px 0`, 10px gap: mono 12px number → title 21px/600
−.022em → body 15px/400 Graphite. `padding-bottom:30px` on the grid.

| # | Title | Body |
|---|---|---|
| 01 | Ask the real question | Ask in normal construction language, with the project and contract details that actually matter. |
| 02 | Get the company-specific answer | Apply the procedures, standards, pricing rules, references, and context relevant to the question. |
| 03 | See why—and what happens next | See the sources behind the guidance, understand the conditions that could change the answer, and identify the next action when one is required. |

Close under a 2px Ink rule, 19px/600 −.015em, max 70ch: "The goal isn't to replace experienced
people. It's to stop making them the only way the company can access what it already knows."

---

## 6. Get the answer—and see what it's based on. — Bond

**One of the two strongest visual moments on the page.** It sits on Bond so the Paper-filled
specimen reads as an object placed on the page.

Header: left eyebrow `THE ANSWER` + heading; right, right-aligned caption row —
`CONSTRUCTION INTELLIGENCE — ANSWER` (mono 11px Graphite) + `SPECIMEN` (mono 11px Steel).
2px Ink rule, 34px below it. The specimen then runs the **full container width**.

Use the existing real specimen from `SECTION-construction-intelligence.md`. Do not invent UI,
do not add a chat frame, input field, cursor, typing animation, or model badge.

Anatomy: 1px Ink border, Paper fill.

- **Question band** — 20/24/22px padding, 1px Ink bottom rule: `QUESTION` mono 11px .1em Steel,
  then the question at 21px/600 −.022em:
  "How should we price an owner-requested millwork change on a cost-plus project?"
- **Body** — two tracks:
  ```css
  .cos-answer__body { display:grid;
    grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr)); }
  .cos-sources { border-top:1px solid #B8B9B5; border-left:1px solid #B8B9B5;
                 background:#EFEFEB; }
  ```
  ⚠ Do **not** use `minmax(260px,1.5fr) minmax(200px,1fr)` — two px minimums totalling 460px
  in a narrow column pushed the page 31px wide and clipped the rail. The rail must wrap *below*
  the answer text, and it carries **both** a top and a left border so the seam reads in either
  orientation.

  Answer column, 24px padding, 15px gap — first beat 16px/500 −.01em, then two 15px/400
  Graphite paragraphs, verbatim:
  1. "On cost-plus, the PCO is still required—it establishes owner consent that the costs are
     eligible and defines whether fee applies."
  2. "For subcontracted millwork, price from the shop quote, write the scope internally, apply
     contract fee without compounding and show it separately, state schedule impact in calendar
     days, and get written authorization before fabrication begins."
  3. "If pricing is not final and the owner wants the shop released, authorize in writing as
     NTE or T&M—never verbally."

  Sources rail, Bond fill — `SOURCES` 11px/600 .14em + count `4` over a 1px Ink rule; four
  entries at mono 12px code + 13px/400 Graphite gloss, hairline between; then pinned to the
  bottom (`margin-top:auto`) a 1px Line gray rule with `ANSWERED FROM` (11px/600 Steel) +
  "Your company's procedures and standards".

  | Code | Gloss |
  |---|---|
  | FCM-03 §8.2 | Cost-plus change authorization and fee treatment |
  | CHG-53 §8.6 / §9.2 | PCO pricing presentation and contractor-written scope |
  | CON-16 §7.4 | Fee and markup rules |
  | CHG-59 | NTE / T&M authorization |

- **Ink footer band** — 18/24px: `WHAT CHANGES THE ANSWER` 11px/600 .14em Line gray + value
  spanning two tracks, 15px/500 Paper: "Subcontracted vs. self-performed millwork; whether the
  project has a GMP cap."

Under the specimen, 20px above, a two-column note that says what it proves —
16px/500 "An answer, the basis for it, and the conditions that would change it." + 15px/400
Graphite "Not a retrieved document, and not an unexplained response." **This is the section's
argument; it must not restate the headline.**

The specimen appears **once** on the page.

---

## 7. Ask how your company does the work. — Paper

Header: left eyebrow `THE QUESTIONS` + heading; right, 16px/400 Graphite: "Generic
construction questions are easy. The valuable questions are the ones where the answer depends
on both construction knowledge and how your company operates." Over a 2px Ink rule.

**Four paired rows.** `repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:16px 28px`, 26px
vertical padding, hairline between rows only.

Cell 1: the category at 11px/600 .14em uppercase Steel, then a baseline-aligned flex pair —
`INSTEAD OF` at 11px/500 .1em uppercase Graphite (`flex:none`) + the generic question at
16px/400 Graphite.
Cell 2: a baseline-aligned flex pair — `ASK` at 11px/600 .1em uppercase **Ink** (`flex:none`) +
the company question at **21px/600 −.022em Ink**.

The weight and color difference between the two columns *is* the argument — do not add icons,
arrows, checkmarks, crosses, or color coding.

| Category | Instead of | Ask |
|---|---|---|
| Changes | How do you price a change order? | How should we price this owner-requested millwork change on this type of contract? |
| Contracts | What belongs in a subcontract? | What does our company require before this subcontract can be issued? |
| RFIs | What is an RFI? | Based on this condition and our process, should we issue an RFI? |
| Company process | What is the standard procedure? | How are we expected to handle this here? |

Close under a 2px Ink rule (30px above, 24px padding-top), 19px/600 −.015em: "These aren't
just knowledge questions. They're operating questions."

Four pairs is the maximum. A fifth makes the section a list instead of a point.

---

## 8. The answer shouldn't be the end of the workflow. — Bond, closing on an Ink band

**The other major section.** It is the only place the page explains why Construction
Intelligence lives inside Construction OS rather than standing alone.

Header block over a 2px Ink rule, 30px padding-bottom. Left: eyebrow
`CONSTRUCTION OS CONNECTION`, heading `clamp(28px,8cqi,42px)`, then the subhead 14px below at
20px/500 −.02em: "Know what to do. Then do it." Right: 16px/400 Graphite: "When an answer
requires documentation, approval, or another project action, Construction Intelligence can
guide the PM toward the appropriate document or workflow in Document Workbench."

**Three examples as vertical two-step flows.**
`repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:26px 0 0`, 16px gap. `padding-bottom:40px` on the grid
(rule (d) — the Ink band follows).

Each cell, top to bottom:
1. Example name — 21px/600 −.022em
2. **CI step**: an icon row (`icon-fewer-bottlenecks.svg` at 14px + `CONSTRUCTION INTELLIGENCE`
   11px/600 .14em uppercase Steel), then the action at 16px/500 Ink
3. **The connector** — a `↓` glyph, mono 16px, Steel. Nothing else: no line, no chevron
   graphic, no animation
4. **DW step**: an icon row (`icon-less-paperwork.svg` at 14px + `DOCUMENT WORKBENCH` in the
   same label style), then the action at 15px/400 Graphite

| Example | Construction Intelligence (500 Ink) | Document Workbench (400 Graphite) |
|---|---|---|
| Owner-requested change | Determine the required authorization, pricing treatment, and relevant company procedure. | Guide the PM toward the appropriate change documentation. |
| Subcontract readiness | Identify requirements or approvals that are still missing. | Guide the PM toward the appropriate subcontract or supporting documentation. |
| Potential RFI | Determine whether the condition requires formal clarification. | Guide the PM toward the appropriate RFI workflow when one is needed. |

### ⚠ Do not overclaim the integration
The approved verbs are **guide**, **identify**, **point the PM toward**, and **determine**.
Never imply that Construction Intelligence launches a workflow, opens a document, or generates
paperwork automatically — that functionality does not exist. No "one click", no "automatically",
no button in the diagram, no arrow that looks like a system action.

### 8b. The Ink band
Full-bleed Ink inside the same Bond section, content in `.cos-container`, 34px vertical
padding, `repeat(auto-fit, minmax(min(260px,100%),1fr))`, `align-items:baseline`:

- label `KNOWLEDGE TO ACTION` — 11px/600 .14em uppercase, **Line gray**
- value spanning two tracks — 22px/600 −.022em **Paper**: "Ask the question. Understand the
  requirement. Build the document that moves the job forward."
- beneath it, 15px/500 Line gray: "The answer tells the team what happens next."

---

## 9. Keep what your company has learned. — Paper

Continuity, succession and onboarding in **one** section. Two columns, 48px gap,
`align-items:start`.

**Left:** eyebrow `CONTINUITY`, heading `clamp(28px,8cqi,42px)`; then under a 1px Line gray
rule (28px above, 20px below) two Graphite paragraphs at 16px/400, 14px gap:

1. "Some of a construction company's most valuable knowledge was accumulated over ten, twenty,
   or thirty years. Much of it was never designed to survive the person who learned it."
2. "Retirement, turnover, and succession make that a business problem. So does bringing a new
   PM into a company whose standards, pricing judgment, and operating practices may take years
   to absorb informally."

**Right:** 2px Ink top rule, then the two outcomes — title 21px/600 −.022em + body 15px/400
Graphite, 22px padding, hairline between:

- **Preserve more of the experience.** — Document procedures, examples, standards, decision
  guidance, and lessons while experienced people are still available to explain them.
- **Give new people a better way to learn.** — Let PMs find company-specific guidance in the
  context of the work they are actually doing instead of depending on someone being available
  to explain everything.

Then, under a 1px Line gray rule, the three imperatives at 20px/600 −.02em, 8px padding each,
**no rules between them** — they read as one gesture:

Preserve the lessons. · Pass on the judgment. · Keep the company from starting over.

### ⚠ Do not overclaim capture
Nothing here may suggest the product extracts tacit knowledge from employees, listens,
observes, or "learns from your team automatically." The claim is that **intentionally captured**
company knowledge becomes easier to preserve and reuse.

---

## 10. Not a generic chatbot. — Bond

Header block over a 2px Ink rule, 30px padding-bottom. Left: eyebrow `THE DISTINCTION`,
heading "Not a generic chatbot." (no `balance` — it's short). Right, 16px/400 Graphite:
"Generic AI knows a lot about construction. It does not automatically know your pricing rules,
contract language, approval process, preferred scope structure, documentation standards,
operating procedures, or the lessons your company learned on previous jobs."

**The different question**, 30px below in a two-column row (`minmax(min(300px,100%),1fr)`,
20/48px gap, `align-items:start`):

- left, 17px/500: "Construction Intelligence starts with a different question:"
- right, **2px Steel left border**, 22px/600 −.022em: "What should our team do, based on what
  construction requires and how our company operates?"

Then a 2px Ink rule, 26px padding-top, and 16px/500: "We configure Construction Intelligence
around the knowledge your company already has:" followed by the **eight inputs** in a
`repeat(auto-fit, minmax(min(240px,100%),1fr))` grid, `gap:0 32px` — each a mono 11px Graphite
number + 16px/500 label with a 1px Line gray bottom rule and 14px padding:

01 Procedures and SOPs · 02 Templates and standard documents · 03 Pricing references and rules ·
04 Contract language · 05 Company standards · 06 Project examples · 07 Lessons learned ·
08 Documented decision guidance

Close, 34px below, 19px/600 −.015em, max 70ch: "Your company's knowledge becomes something the
whole team can use—not something they have to know who to ask for."

---

## 11. Closing CTA — Ink

Two columns, `minmax(min(340px,100%),1fr)`, 56px gap, `align-items:start`, padding 88/80.
Consistent with the homepage CTA treatment.

**Left:** lockup row — the **product icon** at 24px (`icon-fewer-bottlenecks`, Paper strokes,
Line gray axis line, **no red plate**; the Construction OS bracket mark is wrong here) ·
`CONSTRUCTION INTELLIGENCE` 14px/600 .14em Paper · a 1px Graphite rule filling the rest of the
row. Then:

- heading `600 clamp(34px,11cqi,64px)/0.98`, −.042em, Paper, `balance`:
  "Put your best people's judgment in reach of the whole team."
- 19px/400 Line gray, max 46ch: "Your senior people should spend their time on the decisions
  that actually require their experience—not repeatedly retrieving information the company
  already knows."
- 16px/400 Line gray, max 46ch: "Give your team a better path to the answer, the reasoning
  behind it, and the work that needs to happen next."
- CTA row: Paper-filled "Book a demo" + Paper-underlined "Explore Document Workbench →"

**Right:** "The rest of the system" (12px/500 .12em Line gray) then three rows separated by 1px
Graphite rules — icons at 15px, mono numbers Line gray, names 17px/600 Paper:
01 Document Workbench · 03 Project Intelligence `[IN DEVELOPMENT]` (10px/600 .12em Line gray in
a 1px Graphite box) · —— Operations Automation `EXTENSION LAYER` (10px/500 .12em Line gray, no
box). **Construction Intelligence is not listed** — you're on it.

---

## 12. Footer

Shared component. Title-block cells: `SHEET CONSTRUCTION OS` · `PAGE CONSTRUCTION
INTELLIGENCE` · `ISSUED 2026-09-06` · `REV 03` · `STATUS ISSUED FOR REVIEW`. In the Products
column, Construction Intelligence is the Ink-weight item (02); the other three are Graphite.

---

## 13. Behavior

- Header `position:sticky; top:0; z-index:50` with a 1px bottom rule. No scroll-state change,
  no shadow, no shrink.
- "Book a demo" (both) → the site's demo route/modal. "See an answer" → anchor to §6.
  "Explore Document Workbench →" → `/products/document-workbench`.
- Hover/focus states are not in the prototype and must be added in the site's convention —
  quiet: no lifts, no scale, no color washes. Global `a`/`a:hover` are Steel `#476776` → Ink
  `#111111`. Every CTA needs a visible keyboard focus ring.
- **No animation.** Nothing enters on scroll, counts up, parallaxes, or types itself out.
- Semantics: the prototype renders everything as `<div>`. In production use `<header>`,
  `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`, `<a>`/`<button>` for CTAs,
  `<ol>`/`<ul>` for the ledgers and input lists.
- The prototype's inline styles are an artifact of our preview tool — convert to the codebase's
  normal styling layer.

---

## Acceptance check

1. `document.documentElement.scrollWidth === clientWidth` at **375px**, 800px, 909px and
   1440px. Probe every grid, not just the page shell — 375px is where these pages have failed.
2. No grid track is floored at a bare px value (every floor reads `minmax(min(Npx,100%),1fr)`),
   and no row places two or more px-floored tracks side by side.
3. At 800px content width every `auto-fit` grid resolves to 2 columns and no cell shows a left
   border, a left indent, a half-width rule, or a gray block in an unfilled slot.
4. The specimen's sources rail wraps below the answer text in a narrow column and is never
   clipped.
5. Zero serif characters on the page.
6. `#C43230` appears exactly **twice** — the mark's plate in the header and in the footer. The
   closing lockup has no red. No red text, numerals, or rules.
7. No text lighter than `#5F6466` on Paper/Bond; on Ink nothing darker than `#B8B9B5`.
8. No two adjacent sections share a background; no border between differing surfaces.
9. Section 4b sets on exactly two lines at desktop and butts the rows above with no gap.
10. Ledger and paired-row sections have hairlines between rows only, never after the last row.
11. In every ledger row the title's left edge sits 46px from the row's left edge, matching the
    sibling product pages.
12. §8's flows use only the approved verbs; no element implies automatic document generation.
13. Both CTA rows use the 14px / 13×20 / 44px primary and the 2px-underlined 14px secondary.
14. Zero rounded corners, zero box shadows, zero gradients on the page.
15. Every section closes on a rule, a band, or a footer row — none ends on whitespace.
