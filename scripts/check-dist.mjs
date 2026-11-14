// Fails the build if the output would shadow the legal project sites or ships formal Portuguese.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const fail = (m) => { console.error('check-dist: ' + m); process.exit(1); };
for (const p of ['fruidoku-legal', 'formly-legal']) if (existsSync(join(dist, p))) fail(`dist/${p} must not exist (it belongs to its own repo)`);
for (const f of ['app-ads.txt', 'en/index.html', 'pt/index.html', '404.html', 'robots.txt']) if (!existsSync(join(dist, f))) fail(`missing dist/${f}`);
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk(join(dist, 'pt')).filter((f) => f.endsWith('.html'))) {
  const s = readFileSync(f, 'utf8');
  if (/voc[eê]\b/i.test(s)) fail(`formal "você" found in ${f}`);
  if (!s.includes('lang="pt-PT"')) fail(`missing lang="pt-PT" in ${f}`);
}
for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
  const m = readFileSync(f, 'utf8').match(/property="og:image" content="([^"]+)"/);
  if (m && !existsSync(join(dist, new URL(m[1]).pathname))) fail(`og:image ${m[1]} missing (run scripts/build-og.py) for ${f}`);
}
console.log('check-dist: ok');
