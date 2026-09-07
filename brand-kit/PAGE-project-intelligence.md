# Page spec — Project Intelligence (product page)

Read first: `README.md` → `CONSTRUCTION-OS-BRAND-KIT.md` → `COMPONENT-product-block.md`
→ `SECTION-project-intelligence.md` (the attention-register anatomy and the amended red rule
live there). This file wins where it gives a value.

**Route:** `/products/project-intelligence`
**Copy:** verbatim. Do not rewrite, shorten, or reorder a line.
**Reference build:** `Project Intelligence Page.dc.html` (rev 01). The build is the tiebreaker
for geometry; this file is the tiebreaker for copy.
**Sibling pages:** `/products/document-workbench`, `/products/construction-intelligence`.
Header, footer, section rhythm, CTA scale and grid patterns are shared — build them once.

---

## 0. Prerequisites

- `.cos-container { max-width:1280px; margin:0 auto; padding-inline:clamp(24px,6vw,96px); }`
  on the inner wrapper of **every** section, including full-bleed Ink bands.
- Archivo 400/500/600 + a mono for numerals and day counts. **Zero serif on this page.**
- Contrast pairing: on Paper/Bond, Graphite `#5F6466` is the lightest text and Line gray
  `#B8B9B5` draws hairlines. **On Ink, Line gray is the lightest text and Graphite draws the
  rules.** Inverting this is the most common error.
- Section padding 76/80 (hero 76/64, closing 88/80). No two adjacent sections share a
  surface. No border between differing surfaces.

### ⚠ This page is the one that earns red — and it has a hard ceiling

The brand rule as amended by the section review:

> **Revision red `#C43230` marks a measured change or a breached commitment. Never a status
> that is merely in progress, never decoration.**

On this page that permits exactly four uses, plus the mark's plate in the header and footer:

| Where | Value | Why it qualifies |
|---|---|---|
| Attention register, row 1 status | `Overdue` | commitment breached |
| Attention register, row 2 status | `Blocked` | commitment breached |
| §7 surfaced-item card | `12 days overdue` | commitment breached |
| §11 aging escalation, final numeral | `12d` | the point at which it breached |

`Waiting`, `Due soon` and `Open` stay **Graphite** — they are in progress, not breached.
`4d` and `7d` in the escalation stay Ink. **If more than two rows of the register are red,
the list has stopped prioritizing** — that is a content rule, not just a style rule.

### ⚠ "In development" is disclosed, not buried

Project Intelligence is not shipped. The page says so in four places and **none of them may be
softened, shrunk into fine print, or removed**:

1. A Steel outline tag beside the product name in the hero.
2. A bordered "Product status" note in the hero carrying the sentence verbatim:
   "Project Intelligence is in development. The views shown here illustrate the intended
   product experience."
3. A caption under the attention register: "Example project attention view. Project
   Intelligence is in development."
4. The footer title block: `STATUS IN DEVELOPMENT`.

Plus the outline tag in the closing lockup. The concept carries itself; do not blur the
maturity level.

### ⚠ Grid rules — every one of these caused a real bug

**(a) Never floor a grid track at a px value that exceeds the phone content column.**
`repeat(auto-fit, minmax(320px, 1fr))` does **not** collapse below 320px — it overflows the
page. Every floor on this page is written `minmax(min(320px, 100%), 1fr)`. Same for 340 / 300
/ 280 / 260 / 240 / 220 / 200 / 150.

**(b) Never put two or three px-floored tracks side by side in one row.** The ledger rows were
`46px minmax(220px,1fr) minmax(260px,1.3fr)` = a 582px minimum in a 264px column, and the
three-product ledger was `200px + 220px + 240px` = 716px. Neither can ever collapse. Ledger
rows are now `repeat(auto-fit, minmax(min(300px,100%),1fr))` with **the number moved inside
the title cell** as a `width:46px; flex:none` mono block — the title's left edge is unchanged
at wide widths and the row stacks cleanly on a phone.

**(c) No position-dependent cell chrome on an `auto-fit` grid.** A grid that resolves to 3
columns on desktop resolves to 2 at ~800px. Any cell styled for "the third column"
(`border-left`, asymmetric padding, `:nth-child`) lands on the wrong cell. **And never draw
dividers with `gap:1px` over a gray container background** — an unfilled slot in the last row
paints as a solid gray block. The page pattern is horizontal rules only, uniform per cell:
`border-top:1px solid #B8B9B5; padding:26px 0` with `column-gap:40px`.

**(d) The attention register scrolls; it does not restack.** A four-column data table is
unreadable stacked. It sits in an `overflow-x:auto` wrapper with `min-width:560px` on the card.

**(e) Space above a full-bleed Ink band is `padding-bottom` on the wrapper**, never
`margin-bottom` on the last grid — the margin collapses out of the section and the grid butts
the band.

---

## 1. Section order and surfaces

| # | Section | Surface |
|---|---|---|
| 1 | Header (shared, sticky) | Paper |
| 2 | Hero + product-status note + three value props | Paper |
| 3 | Your status meeting shouldn't be where you discover the problem | Bond |
| 4 | Too much management time is spent finding out what's happening | Paper |
| 5 | Most systems show you everything / …what matters now | Bond |
| 6 | One view of the exceptions across active projects (the register) | Paper |
| 7 | From attention to action | Bond |
| 8 | See it. Understand it. Act on it. | Paper |
| 8b | "The Construction OS loop" strip | **Ink** |
| 9 | Three products. One operating system. | Bond |
| 10 | Manage by exception—not by inbox | Paper |
| 11 | Know where the risk is building | Bond |
| 12 | Closing CTA | **Ink** |
| 13 | Footer (shared) | Paper |

The arc: **the issue is invisible (3) → why status work eats the day (4) → the product's
premise (5) → proof (6) → seeing isn't enough (7) → the three-product loop (8) → the standing
questions (9) → what leadership actually asks (10) → aging (11) → CTA.** Do not reorder.

§8 is the most important section on the page. It is the only place the website explains why
these are three products inside one operating system rather than three unrelated AI features.
It gets the strongest treatment and the Ink band; if the page has to be cut for length, cut
elsewhere.

---

## 2. Hero — Paper

**Single column**, `max-width:64ch`, `container-type:inline-size`, `gap:26px`. No artifact in
the hero — the register has its own section (§6) and appears once on the page.

1. Tag row: mono 12px `03` · 40px Ink rule · `ATTENTION` 11px/600 .16em uppercase Steel
2. Name row (wraps as a unit): `Project Intelligence` at
   `600 clamp(22px,6cqi,34px)/1.05`, −.032em, `white-space:nowrap`, with
   `icon-better-visibility.svg` inline at `.78em` · then the **`IN DEVELOPMENT` tag** —
   11px/600 .14em uppercase Steel in a 1px Steel box, 4×8px padding
3. Headline `600 clamp(30px,9cqi,48px)/1.02`, −.038em, `balance`: "Know what needs attention."
4. 17px/400 Graphite, max 52ch: "Across active projects, surface the open decisions, aging
   changes, missing approvals, unresolved RFIs, unsigned agreements, and schedule issues that
   need intervention."
5. 18px/500, max 52ch: "Spend less time collecting status. More time resolving what's holding
   the work up."
6. Kicker, 2px Steel left border: "See what matters. Understand what needs to happen. Move the
   work forward."
7. CTA row: Ink "Book a Construction OS demo" + underlined "See the attention view" (anchors
   to §6)
8. **Product-status note**: 1px Steel box, 16×18px padding — `PRODUCT STATUS` 11px/600 .14em
   Steel, then 15px/500 Ink: "Project Intelligence is in development. The views shown here
   illustrate the intended product experience."

Note the CTA is "Book a **Construction OS** demo", not a Project Intelligence demo — you
cannot demo an unshipped product. Keep the wording.

Then, full width under a **2px Ink rule** (`margin-top:48px`), three value props —
`repeat(auto-fit, minmax(min(260px,100%),1fr))`, `column-gap:40px; row-gap:8px`, each cell
`padding:26px 0`, no verticals: mono number, 20px/600 −.02em title, 15px/400 Graphite body.

| # | Title | Description |
|---|---|---|
| 01 | What needs attention, in one place | See the open items that require action across active projects. |
| 02 | Prioritized by urgency | Know what is overdue, blocked, waiting, due soon, or beginning to age. |
| 03 | Manage by exception | Spend leadership time on the projects and decisions that actually need intervention. |

**No figures.** "5 items across 4 projects" in the register is example data, not a product claim.

### CTA scale — site-wide
Primary: Ink fill (Paper fill on Ink), `600 14px`, −.01em, `padding:13px 20px`,
`min-height:44px`. Secondary: text only, `600 14px`, `border-bottom:2px solid`,
`padding-bottom:3px`, `min-height:40px`. Row: `flex; align-items:center; gap:22px; wrap`.
No rounded corners, no shadows, no ghost variants.

---

## 3. Your status meeting shouldn't be where you discover the problem. — Bond

Two columns, `minmax(min(320px,100%),1fr)`, 48px gap, `align-items:start`.

**Left:** eyebrow `THE CURRENT STATE`, heading `clamp(28px,8cqi,42px)` −.035em; under a 1px
Line gray rule, 16px/400 Graphite: "A project issue usually exists long before it becomes
visible to leadership."

**Right:** 2px Ink top rule, then the four live issues as **standalone rows** — 17px/500,
16px padding, hairline between (none after the fourth):

The owner approval has been sitting for twelve days. · The subcontract still isn't signed. ·
An RFI has been waiting on the architect for a week. · A finish selection is starting to
threaten procurement.

Then a three-line Graphite stack at 16px/400, 8px gap: "The PM may know." · "Someone may have
mentioned it in a meeting." · "It may be sitting in an email, a log, a spreadsheet, or
somebody's head."

Then the kicker, 2px Steel left border, 19px/600: "The problem is knowing what needs attention
before it becomes a bigger problem."

**Do not set day counts here in mono or in red.** They are prose, and the register 400px later
is where numerals live. Repeating the treatment weakens both.

---

## 4. Too much management time is spent finding out what's happening. — Paper

Eyebrow `THE PATTERN`, heading max 26ch over a 2px Ink rule.

**Four ledger rows.** `repeat(auto-fit, minmax(min(300px,100%),1fr))`, `gap:0 28px`,
`align-items:baseline`, 28px padding, hairline between rows only. Cell 1 is a flex pair —
mono 12px Graphite number in a `width:46px; flex:none` block, then the title at 20px/600
−.02em. Cell 2 is a 12px-gap stack: **situation** (15px/400 Graphite) then **consequence**
(15px/500 Ink).

| # | Title | Situation | Consequence |
|---|---|---|---|
| 01 | Every PM has a different mental dashboard. | One person tracks everything religiously. Another manages from email. Another remembers what matters because they've been living inside the job for six months. | Leadership gets a different version of project status depending on who is answering. |
| 02 | Important issues age quietly. | Changes wait for approval. RFIs sit unanswered. Agreements remain unsigned. Selections slip. Decisions stay open. | Nothing looks catastrophic yet—until the delay starts affecting cost, procurement, or schedule. |
| 03 | Leadership becomes the status collector. | Owners, COOs, and project executives spend too much time asking: *(then the five questions, 15px/500, 6px gap, as their own stack)* | That is time spent discovering the work instead of managing it. |
| 04 | Everything competes for attention. | Most projects have dozens or hundreds of things happening at once. Leadership does not need to see everything. | They need to know which few things are no longer running to plan. |

Row 03's five questions: Where does this stand? · Did the owner approve it? · Has that change
been priced? · Why is this RFI still open? · Are we waiting on them or are they waiting on us?

---

## 5. Most systems show you everything. — Bond

Two columns. **Left:** eyebrow `THE PRODUCT`, then a **two-weight heading pair** — this is the
page's pivot and the contrast is the point:

- "Most systems show you everything." — `400 clamp(24px,6.6cqi,34px)/1.12`, −.03em, **Graphite**
- "Project Intelligence is designed to show you what matters now." —
  `600 clamp(28px,8cqi,42px)/1.05`, −.035em, **Ink**, 8px above

Then under a 1px rule: 17px/500 "Project Intelligence is the attention layer of Construction
OS." + 16px/400 Graphite "Instead of asking leadership to interpret another dashboard full of
project data, it is designed to surface the exceptions that deserve intervention."

**Right:** 2px Ink top rule, the eight exception types as numbered rows (mono 11px Graphite +
16px/500), 14px padding, hairline between:

01 Open decisions. · 02 Aging changes. · 03 Missing approvals. · 04 Unresolved RFIs. ·
05 Unsigned agreements. · 06 Client selections. · 07 Schedule issues. · 08 Other work that has
stopped moving.

Then the kicker, 2px Steel left border, 19px/600: "Nothing running to plan needs your
attention."

That line also appears in the register's Ink footer (§6) — that is deliberate: here it is the
product's principle, there it is the view's verdict. Do not cut either.

---

## 6. One view of the exceptions across active projects. — Paper

Header: eyebrow `THE VIEW`, heading left; right-aligned caption row `PROJECT ATTENTION`
(mono 11px Graphite) + `EXAMPLE VIEW` (mono 11px Steel). 2px Ink rule, 34px below it.

**The register.** `overflow-x:auto` wrapper (rule (d)); card is 1px Ink border, Paper fill,
`min-width:560px`.

- **Title band**, 20/24/22px padding, 1px Ink bottom rule: 21px/600 −.022em
  "5 items need attention across 4 active projects"
- **Column header row**, Bond fill, 1px Line gray bottom rule, four cells at 10px/600 .14em
  uppercase Graphite: `PROJECT` · `NEEDS ATTENTION` · `AGE` (right-aligned) · `STATUS`
- **Five data rows**, 1px Line gray between, **1px Ink** under the last, `align-items:baseline`:

| Project (15px/500) + role (13px/400 Graphite) | Needs attention (15px/400) | Age (mono 14px, right) | Status |
|---|---|---|---|
| Residential Renovation / PM | Owner approval — millwork change | 12d | **Overdue** (13px/600 red) |
| Cambridge Renovation / Ops | Subcontract agreement | 6d | **Blocked** (13px/600 red) |
| High-Rise Residence / Architect | RFI 027 — ceiling coordination | 8d | Waiting (13px/500 Graphite) |
| Back Bay Residence / PM | Client finish selection | 5d | Due soon (13px/500 Graphite) |
| Townhouse Renovation / Estimator | Change pricing not issued | 4d | Open (13px/500 Graphite) |

  Tracks: `minmax(120px,0.9fr) minmax(160px,1.5fr) 52px minmax(78px,0.6fr)`, repeated
  identically on the header row so the columns align. Age is mono and right-aligned so the
  column scans as a number column; Status is its own column with its own header — never two
  facts stacked under "Age / Status".
- **Ink footer band**, 18/24px: `MANAGE BY EXCEPTION` 11px/600 .14em Line gray + value
  spanning two tracks, 15px/500 Paper: "Nothing running to plan needs your attention."

Under the card, 14px above: 13px/400 Graphite "Example project attention view. Project
Intelligence is in development."

---

## 7. From attention to action. — Bond

**Left:** eyebrow `SEEING THE ISSUE IS ONLY THE BEGINNING`, heading "From attention to
action."; under a 1px rule, 16px/400 Graphite "This is where Project Intelligence becomes part
of an operating system rather than another reporting tool."

**Right:** 2px Ink top rule, 24px padding-top, 22px gap:

1. 16px/400 Graphite: "Imagine Project Intelligence surfaces:"
2. **The surfaced-item card** — 1px Ink border, Paper fill, 18/20px padding, a baseline-aligned
   flex row that wraps: "Owner approval — millwork change" (17px/600 −.015em) pushed against
   "12 days overdue" (13px/600 **red**, `flex:none`)
3. 17px/500: "Now the team needs more than a red status. They need to know:"
4. Five question rows, 16px/500, 13px padding, hairline between (none after the fifth):
   What does our process require? · Can the work proceed? · What authorization is needed? ·
   How should the change be priced? · What document needs to be issued?
5. Kicker, 2px Steel left border, 19px/600: "That is where the other parts of Construction OS
   come in."

The card is a deliberate callback to the register's first row — same project, same issue, now
aged past the commitment. Keep the two consistent if the example data ever changes.

---

## 8. See it. Understand it. Act on it. — Paper, closing on an Ink strip

**The most important section on the page.** Eyebrow `THE LOOP`, heading over a 2px Ink rule.

Three cards, `repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`, each
`border-top:1px solid #B8B9B5; padding:26px 0`, 14px gap, `padding-bottom:40px` on the grid
(rule (e) — the Ink band follows):

Each card: a header row (mono 12px number · the **product's own icon** at 15px · product name
at 11px/600 .14em uppercase Steel) → the question at 21px/600 −.022em → a 1px rule → a 10px-gap
stack of one 15px/500 Ink line and one or two 15px/400 Graphite lines.

| # | Product / icon | Question | Body |
|---|---|---|---|
| 01 | Project Intelligence · `icon-better-visibility` | What needs attention? | Surface the exception: owner-requested millwork change awaiting approval. / Identify that it is aging and requires intervention. |
| 02 | Construction Intelligence · `icon-fewer-bottlenecks` | What should we do? | Apply construction know-how and company-specific procedures. / Determine the required authorization, pricing treatment, applicable standards, and conditions that affect the answer. / Show the sources behind the guidance. |
| 03 | Document Workbench · `icon-less-paperwork` | What needs to be produced? | Guide the PM toward the appropriate documentation. / Prepare the change documentation, authorization, RFI, agreement, meeting record, or other project document needed to move the issue forward. |

The three cards must read left-to-right as a sequence. **Do not add arrows, connectors, or a
numbered pipeline graphic** — the numbers, the icons and the three questions carry it.

### 8b. The Ink strip
Full-bleed Ink inside the same Paper section, content in `.cos-container`, 34px vertical
padding, `repeat(auto-fit, minmax(min(260px,100%),1fr))`, `align-items:baseline`:

- label `THE CONSTRUCTION OS LOOP` — 11px/600 .14em uppercase, **Line gray**
- value spanning two tracks — 22px/600 −.022em **Paper**: "See the exception. Know what to do.
  Produce what the job needs."
- beneath it, 15px/500 Line gray: "That is the Construction OS loop."

---

## 9. Three products. One operating system. — Bond

Eyebrow `THE SYSTEM`, heading `clamp(26px,7cqi,38px)` −.032em over a 2px Ink rule.

Three rows, `repeat(auto-fit, minmax(min(220px,100%),1fr))`, `gap:18px 28px`,
`align-items:baseline`, 26px padding, hairline between rows only: product name 19px/600 −.02em ·
the promise 16px/500 · the question 15px/400 Graphite.

| Product | Promise | Question |
|---|---|---|
| Project Intelligence | Know what needs attention. | What across the active portfolio is no longer running to plan? |
| Construction Intelligence | Know how the work should be handled. | What do our standards, procedures, contracts, pricing rules, and experience say we should do? |
| Document Workbench | Produce the documents that move it forward. | What needs to be written, issued, approved, or documented next? |

Close under a 2px Ink rule, 17px/500, max 70ch: "Construction OS is designed to connect those
three questions instead of leaving the PM to move manually between project status, company
knowledge, and document production."

**§8 and §9 are not redundant** and both stay: §8 is one issue moving through three products;
§9 is the standing question each product answers. They are deliberately built as different
shapes — cards vs. ledger — so they don't read as the same table twice. Do not merge them.

---

## 10. Manage by exception—not by inbox. — Paper

Header: eyebrow `THE QUESTIONS`, heading `clamp(26px,7cqi,38px)`; right column 16px/400
Graphite "Project Intelligence is designed for the moments when someone needs to know:".
2px Ink rule.

Six questions, `repeat(auto-fit, minmax(min(280px,100%),1fr))`, `column-gap:40px`, each cell
`border-top:1px solid #B8B9B5; padding:22px 0`, 19px/600 −.02em. `padding-bottom:30px` on the
grid, then a 2px Ink rule and the close.

What changed? · What is getting old? · What is blocked? · What are we waiting on? · What is
starting to threaten schedule or cost? · Where does leadership need to intervene?

Close, 17px/500, max 70ch: "Instead of rebuilding that picture through emails, meetings, calls,
and spreadsheets, the goal is a clearer view of the work that has stopped moving."

---

## 11. Know where the risk is building. — Bond

Two columns. **Left:** eyebrow `AGING`, heading; under a 1px rule 17px/500 "Not every issue
starts as a crisis." Then **the escalation** — a baseline-aligned wrapping flex row, 18px gap:
`4d` · "then" · `7d` · "then" · `12d`, the numerals in **mono at 28px**, −.02em, the word
"then" at 15px/400 Graphite. `4d` and `7d` are Ink; **`12d` is red** — that is the breach.
Under it, 15px/400 Graphite: "An approval is four days old. Then seven. Then twelve."

This is the page's only graphic that isn't a product view, and it is made of type. **Do not
substitute a chart, a bar, or a timeline illustration.**

**Right:** 2px Ink top rule, three rows at 16px/500, 16px padding, hairline between (none after
the third): A selection that felt early suddenly threatens a lead time. · A change waits for
pricing while the field keeps moving. · A subcontract remains unsigned while mobilization
approaches.

Then the kicker, 2px Steel left border, 19px/600: "Project Intelligence is designed to make
aging and unresolved work visible while there is still time to act."

---

## 12. Closing CTA — Ink

Two columns, `minmax(min(340px,100%),1fr)`, 56px gap, `align-items:start`, padding 88/80.

**Left:** lockup row — the **product icon** at 24px (Paper strokes, Line gray frame, no red) ·
`PROJECT INTELLIGENCE` 14px/600 .14em Paper · the `IN DEVELOPMENT` tag (10px/600 .12em Line gray
in a 1px Graphite box) · a 1px Graphite rule filling the rest of the row. Then:

- heading `600 clamp(34px,11cqi,64px)/0.98`, −.042em, Paper, `balance`:
  "Give leadership its attention back."
- 19px/400 Line gray, max 46ch: "Your leadership team should not have to chase five PMs to
  understand five projects."
- 16px/400 Line gray, max 46ch: "They should be able to focus on the decisions, problems, and
  exceptions where their experience can actually change the outcome."
- kicker, **2px Paper** left border, 19px/600 Paper: "Know what needs attention. Know what to do
  next. Keep the work moving."
- CTA row: Paper-filled "Book a Construction OS demo" + two Paper-underlined links,
  "Explore Construction Intelligence →" and "Explore Document Workbench →"

Three actions is one more than the other product pages carry, and it is correct here: the
product isn't shipped, so the two links to shipped products are the real next step.

**Right:** "The rest of the system" (12px/500 .12em Line gray) then three rows separated by 1px
Graphite rules — icons at 15px, mono numbers Line gray, names 17px/600 Paper:
01 Document Workbench · 02 Construction Intelligence · —— Operations Automation
`EXTENSION LAYER`. **Project Intelligence is not listed** — you're on it.

---

## 13. Footer

Shared component. Title-block cells: `SHEET CONSTRUCTION OS` · `PAGE PROJECT INTELLIGENCE` ·
`ISSUED 2026-09-06` · `REV 01` · **`STATUS IN DEVELOPMENT`** (the other product pages read
`ISSUED FOR REVIEW`). In the Products column, Project Intelligence is the Ink-weight item (03).

---

## Acceptance check

1. `document.documentElement.scrollWidth === clientWidth` at **375px**, 800px, 909px and 1440px.
   375px is where this page failed: probe every grid, not just the page shell.
2. No grid track is floored at a bare px value — every floor reads `minmax(min(Npx,100%),1fr)`,
   and no row places two or more px-floored tracks side by side.
3. The attention register scrolls horizontally inside its wrapper at 375px and the page itself
   does not.
4. At 800px content width every `auto-fit` grid is 2 columns: no cell shows a left border, a
   left indent, a half-width rule, or a gray block in an unfilled slot.
5. `#C43230` appears exactly **six** times: 2 mark plates (header, footer) + `Overdue` +
   `Blocked` + "12 days overdue" + the `12d` escalation numeral. No other red.
6. No more than two register rows are red.
7. All four "in development" disclosures are present, at full size, above the fold or in-flow —
   none in fine print.
8. No text lighter than `#5F6466` on Paper/Bond; on Ink nothing darker than `#B8B9B5`.
9. No two adjacent sections share a background; no border between differing surfaces.
10. Ledger sections have hairlines between rows only, never after the last row.
11. In every ledger row the title's left edge sits 46px from the row's left edge, matching the
    other product pages.
12. Both CTA rows use the 14px / 13×20 / 44px primary and the 2px-underlined 14px secondary.
13. Every section closes on a rule, a strip, or a footer row — none ends on whitespace.
