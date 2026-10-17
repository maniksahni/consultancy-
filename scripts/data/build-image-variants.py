"""Create smaller copies of the Paris photographs (384 to 1600 px wide).

The site is a static export, so Next.js cannot resize images on request. These
files let src/lib/imageLoader.ts send phones and laptops a copy close to the size
they display instead of the 2400 px original. Existing, up-to-date copies are kept.
"""
from pathlib import Path
from PIL import Image

SRC = Path("public/images/paris")
WIDTHS = (384, 640, 828, 1080, 1600)
QUALITY = 62  # PageSpeed-recommended compression; raise only if artefacts appear
STAMP = SRC / f".variants-q{QUALITY}"

made = 0
fresh = STAMP.exists()  # a quality change regenerates every copy
for photo in sorted(SRC.glob("*.webp")):
    with Image.open(photo) as im:
        for width in WIDTHS:
            out = SRC / f"w{width}" / photo.name
            if fresh and out.exists() and out.stat().st_mtime >= photo.stat().st_mtime:
                continue
            out.parent.mkdir(exist_ok=True)
            if im.width <= width:
                copy = im.copy()
            else:
                copy = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
            copy.save(out, "WEBP", quality=QUALITY, method=6)
            made += 1
for old in SRC.glob(".variants-q*"):
    old.unlink()
STAMP.touch()
print(f"Image variants: {made} created (quality {QUALITY})")
