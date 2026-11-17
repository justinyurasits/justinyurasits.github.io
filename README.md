# justinyurasits.com

The Construction OS product and services site, served by GitHub Pages at
[justinyurasits.com](https://justinyurasits.com).

**Status:** active

Static HTML, no build step. Product design docs live in the
[design](https://github.com/justinyurasits/design/tree/main/construction-os) repository;
this repo holds only the public site.

## What's here

| Path | What it is |
| --- | --- |
| `*.html` | Top-level pages: home, services, engagements, work, insights, about, legal |
| `products/` | One page per product |
| `content/` | `facts.json`, `metrics.json`, `register.json`: the canonical facts and numbers the pages must match |
| `tools/` | `verify.js` (the pre-commit check), `generate-header.js`, `manifest.json` |
| `brand-kit/`, `brand-kit-master/` | Brand system and component specs the pages follow |
| `images/`, `assets/` | Site images and illustrations |

## Working on it

```bash
python3 -m http.server 8000   # preview at localhost:8000
node tools/verify.js          # must exit 0 before every commit
```

If `verify.js` fails, fix the page. Change `content/facts.json` only when the canonical
value itself has changed. See [CLAUDE.md](CLAUDE.md).

Keep images web-sized: about 1600 px on the long edge and a few hundred KB.
