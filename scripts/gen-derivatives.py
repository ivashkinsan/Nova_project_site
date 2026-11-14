"""Генерация WebP-дериватов фото пула Public/ в Public/img/.

Ступени: landscape — ширины 1920/900/640; portrait — высоты 2160/1000/640
(для 2:3 это ширины 1440/667/427). Качество 78. Оригинал не трогаем.
Файлы: {n}-w1920.webp, {n}-w900.webp, {n}-w640.webp.
"""
from PIL import Image
import os

USED = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27]
TIERS_L = [1920, 900, 640]   # по ширине
TIERS_P = [2160, 1000, 640]  # по высоте

OUT = "Public/img"
os.makedirs(OUT, exist_ok=True)

rows = []
for n in USED:
    src = f"Public/{n}.jpg"
    im = Image.open(src)
    w, h = im.size
    portrait = h > w
    tiers = TIERS_P if portrait else TIERS_L
    for t in tiers:
        scale = t / (h if portrait else w)
        if scale > 1:
            scale = 1.0
        nw, nh = int(round(w * scale)), int(round(h * scale))
        out = im.resize((nw, nh), Image.LANCZOS)
        name = f"{n}-w{nw}.webp"
        out.save(os.path.join(OUT, name), "WEBP", quality=78)
        rows.append((n, portrait, nw, nh, os.path.getsize(os.path.join(OUT, name))))

total = 0
for r in rows:
    total += r[4]
    print(r)
print("TOTAL", total, "files", len(rows))
