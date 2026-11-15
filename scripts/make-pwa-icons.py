"""Генерация PWA-иконок для манифеста.

Монограмма «N» в палитре лендинга (фон #0a0a0a, знак #ffffff) — та же логика,
что и у apple-touch-icon. Иконки полнопостонные (фон закрывает весь холст),
знак в центре: вписан в безопасную зону 80% maskedable-маски, поэтому один и тот
же файл годится и как обычная, и как maskedable-иконка.

Запуск: python scripts/make-pwa-icons.py
"""

import os

from PIL import Image, ImageDraw, ImageFont

BG = (10, 10, 10)
FG = (255, 255, 255)
FONT_PATH = r"C:\Windows\Fonts\seguibl.ttf"
OUT_DIR = "Public/icons"

# (размер холста, кегль знака) — знак занимает ~30% стороны, центр
ICONS = ((192, 86), (512, 220))

os.makedirs(OUT_DIR, exist_ok=True)

for size, font_size in ICONS:
    img = Image.new("RGB", (size, size), BG)
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT_PATH, font_size)
    draw.text((size // 2, size // 2), "N", font=font, fill=FG, anchor="mm")
    path = os.path.join(OUT_DIR, f"icon-{size}.png")
    img.save(path)
    check = Image.open(path)
    print(f"{path} {check.size} {check.mode}")
