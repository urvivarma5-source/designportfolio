#!/usr/bin/env python3
"""Rasterise regions of a Figma-exported case-study PDF as web-ready WebP.

    python3 tools/render_case_study_regions.py "guide part 2.pdf" \
        src/assets/guide2/ tools/guide2-render-regions.json

The region file is {name: [x0, y0, x1, y1]} in PDF page coordinates (y up),
the same convention as the other two extractors.

Why this exists alongside extract_case_study_images.py: some of Part 2's
screen walkthroughs are not a picture, they are a *composition* — screenshots
with vector arrows drawn between them and vector annotation boxes drawn on top.
Pulling the bitmaps out would drop everything that explains them. Rendering the
region through poppler keeps the composition exactly as the artwork draws it.

Use the bitmap extractor wherever a panel really is one picture: it is sharper
(it resamples the original bitmap rather than a render of it) and much smaller.

Needs poppler's pdftoppm on PATH — `brew install poppler`.
"""
import json
import os
import subprocess
import sys

from PIL import Image

DPI = 150      # about 2x the artwork's points, which is retina at final size
MAXW = 2200
QUALITY = 82

PDF, OUT, SPECFILE = sys.argv[1:4]
SPEC = json.load(open(SPECFILE))

# poppler crops in pixels from the top-left, so the page height is needed to
# flip the PDF's bottom-left origin.
info = subprocess.run(['pdfinfo', PDF], capture_output=True, text=True).stdout
size = next(l for l in info.splitlines() if l.startswith('Page size:'))
PW, PH = (float(v) for v in (size.split()[2], size.split()[4]))
k = DPI / 72.0

os.makedirs(OUT, exist_ok=True)
for name, (x0, y0, x1, y1) in SPEC.items():
    args = ['pdftoppm', '-png', '-r', str(DPI),
            '-x', str(round(x0 * k)), '-y', str(round((PH - y1) * k)),
            '-W', str(round((x1 - x0) * k)), '-H', str(round((y1 - y0) * k)),
            PDF, os.path.join(OUT, '_tmp')]
    subprocess.run(args, check=True)
    tmp = os.path.join(OUT, '_tmp-1.png')
    im = Image.open(tmp).convert('RGB')
    if im.width > MAXW:
        im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
    path = os.path.join(OUT, name + '.webp')
    im.save(path, 'WEBP', quality=QUALITY, method=6)
    os.remove(tmp)
    print('%-26s %4dx%-4d %7dB' % (name, im.width, im.height, os.path.getsize(path)))
