// npm run new-article -- "Article title" construction|enterprise
// Creates src/content/articles/<slug>.md from the template, as a draft dated today.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const CATEGORIES = { construction: 'AI for Construction', enterprise: 'Enterprise AI & Product Leadership' };
const usage = `Usage: npm run new-article -- "Article title" construction
       npm run new-article -- "Article title" enterprise
The last word is the article's primary category: construction (AI for Construction)
or enterprise (Enterprise AI & Product Leadership).`;

const [title, cat] = process.argv.slice(2);
if (!title || !cat) { console.log(`✗ Give the article a title and a category.\n\n${usage}`); process.exit(1); }
const category = CATEGORIES[cat.toLowerCase()];
if (!category) { console.log(`✗ "${cat}" isn't a category.\n\n${usage}`); process.exit(1); }

const slug = title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dir = join(ROOT, 'src/content/articles');
const file = join(dir, `${slug}.md`);
if (existsSync(file)) { console.log(`✗ src/content/articles/${slug}.md already exists. Pick another title, or edit that file.`); process.exit(1); }

const today = new Date().toISOString().slice(0, 10);
mkdirSync(dir, { recursive: true });
writeFileSync(file, `---
title: ${JSON.stringify(title)}
description: "One or two sentences for listings and social previews."
date: ${today}
category: ${JSON.stringify(category)}
tags: []
draft: true
featured: false
# relatedProjects: [project-file-name]
# references:
#   - title: "A source"
#     url: "https://example.com"
# After publishing, for a substantive correction (a typo fix needs nothing):
# updated:
#   date: YYYY-MM-DD
#   substantive: true
---

Write the article here in Markdown.

<!--
Images go in src/content/articles/${slug}/ and are added like this:
![What the image shows](./${slug}/diagram.png)
-->
`);
console.log(`✓ Created src/content/articles/${slug}.md (a draft).

Next:
  1. Write the article in that file.
  2. npm run preview      see it at http://localhost:4321/writing/${slug}/
  3. Set draft: false when it's ready.
  4. npm run check        must say "Ready to publish."
  5. Push.`);
