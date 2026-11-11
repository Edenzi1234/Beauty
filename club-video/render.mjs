// Renders the EDEN BEAUTY CLUB explainer to MP4.
//   node render.mjs                      → both formats, with the "pre-launch preview" tag
//   node render.mjs --final              → without the tag (only once the club is verified live)
//   node render.mjs --voice voice.mp3    → mixes a voice-over (and --music music.mp3) into the MP4
//   node render.mjs --only vertical      → one format
// Frames are captured from index.html by seeking its GSAP timeline, piped into ffmpeg (H.264, yuv420p, +faststart).
import { createRequire } from 'module';
import { spawn } from 'child_process';
import { mkdirSync } from 'fs';
import { pathToFileURL } from 'url';
const { chromium } = createRequire(import.meta.url)('playwright');

const args = process.argv.slice(2);
const opt = n => { const i = args.indexOf('--' + n); return i < 0 ? null : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true); };
const FPS = 30, final = !!opt('final'), voice = opt('voice'), music = opt('music'), only = opt('only');
const formats = [
  { name: 'vertical', file: 'eden-beauty-club-9x16', width: 1080, height: 1920 },
  { name: 'landscape', file: 'eden-beauty-club-16x9', width: 1920, height: 1080 },
].filter(f => !only || f.name === only);
mkdirSync('out', { recursive: true });

const browser = await chromium.launch();
for (const f of formats) {
  const page = await browser.newPage({ viewport: { width: f.width, height: f.height } });
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.goto(pathToFileURL(process.cwd() + '/index.html').href + `?format=${f.name}${final ? '' : '&preview=1'}`);
  await page.evaluate(() => window.__ready);
  const duration = await page.evaluate(() => window.__duration);
  const frames = Math.round(duration * FPS);
  const out = `out/${f.file}${final ? '' : '-preview'}.mp4`;

  const inputs = ['-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-'];
  const audio = [];
  if (voice || music) {
    if (voice) inputs.push('-i', voice);
    if (music) inputs.push('-i', music);
    const v = voice ? '[1:a]volume=1.0[va]' : null;
    const m = music ? `[${voice ? 2 : 1}:a]volume=0.25,afade=t=out:st=${duration - 2}:d=2[ma]` : null;
    const mix = voice && music ? ';[va][ma]amix=inputs=2:duration=first[a]' : '';
    audio.push('-filter_complex', [v, m].filter(Boolean).join(';') + mix, '-map', '0:v', '-map', voice && music ? '[a]' : (voice ? '[va]' : '[ma]'));
  } else {
    inputs.push('-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo'); // silent track: some platforms expect audio
    audio.push('-map', '0:v', '-map', '1:a');
  }
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, ...audio,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '192k', '-t', String(duration), '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = 0; i < frames; i++) {
    await page.evaluate(t => window.__seek(t), i / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(`${f.name}: ${i}/${frames}`);
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on('close', c => (c ? rej(new Error('ffmpeg ' + c)) : res())));
  console.log('✓', out);
  await page.close();
}
await browser.close();
