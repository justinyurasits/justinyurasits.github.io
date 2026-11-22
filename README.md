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
npm run preview    # local preview while editing, drafts included
```

## Publishing an article

No Astro knowledge needed. Five steps:

1. `npm run new-article -- "Article title" construction` (or `enterprise`). This creates
   one file, `src/content/articles/<article-title>.md`, as a draft.
2. Write the article in that file. Set the description and tags at the top. Images go
   in the folder named after the article, next to the file.
3. `npm run preview`, then open the address it prints. Drafts show here and nowhere else.
4. Set `draft: false`, then run `npm run check`. It must end with "Ready to publish."
   If it doesn't, each ✗ line names the file and what to change.
5. Push. After cutover, an article-only change can go straight to `main` (CLAUDE.md §7).

**Corrections:** edit the same file and push. The URL stays the same. For a substantive
change, add `updated:` with the date and `substantive: true`, and the article shows
"Updated <date>". A typo fix needs nothing.

**Beyond a standard article:** an advanced layout or an interactive demonstration may need
development work, through an issue and a pull request. A standard article never does.

## Test it

```bash
npm run check      # the build plus every check; must pass before every commit
npm test           # the test suite
```

## Inquiries

Contact has no form. Each reason (consulting, contract engagements, partnerships,
speaking, education) has its own email link with the reason as the subject, plus the
booking link (`cal.com/justinyurasits`). Justin tags each inquiry relevant or not by hand
in his inbox. The count tagged relevant is how the Inquire goal is measured (product
brief §4, JYC-CAP-08).

## Deploy

Until the M2.9 cutover, `main` is the live Construction OS site and GitHub Pages serves it
as before. There's no preview deploy for v2: preview locally with `npm run preview` (drafts
included), or `npm run build && npm run preview:build` to serve the built site.

At cutover, `.github/workflows/deploy.yml` builds, checks and publishes from `main`. It
runs only once the repository variable `PAGES_DEPLOY_ENABLED` is `true` and Pages is
set to deploy from GitHub Actions. A failed build or check never deploys, so the
previous version stays live.

## Layout

| Folder | What it holds |
| --- | --- |
| `src/pages/` | One file or folder per route. Pages built in M1 replace the `[COPY]` stubs |
| `src/content/` | Articles, projects and experience entries; their schemas are in `src/content.config.ts` |
| `src/data/` | `old-addresses.mjs`: every old site address and where it goes now (JYC-CAP-09). The redirect pages, sitemap and preserved-links check read it |
| `src/lib/` | Shared code, including `getPublished`, the only way pages read content (it leaves drafts out of builds) |
| `scripts/` | `check.mjs`, the site checks run by `npm run check`; `checks.config.json` sets whether a missing metric basis warns or fails |
| `tests/` | Tests that build a throwaway copy of the site with fixture content |
| `src/layouts/`, `src/components/` | The base layout (header, navigation, footer) and shared components |
| `src/styles/` | Neutral styling until the visual design is applied (M2) |
| `public/` | Files served as they are, including `CNAME` |
| `content/` | `facts.json`, the facts register every claim about Justin and his products must match. Its schema is `src/lib/register.mjs`; pages read it through `src/lib/facts.ts` |
| `.github/` | The pull request template, CI (`ci.yml`) and the deploy workflow (`deploy.yml`) |

## How work happens

Every change starts as a GitHub issue and lands through a pull request. Design changes
happen in the design repository first. See [CLAUDE.md](CLAUDE.md).
