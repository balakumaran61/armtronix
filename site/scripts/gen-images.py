"""Converts wireframes/assets/img/*.jpg (ARM-02) to public/img/*.webp, max 1600 px wide,
and writes scripts/image-sizes.json for gen-data.mjs. Run: python3 scripts/gen-images.py"""
import json
import pathlib
from PIL import Image

here = pathlib.Path(__file__).resolve().parent
src = here.parent.parent / 'wireframes' / 'assets' / 'img'
out = here.parent / 'public' / 'img'
out.mkdir(parents=True, exist_ok=True)
sizes = {}
for f in sorted(src.glob('IMG-*.jpg')):
    im = Image.open(f).convert('RGB')
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save(out / f'{f.stem}.webp', 'WEBP', quality=78, method=6)
    sizes[f.stem] = [im.width, im.height]
(here / 'image-sizes.json').write_text(json.dumps(sizes, indent=2) + '\n')
print(f'{len(sizes)} images written to {out}')
