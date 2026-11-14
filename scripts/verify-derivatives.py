"""Сверка srcset-URL реестра photos.ts с реальными файлами Public/img/.

Инспекция ассетов (Pillow), не сборка. Формула — та же, что в photos.ts
и gen-derivatives.py: landscape-ступени по ширине (1920/900/640),
portrait-ступени по высоте (2160/1000/640); имя файла = результирующая ширина.
Проверяем: DIMENSIONS реестра == реальный размер оригинала, каждый
srcset-URL реестра == существующий файл нужного размера, и в Public/img нет
файлов, на которые реестр не ссылается. Скрипт ничего не меняет (только отчёт).
"""
import pathlib
import re
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / "Public" / "img"

text = (ROOT / "src" / "data" / "photos.ts").read_text(encoding="utf-8")

block = re.search(r"DIMENSIONS[^=]*=\s*\{(.*?)\}", text, re.S).group(1)
dims = {int(a): (int(b), int(c)) for a, b, c in re.findall(r"(\d+):\s*\[\s*(\d+),\s*(\d+)\s*\]", block)}
tiers_l = [int(x) for x in re.search(r"TIERS_LANDSCAPE\s*=\s*\[([^\]]+)\]", text).group(1).split(",")]
tiers_p = [int(x) for x in re.search(r"TIERS_PORTRAIT\s*=\s*\[([^\]]+)\]", text).group(1).split(",")]

def tiers(w, h, portrait):
    """Ступени как в photos.ts: scale = edge / (высота для portrait, ширина
    для landscape); имя деривата = результирующая ширина. Для portrait
    TIERS_P заданы высотами, поэтому scale = edge / h."""
    edges = tiers_p if portrait else tiers_l
    out = []
    for edge in edges:
        scale = min(1.0, edge / h) if portrait else min(1.0, edge / w)
        out.append((int(round(w * scale)), int(round(h * scale))))
    return out

referenced = set()
problems = []
for n, (w, h) in sorted(dims.items()):
    portrait = h > w
    real_path = ROOT / "Public" / f"{n}.jpg"
    real = None
    if real_path.exists():
        im = Image.open(real_path)
        real = im.size
        im.close()
    if real != (w, h):
        problems.append(f"{n}: DIMENSIONS {(w, h)}, оригинал {real}")
    basis = real if real else (w, h)
    for dw, dh in tiers(basis[0], basis[1], portrait):
        name = f"{n}-w{dw}.webp"
        referenced.add(name)
        path = IMG / name
        if not path.exists():
            problems.append(f"{name}: отсутствует")
            continue
        im = Image.open(path)
        if im.size != (dw, dh):
            problems.append(f"{name}: размер {im.size}, ожидается {(dw, dh)}")
        im.close()

stale = sorted(p.name for p in IMG.glob("*.webp") if p.name not in referenced)

print("файлов webp:", len(list(IMG.glob("*.webp"))), "; ссылок реестра:", len(referenced))
print("проблемы:", problems if problems else "нет")
print("лишние (реестр на них не ссылается):", stale)
