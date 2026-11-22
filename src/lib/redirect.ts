// A redirect page (JYC-CAP-09). GitHub Pages can't send a 301, so an old address serves a
// page that refreshes to the new one and names it as canonical (site/design.md).
export function redirectPage(to: string, site: URL) {
  const href = new URL(to, site).href;
  const canonical = href.split('#')[0];
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${canonical}">
<meta http-equiv="refresh" content="0; url=${to}">
</head>
<body>
<p>This page has moved to <a href="${to}">${href}</a>.</p>
</body>
</html>
`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
