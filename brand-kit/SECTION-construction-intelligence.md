# Section spec — Construction Intelligence (Product 02 / 10a)

Implementation brief. Same system as the Products spec (`SECTION-products.md`) — read
that first; this covers only what differs for product 02, whose artifact is **product UI**
rather than a generated document. Tokens in `CONSTRUCTION-OS-BRAND-KIT.md`.

---

## Copy — verbatim

```
Tag         02  ——  KNOWLEDGE
Name        "Construction Intelligence"
Lead        "Put your company's knowledge to work."
Paragraph   "Combine construction know-how with your procedures, pricing rules, standards,
             templates, and project history—so your team gets company-specific answers
             without searching through folders or tracking down the person who knows."
             + " " +
            "Put your best people's judgment in reach of the whole team."
CTAs        "Explore Construction Intelligence →"   (primary)
            "See it work"                            (text link)

Proof
  "Company-specific answers" / "Grounded in your procedures, pricing rules, standards,
                                templates, and project history"
  "Source-backed reasoning"  / "See the procedure, standard, or reference behind the answer"
  "Knowledge that doesn't walk out the door" /
                               "Capture how experienced people make decisions and make it reusable"

Artifact
  Question  "How should we price an owner-requested millwork change on a cost-plus project?"
  Answer ¶1 "On cost-plus, the PCO is still required — it establishes owner consent that
             the costs are eligible and defines whether fee applies."
  Answer ¶2 "For subcontracted millwork, price from the shop quote, write the scope
             internally, apply contract fee without compounding and show it separately,
             state schedule impact in calendar days, and get written authorization before
             fabrication begins."
  Answer ¶3 "If pricing is not final and the owner wants the shop released, authorize in
             writing as NTE or T&M — never verbally."
  Sources   FCM-03 §8.2      "Cost-plus change authorization and fee treatment"
            CHG-53 §8.6 / §9.2 "PCO pricing presentation and contractor-written scope"
            CON-16 §7.4      "Fee and markup rules"
            CHG-59           "NTE/T&M authorization"
  Footer    "What changes the answer" /
            "Subcontracted vs. self-performed millwork; whether the project has a GMP cap."
```

As in product 01, the two prose sentences are **joined into one paragraph** (verbatim,
space-separated) so the block has two levels instead of three.

### New strings
Caption `CONSTRUCTION INTELLIGENCE — ANSWER` / `4 SOURCES CITED`, the `QUESTION` tag,
the sources-rail count and its `Answered from` / "Your company's procedures and standards"
footer, and the `Next` rail. All optional; the `QUESTION` tag and the sources count are
the two worth keeping.

### ⚠ One value is a placeholder
The first proof row's figure reads `4 cited sources`, shown in the mock with a red
"needs your number" flag. It's true of the example but weak as a product claim, and
product 01 sets the bar with "150+" and "4–8 hours → ~30 minutes". **Replace it with a
real figure** — procedures indexed, documents searched per answer, average time to an
answer — and delete the flag. If no number exists yet, ship the row without a figure
(20px name + caption, like rows 2 and 3) rather than shipping the placeholder.

---

## The one rule this section establishes

**Serif is for generated documents. Archivo is for the software.**

Document Workbench's artifact is a contract, so it is set in serif — correct. This
artifact is Construction Intelligence's own answer surface. Setting it in the same serif
tells the reader they're looking at another document and throws away the distinction.
Everything inside this card is Archivo.

---

## Artifact anatomy

A single 1px Ink frame, no fixed height, no crop, no fade — unlike the document artifacts,
this one is a complete UI state and should end where its content ends.

```
┌ frame: 1px Ink, Paper ─────────────────────────────────────┐
│ question band   20/22px padding, 1px Ink bottom rule        │
│   QUESTION      mono 11px, .1em, Steel                      │
│   question      Archivo 600 21px, −.022em, 1.28             │
├──────────────────────────┬──────────────────────────────────┤
│ answer  1.5fr            │ sources rail  1fr                │
│   ¶1 Archivo 500 16px    │  header: "Sources" 11/600 .14em  │
│      −.01em, Ink         │          + count, 1px Ink rule   │
│   ¶2 400 15px Graphite   │  4 items: mono 12px Ink ref      │
│   ¶3 400 15px Graphite   │           + 13px Graphite desc   │
│   gap 15px               │           1px Line gray between  │
│   padding 22/24/26       │  footer (margin-top:auto):       │
│                          │    "Answered from" 11/600 Steel  │
│                          │    + 13px Graphite line          │
│                          │  bg Bond, 1px Line gray left     │
├──────────────────────────┴──────────────────────────────────┤
│ WHAT CHANGES THE ANSWER — Ink band, 18/24 padding           │
│   label 11/600 .14em Line gray │ value 15/500 Paper         │
└─────────────────────────────────────────────────────────────┘
```

Three details that matter:

1. **¶1 is the ruling** — 16px/500 in Ink. ¶2 and ¶3 are the working detail at 15px/400
   Graphite. Currently all three are identical, so the reader can't find the answer inside
   the answer.
2. **The sources rail must end on its own content.** Today it's stretched to the answer's
   height and leaves ~200px empty. The count at the top and the `Answered from` footer
   (`margin-top: auto`) close it honestly at any answer length.
3. **"What changes the answer" is reversed to Ink, full width, as the card's conclusion.**
   It is the most distinctive line on the site and it currently reads as a caption.

```css
.cos-answer { border: 1px solid var(--cos-ink); background: var(--cos-paper); }
.cos-answer__q { padding: 20px 24px 22px; border-bottom: 1px solid var(--cos-ink);
  display: flex; flex-direction: column; gap: 10px; }
.cos-answer__q b { font: 400 11px/1 ui-monospace, monospace; letter-spacing: .1em;
  color: var(--cos-steel); }
.cos-answer__q h4 { margin: 0; font: 600 21px/1.28 Archivo, sans-serif;
  letter-spacing: -.022em; color: var(--cos-ink); text-wrap: pretty; }

.cos-answer__body { display: grid;
  grid-template-columns: minmax(260px, 1.5fr) minmax(200px, 1fr); }
.cos-answer__text { padding: 22px 24px 26px; display: flex; flex-direction: column;
  gap: 15px; min-width: 0; }
.cos-answer__text p { margin: 0; font: 400 15px/1.6 Archivo, sans-serif;
  color: var(--cos-graphite); text-wrap: pretty; }
.cos-answer__text p:first-child { font: 500 16px/1.5 Archivo, sans-serif;
  letter-spacing: -.01em; color: var(--cos-ink); }

.cos-sources { border-left: 1px solid var(--cos-line-gray); background: var(--cos-bond);
  padding: 22px 20px 26px; display: flex; flex-direction: column; min-width: 0; }
.cos-sources__head { display: flex; align-items: baseline; justify-content: space-between;
  gap: 10px; padding-bottom: 12px; border-bottom: 1px solid var(--cos-ink);
  font: 600 11px/1 Archivo, sans-serif; letter-spacing: .14em;
  text-transform: uppercase; color: var(--cos-ink); }
.cos-sources__head span { font: 400 11px/1 ui-monospace, monospace;
  letter-spacing: 0; color: var(--cos-graphite); }
.cos-sources li { list-style: none; padding: 14px 0;
  border-bottom: 1px solid var(--cos-line-gray);
  display: flex; flex-direction: column; gap: 4px; }
.cos-sources li:last-of-type { border-bottom: 0; padding-bottom: 16px; }
.cos-sources li b { font: 400 12px/1 ui-monospace, monospace; color: var(--cos-ink); }
.cos-sources li span { font: 400 13px/1.45 Archivo, sans-serif; color: var(--cos-graphite); }
.cos-sources__foot { margin-top: auto; padding-top: 14px;
  border-top: 1px solid var(--cos-line-gray); display: flex; flex-direction: column; gap: 4px; }
.cos-sources__foot b { font: 600 11px/1 Archivo, sans-serif; letter-spacing: .14em;
  text-transform: uppercase; color: var(--cos-steel); }
.cos-sources__foot span { font: 400 13px/1.45 Archivo, sans-serif; color: var(--cos-graphite); }

.cos-answer__delta { border-top: 1px solid var(--cos-ink); background: var(--cos-ink);
  padding: 18px 24px; display: grid; gap: 10px 24px; align-items: baseline;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
.cos-answer__delta b { font: 600 11px/1 Archivo, sans-serif; letter-spacing: .14em;
  text-transform: uppercase; color: var(--cos-line-gray); }
.cos-answer__delta p { margin: 0; grid-column: span 2; min-width: 0;
  font: 500 15px/1.5 Archivo, sans-serif; letter-spacing: -.01em; color: var(--cos-paper); }

@media (max-width: 760px) {
  .cos-answer__body { grid-template-columns: 1fr; }
  .cos-sources { border-left: 0; border-top: 1px solid var(--cos-line-gray); }
  .cos-answer__delta { grid-template-columns: 1fr; }
  .cos-answer__delta p { grid-column: auto; }
}
```

---

## Left column

Identical to product 01 (`SECTION-products.md`, "Fix 2" and "Fix 3") with these values:

- Tag `02` + 40px Ink rule + `KNOWLEDGE` in Steel
- Name 38px/600, −0.032em · Lead 20px/500, −0.015em, max 30ch
- Paragraph 16px/400, 1.6, Graphite, max 46ch — the two sentences joined
- CTA row: Ink button ≥48px for "Explore Construction Intelligence →", text link for "See it work"
- Proof table under a 2px Ink rule, rows separated by 1px Line gray, **no rule after the last row**
  (the current build has a dangling hairline there)
- Row 1 carries the figure at 28px/600 when you have one, with the name at 16px/600 beneath;
  rows 2 and 3 are 20px/600 names + 14px captions

Section closes with the `Next — 03 Project Intelligence` hairline rail.

---

## Don't

- No serif and no italics anywhere in this section, including the artifact.
- No red. Nothing here is a measured change — the only red permitted is the temporary
  "needs your number" flag, which must not ship.
- Don't stretch the sources rail to match the answer column.
- Don't set all three answer paragraphs at the same weight.
- Don't demote "What changes the answer" to a caption row on Paper.
- Don't crop or fade this artifact — it's a complete UI state, not a page of a document.
- Don't give "See it work" a button.
- No rule after the final proof row.

---

## Acceptance check

1. Zero serif characters in the section.
2. Answer ¶1 is visibly heavier and larger than ¶2 and ¶3.
3. The sources rail ends after its own footer — no empty stretched column at any answer length.
4. "What changes the answer" is a full-width Ink band at the bottom of the card.
5. Question band is roughly half its current height and carries a mono `QUESTION` tag.
6. Proof table has exactly two internal rules and none after the last row.
7. Primary CTA is "Explore Construction Intelligence →" at ≥48px; "See it work" is a text link.
8. No `#C43230` anywhere in the shipped section.
9. At 375px the sources rail stacks under the answer with a horizontal hairline.


---

## Icon mapping — one icon set, four places

The four concept icons are not decoration for the benefits band; they are the page's
taxonomy. The same four axes appear in four sections, and each axis keeps its icon
everywhere it shows up:

| Axis | Pain section | Benefits band | Product / layer | Icon file |
|---|---|---|---|---|
| Documents | Paperwork | Less paperwork | 01 Document Workbench | `svg/icon-less-paperwork.svg` |
| Knowledge | Knowledge | Fewer bottlenecks | 02 Construction Intelligence | `svg/icon-fewer-bottlenecks.svg` |
| Attention | Visibility | Better visibility | 03 Project Intelligence | `svg/icon-better-visibility.svg` |
| Operations | Operations | Less repetitive work | Operations Automation (extension layer) | `svg/icon-less-repetitive-work.svg` |

The product icon sits **beside the product name at 27px** (cap height of the 38px name, structural stroke 9, hairline 4) — that is where it identifies the product. In the index cells it sits with the number and layer label at **14px**. It does not appear in the tag row; at label size it is too small to read as anything. Sizing rule: **an icon or mark matches the size of the type it sits beside** — 14px against the 11px label, and the 38px mark against the 52px masthead (its cap height). Anything larger competes with the type instead of tagging it:

```html
<p class="cos-product__tag">
  <span>01</span><i></i>
  <svg viewBox="0 0 100 100" width="14" height="14" aria-hidden="true">…</svg>
  Documents
</p>
```

The rule shortens from 40px to 28px to make room. Index cells switch from
`align-items: baseline` to `center` so the icon sits with the number and label.

Red rule is unchanged: these icons carry **no red** in the pain rows or the product tags —
only in the benefits band, where they state the change.
