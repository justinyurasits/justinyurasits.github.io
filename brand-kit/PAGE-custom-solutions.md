# Page spec — Custom Solutions (extension-layer page)

Read first: `README.md` → `CONSTRUCTION-OS-BRAND-KIT.md` → `COMPONENT-product-block.md`
→ **`COMPONENT-header-nav.md`** (the header changes as part of this work — see §0.1).
This file wins where it gives a value.

**Route:** `/products/custom-solutions`
**Copy:** approved and verbatim. Do not rewrite, expand, shorten, reorder, or invent claims.
**Reference build:** `Custom Solutions Page.dc.html` (rev 01). The build is the tiebreaker for
geometry; this file is the tiebreaker for copy.
**Sibling pages:** `/products/document-workbench`, `/products/construction-intelligence`,
`/products/project-intelligence`, `/products/operations-automation`. Header, footer, CTA scale,
section rhythm and grid patterns are shared — build them once.

---

## 0. What this page has to accomplish

Custom Solutions is the **second extension layer** around Construction OS — engagement-shaped
work, not a packaged product. Three ideas have to land:

**1. It is an extension layer, not a core product.** Marker is `——`, **never `04`/`05`**, in the
hero tag row, the footer product list, and the nav. It always wears an `EXTENSION LAYER` tag.
The footer tagline stays "Three products. One construction operating system."

**2. The starting point is the work, not the technology.** The page deliberately refuses to lead
with AI: §4's headline is "We don't start with AI. We start with the work," and the mid-page Ink
band is the AI question itself. Never add "AI-powered", "agentic", "LLM", "intelligent
automation", or model names anywhere on the page.

**3. It has limits, stated plainly.** §9 ("Not custom software for the sake of custom software")
is load-bearing credibility — it is what makes the rest believable. Never cut it for length,
never soften it, never move it below the closing CTA.

### 0.1 ⚠ This page requires a header change — build it with the page

Five product destinations in two tiers no longer fit behind a flat `Products` link, and Custom
Solutions currently has **no route into it from the nav**. Implement
**`COMPONENT-header-nav.md`** as part of this work: `Products` becomes a two-tier menu (core
products `01`–`03`, extension layer `——`/`——`). It is a shared component — the change lands on
every page, not just this one.

### Visual system

Archivo + Source Serif 4 is the house pairing, but **this page sets zero serif** — it has no
document artifacts. Archivo 400/500/600 plus a mono (`ui-monospace, monospace`) for numerals.
No weight above 600.

White / bond / ink / graphite, technical rules, square geometry.

**Never:** rounded corners (radius 0 everywhere), box shadows, gradients, glowing AI imagery,
fake dashboards or screenshots, chat bubbles, robot/agent/gear/brain/spark/wand iconography,
stock photography, illustration.

### ⚠ Red: this page has none

Revision red `#C43230` marks a measured change or a breached commitment. This copy contains
neither, so red appears **exactly twice** — the plate inside the Construction OS mark in the
header and in the footer. The hero and closing lockups use the product glyph, which has no
plate. No red text, numerals, rules, or emphasis anywhere else.

### Assets

`brand-kit/svg/icon-custom-solutions.svg` — two offset square outlines: a 56×56 Ink square at
8,8 (stroke 10) and a 40×40 Steel square at 52,52 (stroke 7). The second square is a piece
fitted to the first — "software should fit your business." Recolor by stroke only; on Ink
surfaces the large square is Paper and the small one Line gray. Do not add fills, gradients, or
rounded joins, and do not substitute a puzzle piece, gear, or wrench.

### ⚠ Grid rules — each caused a real, shipped bug in this family

**(a) Never floor a track at a bare px value.** `repeat(auto-fit, minmax(320px,1fr))` does not
collapse below 320px — it overflows the page at phone width. Every floor on this page reads
`minmax(min(320px, 100%), 1fr)`. Same for 340 / 300 / 280 / 260 / 200 / 150.

**(b) Never place two or more px-floored tracks side by side in one row.** Two floors of 220px
and 260px inside a 264px column can never collapse.

**(c) Any grid that can wrap to a second row needs a `row-gap`.** §8's four-card grid shipped
with `column-gap` only and `padding: 26px 0 0` on each cell; at two columns the second row's
`border-top` landed flush against the first row's CTA underline and read as one doubled rule.
Row-gap is **44px** there. A single-row three-up can omit it; a four-up cannot.

**(d) No position-dependent cell chrome on an `auto-fit` grid**, and **never draw dividers with
`gap:1px` over a gray container background** — an unfilled slot in the last row paints as a
solid gray block. The pattern for divided lists is horizontal rules only, uniform on every cell:
`border-top:1px solid #B8B9B5; padding:<n>px 0` with `column-gap:40px`.

**(e) Space above a full-bleed Ink band is `padding-bottom` on the wrapper**, never
`margin-bottom` on the last grid — the margin collapses out of the section.

**(f) A lockup row that carries an `EXTENSION LAYER` tag has no room for a trailing
`flex:1` rule.** With icon + name + tag + rule the rule collapsed to a 4px stub and read as a
stray dash. **Omit the trailing rule on any lockup that also carries a tag** (this page's hero
and closing lockups both do).

### CTA scale — site-wide, both CTA rows
Primary: Ink fill (Paper fill on Ink), `600 14px`, −.01em, `padding:13px 20px`,
`min-height:44px`. Secondary: text only, `600 14px`, `border-bottom:2px solid` (Ink on Paper,
Paper on Ink), `padding-bottom:3px`, `min-height:40px`. Row: `display:flex;
align-items:center; gap:22px; flex-wrap:wrap`.

---

## 1. Section order and surfaces

| # | Section | Surface | Its one job |
|---|---|---|---|
| — | Header (shared, sticky) | Paper | Navigation — **now a two-tier Products menu** |
| 1 | Hero | Paper | Software fits you, not the reverse |
| 2 | Off-the-shelf software doesn't fit every workflow | Bond | Name the workaround problem |
| 3 | We don't start with AI. We start with the work | Paper | The method, as questions |
| 3b | "Why is your team still doing this the hard way?" | **Ink** | The page's sharpest line |
| 4 | Build around the problems costing your team time | Bond | The eight problem areas |
| 5 | A Custom Solution can help you: | Paper | Do-this / instead-of outcomes |
| 6 | From painful workflow to working solution | Bond | The four-step engagement |
| 7 | Custom doesn't mean starting from zero | Paper | Built on the four capabilities |
| 8 | Not custom software for the sake of custom software | Bond | The limits — credibility |
| 9 | Closing CTA | **Ink** | Convert |
| — | Footer (shared) | Paper | — |

Section padding 76/80 (hero 76/64, closing 88/80). Ink bands 38px vertical (both carry two
columns). No two adjacent sections share a surface; no border between differing surfaces.

**Two blocks of source copy were merged into §9, deliberately.** "Start with the workflow
everyone complains about" had no CTA of its own and the final CTA had no headline, so they are
one closing section. Nothing was cut. Do not re-split them.

---

## 2. Hero — Paper

**Single column**, `max-width:64ch`, `container-type:inline-size`, `gap:26px`.

1. Tag row (wraps): mono 12px **`——`** · 40px Ink rule · `CONSTRUCTION OS` 11px/600 .16em
   uppercase Steel · **`EXTENSION LAYER`** tag, 11px/600 .14em uppercase Steel in a 1px Steel
   box, 4×8px padding. **No trailing rule** (rule (f)).
2. Product name: `Custom Solutions`, one line, `white-space:nowrap`,
   `600 clamp(22px,6cqi,34px)/1.05`, −.032em, with `icon-custom-solutions.svg` inline at `.74em`
3. Headline `600 clamp(28px,8.4cqi,44px)/1.04`, −.038em, `balance` — two sentences, and the
   pivot between them is the whole positioning: "Software should fit your business. Your business
   shouldn't have to fit the software."
4. 18px/500, max 56ch: "Every contractor has work that doesn't fit neatly into off-the-shelf
   software." *(This sits at 500 above the Graphite paragraphs — it is the premise, not body
   copy.)*
5. 17px/400 Graphite, max 56ch: "The spreadsheet nobody wants to maintain. The approval that
   dies in email. The report someone rebuilds every Friday. The information that gets entered
   into three different systems. The workflow that only works because one person remembers how
   to run it."
6. 17px/400 Graphite, max 56ch: "We learn how the work actually happens, find the unnecessary
   manual effort, and build purpose-built AI tools, automations, workflows, and integrations
   around your operation."
7. Kicker — 2px Steel left border, 16px padding-left, 18px/600: "Start with the work everyone
   wishes would go away."
8. CTA row: Ink "Book a demo" + underlined "See how we work" (anchors to §6)

Then, full width under a **2px Ink rule** (`margin-top:48px`), three capability points —
`repeat(auto-fit, minmax(min(260px,100%),1fr))`, `column-gap:40px; row-gap:8px`, each cell
`padding:26px 0`, **no verticals**: mono number, 20px/600 −.02em title, 15px/400 Graphite body.

| # | Title | Body |
|---|---|---|
| 01 | Built around your business | Your process, your people, your rules, your systems. |
| 02 | Focused on real operational pain | Repetitive, slow, inconsistent, document-heavy, or overly dependent on manual handoffs. |
| 03 | Built to fit | Use the right combination of AI, automation, software, and Construction OS capabilities for the problem. |

**No figures, no hours-saved numbers, no client counts, no logos.** Nothing may imply a measured
result or a named reference customer.

---

## 3. Off-the-shelf software doesn't fit every workflow. — Bond

Header block over a 2px Ink rule, 30px padding-bottom. Left: eyebrow `THE PROBLEM` + heading
`600 clamp(28px,8cqi,42px)/1.05`, −.035em. Right, three beats:

- 16px/400 Graphite: "Most software gives you its process and asks your company to adapt."
- 17px/500 Ink: "Sometimes that's fine." *(The concession is what makes the next line land.
  Keep it at 500 — it is not a throwaway.)*
- 16px/400 Graphite: "Sometimes you end up with workarounds:"

**The six workarounds** as a uniform divided grid:
`repeat(auto-fit, minmax(min(300px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:18px 0`, 16px/500.

An estimate gets copied into multiple systems. · Project information gets rebuilt for the weekly
report. · Subcontractor paperwork gets chased through email. · A client approval gets lost
between the PM, designer, and owner. · Two project managers handle the same process two
different ways. · A recurring task still takes hours because none of your systems quite handles
it.

Close under a 2px Ink rule (30px above), 19px/600 −.015em, max 70ch: "When the workaround
becomes the workflow, there may be a better way."

---

## 4. We don't start with AI. We start with the work. — Paper, closing on an Ink band

Header block over a 2px Ink rule. Left: eyebrow `THE APPROACH` + heading. Right, 17px/500:
"Show us how the process actually happens today."

**The six diagnostic questions at heading weight** —
`repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:22px 0`, 19px/600 −.02em:

Where does the information come from? · Who touches it? · What gets copied, checked,
reformatted, or chased? · Where does the process slow down? · What requires real construction
judgment? · What is simply repetitive production?

Setting these at heading weight rather than as body text is the point — they are the intake
interview, and they make the engagement concrete rather than abstract.

Then a 2px Ink rule, 24px padding-top, and 17px/500, max 70ch: "Then we determine what should
stay human, what should become easier, and what can be automated." `padding-bottom:44px` on the
wrapper (rule (e)).

### 4b. The Ink band — the page's sharpest line
Full-bleed Ink inside the same Paper section, content in `.cos-container`, **38px** vertical
padding, `repeat(auto-fit, minmax(min(260px,100%),1fr))`, `align-items:baseline`:

- label `THE REAL QUESTION` — 11px/600 .14em uppercase, **Line gray**
- value spanning two tracks, as a **two-weight pair** — the contrast carries the argument:
  - `400 clamp(19px,2.4vw,22px)/1.4`, −.02em, **Line gray**: The question isn't "Where can we
    add AI?"
  - `600 clamp(22px,3vw,28px)/1.3`, −.028em, **Paper**: It's "Why is your team still doing this
    the hard way?"

Keep the curly quotes. Do not set both lines at the same weight, and do not give this band a
CTA.

This is the only mid-page Ink band. §2's close deliberately stays a plain 19px statement so it
doesn't compete.

---

## 5. Build around the problems costing your team time. — Bond

Header: left eyebrow `WHERE IT FITS` + heading; right 16px/400 Graphite: "Custom Solutions are
designed for operational problems that are important enough to fix but too specific for a
generic product." Over a 2px Ink rule.

**Eight problem areas**, `repeat(auto-fit, minmax(min(300px,100%),1fr))`, `column-gap:40px`,
each cell `border-top:1px solid #B8B9B5; padding:26px 0`, 10px gap: title 20px/600 −.02em +
body 15px/400 Graphite.

| Title | Body |
|---|---|
| Repetitive administrative work | Stop spending skilled time re-entering, formatting, checking, and moving the same information. |
| Document-heavy processes | Turn project information into the reports, forms, packages, correspondence, or records the workflow requires. |
| Manual handoffs | Move work forward without depending on another email, reminder, or person remembering the next step. |
| Information between systems | Reduce the copying and re-entry required when your project, accounting, spreadsheet, email, and document systems don't connect the way the business needs them to. |
| Review and approval workflows | Make it clearer what is waiting, who needs to act, and what happens next. |
| Compliance and evidence tracking | Capture photos, forms, certificates, training records, approvals, and other evidence in a process the team can actually follow. |
| Company knowledge | Put procedures, standards, pricing rules, and operating guidance within reach of the people doing the work. |
| Operational visibility | Surface the exceptions that need attention instead of making leadership assemble status manually. |

These are **problem areas, not products.** No numbers, no icons, no per-item CTA — numbering
them would imply a catalogue of eight offerings.

Close under a 2px Ink rule, 19px/600 −.015em, max 70ch: "If your team does it over and over,
there may be a better way to do it."

---

## 6. A Custom Solution can help you: — Paper

Header: left eyebrow `WHAT IT DOES` + heading `clamp(26px,7cqi,38px)` −.032em; right, a
`1fr 1.2fr` label row over the same 2px Ink rule — `DO THIS` (Ink) / `INSTEAD OF` (Graphite),
both 11px/600 .14em uppercase.

**Six paired rows**, `repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:10px 28px`, 24px
vertical padding, `align-items:baseline`, hairline between rows only: the action at
**21px/600 −.022em Ink**, the "instead of" at **16px/400 Graphite**.

| Do this | Instead of |
|---|---|
| Capture information once | Instead of entering it again and again. |
| Apply your company's rules | Instead of relying on someone to remember every step. |
| Produce the next useful output | Instead of rebuilding it from scratch. |
| Move work forward | Instead of depending on another manual handoff. |
| Surface the exception | Instead of making someone check everything. |
| Keep the record | Instead of leaving evidence scattered across inboxes, spreadsheets, and folders. |

The weight and color difference between the columns *is* the argument. **No icons, arrows,
checkmarks, crosses, or color coding**, and keep the word "Instead of" in the copy even though
the column is labelled.

Close under a 2px Ink rule, 19px/600 −.015em, max 70ch: "Remove unnecessary manual work without
removing the judgment that makes your people valuable."

---

## 7. From painful workflow to working solution. — Bond

Eyebrow `THE PROCESS`, heading over a 2px Ink rule, 26px padding-bottom.

**Four ledger rows.** `repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:12px 28px`, 28px
vertical padding, `align-items:baseline`, hairline between rows only.

Cell 1 = flex pair: mono 12px Graphite number in a `width:46px; flex:none` block, then the step
title at 21px/600 −.022em. Cell 2 = the body; where the copy has two beats, the first is
16px/500 Ink and the second 15px/400 Graphite.

| # | Title | Body |
|---|---|---|
| 01 | Show us the problem. | **Start with the workflow your team is tired of doing by hand.** / We learn how it actually works today—not how it is supposed to work on paper. |
| 02 | Find the unnecessary work. | Separate the parts that require experience and judgment from the repetitive production, information movement, checking, and handoffs around them. |
| 03 | Build around your operation. | Create the tool, workflow, automation, or integration around the way your company needs the work to happen. |
| 04 | Prove it in real work. | **Put it in the hands of the people who actually perform the process.** / If it saves meaningful time and makes the workflow better, expand from there. |

Close under a 2px Ink rule, 19px/600 −.015em: "Solve one real problem. Prove the value. Build
from there."

**Do not add arrows, connectors, a progress bar, or a timeline graphic.** The numbers and the
four verbs carry the sequence.

---

## 8. Custom doesn't mean starting from zero. — Paper

Header: left eyebrow `THE FOUNDATION` + heading; right 16px/400 Graphite: "Custom Solutions can
use and extend the same capabilities behind Construction OS." Over a 2px Ink rule, 30px
padding-bottom.

**Four capability cards**, `repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`,
**`row-gap:44px`** (rule (c) — this grid wraps), each cell
`border-top:1px solid #B8B9B5; padding:26px 0 0`, 12px gap.

Each card: header row (marker · the product's own glyph at 15px · product name 17px/600 −.015em,
plus its tag where applicable) → role line 20px/600 −.02em → description 15px/400 Graphite →
the `Explore … →` secondary link (14px/600, 2px Ink underline, `align-self:flex-start`).

| Marker | Product / glyph | Role | Description |
|---|---|---|---|
| 01 | Document Workbench · `icon-less-paperwork` | Produce what the workflow requires. | Create company-standard documents, reports, forms, and other project outputs from the information already in the work. |
| 02 | Construction Intelligence · `icon-fewer-bottlenecks` | Apply how your company does the work. | Use your procedures, standards, pricing rules, references, and company knowledge when the workflow depends on understanding what should happen. |
| 03 | Project Intelligence · `icon-better-visibility` `[IN DEVELOPMENT]` | Surface what needs attention. | Bring open items, aging issues, missing approvals, and other exceptions into view when the workflow depends on knowing where intervention is needed. |
| —— | Operations Automation · `icon-less-repetitive-work` `EXTENSION LAYER` | Handle the repeatable work around it. | Use automation patterns for recurring construction workflows such as invoices, field reporting, safety, compliance, billing, changes, and client decisions. |

Operations Automation keeps `——` and an `EXTENSION LAYER` label (Graphite, unboxed) so the
fourth card is not mistaken for a fourth core product. Custom Solutions itself is not listed —
you're on it.

The four roles must stay crisply distinct: **Document Workbench produces. Construction
Intelligence informs. Project Intelligence surfaces exceptions. Operations Automation handles
the repeatable work around them.** Do not blur or reword these.

---

## 9. Not custom software for the sake of custom software. — Bond

Header: left eyebrow `THE LIMITS` + heading `clamp(26px,7cqi,38px)` −.032em. Right, the three
refusals as **separate ruled lines** at 16px/400 Graphite, 14px padding, hairline between —
stacking them gives each its own beat:

We are not trying to replace every system you use. · We are not looking for complicated problems
just because they are interesting to build. · And we are not going to automate work that is
better handled by an experienced person.

Over a 2px Ink rule, 30px padding-bottom. Then, 26px below, 17px/500: "A Custom Solution should
have a clear business reason to exist:" followed by **six reasons** at heading weight —
`repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:20px 0`, 19px/600 −.02em:

Save meaningful time. · Remove unnecessary manual work. · Make a recurring process more
consistent. · Reduce avoidable handoffs and bottlenecks. · Make company knowledge easier to
use. · Give the team better visibility into what needs attention.

Close under a 2px Ink rule (30px above), two columns: left, a 10px-gap Graphite stack — "If the
software you already have solves the problem well, use it." / "If judgment is what creates the
value, keep the judgment."; right, **2px Steel left border**, 19px/600: "Build only where the
business case is real."

---

## 10. Closing CTA — Ink

Two columns, `minmax(min(340px,100%),1fr)`, 56px gap, `align-items:start`, padding 88/80.

**Left:** lockup row (wraps) — the product glyph at 24px (Paper large square, Line gray small
square, no red) · `CUSTOM SOLUTIONS` 14px/600 .14em Paper · the `EXTENSION LAYER` tag (10px/600
.12em Line gray in a 1px Graphite box). **No trailing rule** (rule (f)). Then:

- heading `600 clamp(32px,10cqi,58px)/0.99`, −.042em, Paper, `balance`: "Start with the workflow
  everyone complains about."
- 19px/400 Line gray, max 46ch: "You probably already know which one it is."
- **The six candidates** as ruled lines — 16px/500 **Paper**, 13px padding, 1px Graphite rule
  between (none after the sixth): The spreadsheet nobody wants to own. · The report that eats up
  Friday afternoon. · The process that takes five emails and three people. · The paperwork
  everybody puts off. · The information somebody keeps entering twice. · The question that
  always goes back to the same person.
- kicker — **2px Paper** left border, an 8px-gap pair: "Show us how it works today." (19px/600
  Paper) + "We'll help determine whether there's a better way to run it." (16px/400 Line gray)
- CTA row: Paper-filled "Book a demo" + Paper-underlined "Explore Construction OS →"

**Right:** "What we build on" (12px/500 .12em Line gray) then four rows separated by 1px
Graphite rules — glyphs at 15px, markers mono Line gray, names 17px/600 Paper: 01 Document
Workbench · 02 Construction Intelligence · 03 Project Intelligence `[IN DEVELOPMENT]` ·
—— Operations Automation.

---

## 11. Footer

Shared component. Title-block cells: `SHEET CONSTRUCTION OS` · `PAGE CUSTOM SOLUTIONS` ·
`ISSUED 2026-09-06` · `REV 01` · `STATUS ISSUED FOR REVIEW`.

The Products column now lists **five** items: 01 Document Workbench · 02 Construction
Intelligence · 03 Project Intelligence · —— Operations Automation · —— Custom Solutions, with
Custom Solutions as the Ink-weight current item. The footer tagline still reads "Three products.
One construction operating system."

---

## 12. Behavior

- Header per `COMPONENT-header-nav.md`: sticky, 1px bottom rule, no scroll-state change, no
  shadow, no shrink; the caret on the `Products` trigger is the only animated element.
- "Book a demo" (both) → the site's demo route/modal. "See how we work" → anchor to §7. The four
  `Explore … →` links → the respective product routes. "Explore Construction OS →" → the
  products overview.
- **No animation** in the page body. Nothing enters on scroll, counts up, parallaxes, or types
  itself out.
- Semantics: use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`,
  `<a>`/`<button>` for CTAs, `<ul>`/`<ol>` for lists.

---

## Acceptance check

1. `document.documentElement.scrollWidth === clientWidth` at **375px**, 800px, 909px and 1440px.
2. No grid track is floored at a bare px value; no row places two or more px-floored tracks side
   by side.
3. **Every grid that wraps has a `row-gap`.**
4. `#C43230` appears exactly **twice** — the mark's plate in the header and footer.
5. Custom Solutions and Operations Automation are never numbered `04`/`05`.
6. The header's Products menu exists, shows both tiers with `——` markers on the extension layer.
7. §9 (the limits) is present, unshortened, and above the closing CTA.
8. Zero serif characters, zero rounded corners, zero box shadows, zero gradients.
