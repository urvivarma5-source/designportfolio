#!/usr/bin/env python3
"""
Extract text and images from a Figma-exported case-study PDF.

    python3 tools/extract_case_study.py "TCTD CASE STUDY.pdf" out/

Why this exists: Figma exports text as /Type3 fonts — glyph-drawing procedures
with no /BaseFont — so ordinary "does this PDF have text?" checks say no, and
grepping the raw bytes finds nothing. The text is fully recoverable via the
/ToUnicode CMaps, which is what this does.

Two things that will bite you if you rewrite this:
  - strings are literal with OCTAL escapes, e.g. `(\\047)`, inside TJ arrays.
    Handling only hex strings or plain Tj yields zero characters.
  - Figma switches font subsets mid-block, so the current font must be tracked
    sequentially through the BT..ET segment. Taking the first /Fn Tf per block
    produces convincing-looking garbage ("Sgewh'rhldl" instead of "Specialists
    Shadowed") because later runs get decoded with the wrong table.
"""
import json
import re
import sys
import zlib
from pathlib import Path


def load_objects(data):
    return {
        int(m.group(1)): m.group(2)
        for m in re.finditer(rb"(\d+)\s+0\s+obj\b(.*?)\bendobj", data, re.S)
    }


def stream_of(body):
    m = re.search(rb"stream\r?\n", body)
    if not m:
        return None
    raw = body[m.end() : body.find(b"endstream", m.end())]
    if b"/FlateDecode" in body[: m.start()]:
        for fn in (zlib.decompress, lambda r: zlib.decompressobj().decompress(r)):
            try:
                return fn(raw)
            except Exception:
                pass
        return None
    return raw


def to_unicode(objs, font_obj):
    body = objs.get(font_obj, b"")
    ref = re.search(rb"/ToUnicode\s+(\d+)\s+0\s+R", body)
    if not ref:
        return {}
    cm = stream_of(objs.get(int(ref.group(1)), b"")) or b""
    table = {}
    for blk in re.finditer(rb"beginbfchar(.*?)endbfchar", cm, re.S):
        for src, dst in re.findall(rb"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", blk.group(1)):
            table[int(src, 16)] = bytes.fromhex(dst.decode()).decode("utf-16-be", "replace")
    for blk in re.finditer(rb"beginbfrange(.*?)endbfrange", cm, re.S):
        for lo, hi, dst in re.findall(
            rb"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", blk.group(1)
        ):
            lo, hi, base = int(lo, 16), int(hi, 16), int(dst, 16)
            for i in range(lo, hi + 1):
                table[i] = chr(base + (i - lo))
    return table


def unescape(s):
    """PDF literal string -> bytes. Octal escapes are the important part."""
    out, i = bytearray(), 0
    named = {0x6E: 10, 0x72: 13, 0x74: 9, 0x62: 8, 0x66: 12}
    while i < len(s):
        if s[i] != 0x5C:
            out.append(s[i])
            i += 1
            continue
        i += 1
        if i >= len(s):
            break
        c = s[i]
        if 0x30 <= c <= 0x37:
            digits = chr(c)
            i += 1
            for _ in range(2):
                if i < len(s) and 0x30 <= s[i] <= 0x37:
                    digits += chr(s[i])
                    i += 1
                else:
                    break
            out.append(int(digits, 8))
        else:
            out.append(named.get(c, c))
            i += 1
    return bytes(out)


def extract(pdf_path):
    data = Path(pdf_path).read_bytes()
    objs = load_objects(data)

    page = next(b for b in objs.values() if b"/Type /Page" in b and b"/Contents" in b)
    res = page
    ind = re.search(rb"/Resources\s+(\d+)\s+0\s+R", page)
    if ind:
        res = objs[int(ind.group(1))]
    fonts = re.search(rb"/Font\s*<<(.*?)>>", res, re.S)
    name2obj = {
        n.decode(): int(o) for n, o in re.findall(rb"/(\w+)\s+(\d+)\s+0\s+R", fonts.group(1))
    }
    cmaps = {name: to_unicode(objs, obj) for name, obj in name2obj.items()}

    content = stream_of(objs[int(re.search(rb"/Contents\s+(\d+)\s+0\s+R", page).group(1))])

    token = re.compile(rb"/(\w+)\s+[\d.]+\s+Tf|\[((?:[^\[\]]|\\.)*)\]\s*TJ", re.S)
    literal = re.compile(rb"\(((?:\\.|[^\\()])*)\)", re.S)
    blocks = []
    for seg in re.finditer(
        rb"([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)"
        rb"\s+cm\s*(?:[^B]|B(?!T))*?BT(.*?)ET",
        content,
        re.S,
    ):
        y, body = float(seg.group(6)), seg.group(7)
        tm = re.search(rb"([\d.\-]+)(?:\s+[\d.\-]+){5}\s+Tm", body)
        size = round(float(tm.group(1)), 1) if tm else 0
        font, text = None, ""
        for m in token.finditer(body):
            if m.group(1):
                font = m.group(1).decode()
                continue
            table = cmaps.get(font, {})
            for lit in literal.finditer(m.group(2)):
                text += "".join(table.get(b, "") for b in unescape(lit.group(1)))
        if text.strip():
            blocks.append({"y": y, "size": size, "text": text.strip()})

    blocks.sort(key=lambda b: -b["y"])  # PDF origin is bottom-left
    return blocks


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    blocks = extract(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("out")
    out.mkdir(parents=True, exist_ok=True)
    (out / "blocks.json").write_text(json.dumps(blocks, indent=1))
    (out / "text.txt").write_text(
        "\n".join(f"[{b['size']:>5}] {b['text']}" for b in blocks)
    )
    print(f"{len(blocks)} blocks, {sum(len(b['text']) for b in blocks)} chars -> {out}/")
