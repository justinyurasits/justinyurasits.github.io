// Serve a built throwaway site and open it in the installed Chrome (playwright-core, no
// browser download), for checks that need real layout: what's visible without scrolling.
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

export async function serve(site) {
  const port = 4900 + Math.floor(Math.random() * 400);
  const proc = spawn('npx', ['astro', 'preview', '--port', String(port)], { cwd: site.dir, detached: true, env: { ...process.env, FORCE_COLOR: '0' } });
  await new Promise((ok, fail) => {
    const t = setTimeout(() => fail(new Error('preview server did not start')), 60000);
    const seen = (d) => { if (/localhost:\d+/.test(String(d))) { clearTimeout(t); ok(); } };
    proc.stdout.on('data', seen); proc.stderr.on('data', seen);
  });
  return {
    url: (path) => `http://localhost:${port}${path}`,
    stop() { try { process.kill(-proc.pid, 'SIGTERM'); } catch {} proc.stdout.destroy(); proc.stderr.destroy(); },
  };
}

export const launch = () => chromium.launch({ channel: 'chrome', headless: true });

// The two widths the spec checks at (§5), with a common screen height for each.
export const VIEWPORTS = [
  { name: '375px', width: 375, height: 667 },
  { name: '1280px', width: 1280, height: 800 },
];
