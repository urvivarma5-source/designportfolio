#!/usr/bin/env python3
"""Dump the geometry of a Figma-exported case-study PDF.

    python3 tools/dump_pdf_boxes.py "Guide Pt 1.pdf" out/boxes.json

Companion to extract_case_study.py (which recovers the copy) and
extract_case_study_art.py (which recovers the line art). This one answers
"where is everything?" — the question you have to answer to rebuild a frame at
full fidelity instead of eyeballing it.

It emits three lists, all in PDF page coordinates (y up from the bottom-left):

  fills   every filled path, as {c: colour, b: [x0, y0, x1, y1]}, merged when
          a run of little rectangles is obviously one dashed border
  images  every raster placement, as {n: XObject name, b: rect} — the `cm`
          matrix in force at the `Do`, which is the box Figma laid the image in
  text    nothing; use extract_case_study.py for copy

It shares extract_case_study_art.py's walker and therefore its two traps:
resource scope is per form (a nested form's /Resources shadow the page's), and
anything between BT/ET is skipped so glyph outlines do not drown the layout.
"""
import re, zlib, sys, json, os

PDF = sys.argv[1]
OUT = sys.argv[2]
d = open(PDF, 'rb').read()
objs = {int(m.group(1)): m.end() for m in re.finditer(rb'(?m)^(\d+) 0 obj', d)}


def body(n):
    s = objs[n]
    return d[s:d.find(b'endobj', s)]


def stream(n):
    b = body(n)
    m = re.search(rb'stream\r?\n', b)
    if not m:
        return None, b
    dp = b[:m.start()]
    raw = b[m.end():]
    raw = raw[:raw.rfind(b'endstream')]
    ln = re.search(rb'/Length\s+(\d+)\s+0\s+R', dp)
    if ln:
        n2 = int(re.search(rb'(\d+)', body(int(ln.group(1)))).group(1))
        if n2 <= len(raw):
            raw = raw[:n2]
    if b'/FlateDecode' in dp:
        try:
            raw = zlib.decompress(raw)
        except Exception:
            raw = zlib.decompressobj().decompress(raw)
    return raw, dp


def xmap_of(dp):
    m = re.search(rb'/XObject\s*<<', dp)
    if not m:
        return {}
    i = m.end(); dep = 1; j = i
    while dep and j < len(dp):
        if dp[j:j + 2] == b'<<': dep += 1; j += 2
        elif dp[j:j + 2] == b'>>': dep -= 1; j += 2
        else: j += 1
    return {k.decode(): int(v) for k, v in re.findall(rb'/(\w+)\s+(\d+) 0 R', dp[i:j])}


def mul(a, b):
    return (a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3],
            a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3],
            a[4] * b[0] + a[5] * b[2] + b[4], a[4] * b[1] + a[5] * b[3] + b[5])


def ap(m, x, y):
    return (m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5])


NUM = r'[-+]?[\d.]+'
TOK = re.compile((r'(%s)|/([\w.]+)|([A-Za-z\'"*]+)' % NUM).encode())

fills = []
images = []


def walk(content, ctm, res, depth=0, clip=None):
    clip = list(clip) if clip else [-1e9, -1e9, 1e9, 1e9]
    st = []; stack = []; cur = ctm; fill = '#000000'; path = []; cp = None; start = None
    intext = False; pending_clip = False
    for t in TOK.finditer(content):
        num, name, op = t.groups()
        if num is not None: st.append(float(num)); continue
        if name is not None: st.append('/' + name.decode()); continue
        o = op.decode()
        try:
            if o == 'q': stack.append((cur, fill, clip[:]))
            elif o == 'Q':
                if stack: cur, fill, clip = stack.pop()
            elif o == 'cm': cur = mul(tuple(st[-6:]), cur)
            elif o == 'W': pending_clip = True
            elif o == 'W*': pending_clip = True
            elif o == 'BT': intext = True
            elif o == 'ET': intext = False
            elif o in ('scn', 'sc', 'rg', 'SCN', 'SC', 'RG'):
                v = [x for x in st if isinstance(x, float)][-3:]
                if len(v) == 3 and o[0].islower():
                    fill = '#%02X%02X%02X' % tuple(max(0, min(255, round(c * 255))) for c in v)
            elif o == 'g':
                c = max(0, min(255, round(st[-1] * 255))); fill = '#%02X%02X%02X' % (c, c, c)
            elif o == 'm': cp = start = ap(cur, st[-2], st[-1]); path.append(cp)
            elif o == 'l': cp = ap(cur, st[-2], st[-1]); path.append(cp)
            elif o == 'c':
                for k in (-6, -4, -2): path.append(ap(cur, st[k], st[k + 1]))
                cp = path[-1]
            elif o in ('v', 'y'):
                for k in (-4, -2): path.append(ap(cur, st[k], st[k + 1]))
                cp = path[-1]
            elif o == 'h': cp = start
            elif o == 're':
                x, y, w, h = st[-4:]
                for q in ((x, y), (x + w, y), (x + w, y + h), (x, y + h)):
                    path.append(ap(cur, *q))
                cp = start = path[-4]
            elif o in ('f', 'F', 'f*', 'b', 'b*', 'B', 'B*', 'n', 'S', 's') and pending_clip:
                if path:
                    xs = [q[0] for q in path]; ys = [q[1] for q in path]
                    clip = [max(clip[0], min(xs)), max(clip[1], min(ys)),
                            min(clip[2], max(xs)), min(clip[3], max(ys))]
                pending_clip = False
                if o in ('f', 'F', 'f*', 'b', 'b*', 'B', 'B*') and path and not intext:
                    xs = [q[0] for q in path]; ys = [q[1] for q in path]
                    fills.append((fill, min(xs), min(ys), max(xs), max(ys)))
                path = []
            elif o in ('f', 'F', 'f*', 'b', 'b*', 'B', 'B*'):
                if path and not intext:
                    xs = [q[0] for q in path]; ys = [q[1] for q in path]
                    fills.append((fill, min(xs), min(ys), max(xs), max(ys)))
                path = []
            elif o in ('n', 'S', 's'): path = []
            elif o == 'Do' and st and isinstance(st[-1], str):
                nm = st[-1][1:]
                if nm in res:
                    c2, dp2 = stream(res[nm])
                    if b'/Image' in dp2:
                        c = [ap(cur, x, y) for x, y in ((0, 0), (1, 0), (1, 1), (0, 1))]
                        xs = [q[0] for q in c]; ys = [q[1] for q in c]
                        f = (min(xs), min(ys), max(xs), max(ys))
                        v = (max(f[0], clip[0]), max(f[1], clip[1]),
                             min(f[2], clip[2]), min(f[3], clip[3]))
                        if v[2] > v[0] and v[3] > v[1]:
                            images.append((res[nm], f, v))
                    elif c2 is not None and depth < 6:
                        mm = re.search(rb'/Matrix\s*\[([^\]]*)\]', dp2)
                        m2 = tuple(float(x) for x in mm.group(1).split()) if mm else (1, 0, 0, 1, 0, 0)
                        walk(c2, mul(m2, cur), xmap_of(dp2), depth + 1, clip)
        except Exception:
            pass
        st = []


page = [n for n in objs if b'/MediaBox' in body(n) and b'/Type /Page' in body(n)][0]
res = xmap_of(body(int(re.search(rb'/Resources\s+(\d+) 0 R', body(page)).group(1))))
content, _ = stream(int(re.search(rb'/Contents\s+(\d+) 0 R', body(page)).group(1)))
walk(content, (1, 0, 0, 1, 0, 0), res)


def merge(group, gap=14):
    """Collapse a dashed border's many little rectangles back into one frame."""
    out = []
    for f in sorted(group, key=lambda r: (-r[4], r[1])):
        for o in out:
            if (f[1] < o[3] + gap and o[1] < f[3] + gap
                    and f[2] < o[4] + gap and o[2] < f[4] + gap):
                o[1] = min(o[1], f[1]); o[2] = min(o[2], f[2])
                o[3] = max(o[3], f[3]); o[4] = max(o[4], f[4])
                o[5] += 1
                break
        else:
            out.append([f[0], f[1], f[2], f[3], f[4], 1])
    return out


by_colour = {}
for f in fills:
    by_colour.setdefault(f[0], []).append(f)

rd = lambda v: round(v, 1)
report = {
    'page': [rd(v) for v in map(float, re.search(rb'/MediaBox\s*\[([^\]]*)\]', body(page)).group(1).split())],
    'byColour': {c: len(v) for c, v in sorted(by_colour.items(), key=lambda kv: -len(kv[1]))},
    'merged': {
        c: [{'b': [rd(m[1]), rd(m[2]), rd(m[3]), rd(m[4])], 'n': m[5]}
            for m in merge(v) if (m[3] - m[1]) > 20 and (m[4] - m[2]) > 8]
        for c, v in by_colour.items() if len(v) < 4000
    },
    'images': [{'o': i[0], 'f': [rd(v) for v in i[1]], 'b': [rd(v) for v in i[2]]}
               for i in images],
}
os.makedirs(os.path.dirname(OUT) or '.', exist_ok=True)
json.dump(report, open(OUT, 'w'), indent=1)
print(len(fills), 'fills,', len(images), 'image placements ->', OUT)
print('colours:', list(report['byColour'].items())[:12])
