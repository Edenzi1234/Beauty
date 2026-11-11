import json, re
from PIL import ImageFont
exec(open('make_ass.py').read().split("def ts")[0])   # reuse W, fixes, PINK, groups
def ts(x):
    m=int(x//60); s=x%60; return f"0:{m:02d}:{s:05.2f}"
K=0.68; FS=100; Y=1330; MAXW=940
WHITE='&H00FFFFFF&'; PINKC='&H00A85AFF&'
font=ImageFont.truetype('fonts/EdenHeebo.ttf',100)
def width(t,fs): return font.getlength(t)*K*fs/100
ev=[]
for gi,g in enumerate(groups):
    words=[W[i] for i in g]
    gend = W[groups[gi+1][0]]['s'] if gi+1<len(groups) else words[-1]['e']+0.6
    gend = min(gend, words[-1]['e']+0.6)
    fs=FS
    sp=lambda fs: font.getlength(' ')*K*fs/100*1.15
    tot=lambda fs: sum(width(w['t'],fs) for w in words)+sp(fs)*(len(words)-1)
    while tot(fs)>MAXW: fs-=4
    T=tot(fs)
    # Hebrew line: first word on the right. Latin brand words keep LTR order among themselves.
    order=list(range(len(words)))
    latin=[k for k,w in enumerate(words) if re.match(r'[A-Z]',w['t'])]
    x=540+T/2  # right edge
    pos={}
    # place right-to-left, but a run of Latin words is laid out left-to-right within its slot
    k=0
    while k<len(words):
        if k in latin:
            run=[k]
            while run[-1]+1 in latin: run.append(run[-1]+1)
            rw=sum(width(words[j]['t'],fs) for j in run)+sp(fs)*(len(run)-1)
            left=x-rw; cx=left
            for j in run:
                w_=width(words[j]['t'],fs); pos[j]=cx+w_/2; cx+=w_+sp(fs)
            x=left-sp(fs); k=run[-1]+1
        else:
            w_=width(words[k]['t'],fs); pos[k]=x-w_/2; x-=w_+sp(fs); k+=1
    for k,w in enumerate(words):
        col=PINKC if w['t'] in PINK else WHITE
        w_=width(w['t'],fs); peak=int(100+min(24, 100*1.6*sp(fs)/w_))
        pop=r'\fscx40\fscy40\t(0,110,\fscx%d\fscy%d)\t(110,220,\fscx100\fscy100)'%(peak,peak)
        ev.append(f"Dialogue: 1,{ts(w['s'])},{ts(gend)},Pop,,0,0,0,,{{\\an5\\pos({pos[k]:.0f},{Y})\\fs{fs}\\c{col}{pop}}}{w['t']}")
hdr=open('subs.ass').read().split('[Events]')[0].replace('Style: Pop,EdenHeebo,92','Style: Pop,EdenHeebo,100')
open('subs2.ass','w').write(hdr+"[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n"+'\n'.join(ev)+'\n')
print(len(ev),'events')
