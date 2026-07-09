"""Recolor the brand owl to gold-on-navy (site palette).

The source artwork (assets/owl.png) was a pale-blue stencil drawing on
white. This maps it onto the site's gold tokens so the mark reads
gold-on-blue everywhere it appears:

- assets/owl.png    -> gold owl, transparent background (the navy page
                       shows through, including the stencil gaps).
- assets/favicon.png -> the same gold owl on a solid navy rounded
                        square, so the tab icon is gold-on-blue on any
                        browser chrome.

Run from the repo root:  python3 tools/recolor_owl.py <source-owl.png>
(idempotent given the same source; keep an untouched copy of the
original artwork as the argument, not a previously recolored output)
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw

# Site palette (styles.css tokens)
NAVY_900 = (10, 16, 32)  # --navy-900, page background
GOLD_LIGHT = (243, 220, 150)  # highlight end of ramp (near --gold-300)
GOLD_DARK = (122, 90, 28)  # shadow/line end of ramp (near --gold-600)

# Alpha ramp: how far from white a source pixel must be to count as
# part of the owl. Below LO -> background (transparent); above HI ->
# fully opaque; between -> antialiased edge.
INK_LO = 0.06
INK_HI = 0.20


def smoothstep(lo: float, hi: float, x: float) -> float:
    t = max(0.0, min(1.0, (x - lo) / (hi - lo)))
    return t * t * (3 - 2 * t)


def recolor_to_gold(src: Image.Image) -> Image.Image:
    """Gold owl on transparent background, shading kept via luminance."""
    src = src.convert("RGBA")
    w, h = src.size
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    spx, opx = src.load(), out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = spx[x, y]
            ink = max(255 - r, 255 - g, 255 - b) / 255
            alpha = round(smoothstep(INK_LO, INK_HI, ink) * a)
            if alpha == 0:
                continue
            lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
            c = tuple(
                round(GOLD_DARK[i] + (GOLD_LIGHT[i] - GOLD_DARK[i]) * lum)
                for i in range(3)
            )
            opx[x, y] = (*c, alpha)
    return out


def on_navy_tile(owl: Image.Image, size: int, pad_frac: float = 0.10) -> Image.Image:
    """Favicon: gold owl centered on a navy rounded square."""
    tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(tile)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=size // 6, fill=(*NAVY_900, 255))
    pad = round(size * pad_frac)
    box = size - 2 * pad
    fitted = owl.copy()
    fitted.thumbnail((box, box), Image.LANCZOS)
    tile.alpha_composite(
        fitted, ((size - fitted.width) // 2, (size - fitted.height) // 2)
    )
    return tile


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit("usage: python3 tools/recolor_owl.py <source-owl.png>")
    source = Path(sys.argv[1])
    if not source.is_file():
        sys.exit(f"source not found: {source}")
    assets = Path(__file__).resolve().parent.parent / "assets"

    gold = recolor_to_gold(Image.open(source))
    gold.save(assets / "owl.png")
    on_navy_tile(gold, 256).save(assets / "favicon.png")
    print(f"wrote {assets / 'owl.png'} ({gold.size[0]}x{gold.size[1]})")
    print(f"wrote {assets / 'favicon.png'} (256x256, navy tile)")


if __name__ == "__main__":
    main()
