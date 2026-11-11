import json
W=json.load(open('words.json'))
# merge Whisper's split "וג" + "'לים"
i=next(k for k,w in enumerate(W) if w['w']=='וג'); W[i]={'w':"וג'לים",'s':W[i]['s'],'e':W[i+1]['e']}; del W[i+1]
fix={'הקולקציית':'הקולקציה','בובה,':'BUBA','אדן':'EDEN','ביוטי':'BEAUTY','שופ.':'SHOP',"וג'לים":'וג׳לים'}
for w in W:
    t=fix.get(w['w'],w['w']); w['t']=t.strip(',.') if t!='מחכה?' else 'מחכה?'
PINK={'מניקוריסטית','חייבת','הקולקציה','החדשה','BUBA','בייסים','וג׳לים','שווים','מחכה?','לשדרג','הקולקציות','החדשות','עכשיו','EDEN','BEAUTY','SHOP'}
groups=[[0,1,2],[3,4,5],[6,7,8],[9,10],[11,12,13],[14,15,16,17],[18,19,20,21],[22,23,24],[25,26,27,28],[29,30,31],[32,33,34],[35,36,37,38]]
assert sum(len(g) for g in groups)==len(W),(len(W))
def ts(x):
    h=int(x//3600); m=int(x%3600//60); s=x%60; return f"{h}:{m:02d}:{s:05.2f}"
WHITE='&H00FFFFFF&'; PINKC='&H00A85AFF&'   # #FF5AA8
POP=r'\fscx45\fscy45\t(0,110,\fscx122\fscy122)\t(110,210,\fscx100\fscy100)'
ev=[]
for gi,g in enumerate(groups):
    gend = W[groups[gi+1][0]]['s'] if gi+1<len(groups) else W[g[-1]]['e']+0.6
    gend = min(gend, W[g[-1]]['e']+0.6)
    for k,wi in enumerate(g):
        st=W[wi]['s']; en = W[g[k+1]]['s'] if k+1<len(g) else gend
        parts=[]
        for j,wj in enumerate(g):
            col = PINKC if W[wj]['t'] in PINK else WHITE
            if j<k:   parts.append(r'{\alpha&H00&\c'+col+r'\fscx100\fscy100}'+W[wj]['t'])
            elif j==k:parts.append(r'{\alpha&H00&\c'+col+POP+'}'+W[wj]['t'])
            else:     parts.append(r'{\alpha&HFF&\fscx100\fscy100}'+W[wj]['t'])
        ev.append(f"Dialogue: 0,{ts(st)},{ts(en)},Pop,,0,0,0,,"+' '.join(parts))
hdr="""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Pop,EdenHeebo,92,&H00FFFFFF,&H00FFFFFF,&H00140814,&H96000000,0,0,0,0,100,100,0,0,1,7,4,2,60,60,560,177

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
open('subs.ass','w').write(hdr+'\n'.join(ev)+'\n')
for g in groups: print(f"{W[g[0]]['s']:5.2f}  "+' '.join(W[i]['t'] for i in g))
