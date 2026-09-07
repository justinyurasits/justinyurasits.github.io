# brand-kit — read this first

Design documentation for the Construction OS site. **Reference material, not source code.**
Nothing here is imported or built; it describes what the components should be.

## Precedence — highest wins

1. A `FIX-*.md` file — corrections to something already built. Always newest truth.
1b. `COMPONENT-product-block.md` — the shared definition of products 01/02/03. Beats the
   individual section specs on grid, type scale and spacing.
2. A `SECTION-*.md` file — the full brief for one section.
3. `CONSTRUCTION-OS-BRAND-KIT.md` — global tokens, type, mark, icons.
4. Anything a human said in chat.

If two files disagree, the higher number wins. Don't reconcile them yourself — the newer
file was written knowing the older one.

## Entry point

`IMPLEMENTATION-ORDER.md` — sequences all the work and lists the three content decisions
that need a human. Start there; don't read the section specs front to back.

## Files

```
IMPLEMENTATION-ORDER.md            build order + global rules + definition of done
CONSTRUCTION-OS-BRAND-KIT.md       tokens, typography, the mark, the four icons
svg/                               the six SVGs — the complete icon set, never draw new ones

COMPONENT-product-block.md         the shared product-block component — overrides the
                                   per-section specs for grid, type scale and spacing
SECTION-hero.md                    hero
SECTION-products.md                "Construction OS — three products" + product 01
SECTION-construction-intelligence.md   product 02
SECTION-does-this-sound-familiar.md    the four-pain section
SECTION-configured-around-your-company.md   the six-item configuration section
SECTION-operations-automation.md   the six-module extension-layer section

PAGE-document-workbench.md         full product page — /products/document-workbench
PAGE-construction-intelligence.md  full product page — /products/construction-intelligence

FIX-construction-intelligence.md   corrections to the built product 02
```

## Status

| Section | Spec | Built | Next action |
|---|---|---|---|
| Hero | `SECTION-hero.md` | yes | verify H1 renders 2 lines at 375 / 1024 / 1440 |
| Products + 01 | `SECTION-products.md` | yes | apply the icon changes (name-level icon, index cells) |
| Construction Intelligence (02) | `SECTION-construction-intelligence.md` | yes, with defects | **apply `FIX-construction-intelligence.md`** |
| Project Intelligence (03) | none — build from the 02 spec | no | tag `03 / ATTENTION`, `icon-better-visibility.svg`, red only on Overdue/Blocked |
| Does this sound familiar | `SECTION-does-this-sound-familiar.md` | no | — |
| Configured around your company | `SECTION-configured-around-your-company.md` | no | — |
| Operations Automation | `SECTION-operations-automation.md` | no | — |
| **Document Workbench page** | `PAGE-document-workbench.md` | no | build it — full product page |
| **Construction Intelligence page** | `PAGE-construction-intelligence.md` | no | build it — full product page |

Update this table when a section lands. It is the only place that tracks state.

## Rules that override anything ambiguous elsewhere

- Seven colors. Graphite `#5F6466` is the lightest text; Line gray `#B8B9B5` is hairlines only.
- Revision red `#C43230` marks a measured change or a breached commitment. Nothing else.
- Archivo everywhere. Serif only inside a generated-document render.
- No radius, shadow, gradient, or card border. Rules do the structure.
- Icons come from `svg/` — never draw a new one, never substitute a library icon.
- Icons and marks match the cap height of the type beside them.
