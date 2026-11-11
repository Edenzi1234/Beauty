# כתוביות אוטומטיות בעברית לסרטוני TikTok / Instagram (כלים חינמיים)

1. תמלול עם Whisper (מודל עברי חינמי של ivrit.ai, faster-whisper), כולל זמן לכל מילה → `words.json`
2. `make_ass2.py` – יוצר `subs2.ass`: כל מילה ממוקמת בנפרד מימין לשמאל, Pop/Bounce, מילים חשובות בוורוד (רשימת PINK)
3. FFmpeg – המרת HDR (HLG) ל־SDR + צריבת הכתוביות → MP4 1080×1920

```bash
pip install faster-whisper fonttools brotli
```

```bash
ffmpeg -i input.mov -vf "zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,ass=subs2.ass:fontsdir=." -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -c:a aac -b:a 256k -movflags +faststart output.mp4
```

תיקונים לתמלול ומילים בוורוד: המילון `fix` והרשימה `PINK` ב־`make_ass.py`. חלוקה לשורות: `groups`.
