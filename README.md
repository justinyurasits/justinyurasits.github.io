# justinyurasits.github.io

The code and content for [justinyurasits.com](https://justinyurasits.com): Justin's
personal site for his writing, AI projects and consulting.

**Status:** active
**Design:** [`design/justinyurasits-com/site`](https://github.com/justinyurasits/design/tree/main/justinyurasits-com/site)

`main` is the live Construction OS site, served by GitHub Pages, until the v2 cutover.
v2 is built on the `v2` branch: every pull request branches from `v2` and targets it
(see [CLAUDE.md](CLAUDE.md), section 7).

## Run it

```bash
nvm use            # Node 22, from .nvmrc
npm install
npm run dev        # local preview while editing
```

## Test it

```bash
npm run check      # the build plus every check; must pass before every commit
```

## Layout

| Folder | What it holds |
| --- | --- |
| `content/` | `facts.json`, the facts register every claim about Justin and his products must match |
| `*.html`, `products/`, `tools/`, `brand-kit/`, `brand-kit-master/`, `images/`, `assets/` | The old static site. Removed from `v2` by M0.2; it stays on `main` until cutover |
| `.github/` | The pull request template |

## How work happens

Every change starts as a GitHub issue and lands through a pull request. Design changes
happen in the design repository first. See [CLAUDE.md](CLAUDE.md).
