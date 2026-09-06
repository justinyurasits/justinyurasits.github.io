#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8')
);

const { email, calLink } = manifest;

// Accept specific paths as argv, or process all pages in manifest
const targetPaths = process.argv.slice(2);
const pages = targetPaths.length
  ? manifest.pages.filter(p => targetPaths.includes(p.path))
  : manifest.pages;

// ─── Header ─────────────────────────────────────────────────────────────────

function productItem(href, marker, name, key, activeProduct) {
  const cur = activeProduct === key ? ' aria-current="page"' : '';
  return `            <a class="cos-nav__item" href="${href}"${cur}>
              <span class="cos-nav__marker">${marker}</span><span class="cos-nav__name">${name}</span>
            </a>`;
}

function buildHeader(active, activeProduct) {
  const triggerCur = active === 'products' ? ' is-current' : '';

  function navA(href, label, key) {
    const cur = active === key ? ' aria-current="page"' : '';
    return `        <li><a href="${href}"${cur}>${label}</a></li>`;
  }

  return `<header class="cos-header" id="cos-header">
  <div class="cos-container">
    <div class="cos-header__inner">
      <a class="cos-logo" href="/">
        <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true">
          <polyline points="14,56 14,14 56,14" fill="none" stroke="currentColor" stroke-width="13"/>
          <polyline points="86,44 86,86 44,86" fill="none" stroke="currentColor" stroke-width="13"/>
          <rect x="32" y="32" width="36" height="36" fill="#C43230"/>
        </svg>
        Construction OS
      </a>
      <button class="cos-header__toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="main-nav">Menu</button>
      <ul class="cos-nav" id="main-nav" role="list">
${navA('/work.html', 'Work', 'work')}
        <li class="cos-nav__dropdown">
          <button class="cos-nav__trigger${triggerCur}" aria-expanded="false" aria-haspopup="true" aria-controls="products-panel">Products</button>
          <nav class="cos-nav__panel" id="products-panel">
            <span class="cos-nav__group-label">Core Products</span>
${productItem('/products/document-workbench.html', '01', 'Document Workbench', 'document-workbench', activeProduct)}
${productItem('/products/construction-intelligence.html', '02', 'Construction Intelligence', 'construction-intelligence', activeProduct)}
${productItem('/products/project-intelligence.html', '03', 'Project Intelligence', 'project-intelligence', activeProduct)}
            <span class="cos-nav__group-label">Extension Layer</span>
${productItem('/products/operations-automation.html', '——', 'Operations Automation', 'operations-automation', activeProduct)}
${productItem('/products/custom-solutions.html', '——', 'Custom Solutions', 'custom-solutions', activeProduct)}
          </nav>
        </li>
${navA('/services.html', 'Services', 'services')}
${navA('/about.html', 'About', 'about')}
        <li><a class="cos-header__cta" href="${calLink}">Book a demo</a></li>
      </ul>
    </div>
  </div>
</header>`;
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function footerItem(href, marker, name, current) {
  const isCur = current === href.replace(/^\/products\//, '').replace(/\.html$/, '');
  const cls = isCur ? ' cos-footer__col-item cos-footer__col-item--ink' : ' cos-footer__col-item';
  const markerCls = marker === '——' ? 'cos-footer__col-dash' : 'cos-footer__col-n';
  if (isCur) {
    // Current page — plain text, no link
    return `        <span class="cos-footer__col-item cos-footer__col-item--ink">
          <span class="${markerCls}">${marker}</span>${name}
        </span>`;
  }
  return `        <a class="cos-footer__col-item" href="${href}">
          <span class="${markerCls}">${marker}</span>${name}
        </a>`;
}

function buildFooter(footerConfig) {
  const { current, page, issued, rev, status } = footerConfig;

  return `<footer class="cos-footer">
  <div class="cos-footer__inner cos-container">
    <div class="cos-footer__cols">

      <!-- Identity -->
      <div class="cos-footer__brand">
        <a class="cos-footer__lockup" href="/">
          <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true" style="color:#111111;flex:none">
            <polyline points="14,56 14,14 56,14" fill="none" stroke="currentColor" stroke-width="13"/>
            <polyline points="86,44 86,86 44,86" fill="none" stroke="currentColor" stroke-width="13"/>
            <rect x="32" y="32" width="36" height="36" fill="#C43230"/>
          </svg>
          Construction OS
        </a>
        <p class="cos-footer__tagline">Three products. One construction operating system.</p>
        <a class="cos-footer__cta-link" href="${calLink}">Book a demo</a>
      </div>

      <!-- Products -->
      <div class="cos-footer__col">
        <span class="cos-footer__col-head">Products</span>
${footerItem('/products/document-workbench.html', '01', 'Document Workbench', current)}
${footerItem('/products/construction-intelligence.html', '02', 'Construction Intelligence', current)}
${footerItem('/products/project-intelligence.html', '03', 'Project Intelligence', current)}
${footerItem('/products/operations-automation.html', '——', 'Operations Automation', current)}
${footerItem('/products/custom-solutions.html', '——', 'Custom Solutions', current)}
      </div>

      <!-- Company -->
      <div class="cos-footer__col">
        <span class="cos-footer__col-head">Company</span>
        <a class="cos-footer__col-item" href="/work.html">Work</a>
        <a class="cos-footer__col-item" href="/services.html">Services</a>
        <a class="cos-footer__col-item" href="/about.html">About</a>
      </div>

      <!-- Contact -->
      <div class="cos-footer__col">
        <span class="cos-footer__col-head">Talk to us</span>
        <a class="cos-footer__contact-email" href="mailto:${email}">${email}</a>
        <a class="cos-footer__col-item" href="tel:8572481365">857-248-1365</a>
        <a class="cos-footer__col-item" href="https://linkedin.com/in/justinyurasits">LinkedIn</a>
      </div>

    </div>

    <!-- Title block -->
    <div class="cos-titleblock">
      <div class="cos-titleblock__cell">
        <span class="cos-titleblock__label">Sheet</span>
        <span class="cos-titleblock__value">CONSTRUCTION OS</span>
      </div>
      <div class="cos-titleblock__cell">
        <span class="cos-titleblock__label">Page</span>
        <span class="cos-titleblock__value">${page.toUpperCase()}</span>
      </div>
      <div class="cos-titleblock__cell">
        <span class="cos-titleblock__label">Issued</span>
        <span class="cos-titleblock__value">${issued}</span>
      </div>
      <div class="cos-titleblock__cell">
        <span class="cos-titleblock__label">Rev</span>
        <span class="cos-titleblock__value">${rev}</span>
      </div>
      <div class="cos-titleblock__cell">
        <span class="cos-titleblock__label">Status</span>
        <span class="cos-titleblock__value">${status.toUpperCase()}</span>
      </div>
    </div>

    <!-- Legal -->
    <div class="cos-footer__legal">
      <span>&copy; 2026 Construction OS</span>
      <span>
        <a href="/privacy.html" class="cos-footer__legal-link">Privacy Policy</a>
        &nbsp;&middot;&nbsp;
        <a href="/terms.html" class="cos-footer__legal-link">Terms</a>
      </span>
    </div>
  </div>
</footer>`;
}

// ─── Process file ────────────────────────────────────────────────────────────

function processFile(pagePath, pageConfig) {
  const absPath = path.resolve(__dirname, '..', pagePath);

  if (!fs.existsSync(absPath)) {
    console.warn(`  SKIP (not found): ${pagePath}`);
    return;
  }

  let html = fs.readFileSync(absPath, 'utf8');
  let changed = false;

  const headerStart = '<!-- header:start -->';
  const headerEnd   = '<!-- header:end -->';
  const hsi = html.indexOf(headerStart);
  const hei = html.indexOf(headerEnd);

  if (hsi === -1 || hei === -1) {
    console.warn(`  SKIP header (no markers): ${pagePath}`);
  } else {
    const generated = '\n' + buildHeader(pageConfig.active, pageConfig.activeProduct) + '\n';
    html = html.slice(0, hsi + headerStart.length) + generated + html.slice(hei);
    changed = true;
    console.log(`  header OK: ${pagePath}`);
  }

  const footerStart = '<!-- footer:start -->';
  const footerEnd   = '<!-- footer:end -->';
  const fsi = html.indexOf(footerStart);
  const fei = html.indexOf(footerEnd);

  if (fsi === -1 || fei === -1) {
    console.warn(`  SKIP footer (no markers): ${pagePath}`);
  } else {
    const generated = '\n' + buildFooter(pageConfig.footer) + '\n';
    html = html.slice(0, fsi + footerStart.length) + generated + html.slice(fei);
    changed = true;
    console.log(`  footer OK: ${pagePath}`);
  }

  if (changed) {
    fs.writeFileSync(absPath, html, 'utf8');
    console.log(`  wrote:     ${pagePath}`);
  }
}

console.log(`generate-header.js — processing ${pages.length} page(s)`);
for (const page of pages) {
  processFile(page.path, page);
}
console.log('Done.');
