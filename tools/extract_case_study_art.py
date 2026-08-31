#!/usr/bin/env python3
"""Pull the vector line art out of a Figma PDF export as standalone SVGs.

    python3 tools/extract_case_study_art.py "TCTD CASE STUDY.pdf" out/ regions.json

`regions.json` is {name: [x0, y0, x1, y1]} in PDF page coordinates (y up from
the bottom-left). Every filled path that falls entirely inside a region is
collected into one SVG, trimmed to the art's real bounding box, with the
artwork's own fill colours preserved.

Why it is written this way — see DESIGN.md §11b:

  * The icons are NOT one XObject each. A page-level `/X7 Do` reaches a form
    whose *own* /Resources define another `/X1`, so resolving names against the
    page's XObject map draws the wrong art every time. Resource scope is per
    form, and the walker passes it down.
  * Nothing is stroked. Figma outlines every stroke, so `S` never appears and
    the whole page is `f` fills. Do not look for stroke ops.
  * Text is skipped by ignoring anything between BT/ET, so a region that
    overlaps a caption still yields just the icon.
  * A region is matched by containment, not intersection, so a box may overlap
    neighbouring art without dragging it in.
"""
import re, zlib, sys, json, os
PDF=sys.argv[1]; OUT=sys.argv[2]; SPEC=json.load(open(sys.argv[3]))
d=open(PDF,'rb').read()
objs={int(m.group(1)):m.end() for m in re.finditer(rb'(?m)^(\d+) 0 obj', d)}
def body(n):
    s=objs[n]; return d[s:d.find(b'endobj',s)]
def stream(n):
    b=body(n); m=re.search(rb'stream\r?\n', b)
    if not m: return None, b
    dp=b[:m.start()]; raw=b[m.end():]; raw=raw[:raw.rfind(b'endstream')]
    ln=re.search(rb'/Length\s+(\d+)\s+0\s+R', dp)
    if ln:
        n2=int(re.search(rb'(\d+)', body(int(ln.group(1)))).group(1))
        if n2<=len(raw): raw=raw[:n2]
    if b'/FlateDecode' in dp:
        try: raw=zlib.decompress(raw)
        except Exception: raw=zlib.decompressobj().decompress(raw)
    return raw, dp
def xmap_of(dp):
    m=re.search(rb'/XObject\s*<<', dp)
    if not m: return {}
    i=m.end(); dep=1; j=i
    while dep and j<len(dp):
        if dp[j:j+2]==b'<<': dep+=1; j+=2
        elif dp[j:j+2]==b'>>': dep-=1; j+=2
        else: j+=1
    return {k.decode():int(v) for k,v in re.findall(rb'/(\w+)\s+(\d+) 0 R', dp[i:j])}
def mul(a,b):
    return (a[0]*b[0]+a[1]*b[2], a[0]*b[1]+a[1]*b[3],
            a[2]*b[0]+a[3]*b[2], a[2]*b[1]+a[3]*b[3],
            a[4]*b[0]+a[5]*b[2]+b[4], a[4]*b[1]+a[5]*b[3]+b[5])
def ap(m,x,y): return (m[0]*x+m[2]*y+m[4], m[1]*x+m[3]*y+m[5])
NUM=r'[-+]?[\d.]+'
TOK=re.compile((r'(%s)|/([\w.]+)|([A-Za-z\'"*]+)'%NUM).encode())
shapes=[]
def walk(content, ctm, res, depth=0):
    st=[]; stack=[]; cur=ctm; fill='#000000'; path=[]; cp=None; start=None
    intext=False
    for t in TOK.finditer(content):
        num,name,op=t.groups()
        if num is not None: st.append(float(num)); continue
        if name is not None: st.append('/'+name.decode()); continue
        o=op.decode()
        try:
            if o=='q': stack.append((cur,fill))
            elif o=='Q':
                if stack: cur,fill=stack.pop()
            elif o=='cm': cur=mul(tuple(st[-6:]),cur)
            elif o=='BT': intext=True
            elif o=='ET': intext=False
            elif o in ('scn','sc','rg','SCN','SC','RG'):
                v=[x for x in st if isinstance(x,float)][-3:]
                if len(v)==3 and o[0].islower():
                    fill='#%02X%02X%02X'%tuple(max(0,min(255,round(c*255))) for c in v)
            elif o=='g':
                c=max(0,min(255,round(st[-1]*255))); fill='#%02X%02X%02X'%(c,c,c)
            elif o=='m': cp=start=ap(cur,st[-2],st[-1]); path.append(('M',cp))
            elif o=='l': cp=ap(cur,st[-2],st[-1]); path.append(('L',cp))
            elif o=='c':
                a=ap(cur,st[-6],st[-5]); b=ap(cur,st[-4],st[-3]); e=ap(cur,st[-2],st[-1])
                path.append(('C',a,b,e)); cp=e
            elif o=='v':
                b=ap(cur,st[-4],st[-3]); e=ap(cur,st[-2],st[-1]); path.append(('C',cp,b,e)); cp=e
            elif o=='y':
                a=ap(cur,st[-4],st[-3]); e=ap(cur,st[-2],st[-1]); path.append(('C',a,e,e)); cp=e
            elif o=='h': path.append(('Z',)); cp=start
            elif o=='re':
                x,y,w,h=st[-4:]
                pts=[ap(cur,x,y),ap(cur,x+w,y),ap(cur,x+w,y+h),ap(cur,x,y+h)]
                path.append(('M',pts[0]))
                for q in pts[1:]: path.append(('L',q))
                path.append(('Z',)); cp=start=pts[0]
            elif o in ('f','F','f*','b','b*','B','B*'):
                if path and not intext: shapes.append((fill,path,o.endswith('*')))
                path=[]
            elif o in ('n','S','s'): path=[]
            elif o=='Do' and depth<6 and st and isinstance(st[-1],str):
                nm=st[-1][1:]
                if nm in res:
                    c2,dp2=stream(res[nm])
                    if c2 is not None and b'/Image' not in dp2:
                        mm=re.search(rb'/Matrix\s*\[([^\]]*)\]', dp2)
                        m2=tuple(float(x) for x in mm.group(1).split()) if mm else (1,0,0,1,0,0)
                        walk(c2, mul(m2,cur), xmap_of(dp2), depth+1)
        except Exception: pass
        st=[]
page=[n for n in objs if b'/MediaBox' in body(n) and b'/Type /Page' in body(n)][0]
res=xmap_of(body(int(re.search(rb'/Resources\s+(\d+) 0 R', body(page)).group(1))))
content,_=stream(int(re.search(rb'/Contents\s+(\d+) 0 R', body(page)).group(1)))
walk(content,(1,0,0,1,0,0),res)
print(len(shapes),'shapes collected')
def fmt(v): return ('%.2f'%v).rstrip('0').rstrip('.')
os.makedirs(OUT,exist_ok=True)
for name, rect in SPEC.items():
    rx0,ry0,rx1,ry1=rect
    sel=[]
    for fill,p,eo in shapes:
        pts=[q for seg in p for q in seg[1:]]
        if not pts: continue
        xs=[q[0] for q in pts]; ys=[q[1] for q in pts]
        if min(xs)>=rx0 and max(xs)<=rx1 and min(ys)>=ry0 and max(ys)<=ry1:
            sel.append((fill,p,eo,min(xs),max(xs),min(ys),max(ys)))
    if not sel:
        print('EMPTY', name); continue
    x0=min(s[3] for s in sel); x1=max(s[4] for s in sel)
    y0=min(s[5] for s in sel); y1=max(s[6] for s in sel)
    w=x1-x0; h=y1-y0
    out=[]
    for fill,p,eo,_,_,_,_ in sel:
        ds=[]
        for seg in p:
            if seg[0]=='Z': ds.append('Z'); continue
            ds.append(seg[0]+' '.join('%s %s'%(fmt(q[0]-x0),fmt(y1-q[1])) for q in seg[1:]))
        out.append('<path fill="%s"%s d="%s"/>'%(fill,' fill-rule="evenodd"' if eo else '',''.join(ds)))
    svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %s %s">%s</svg>'%(fmt(w),fmt(h),''.join(out))
    open(os.path.join(OUT,name+'.svg'),'w').write(svg)
    print('%-14s %6.1fx%-6.1f %2d paths %6db'%(name,w,h,len(sel),len(svg)))
