"""Генератор apple-touch-icon.png (180×180) — монограмма N в палитре концепции.
Тот же приём, что favicon.svg: фон #0a0a0a, белый «N», без скруглений.
Pillow, локальный Segoe UI Black (Inter растром недоступен — сеть закрыта)."""
import pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
W = H = 180
BG = (10, 10, 10)
FG = (255, 255, 255)

font_path = pathlib.Path("C:/Windows/Fonts/seguibl.ttf")
assert font_path.exists(), "seguibl.ttf missing"
font = ImageFont.truetype(str(font_path), 120)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)
# Рисуем «N» посередине, чуть шире трекингом, как в og-карточке
draw.text((W // 2, H // 2), "N", font=font, fill=FG, anchor="mm")

out = ROOT / "Public" / "apple-touch-icon.png"
img.save(out, "PNG", optimize=True)
print("saved:", out, img.size, out.stat().st_size, "bytes")
