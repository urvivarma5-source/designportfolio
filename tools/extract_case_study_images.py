#!/usr/bin/env python3
"""Pull the raster art out of a Figma PDF export as web-ready WebP.

    python3 tools/dump_pdf_boxes.py "Guide Pt 1.pdf" out/boxes.json
    python3 tools/extract_case_study_images.py "Guide Pt 1.pdf" \
        out/boxes.json src/assets/guide1/ tools/guide1-image-regions.json

`boxes.json` supplies the image placements (it is the geometry dump; this tool
does not re-walk the content stream). The region file is
{name: [x0, y0, x1, y1]} in PDF page coordinates, exactly like the vector
extractor's. Every placement whose *centre* falls inside a region is drawn into
that region's output, in page order, and the result is scaled down to MAXW.

Three things this has to get right, all of them Figma's doing:

  * **Centre-in-region, then clip** - not containment. Figma masks images to
    their frame, so a screenshot's placement routinely runs past the panel it
    is shown in. Containment would drop it; intersection would drag in the
    neighbouring panel. The centre test picks the right one and the crop
    reproduces the mask.
  * **Every image carries an /SMask** - a separate Flate DeviceGray alpha plane.
    It is composited onto white here, because the case-study page's ground is
    white; alpha is not preserved in the output.
  * **A panel is often several placements** - a Miro board with photographs and
    video-call thumbnails laid over it. Compositing them here is what keeps the
    page markup one <img> per panel.

Output is WebP only, no <picture> fallback. See DESIGN.md 9.14.
"""
import io
import json
import os
import re
import sys
import zlib

from PIL import Image

MAXW = 2200
QUALITY = 82
SCALE = 2.0  # render the region at 2x its point size before the MAXW clamp

PDF, BOXES, OUT, SPECFILE = sys.argv[1:5]
SPEC = json.load(open(SPECFILE))
PLACEMENTS = json.load(open(BOXES))['images']
d = open(PDF, 'rb').read()
objs = {int(m.group(1)): m.end() for m in re.finditer(rb'(?m)^(\d+) 0 obj', d)}


def body(n):
    s = objs[n]
    return d[s:d.find(b'endobj', s)]


def raw_stream(n):
    b = body(n)
    m = re.search(rb'stream\r?\n', b)
    dp, raw = b[:m.start()], b[m.end():]
    raw = raw[:raw.rfind(b'endstream')]
    ln = re.search(rb'/Length\s+(\d+)\s+0\s+R', dp)
    if ln:
        n2 = int(re.search(rb'(\d+)', body(int(ln.group(1)))).group(1))
        if n2 <= len(raw):
            raw = raw[:n2]
    return dp, raw


def load_image(n):
    """Decode image XObject `n` as RGB, its /SMask flattened onto white."""
    dp, raw = raw_stream(n)
    w = int(re.search(rb'/Width\s+(\d+)', dp).group(1))
    h = int(re.search(rb'/Height\s+(\d+)', dp).group(1))
    if b'/DCTDecode' in dp:
        im = Image.open(io.BytesIO(raw)).convert('RGB')
    elif b'/FlateDecode' in dp:
        data = zlib.decompressobj().decompress(raw)
        mode = 'L' if b'/DeviceGray' in dp else 'RGB'
        im = Image.frombytes(mode, (w, h), data).convert('RGB')
    else:
        return None
    sm = re.search(rb'/SMask\s+(\d+)\s+0\s+R', dp)
    if sm:
        sdp, sraw = raw_stream(int(sm.group(1)))
        sw = int(re.search(rb'/Width\s+(\d+)', sdp).group(1))
        sh = int(re.search(rb'/Height\s+(\d+)', sdp).group(1))
        alpha = Image.frombytes('L', (sw, sh), zlib.decompressobj().decompress(sraw))
        if alpha.size != im.size:
            alpha = alpha.resize(im.size, Image.LANCZOS)
        im = Image.composite(im, Image.new('RGB', im.size, 'white'), alpha)
    return im


os.makedirs(OUT, exist_ok=True)
for name, (rx0, ry0, rx1, ry1) in SPEC.items():
    rw, rh = rx1 - rx0, ry1 - ry0
    scale = SCALE
    if rw * scale > MAXW:
        scale = MAXW / rw
    canvas = Image.new('RGB', (max(1, round(rw * scale)), max(1, round(rh * scale))), 'white')
    used = 0
    for p in PLACEMENTS:
        vx0, vy0, vx1, vy1 = p['b']            # visible after Figma's clip
        fx0, fy0, fx1, fy1 = p['f']            # the box the bitmap is laid into
        cx, cy = (vx0 + vx1) / 2, (vy0 + vy1) / 2
        if not (rx0 <= cx <= rx1 and ry0 <= cy <= ry1):
            continue
        im = load_image(p['o'])
        if im is None:
            continue
        w = max(1, round((fx1 - fx0) * scale))
        h = max(1, round((fy1 - fy0) * scale))
        im = im.resize((w, h), Image.LANCZOS)
        # crop the laid-out bitmap down to the part the clipping path leaves
        im = im.crop((round((vx0 - fx0) * scale), round((fy1 - vy1) * scale),
                      round((vx1 - fx0) * scale), round((fy1 - vy0) * scale)))
        canvas.paste(im, (round((vx0 - rx0) * scale), round((ry1 - vy1) * scale)))
        used += 1
    if not used:
        print('EMPTY', name)
        continue
    path = os.path.join(OUT, name + '.webp')
    canvas.save(path, 'WEBP', quality=QUALITY, method=6)
    print('%-20s %4dx%-4d %2d img %7dB' % (name, canvas.width, canvas.height, used,
                                           os.path.getsize(path)))
