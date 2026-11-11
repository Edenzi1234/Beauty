// node render.mjs [--len 15|10] [--stills t1,t2,...] [--logo img/logo.png] [--music file.mp3]
import { createRequire } from 'module';
import { spawn } from 'child_process';
import { mkdirSync } from 'fs';
import { pathToFileURL } from 'url';
const { chromium } = createRequire(import.meta.url)('playwright');
const a = process.argv.slice(2), opt = n => { const i = a.indexOf('--' + n); return i < 0 ? null : a[i + 1]; };
const LEN = '17', stills = opt('stills'), logo = opt('logo'), music = opt('music'), FPS = 30;
mkdirSync('out', { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('pageerror', e => console.error('page error:', e.message));
await p.goto(pathToFileURL(process.cwd() + '/index.html').href + (logo ? `?logo=${logo}` : ''));
await p.evaluate(() => window.__ready);
if (stills) {
  for (const t of stills.split(',')) { await p.evaluate(t => window.__seek(+t), t); await p.screenshot({ path: `out/still-${LEN}-${t}.png` }); }
} else {
  const dur = await p.evaluate(() => window.__duration), n = Math.round(dur * FPS), out = `out/eden-course-practice-17s-1080x1920.mp4`;
  const audio = music ? ['-i', music, '-map', '0:v', '-map', '1:a', '-af', `afade=t=out:st=${dur - 1.5}:d=1.5`]
                      : ['-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-map', '0:v', '-map', '1:a'];
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', ...audio,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-r', String(FPS),
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
    '-c:a', 'aac', '-b:a', '192k', '-t', String(dur), '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => window.__seek(t), i / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 96 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise((r, j) => ff.on('close', c => (c ? j(new Error('ffmpeg ' + c)) : r())));
  console.log('✓', out);
}
await b.close();
