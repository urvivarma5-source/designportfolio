#!/usr/bin/env python3
"""Print an approximate bounding box per top-level <g id> of a design sheet.

Used to write the crop boxes in tools/smarter-render-regions.json without
eyeballing them off a render. Approximate on purpose: it reads the geometry
attributes it understands and ignores path data, so every box is padded before
it is used.
"""
import re, sys
from xml.etree import ElementTree as ET

NS = '{http://www.w3.org/2000/svg}'
tree = ET.parse(sys.argv[1])
root = tree.getroot()

def num(e, k, d=0.0):
    try: return float(e.get(k, d))
    except (TypeError, ValueError): return d

def box(e, acc):
    t = e.tag.replace(NS, '')
    if t in ('rect', 'image'):
        x, y = num(e, 'x'), num(e, 'y')
        acc.append((x, y, x + num(e, 'width'), y + num(e, 'height')))
    elif t == 'text':
        x, y = num(e, 'x'), num(e, 'y')
        s = num(e, 'font-size', 12)
        acc.append((x, y - s, x + 0.62 * s * len(''.join(e.itertext())), y + 0.3 * s))
    elif t == 'circle':
        cx, cy, r = num(e, 'cx'), num(e, 'cy'), num(e, 'r')
        acc.append((cx - r, cy - r, cx + r, cy + r))
    elif t == 'line':
        acc.append((min(num(e, 'x1'), num(e, 'x2')), min(num(e, 'y1'), num(e, 'y2')),
                    max(num(e, 'x1'), num(e, 'x2')), max(num(e, 'y1'), num(e, 'y2'))))
    for c in e:
        box(c, acc)

for g in root:
    if g.tag != NS + 'g' or not g.get('id'):
        continue
    acc = []
    box(g, acc)
    if not acc:
        continue
    print('%-52s %5d %5d %5d %5d' % (g.get('id')[:52],
          min(b[0] for b in acc), min(b[1] for b in acc),
          max(b[2] for b in acc), max(b[3] for b in acc)))
