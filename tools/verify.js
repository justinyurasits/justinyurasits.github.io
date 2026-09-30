#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

// ── Setup ────────────────────────────────────────────────────────────────────

const REPO  = process.cwd();
const facts = JSON.parse(fs.readFileSync(path.join(REPO, 'content/facts.json'), 'utf8'));

function collectHtml(dir) {
  const abs = path.join(REPO, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs)
    .filter(f => f.endsWith('.html'))
    .map(f => dir === '.' ? f : path.join(dir, f));
}

const HTML_FILES = [...collectHtml('.'), ...collectHtml('products')];

const failures = [];
function fail(file, lineNum, lineText, rule) {
  failures.push({ file, line: lineNum, text: lineText.trim().slice(0, 140), rule });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

// Decode the HTML entities most likely to disguise banned strings or drift values.
// Does NOT decode &lt; / &gt; / &quot; — those are structural and must stay intact
// so tag/comment detection keeps working.  Newlines are never touched (line numbers stay valid).
function decodeEntities(html) {
  return html
    .replace(/&ndash;/g,  '–') // –
    .replace(/&mdash;/g,  '—') // —
    .replace(/&nbsp;/g,   ' ')
    .replace(/&middot;/g, '·') // ·
    .replace(/&rarr;/g,   '→') // →
    .replace(/&larr;/g,   '←') // ←
    .replace(/&bull;/g,   '•') // •
    .replace(/&rsquo;/g,  '’')
    .replace(/&lsquo;/g,  '‘')
    .replace(/&rdquo;/g,  '”')
    .replace(/&ldquo;/g,  '“')
    .replace(/&sect;/g,   '§')
    .replace(/&#(\d+);/g,             (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-fA-F]+);/g,   (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g,    '&');     // last — avoids double-decoding &amp;ndash; etc.
}

// Replace comment content with spaces, preserving newlines (so line numbers stay valid).
function stripComments(content) {
  return content.replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '));
}

// Same but also removes <style> blocks and inline style="" values.
function stripCssAndComments(content) {
  let s = stripComments(content);
  s = s.replace(/<style[\s\S]*?<\/style>/gi,   m => m.replace(/[^\n]/g, ' '));
  s = s.replace(/\bstyle="[^"]*"/gi,            m => m.replace(/[^\n]/g, ' '));
  return s;
}

// Extract all <style> block contents and their start offsets within `html`.
// Used to do selector-aware checking inside style blocks.
function extractStyleBlocks(html) {
  const blocks = [];
  const re = /(<style[^>]*>)([\s\S]*?)(<\/style>)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push({ start: m.index + m[1].length, content: m[2] });
  }
  return blocks;
}

// Selectors for which text-transform:uppercase is permitted inside <style> blocks.
// All other selectors — and any inline style="" attribute — remain prohibited.
const UPPERCASE_CSS_SELECTOR_ALLOWLIST = ['.row__name'];

// Given a <style> block's content and the offset of a text-transform:uppercase
// match within that content, return true if the containing rule's selector is
// in UPPERCASE_CSS_SELECTOR_ALLOWLIST.
function isCssUppercaseAllowed(cssContent, localOffset) {
  // Walk backwards to find the { that opens the containing rule.
  let depth = 0, openBrace = -1;
  for (let i = localOffset; i >= 0; i--) {
    if (cssContent[i] === '}') depth++;
    else if (cssContent[i] === '{') {
      if (depth === 0) { openBrace = i; break; }
      depth--;
    }
  }
  if (openBrace < 0) return false;

  // Selector is the text between the previous } (or start) and openBrace.
  let selStart = 0;
  for (let i = openBrace - 1; i >= 0; i--) {
    if (cssContent[i] === '}') { selStart = i + 1; break; }
  }
  const selectorRaw = cssContent.slice(selStart, openBrace).trim();

  // Strip any enclosing at-rule block (e.g. @media … {) to get the immediate selector.
  const lastBrace = selectorRaw.lastIndexOf('{');
  const selector  = (lastBrace >= 0 ? selectorRaw.slice(lastBrace + 1) : selectorRaw).trim();

  return selector.split(',').some(s =>
    UPPERCASE_CSS_SELECTOR_ALLOWLIST.some(a => s.trim() === a)
  );
}

// 0-based line index of char offset.
function lineOf(str, offset) {
  let n = 0;
  for (let i = 0; i < offset; i++) if (str[i] === '\n') n++;
  return n;
}

// Ranges for <!-- header:start --> … <!-- header:end --> and footer equivalents.
function genRanges(lines) {
  const ranges = [];
  let start = null;
  for (let i = 0; i < lines.length; i++) {
    if (/<!--\s*(?:header|footer):start\s*-->/.test(lines[i])) start = i;
    if (/<!--\s*(?:header|footer):end\s*-->/.test(lines[i]) && start !== null) {
      ranges.push([start, i]);
      start = null;
    }
  }
  return ranges;
}

// Lines from an exemption comment through the closing tag of the element that follows it.
// Recognises comments containing: exemption, specimen, verisimilitude, "do not flag".
function exemptRanges(lines) {
  const full   = lines.join('\n');
  const ranges = [];

  const EXEMPT_RE = /exemption|specimen|verisimilitude|do not flag/i;
  const commentRe = /<!--([\s\S]*?)-->/g;
  let cm;

  while ((cm = commentRe.exec(full)) !== null) {
    if (!EXEMPT_RE.test(cm[1])) continue;

    const startLine  = lineOf(full, cm.index);
    const afterIdx   = cm.index + cm[0].length;
    const afterStr   = full.slice(afterIdx);

    // Find the first element opening tag after the comment (skip whitespace/newlines).
    const firstTagM  = /^[\s]*<([a-zA-Z][a-zA-Z0-9]*)\b/.exec(afterStr);
    if (!firstTagM) continue;

    const tagName    = firstTagM[1].toLowerCase();
    const VOID_TAGS  = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
    if (VOID_TAGS.test(tagName)) {
      ranges.push([startLine, lineOf(full, afterIdx + firstTagM.index + firstTagM[0].length)]);
      continue;
    }

    // Walk forward tracking open/close depth for this tag name.
    const scanStart = afterIdx + firstTagM.index + firstTagM[0].length;
    const scanStr   = full.slice(scanStart);
    const tokenRe   = new RegExp(`<(\/?)${tagName}(?=[\\s>\\/])`, 'gi');
    let depth  = 1;
    let endPos = full.length;
    let tm;

    while ((tm = tokenRe.exec(scanStr)) !== null) {
      if (tm[1] === '/') {
        depth--;
        if (depth === 0) {
          const closeEnd = scanStart + tm.index + scanStr.slice(tm.index).indexOf('>') + 1;
          endPos = closeEnd;
          break;
        }
      } else {
        // Skip self-closing tags (e.g. <div />).
        const fromName   = tm.index + tm[0].length;
        const nextGt     = scanStr.indexOf('>', fromName);
        const selfClose  = nextGt > 0 && scanStr[nextGt - 1] === '/';
        if (!selfClose) depth++;
      }
    }

    ranges.push([startLine, lineOf(full, endPos)]);
  }

  return ranges;
}

function inRanges(idx, ranges) {
  return ranges.some(([s, e]) => idx >= s && idx <= e);
}

// True when the char at `offset` in `raw` was replaced by a space in `stripped`
// (i.e., it was inside an HTML comment).
function inComment(raw, stripped, offset) {
  return stripped[offset] !== raw[offset];
}

// Extract individual visible text strings from HTML (text between tags).
// Skips whitespace-only strings and anything over 120 chars (prose, not labels).
function extractElementTexts(html) {
  const texts = [];
  const re = />([^<]+)</g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const t = m[1].trim();
    if (t.length > 0 && t.length < 120) texts.push(t);
  }
  return texts;
}

// Collapse commas, middots, en/em-dashes, hyphens, and whitespace to a single space.
function normalizeStatus(s) {
  return s.toLowerCase().replace(/[,·–—\-\s]+/g, ' ').trim();
}

// ── Rule 3 setup (constant across files) ─────────────────────────────────────

const WORKFLOW_MAP = {
  'Change Order Drafting':     facts.workflows.changeOrderDrafting,
  'Invoice Intake':            facts.workflows.invoiceIntake,
  'Site Safety':               facts.workflows.siteSafety,
  'Field Reports':             facts.workflows.fieldReports,
  'Bid Comparison':            facts.workflows.bidComparison,
  'Pay App Preparation':       facts.workflows.payAppPreparation,
  'Subcontractor Compliance':  facts.workflows.subcontractorCompliance,
  'Client Selections':         facts.workflows.clientSelections,
};

const PRODUCT_STATUS_MAP = {
  'Project Intelligence': facts.products.projectIntelligence,
};

const ALL_STATUS_VALUES = [...new Set([
  ...Object.values(WORKFLOW_MAP),
  ...Object.values(PRODUCT_STATUS_MAP),
])];

// Check that each named item appears on the page with its canonical status nearby.
// Fires 3a (wrong status), 3b (no status), or 3c (right words, non-canonical separator).
// When a page's <title> contains the item name, skip it — the product's own page
// has too many prose occurrences to check reliably.
function checkStatusPresence(nameMap, relPath, rawDisk, lines, decodedLines, noCommentLines, genR) {
  const pageTitle = ((rawDisk.match(/<title[^>]*>([^<]+)/i) || [])[1] || '').toLowerCase();

  for (const [name, canonical] of Object.entries(nameMap)) {
    if (pageTitle.includes(name.toLowerCase())) continue;

    for (let i = 0; i < lines.length; i++) {
      if (inRanges(i, genR)) continue;

      // Only fire when an element on this line has the name as its ENTIRE text (label, not prose).
      const lineTexts = extractElementTexts(noCommentLines[i]);
      if (!lineTexts.some(t => t === name)) continue;

      // Window: 3 lines back (status may precede label) and 5 forward.
      const winStart   = Math.max(0, i - 3);
      const winEnd     = Math.min(i + 5, decodedLines.length - 1);
      const windowHtml = decodedLines.slice(winStart, winEnd + 1).join('\n');
      const windowTexts = extractElementTexts(windowHtml);

      // Case-insensitive exact matches against every known canonical status.
      const exactHits = ALL_STATUS_VALUES.filter(s =>
        windowTexts.some(t => t.toLowerCase() === s.toLowerCase())
      );

      if (exactHits.some(s => s.toLowerCase() === canonical.toLowerCase())) continue;

      const wrongExact = exactHits.filter(s => s.toLowerCase() !== canonical.toLowerCase());
      if (wrongExact.length > 0) {
        fail(relPath, i + 1, lines[i],
          `Rule 3a STATUS DRIFT (wrong): [${name}] page="${wrongExact[0]}", canonical="${canonical}"`);
        continue;
      }

      // Normalized match: right words, non-canonical separator → 3c.
      const normCanon    = normalizeStatus(canonical);
      const malformedText = windowTexts.find(t => normalizeStatus(t) === normCanon);
      if (malformedText) {
        fail(relPath, i + 1, lines[i],
          `Rule 3c STATUS DRIFT (malformed): [${name}] page="${malformedText}", canonical="${canonical}"`);
        continue;
      }

      fail(relPath, i + 1, lines[i],
        `Rule 3b STATUS DRIFT (missing): [${name}] no status found near label`);
    }
  }
}

// ── Per-file checks ──────────────────────────────────────────────────────────

for (const relPath of HTML_FILES) {
  const abs       = path.join(REPO, relPath);
  const rawDisk        = fs.readFileSync(abs, 'utf8');
  const lines          = rawDisk.split('\n');        // original, for line-number display
  const raw            = decodeEntities(rawDisk);    // decoded, for all rule checks
  const decodedLines   = raw.split('\n');
  const noComment      = stripComments(raw);
  const noCommentLines = noComment.split('\n');
  const noCSS          = stripCssAndComments(raw);
  const styleBlocks    = extractStyleBlocks(raw);
  const genR           = genRanges(lines);
  const exR            = exemptRanges(lines);

  const isAbout    = relPath === 'about.html';
  const isServices = relPath === 'services.html';

  // ── Rule 1: BANNED STRINGS ─────────────────────────────────────────────────
  for (const banned of facts.banned) {
    const esc = banned.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re  = new RegExp(esc, 'gi');
    let m;
    while ((m = re.exec(noComment)) !== null) {
      const li = lineOf(noComment, m.index);
      fail(relPath, li + 1, lines[li], `Rule 1 BANNED: "${banned}"`);
    }
  }

  // ── Rule 2: FIGURE DRIFT ───────────────────────────────────────────────────

  // 2a. Library stat blocks: <span class="cos-stats__fig">VALUE</span> followed
  //     within 3 lines by a label that identifies which stat it is.
  const STAT_CHECKS = [
    { label: /Document\s+types?\s+produced/i, canonical: '110',   key: 'documentTypes' },
    { label: /Categories\s+covered/i,         canonical: '38',    key: 'categories' },
    { label: /Lifecycle\s+phases/i,           canonical: '5',     key: 'lifecyclePhases' },
    { label: /Documented\s+procedures/i,      canonical: '160+',  key: 'documentedProcedures' },
    { label: /Pricing\s+items/i,              canonical: '1,258', key: 'pricingItems' },
  ];
  for (let i = 0; i < lines.length; i++) {
    const fm = lines[i].match(/cos-stats__fig[^>]*>([^<]+)</);
    if (!fm) continue;
    const pageVal = fm[1].trim();
    for (let j = i + 1; j <= Math.min(i + 3, lines.length - 1); j++) {
      for (const chk of STAT_CHECKS) {
        if (!chk.label.test(lines[j])) continue;
        if (pageVal.replace(/,/g, '') !== chk.canonical.replace(/,/g, '')) {
          fail(relPath, i + 1, lines[i],
            `Rule 2 FIGURE DRIFT [${chk.key}]: page="${pageVal}", canonical="${chk.canonical}"`);
        }
        break;
      }
    }
  }

  // 2b. Measured before/after values in SVG text or body text.
  const MEASURED = [
    { re: /up\s+to\s+(\d+)\s+hrs?\b/gi,   allowed: ['8'],       label: 'contract-package before' },
    { re: /up\s+to\s+(\d+)\s+hours?\b/gi,  allowed: ['8'],       label: 'contract-package before' },
    { re: /~(\d+)\s+min\b/gi,              allowed: ['30'],      label: 'contract-package after'  },
    { re: /~(\d+)\s+days?\b/gi,            allowed: ['10', '3'], label: 'change-order days'       },
    { re: /~(\d+)\s+hrs?\b/gi,             allowed: ['10', '2'], label: 'estimating hrs'          },
  ];
  for (const chk of MEASURED) {
    chk.re.lastIndex = 0;
    let m;
    while ((m = chk.re.exec(raw)) !== null) {
      if (inComment(raw, noComment, m.index)) continue;
      const li = lineOf(raw, m.index);
      if (inRanges(li, genR)) continue;
      if (!chk.allowed.includes(m[1])) {
        fail(relPath, li + 1, lines[li],
          `Rule 2 FIGURE DRIFT [${chk.label}]: page="${m[0].trim()}", canonical allows "${chk.allowed.join('" or "')}"`);
      }
    }
  }

  // 2c. Price ranges: any $N,NNN–M,MMM must be a canonical value.
  const VALID_RANGES = new Set(['4,000–6,000', '12,000–15,000']);
  // Entities are decoded before this runs; match en-dash, em-dash, and hyphen.
  const priceRangeRe = /\$([\d,]+)[–—-]([\d,]+)/g;
  let pm;
  while ((pm = priceRangeRe.exec(raw)) !== null) {
    if (inComment(raw, noComment, pm.index)) continue;
    const li = lineOf(raw, pm.index);
    if (inRanges(li, genR)) continue;
    const normalised = `${pm[1]}–${pm[2]}`;
    if (!VALID_RANGES.has(normalised)) {
      fail(relPath, li + 1, lines[li],
        `Rule 2 FIGURE DRIFT [price range]: page="${pm[0]}", not in canonical set (${[...VALID_RANGES].join(' or ')})`);
    }
  }

  // 2d. Monthly fee: "From $N,NNN" or "from $N,NNN" — canonical is $2,000.
  const monthlyFeeRe = /[Ff]rom\s+\$([\d,]+)\b/g;
  let mfm;
  while ((mfm = monthlyFeeRe.exec(raw)) !== null) {
    if (inComment(raw, noComment, mfm.index)) continue;
    const li = lineOf(raw, mfm.index);
    if (inRanges(li, genR)) continue;
    if (mfm[1].replace(/,/g, '') !== '2000') {
      fail(relPath, li + 1, lines[li],
        `Rule 2 FIGURE DRIFT [monthly fee]: page="${mfm[0]}", canonical="From $2,000"`);
    }
  }

  // 2e. Audit/build duration strings.
  const DURATION_RE = [
    { re: /(\d+)[–—-](\d+)\s+weeks?\b/gi, check: (a, b) => a === '2' && b === '3', canonical: '2–3 weeks', label: 'audit duration' },
  ];
  for (const chk of DURATION_RE) {
    chk.re.lastIndex = 0;
    let m;
    while ((m = chk.re.exec(raw)) !== null) {
      if (inComment(raw, noComment, m.index)) continue;
      const li = lineOf(raw, m.index);
      if (inRanges(li, genR)) continue;
      if (!chk.check(m[1], m[2])) {
        fail(relPath, li + 1, lines[li],
          `Rule 2 FIGURE DRIFT [${chk.label}]: page="${m[0].trim()}", canonical="${chk.canonical}"`);
      }
    }
  }

  // ── Rule 3: STATUS DRIFT ───────────────────────────────────────────────────
  checkStatusPresence(WORKFLOW_MAP,       relPath, rawDisk, lines, decodedLines, noCommentLines, genR);
  checkStatusPresence(PRODUCT_STATUS_MAP, relPath, rawDisk, lines, decodedLines, noCommentLines, genR);

  // ── Rule 4: DEAD LINKS ─────────────────────────────────────────────────────
  for (let i = 0; i < lines.length; i++) {
    if (/href="#"/.test(lines[i])) {
      fail(relPath, i + 1, lines[i], 'Rule 4 DEAD LINK: href="#"');
    }
  }

  // ── Rule 5: RAW HEX ────────────────────────────────────────────────────────
  // #rrggbb (6-char) outside comments, outside exemption blocks, outside generator blocks.
  const hexRe = /#([0-9a-fA-F]{6})\b/g;
  let hm;
  while ((hm = hexRe.exec(raw)) !== null) {
    if (inComment(raw, noComment, hm.index)) continue;
    const li = lineOf(raw, hm.index);
    if (inRanges(li, genR)) continue;
    if (inRanges(li, exR)) continue;
    fail(relPath, li + 1, lines[li], `Rule 5 RAW HEX: "${hm[0]}"`);
  }

  // ── Rule 6: FIRST PERSON ───────────────────────────────────────────────────
  if (!isAbout) {
    const fpRe = /\b(I|me|my|mine)\b/gi;
    let fm;
    while ((fm = fpRe.exec(noCSS)) !== null) {
      const li = lineOf(noCSS, fm.index);
      if (inRanges(li, genR)) continue;
      // Exempt the credential/origin paragraph on services.html and the proof band on index.html.
      if (isServices && /Construction Supervisor|\$50 million contractor|Fidelity|Jabra|Optimizely/i.test(lines[li])) continue;
      if (relPath === 'index.html' && /Justin Yurasits|grew out of|Read my story/i.test(lines[li])) continue;
      fail(relPath, li + 1, lines[li], `Rule 6 FIRST PERSON: "${fm[0]}"`);
    }
  }

  // ── Rule 7: PROHIBITIONS ───────────────────────────────────────────────────
  // text-transform:uppercase is allowed inside <style> blocks only when the
  // containing CSS rule's selector is in UPPERCASE_CSS_SELECTOR_ALLOWLIST;
  // it is always flagged in inline style="" attributes and page content.
  // Monospace font-family has no allowlist — flagged everywhere.
  // → and · are flagged anywhere in page content.
  const PROHIBITIONS = [
    {
      re: /text-transform\s*:\s*uppercase/gi,
      label: 'text-transform:uppercase',
      src: raw,
      checkFn: (m) => {
        for (const block of styleBlocks) {
          if (m.index >= block.start && m.index < block.start + block.content.length) {
            return !isCssUppercaseAllowed(block.content, m.index - block.start);
          }
        }
        return true; // inline style="" or content — always flag
      },
    },
    { re: /font-family\s*:[^;]*(?:monospace|Courier|Consolas|Monaco|Menlo|Lucida Console|Liberation Mono|DejaVu)/gi, label: 'monospace font-family', src: raw },
    { re: /→/g, label: '→ right arrow (entity or literal)', src: raw },
    { re: /·/g, label: '· middle dot (entity or literal)',  src: raw },
  ];
  for (const { re, label, src, checkFn } of PROHIBITIONS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) !== null) {
      if (inComment(raw, noComment, m.index)) continue;
      const li = lineOf(raw, m.index);
      if (inRanges(li, genR)) continue;
      if (inRanges(li, exR)) continue;
      if (checkFn && !checkFn(m)) continue;
      fail(relPath, li + 1, lines[li], `Rule 7 PROHIBITION: ${label}`);
    }
  }

  // ── Rule 8: INTERNAL LINKS ─────────────────────────────────────────────────
  const intLinkRe = /href="(\/[^"#?][^"]*)"/g;
  let lm;
  while ((lm = intLinkRe.exec(raw)) !== null) {
    const href   = lm[1];
    const li     = lineOf(raw, lm.index);
    // Strip query string and fragment before resolving to a file path.
    const clean  = href.split('?')[0].split('#')[0];
    const target = clean === '/' ? 'index.html' : clean.replace(/^\//, '');
    if (!fs.existsSync(path.join(REPO, target))) {
      fail(relPath, li + 1, lines[li], `Rule 8 BROKEN LINK: "${href}" → ${target} not found`);
    }
  }
}

// ── Output ───────────────────────────────────────────────────────────────────

if (failures.length === 0) {
  console.log(`✓  Clean — ${HTML_FILES.length} files, 0 failures`);
  process.exit(0);
}

const byRule = {};
for (const f of failures) {
  const key = f.rule.match(/^Rule \d+[^:]+/)?.[0] ?? f.rule;
  byRule[key] = (byRule[key] || 0) + 1;
}

for (const f of failures) {
  console.log(`\n${f.file}:${f.line}`);
  console.log(`  ${f.rule}`);
  console.log(`  ${f.text}`);
}

console.log('\n── Summary ─────────────────────────────────');
console.log(`Files checked : ${HTML_FILES.length}`);
for (const [rule, count] of Object.entries(byRule)) {
  console.log(`  ${rule}: ${count}`);
}
console.log(`Total failures: ${failures.length}`);
process.exit(1);
