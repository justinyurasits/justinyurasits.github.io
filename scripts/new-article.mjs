// npm run new-article                          asks for the title and the category
// npm run new-article -- "Article title" construction|enterprise
// Creates src/content/articles/<slug>.md from the template, as a draft dated today.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { PLACEHOLDER } from './article-template.mjs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const CATEGORIES = { construction: 'AI for Construction', enterprise: 'Enterprise AI & Product Leadership' };
const usage = `Usage: npm run new-article -- "Article title" construction
       npm run new-article -- "Article title" enterprise
The last word is the article's primary category: construction (AI for Construction)
or enterprise (Enterprise AI & Product Leadership).`;


// Ask on the terminal for whatever wasn't given. Answers can also be piped in, one per line.
// With no answer (the input ends), it explains what's needed and stops.
const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: !!process.stdin.isTTY });
const lines = rl[Symbol.asyncIterator]();
async function ask(question) {
  process.stdout.write(question);
  const { value, done } = await lines.next();
  if (done) { console.log(`\n✗ Give the article a title and a category.\n\n${usage}`); process.exit(1); }
  if (!process.stdin.isTTY) process.stdout.write(`${value}\n`);
  return value.trim();
}

let [title, cat] = process.argv.slice(2);
while (!title) title = await ask('Title: ');
// A wrong category given on the command line stops, so a typo never creates a file.
if (cat && !CATEGORIES[cat.toLowerCase()]) { console.log(`✗ "${cat}" isn't a category.\n\n${usage}`); process.exit(1); }
while (!cat || !CATEGORIES[cat.toLowerCase()]) {
  if (cat) console.log(`✗ "${cat}" isn't a category. Type construction or enterprise.`);
  cat = await ask('Category (construction or enterprise): ');
}
rl.close();
const category = CATEGORIES[cat.toLowerCase()];

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

${PLACEHOLDER}

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
