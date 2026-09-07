# Page spec — Services

Read first: `README.md` → `CONSTRUCTION-OS-BRAND-KIT.md` → **`COMPONENT-header-nav.md`**
(the nav label set and the links audit live there). This file wins where it gives a value.

**Route:** `/services`
**Copy:** approved and verbatim. Do not rewrite, expand, shorten, reorder, or invent claims —
including section labels and rail headings.
**Reference build:** `Services Page.dc.html` (rev 01). The build is the tiebreaker for geometry;
this file is the tiebreaker for copy.
**Related pages:** the five product pages under `/products/*`. Header, footer, CTA scale, section
rhythm and grid patterns are shared — build them once.

---

## 0. What this page is, and what it isn't

This is the **services page**, not a product page. Three things make it different from its
siblings, and all three must survive implementation:

**1. It is written in first person.** "I help construction companies…", "I configure the
system…", "I can build around it", "Bring me the problem everyone already knows about."
This is the one page on the site with a person behind it. **Do not neutralize the voice to
"we"** — the copy's credibility depends on it.

**2. It sells the engagement, not the software.** The product pages argue for capabilities;
this page argues for a way of working: find the problem → make it tangible → prove it in real
work. Product cross-links exist (§6) but they are supporting evidence, not the pitch.

**3. It refuses to lead with AI.** "You don't need an AI strategy deck." · "Not with a list of
AI ideas." · "The outcome is not a long AI roadmap." · "I'm not interested in automating
something simply because AI can do it." That refusal is the positioning. **Never add
"AI-powered", "agentic", "LLM", "intelligent automation", model names, or an AI-capabilities
list anywhere on the page.**

### ⚠ Nav label: this page is `Services`

The header's third item is **`Services`**, not "Engagements" — `Work` · `Products` · `Services`
· `About`. The label was inconsistent across pages at one point; it is now Services everywhere,
in the header and in the footer's Company column, and it routes to `/services`. See
`COMPONENT-header-nav.md` §1 and §6. On this page it is the active item (Ink text, 2px Ink
bottom rule) in both header and footer.

### Visual system

Archivo + Source Serif 4 is the house pairing, but **this page sets zero serif.** Archivo
400/500/600 plus a mono (`ui-monospace, monospace`) for numerals. No weight above 600.

White / bond / ink / graphite, technical rules, square geometry.

**Never:** rounded corners (radius 0 everywhere), box shadows, gradients, glowing AI imagery,
fake dashboards or screenshots, robot/agent/gear/brain/spark/wand iconography, stock
photography, illustration, **and no headshot or portrait** — the background section (§10) is
type only.

### ⚠ Red: this page has none

Revision red `#C43230` marks a measured change or a breached commitment; this copy has neither.
Red appears **exactly twice** — the plate inside the Construction OS mark in the header and in
the footer. The closing lockup uses the Construction OS mark **with** its plate (this page has
no product glyph of its own), so if you build the lockup from the mark asset, that is a third
instance and is correct; count marks, not glyphs. No red text, numerals, or rules.

### ⚠ Grid rules — each caused a real, shipped bug in this family

**(a) Never floor a track at a bare px value.** `repeat(auto-fit, minmax(320px,1fr))` does not
collapse below 320px — it overflows the page at phone width. Every floor on this page reads
`minmax(min(320px, 100%), 1fr)`. Same for 300 / 280 / 240 / 200 / 150.

**(b) Never place two or more px-floored tracks side by side in one row.**

**(c) Any grid that can wrap to a second row needs a `row-gap`.** §6's four-card product grid
uses `column-gap:40px; row-gap:34px`; at two columns the second row's cards would otherwise
collide with the first row's `Explore …` underlines.

**(d) No position-dependent cell chrome on an `auto-fit` grid**, and **never draw dividers with
`gap:1px` over a gray container background** — an unfilled slot in the last row paints as a
solid gray block. The pattern for divided lists is horizontal rules only, uniform on every
cell: `border-top:1px solid #B8B9B5; padding:<n>px 0` with `column-gap:40px`. The 7-item and
8-item lists on this page rely on that — they leave clean empty trailing slots.

**(e) Space above a full-bleed Ink band is `padding-bottom` on the wrapper**, never
`margin-bottom` on the last grid.

**(f) A lockup row carrying a tag has no room for a trailing `flex:1` rule** — it collapses to a
stub. This page's closing lockup has no tag, so it **keeps** its trailing rule.

### CTA scale — site-wide, both CTA rows
Primary: Ink fill (Paper fill on Ink), `600 14px`, −.01em, `padding:13px 20px`,
`min-height:44px`. Secondary: text only, `600 14px`, `border-bottom:2px solid` (Ink on Paper,
Paper on Ink), `padding-bottom:3px`, `min-height:40px`. Row: `display:flex;
align-items:center; gap:22px; flex-wrap:wrap`.

---

## 1. Section order and surfaces

| # | Section | Surface | Its one job |
|---|---|---|---|
| — | Header (shared, sticky) | Paper | Navigation — Services is active |
| 1 | Hero — Turn operational pain into working systems | Paper | Not a strategy deck; find, build, put to work |
| 2 | Where is the business still doing work the hard way? | Bond | The opportunities are already visible |
| 3 | Three ways to put this to work | Paper | Index of the three services |
| 4 | 01 — AI & Operations Strategy | Bond | Find the problems worth solving |
| 5 | 02 — Construction OS Implementation | Paper | Configure the platform + the four products |
| 6 | 03 — Custom Solutions | Bond | Build what doesn't fit |
| 7 | From problem to working system | Paper | The five-step engagement |
| 8 | Build where the business case is real | Bond | The limits — credibility |
| 9 | Built from both sides of the problem | Paper | Background |
| 9b | "The technology matters. Understanding the operation matters more." | **Ink** | The thesis |
| 10 | Closing CTA — Bring me the problem everyone already knows about | **Ink** | Convert |
| — | Footer (shared) | Paper | — |

Section padding 76/80 (hero 76/64, closing 88/80). Ink band 34px vertical. No two adjacent
sections share a surface; no border between differing surfaces.

**Each service is its own full section (§4–§6), not a card in a three-up.** They carry unequal
weight — 01 has six questions plus a "typical work" note, 02 has eight configuration inputs plus
four product cards, 03 has five pain lines plus two paragraphs — so as columns they would be
badly lopsided. §3's compact index previews all three so the page still reads as "three ways."
**Do not collapse §4–§6 into a three-up card row.**

---

## 2. Hero — Paper

**Single column**, `max-width:64ch`, `container-type:inline-size`, `gap:26px`. No artifact, no
portrait.

1. Tag row: mono 12px `——` · 40px Ink rule · `SERVICES` 11px/600 .16em uppercase Steel
   `#476776`
2. Headline `600 clamp(30px,9cqi,48px)/1.02`, −.038em, `balance`: "Turn operational pain into
   working systems."
3. **20px/500, −.02em, max 46ch: "You don't need an AI strategy deck."** — the refusal sits at
   lead weight directly under the headline. It is the page's opening move, not body copy.
4. 17px/400 Graphite, max 56ch: "You need to know where your business is losing time, what is
   creating unnecessary dependency or friction, and which problems are actually worth fixing."
5. 17px/400 Graphite, max 56ch: "I help construction companies find those opportunities,
   configure Construction OS around the way they operate, and build purpose-built solutions
   where off-the-shelf software doesn't fit."
6. Kicker — 2px Steel left border, 16px padding-left, 18px/600: "Find the problem. Build the
   solution. Put it to work."
7. CTA row: Ink "Book a demo" + underlined "See how it works" (anchors to §7)

The hero has **no capability-point row** — unlike the product pages. The three services in §3
do that job, and repeating them at the top would flatten the page's argument.

---

## 3. Where is the business still doing work the hard way? — Bond

Header block over a 2px Ink rule, 30px padding-bottom. Left: eyebrow `WHERE TO LOOK` + heading
`600 clamp(28px,8cqi,42px)/1.05`, −.035em. Right, 17px/500: "The best opportunities are usually
already visible."

**The seven signals** as a uniform divided grid:
`repeat(auto-fit, minmax(min(300px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:18px 0`, 16px/500.

Your PMs spend too much time producing paperwork. · The same senior people answer the same
questions every week. · Important project information lives across email, spreadsheets, folders,
and people's heads. · A recurring process takes hours because none of your systems quite handles
it. · Work gets copied from one system into another. · A workflow depends on somebody
remembering what happens next. · The business has grown, but the way the work gets done hasn't
kept up.

Close under a 2px Ink rule (30px above), two columns, `align-items:start`:

- left, an 8px-gap stack: **"Start there."** at 22px/600 −.024em + "Not with a list of AI ideas."
  at 16px/400 Graphite
- right, 17px/500: "With the operational problem that is already costing you time, capacity,
  consistency, or visibility."

The two-part close is deliberate: the imperative, the refusal, then the redirect.

---

## 4. Three ways to put this to work. — Paper

Eyebrow `SERVICES`, heading over a 2px Ink rule, 26px padding-bottom.

**Three index rows.** `repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:10px 28px`, 24px
vertical padding, `align-items:baseline`, hairline between rows only. Cell 1 is a flex pair —
mono 12px Graphite number in a `width:46px; flex:none` block, then the service name at 21px/600
−.022em. Cell 2 is the promise at 16px/400 Graphite.

| # | Service | Promise |
|---|---|---|
| 01 | AI & Operations Strategy | Find the problems worth solving. |
| 02 | Construction OS Implementation | Put Construction OS to work inside your company. |
| 03 | Custom Solutions | Build around the workflow that doesn't fit. |

This is an index, not a summary — no descriptions, no CTAs, no icons. The sections that follow
carry the same numbers and the same promises as their headings, which is what ties them together.

---

## 5. 01 — AI & Operations Strategy — Bond

Header block over a 2px Ink rule, 30px padding-bottom. Left: a marker row (mono 12px `01` ·
`AI & OPERATIONS STRATEGY` 11px/600 .16em uppercase Steel) then the heading "Find the problems
worth solving." Right, two beats:

- 17px/500: "Not every inefficient process needs AI. Not every automation is worth building."
- 16px/400 Graphite: "I look at how work actually moves through the business and find the places
  where better systems can create meaningful leverage."

Then 16px/400 Graphite (26px below): "That often means questions like:" and **the six questions
at heading weight** — `repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`, each
cell `border-top:1px solid #B8B9B5; padding:20px 0`, 19px/600 −.02em:

Where are skilled people spending time on low-value production? · What depends too heavily on
one person? · Where is information difficult to find or reuse? · Which recurring workflows create
the most friction? · Where does work stall because of manual handoffs or poor visibility? ·
Which problem should be fixed first?

Setting the questions at heading weight is the point — they are the engagement's opening
interview, and they make a strategy service concrete instead of abstract.

Close under a 2px Ink rule (30px above), two columns, `align-items:start`:

- left, a 10px-gap stack: "The outcome is not a long AI roadmap." (16px/400 Graphite) +
  **"It's a clear view of what is worth solving—and what a better way of working could look
  like."** (19px/600)
- right, a 12px-gap stack: `TYPICAL WORK` 11px/600 .14em Graphite + "Operational discovery,
  workflow analysis, knowledge mapping, opportunity prioritization, pilot definition, and
  implementation planning." (15px/400 Graphite) + above a 1px rule, "Start with the problems
  that matter enough to fix." (16px/500)

The source copy reads "Typical work can include …"; it is set here as a labelled list. Keep the
list items exactly as written.

---

## 6. 02 — Construction OS Implementation — Paper

Header block over a 2px Ink rule. Left: marker row (mono `02` ·
`CONSTRUCTION OS IMPLEMENTATION`) + heading "Put Construction OS to work inside your company."
Right, two beats — 16px/400 Graphite "Construction OS is built around construction—but it
becomes valuable when it reflects how your company works." + 17px/500 "I configure the system
around the operating knowledge and standards your team already depends on:".

**The eight inputs**, `repeat(auto-fit, minmax(min(240px,100%),1fr))`, `column-gap:32px`, each
row a mono 11px Graphite number + 16px/500 label with `border-top:1px solid #B8B9B5;
padding:14px 0`:

01 Your document templates · 02 Your scope and contract language · 03 Your procedures and SOPs ·
04 Your pricing rules and references · 05 Your terminology · 06 Your project-management
practices · 07 Your historical examples and lessons · 08 Your recurring workflows

Then (26px below) two columns: "Then it gets applied to real work with the people who will
actually use it." (16px/400 Graphite) + a 2px-Steel-left-bordered kicker at 19px/600:
"Construction OS fits around your operation—not the other way around."

### 6a. The four product cards
Under a **2px Ink rule** (34px above), `repeat(auto-fit, minmax(min(280px,100%),1fr))`,
`column-gap:40px`, **`row-gap:34px`** (rule (c) — this grid wraps), each cell
`padding:26px 0 0`, 12px gap.

Each card: an icon row (the product's own glyph at 15px + name at 18px/600 −.018em) → the
one-line description at 15px/400 Graphite → the `Explore … →` secondary link (14px/600, 2px Ink
underline, `align-self:flex-start`).

| Product / glyph | Description |
|---|---|
| Document Workbench · `icon-less-paperwork` | Produce company-standard construction documents from first walkthrough through closeout. |
| Construction Intelligence · `icon-fewer-bottlenecks` | Put your company's procedures, standards, pricing judgment, and operating knowledge within reach of the team. |
| Project Intelligence · `icon-better-visibility` | Surface the exceptions and unresolved work that need attention across active projects. |
| Operations Automation · `icon-less-repetitive-work` | Take repetitive operational work off the team. |

**No numbers and no tier tags on these four cards.** On the product pages the markers carry
tier meaning (`01`–`03` core, `——` extension layer); here they are being named as capabilities
the implementation service configures, and the approved copy gives them no numbers. Project
Intelligence also carries **no `IN DEVELOPMENT` tag** in this list. Custom Solutions is not
among them — it is service 03, immediately below.

---

## 7. 03 — Custom Solutions — Bond

Two columns, `minmax(min(320px,100%),1fr)`, 48px gap, `align-items:start`.

**Left:** marker row (mono `03` · `CUSTOM SOLUTIONS`) + heading "Build around the workflow that
doesn't fit."; under a 1px Line gray rule (28px above, 20px below), 17px/500: "Every contractor
has work that falls between the systems it already uses."

**Right:** 2px Ink top rule, then the five orphaned-workflow lines at 16px/500, 14px padding,
hairline between (none after the fifth):

The spreadsheet nobody wants to maintain. · The report somebody rebuilds every Friday. · The
approval process living in email. · The information entered in two or three different places. ·
The process that only works because one person remembers how to run it.

Then two Graphite paragraphs at 16px/400: "When the problem is important enough to solve but too
specific for an off-the-shelf product, I can build around it." / "That may mean a purpose-built
AI tool, automation, workflow, integration, internal system, or a combination of Construction OS
capabilities."

Then the kicker — 2px Steel left border, 19px/600: "Software should fit your business. Your
business shouldn't have to fit the software." — and below it the `Explore Custom Solutions →`
secondary link.

That kicker is also the Custom Solutions page's hero headline. The repetition is intentional:
it is the product's line, quoted here. Keep it identical in both places.

---

## 8. From problem to working system. — Paper

Eyebrow `THE PROCESS`, heading over a 2px Ink rule, 26px padding-bottom.

**Five ledger rows.** `repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:12px 28px`, 28px
vertical padding, `align-items:baseline`, hairline between rows only.

Cell 1 = flex pair: mono 12px Graphite number in a `width:46px; flex:none` block, then a 6px-gap
stack of the step name at 21px/600 −.022em and — where the copy has one — its imperative at
16px/500. Cell 2 = the body at 15px/400 Graphite; for step 01 that is the five questions as
separate 6px-gap lines, not a paragraph.

| # | Step | Imperative | Body |
|---|---|---|---|
| 01 | Problem | Start with something real. | What takes too long? / What keeps breaking? / What does the team complain about? / Where is expensive human time being wasted? / What depends too heavily on one person? |
| 02 | Demo | Make the idea tangible. | Use your actual documents, workflow, terminology, and business context to show what a better version of the work could look like. |
| 03 | Pilot | Start narrow. | Put the solution into a real workflow with the people who actually perform the work and find out whether it makes the process meaningfully better. |
| 04 | Implementation | — | Configure the knowledge, documents, rules, workflows, and operating practices required to make the solution useful beyond a demo. |
| 05 | Expansion | — | Once the value is proven, apply what works to the next workflow, team, or part of the business. |

Close under a 2px Ink rule, 19px/600 −.015em: "Solve one real problem. Prove the value. Expand
from there."

**No arrows, connectors, progress bar, or timeline graphic.** The numbers and the five nouns
carry the sequence.

---

## 9. Build where the business case is real. — Bond

Header block over a 2px Ink rule. Left: eyebrow `THE LIMITS` + heading. Right, two beats —
17px/500 "I'm not interested in automating something simply because AI can do it." + 16px/400
Graphite "A good solution should have a clear operational reason to exist."

**Seven reasons** at heading weight: `repeat(auto-fit, minmax(min(280px,100%),1fr))`,
`column-gap:40px`, each cell `border-top:1px solid #B8B9B5; padding:20px 0`, 19px/600 −.02em:

Save meaningful time. · Reduce unnecessary manual work. · Remove a recurring bottleneck. · Make
an important process more consistent. · Reduce dependency on one person. · Make company knowledge
easier to use. · Give leadership better visibility into what needs attention.

Close under a 2px Ink rule (30px above), two columns, `align-items:start`: left, a 10px-gap
Graphite stack — "If the software you already have solves the problem well, use it." / "If
experienced judgment is what creates the value, keep the judgment."; right, **2px Steel left
border**, 19px/600: "Automate the predictable work. Keep people focused on the work that
actually needs them."

This section is what makes the rest of the page believable. **Do not cut, shorten, or move it
below the closing CTA.**

---

## 10. Built from both sides of the problem. — Paper, closing on an Ink band

Two columns, 40/48px gap, `align-items:start`, `padding-bottom:44px` on the wrapper (rule (e)).

**Left:** eyebrow `BACKGROUND` + heading `clamp(26px,7cqi,38px)` −.032em. **No portrait, no
photo, no name badge, no credentials list, no logo wall.**

**Right:** 2px Ink top rule, 24px padding-top, 16px gap:

- 17px/500: "My background spans enterprise product leadership and hands-on construction
  management."
- 16px/400 Graphite: "I've spent years building software products—and then worked directly
  inside construction operations, where I saw how much valuable time gets consumed by paperwork,
  fragmented knowledge, manual coordination, and processes held together by individual
  experience."
- 16px/400 Graphite: "Construction OS grew out of applying product thinking and AI to those
  problems from inside the work."

### 10b. The Ink band
Full-bleed Ink inside the same Paper section, content in `.cos-container`, 34px vertical
padding. One line, `600 clamp(22px,3.4vw,30px)/1.25`, −.028em, Paper, `max-width:32ch`,
`balance`:

> The technology matters. Understanding the operation matters more.

Nothing else in the band — no label, no supporting line, no CTA. This is the page's thesis and
the reason the background section exists at all.

---

## 11. Closing CTA — Ink

Two columns, `minmax(min(340px,100%),1fr)`, 56px gap, `align-items:start`, padding 88/80.

**Left:** lockup row — the **Construction OS mark** at 24px (Paper strokes, red plate) ·
`SERVICES` 14px/600 .14em Paper · a 1px Graphite rule filling the rest of the row (this lockup
has no tag, so it keeps the rule — rule (f)). Then:

- heading `600 clamp(32px,10cqi,58px)/0.99`, −.042em, Paper, `balance`: "Bring me the problem
  everyone already knows about."
- **the six candidates** as ruled lines — 16px/500 **Paper**, 13px padding, 1px Graphite rule
  between (none after the sixth): The workflow your team complains about. · The administrative
  work consuming your PMs' time. · The process that takes five emails and three people. · The
  information somebody keeps entering twice. · The knowledge that always goes back to the same
  person. · The part of the business still running through spreadsheets, inboxes, folders, and
  memory.
- 19px/400 Line gray, max 46ch: "You don't need to arrive with an AI use case."
- kicker — **2px Paper** left border, an 8px-gap pair: "Show me how the work happens today."
  (19px/600 Paper) + "I'll help determine what is worth changing and build a practical way to
  improve it." (16px/400 Line gray)
- CTA row: Paper-filled "Book a demo" + Paper-underlined "Explore Construction OS →" (→
  `/#products`; there is no `/products` index route)

**Right:** the rail — label **"Three ways to put this to work"** (12px/500 .12em Line gray;
this is approved copy, do not reword it to "Three ways to work together" or similar) then three
rows separated by 1px Graphite rules, each a mono marker (Line gray) + a 4px-gap stack of the
service name (17px/600 Paper) and its promise (14px/400 Line gray): 01 AI & Operations Strategy ·
02 Construction OS Implementation · 03 Custom Solutions.

---

## 12. Footer

Shared component. Title-block cells: `SHEET CONSTRUCTION OS` · `PAGE SERVICES` ·
`ISSUED 2026-09-06` · `REV 01` · `STATUS ISSUED FOR REVIEW`.

The Products column lists five items — 01 Document Workbench · 02 Construction Intelligence ·
03 Project Intelligence · —— Operations Automation · —— Custom Solutions — all Graphite here
(no product is current on this page). The Company column is `Work` · **`Services`** (Ink-weight
current) · `About`. The tagline stays "Three products. One construction operating system."

---

## 13. Behavior

- Header per `COMPONENT-header-nav.md`: sticky, 1px bottom rule, two-tier Products menu, no
  scroll-state change, no shadow, no shrink.
- "Book a demo" (both) → the site's demo route/modal. "See how it works" → anchor to §8. The
  five `Explore … →` links → their product routes. "Explore Construction OS →" → `/#products`.
- Hover/focus states are not in the prototype — add them in the site's convention, quiet: no
  lifts, no scale, no color washes. The signal, question, input, and reason cells are **not**
  clickable and get no hover state. Global `a`/`a:hover` are Steel `#476776` → Ink `#111111`.
  Every CTA and link needs a visible keyboard focus ring.
- **No animation.** Nothing enters on scroll, counts up, parallaxes, or types itself out.
- Semantics: the prototype renders everything as `<div>`. In production use `<header>`, `<nav>`,
  `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`, `<a>`/`<button>` for CTAs, `<ul>`/`<ol>` for
  the signals, service index, questions, inputs, orphaned workflows, process steps, reasons, and
  closing candidates.
- The prototype's inline styles are an artifact of our preview tool — convert to the codebase's
  normal styling layer.

---

## Acceptance check

1. `document.documentElement.scrollWidth === clientWidth` at **375px**, 800px, 909px and 1440px.
   Probe every grid, not just the page shell.
2. No grid track is floored at a bare px value; no row places two or more px-floored tracks side
   by side.
3. §6a's four-card grid shows clear separation between its two rows at 800px — no card's top
   edge touching the row above's `Explore …` underline.
4. At 800px every `auto-fit` grid resolves cleanly: no cell shows a left border, a left indent, a
   half-width rule, or a gray block in an unfilled trailing slot (the 7- and 8-item lists are the
   ones to check).
5. The header's third nav item reads **`Services`** — matching all five product pages and
   `COMPONENT-header-nav.md` — and is the active item here in both header and footer.
6. First person is intact everywhere the copy uses it; no "we"/"our team" substitutions.
7. No added AI language: the word "AI" appears only where the approved copy uses it.
8. §9 (the limits) is present, unshortened, and above the closing CTA.
9. §4–§6 are three separate full-width sections, not a three-up card row.
10. The closing rail label reads "Three ways to put this to work" — approved copy, not a
    paraphrase. No invented section labels anywhere on the page.
11. The four product cards in §6a carry no numbers and no tier or status tags.
12. No portrait, headshot, logo wall, or credentials list in §10.
13. Zero serif characters, zero rounded corners, zero box shadows, zero gradients.
14. No text lighter than `#5F6466` on Paper/Bond; on Ink nothing darker than `#B8B9B5`.
15. No two adjacent sections share a background; no border between differing surfaces.
16. Both CTA rows use the 14px / 13×20 / 44px primary and the 2px-underlined 14px secondary.
17. Every section closes on a rule, a band, or a footer row — none ends on whitespace.
