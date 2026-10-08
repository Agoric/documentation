// Validates every external (http/https) link cited from main/**/*.md.
// For each link, follows redirects manually so a *permanent* redirect
// (301/308) can be reported (and, with --fix, rewritten to its final
// destination) separately from a transient one (302/303/307), and so a
// 404/500 at any hop is attributed to the link that produced it.
//
// Usage:
//   node scripts/checkExternalLinks.mjs            # report only
//   node scripts/checkExternalLinks.mjs --fix       # rewrite permanent redirects in place
//   node scripts/checkExternalLinks.mjs --fix --fail-on-broken

import fs from 'fs';
import path from 'path';
import util from 'util';
import { fileURLToPath } from 'url';
import glob from 'glob';

const globPromise = util.promisify(glob);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, '..');

const args = process.argv.slice(2);
const fix = args.includes('--fix');
const failOnBroken = args.includes('--fail-on-broken');

const MAX_REDIRECTS = 10;
const TIMEOUT_MS = 15_000;
const CONCURRENCY = 8;
const NETWORK_RETRIES = 2;
const PERMANENT_REDIRECT_STATUSES = new Set([301, 308]);
// Some sites (npmjs.com, medium.com, several news/blog CDNs) answer a
// scripted client with 401/403/429 regardless of method or UA, even though
// the page is reachable in a browser. Retrying as a GET with a browser-like
// UA resolves the HEAD-specific cases (e.g. GitHub's asset CDN); a link that
// still gets one of these after that is reported separately as "blocked"
// (inconclusive) rather than "broken", so bot-walls don't masquerade as dead
// links and fail CI.
const BOT_WALL_STATUSES = new Set([401, 403, 429]);
const BROWSER_USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const LINK_RE = /\]\((https?:\/\/[^)\s]+)\)/g;

const mdFiles = await globPromise(path.join(repoRoot, 'main/**/*.md'));

// path -> Set of raw link strings found in that file, in order of appearance
const linksByFile = new Map();
for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const found = new Set();
  for (const match of content.matchAll(LINK_RE)) {
    found.add(match[1]);
  }
  if (found.size > 0) linksByFile.set(file, found);
}

const allLinks = new Set();
for (const links of linksByFile.values()) {
  for (const link of links) allLinks.add(link);
}

const withTimeout = async (url, options) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: { 'User-Agent': BROWSER_USER_AGENT, ...options.headers },
    });
  } finally {
    clearTimeout(timer);
  }
};

const fetchWithRetries = async (url, options) => {
  let lastErr;
  for (let attempt = 0; attempt <= NETWORK_RETRIES; attempt += 1) {
    try {
      return await withTimeout(url, options);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
};

// Resolves one link by following redirects manually. Returns:
//   { link, finalUrl, finalStatus, hadPermanentRedirect, error }
const resolveLink = async link => {
  let current = link;
  let hadPermanentRedirect = false;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    let response;
    try {
      // HEAD first (cheaper); fall back to GET when a server rejects HEAD
      // outright (405/501) or answers with a bot-wall status that a real GET
      // sometimes clears (observed on GitHub's asset CDN).
      response = await fetchWithRetries(current, { method: 'HEAD', redirect: 'manual' });
      if (response.status === 405 || response.status === 501 || BOT_WALL_STATUSES.has(response.status)) {
        response = await fetchWithRetries(current, { method: 'GET', redirect: 'manual' });
      }
    } catch (err) {
      return { link, finalUrl: current, finalStatus: null, hadPermanentRedirect, error: err.message };
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) {
        return { link, finalUrl: current, finalStatus: response.status, hadPermanentRedirect, error: null };
      }
      if (PERMANENT_REDIRECT_STATUSES.has(response.status)) hadPermanentRedirect = true;
      current = new URL(location, current).toString();
      continue;
    }

    return { link, finalUrl: current, finalStatus: response.status, hadPermanentRedirect, error: null };
  }
  return { link, finalUrl: current, finalStatus: null, hadPermanentRedirect, error: 'too many redirects' };
};

const runPool = async (items, worker, concurrency) => {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) {
      const i = next;
      next += 1;
      results[i] = await worker(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
};

const links = [...allLinks];
console.log(`Checking ${links.length} external link(s) from ${linksByFile.size} file(s)...`);
const results = await runPool(links, resolveLink, CONCURRENCY);
const byLink = new Map(results.map(r => [r.link, r]));

const blocked = results.filter(r => !r.error && BOT_WALL_STATUSES.has(r.finalStatus));
const broken = results.filter(
  r => (r.error || (r.finalStatus && r.finalStatus >= 400)) && !BOT_WALL_STATUSES.has(r.finalStatus),
);
const permanentRedirects = results.filter(r => r.hadPermanentRedirect && r.finalUrl !== r.link && !r.error);

if (permanentRedirects.length > 0) {
  console.log(`\nPermanent redirects (${permanentRedirects.length}):`);
  for (const r of permanentRedirects) {
    console.log(`  ${r.link}\n    -> ${r.finalUrl} (${r.finalStatus})`);
  }
}

if (broken.length > 0) {
  console.log(`\nBroken links (${broken.length}):`);
  for (const r of broken) {
    console.log(`  ${r.link} -> ${r.error ?? r.finalStatus}`);
  }
}

if (blocked.length > 0) {
  console.log(
    `\nBlocked by the remote site, not confirmed broken (${blocked.length}) — these answered ` +
      'with a bot-wall status (401/403/429) to both HEAD and GET; check manually:',
  );
  for (const r of blocked) {
    console.log(`  ${r.link} -> ${r.finalStatus}`);
  }
}

if (fix && permanentRedirects.length > 0) {
  const rewriteMap = new Map(permanentRedirects.map(r => [r.link, r.finalUrl]));
  let filesChanged = 0;
  for (const [file, links2] of linksByFile) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const link of links2) {
      const target = rewriteMap.get(link);
      if (!target) continue;
      const escaped = link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const before = content;
      content = content.replace(new RegExp(`\\]\\(${escaped}\\)`, 'g'), `](${target})`);
      if (content !== before) changed = true;
    }
    if (changed) {
      fs.writeFileSync(file, content);
      filesChanged += 1;
    }
  }
  console.log(`\nRewrote permanent redirects in ${filesChanged} file(s).`);
}

if (broken.length > 0 && failOnBroken) {
  process.exitCode = 1;
}

if (broken.length === 0 && permanentRedirects.length === 0) {
  console.log('\nAll external links resolve cleanly (200, no permanent redirects).');
}
