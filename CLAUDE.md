# justinyurasits.github.io

<!-- standard: design/_template/repo/CLAUDE.md v1.7
     Sections 1–6 are the standard: copy them unchanged, filling in only the <angle brackets>.
     Section 7 is this repository's own. To change a standard rule here, say so under
     "Overrides" in section 7, with the reason. -->

## 1. What this is

The code and content for justinyurasits.com: Justin's personal site for his writing, AI
projects and consulting. `main` is the live Construction OS site until the v2 cutover;
v2 is built on the `v2` branch.
Status: active.

## 2. Design

The design docs for this repository are in the `design` repository, cloned next to this
one, at `../design/justinyurasits-com/site/`. Pull it before planning. In a git worktree,
`../design` means next to the main checkout, not next to the worktree.

Before proposing work, read in this order (skip any the project doesn't have yet):

1. `../design/justinyurasits-com/brief.md`: why it exists and for whom
2. `../design/justinyurasits-com/product-spec.md`: what the product must do, by capability ID
3. `../design/justinyurasits-com/architecture.md` and `principles.md`: how the parts fit, and
   the rules every design decision follows
4. `../design/justinyurasits-com/site/brief.md` and `spec.md`: who this component is for,
   and what it must do
5. `../design/justinyurasits-com/site/design.md`: how it works, and the decision log
6. `../design/justinyurasits-com/site/<slice>-design.md`: the build design for the slice
   the issue belongs to
7. `../design/justinyurasits-com/site/plan.md`: the milestones still ahead

- **Design leads, code follows.** If the work needs a change to what the product does,
  to a requirement or to the architecture, stop and propose the change. Once Justin
  approves it, make it in the Claude Doc (synced files) or in a pull request in `design`
  (repo-authored files), and build against it after it's merged. Never put a design
  change in this repository's pull request, and don't build ahead of the design.
- **Working in `../design`.** Before changing anything there (a design pull request, a
  sync or a roll-up), read `../design/CLAUDE.md` and follow it. It has the sync steps,
  including `python tools/build_docs.py` and `python tools/validate.py`.
- **When the design is silent, ask.** Don't improvise behavior, copy or scope.
- **When the design and this repository disagree, say so.** Don't guess which is right.
- A synced design file starts with a header naming its Claude Doc. If the two differ,
  the Claude Doc is current.

## 3. How work happens

- **The issue is the plan.** Work only from a GitHub issue, and read it first
  (`gh issue view <N>`). The issue authorizes the work; the spec and design constrain
  how it's done. If they conflict, stop and say so. With no issue, write the work up as
  a proposed issue and wait.
- One issue, one branch, one pull request. Branch name: `issue-<N>-<short-description>`.
- Anything outside the issue gets a new issue. Don't widen the scope.
- Never commit to `main`. Never merge: Justin reviews and merges.

## 4. Checks

- Run the checks listed in section 7 before opening a pull request, and paste the
  results into it.
- A failure is never ignored. Either the change is wrong or the check is; say which.
- Never change an expected result to make a check pass. Report the mismatch and stop.

## 5. Every pull request

Fill in `.github/pull_request_template.md`:

- `Closes #<N>`, and what changed and why, in plain English.
- How each acceptance criterion in the issue was checked.
- **Decisions (proposed):** choices made while coding: the decision, the options, why,
  and what would change it. Merging the pull request approves them. That covers
  implementation choices inside the issue only. A decision that changes a requirement,
  the architecture, a security boundary or documented behavior is a design change
  (section 2): stop and propose it instead.
- **Build notes:** what you did, what broke, what it taught.

## 6. Roll-up, ask before, never

**Roll-up.** Ask "Roll up to design?" when a pull request you opened is merged, when an
issue or milestone is done, and about every ten turns of work since you last asked.

- On yes: collect Decisions and Build notes from pull requests merged since the last
  roll-up (the latest "Roll-up:" line in the component's `build-log.md`). Propose
  decisions for the `design.md` decision log and findings for `build-log.md`, ending with
  the line `Roll-up: <repo> #<first>–#<last>`. Also propose any lesson that generalizes
  beyond this work for the project's `principles.md`, under the principle it serves or
  flagged as a candidate new one. For files synced from Claude Docs, add
  them as suggestions in the Claude Doc if you have the Docs connector; otherwise give
  Justin the text to paste. For repo-authored files, open a pull request in `design`.
- Every roll-up also checks for drift. For each synced file in the component and its
  project, compare the `rev` in its `sync-manifest.yaml` with the Claude Doc's current
  revision, and offer a sync pull request in `design` for any doc that has moved ahead.
  Without the Docs connector, list those docs and their links from `../design/DOCS.md`
  and ask Justin to check them.
- On no: don't ask again for another ten turns.
- Nothing enters the design record until Justin approves it.

**Ask before:**

- adding a dependency
- changing a prompt, tool description, rubric, or anything else that changes what a
  model decides
- anything not in the issue

**Never:**

- read, print or edit `.env`. Secrets live only there; `.env.example` holds key names only
- commit secrets, API keys or real customer data
- rewrite git history

## 7. This repository

- **Layout:** see the Layout table in [README.md](README.md). When a folder is added,
  moved or retired, update both.
- **Run:** `npm install`, then `npm run preview` (local dev server, drafts included), or
  `npm run preview:build` to serve a build. Node 22, pinned in `.nvmrc`. Publishing an
  article is the routine in the README's "Publishing an article".
- **Checks:** `npm run check` builds the site and runs every check (schemas, facts
  register, fees, links, discoverability), and `npm test` runs the test suite. Both must
  pass before every commit, and CI runs both on every pull request. A missing metric
  `basis` is a warning until M2.8 switches it to a failure in `checks.config.json`. If a facts
  check fails, fix the page, not `content/facts.json`, unless Justin has said the
  canonical value changed.
- **Conventions:** Astro, statically generated; content in Markdown/MDX as Astro content
  collections. Styling stays neutral until the visual design from `brand-system` is
  applied (M2). Domain language follows the product spec: capability IDs
  `JYC-CAP-<nn>`, maturity, demo, built/led/both.
- **Overrides:** three, from the decision log in
  `../design/justinyurasits-com/site/design.md`.
  1. *"Until cutover, branch from `v2` and target `v2` with every pull request. `main`
     is the live site and changes only at cutover."* Why: the live site keeps running
     unchanged while v2 is built in the same repository.
  2. *"After cutover, section 3's 'Work only from a GitHub issue' and 'Never commit to
     `main`' don't apply to article-only changes Justin pushes himself. Code changes,
     and all work by Claude Code, follow section 3."* Why: publishing an article is one
     file and a push (JYC-CAP-04); a pull request for each article would make
     publishing harder, against the brief's Publish goal.
  3. *"Section 3's 'Never merge' doesn't apply to Claude Code's own pull requests into
     `v2` during M0 and M1, once CI passes and every acceptance criterion is checked in
     the pull request body. Justin reviews at each milestone's roll-up. Merging to
     `main` always needs Justin's approval."* Why: keeps M0 and M1 moving without a
     review per pull request; the roll-up at each milestone is the review.
