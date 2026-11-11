import { createRequire } from 'module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { pathToFileURL } from 'url';
const [fmt = 'vertical', ...times] = process.argv.slice(2);
const size = fmt === 'landscape' ? { width: 1920, height: 1080 } : { width: 1080, height: 1920 };
const b = await chromium.launch();
const p = await b.newPage({ viewport: size });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto(pathToFileURL(process.cwd() + '/index.html').href + `?format=${fmt}&preview=1`);
await p.evaluate(() => window.__ready);
for (const t of times) { await p.evaluate(t => window.__seek(+t), t); await p.screenshot({ path: `/tmp/claude-0/-home-user-Beauty/cc19de9d-9e01-5d3c-a54a-101bce405431/scratchpad/st-${fmt}-${t}.png`, scale: 'css' }); }
await b.close();
