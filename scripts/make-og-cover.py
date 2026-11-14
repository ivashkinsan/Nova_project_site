"""Генератор обложки соцсетей Public/og-cover.jpg (1200x630).

Монохромная карточка в рамках концепции лендинга: фон #0a0a0a, белый текст,
хайрлайны, нулевые скругления, широкий трекинг. Шрифты — локальные ступени
Segoe UI (Inter скачиванием недоступен: сеть к шрифтовым CDN закрыта).
Запуск: python scripts/make-og-cover.py
"""
from PIL import Image, ImageDraw, ImageFont
import pathlib

W, H = 1200, 630
BG = (10, 10, 10)
WHITE = (255, 255, 255)

FONT_DIR = pathlib.Path('C:/Windows/Fonts')
def font(name, size):
    return ImageFont.truetype(str(FONT_DIR / name), size)

img = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(img)

MARGIN = 80

def tracked(text, f, x, y, fill, tracking):
    """Рисует строку с ручным трекингом (пиксели между символами)."""
    cx = x
    for ch in text:
        d.text((cx, y), ch, font=f, fill=fill)
        cx += d.textlength(ch, font=f) + tracking

def hairline(y, alpha):
    v = int(255 * alpha)
    d.line([(MARGIN, y), (W - MARGIN, y)], fill=(v, v, v), width=1)

# Монограмма N
f_mono = font('segoeuib.ttf', 64)
d.text((MARGIN, 62), 'N', font=f_mono, fill=(200, 200, 200))

hairline(170, 0.18)

# Кикер: жанр, город, формат — ключевые слова SEO
f_kicker = font('segoeuisl.ttf', 24)
tracked('JAZZ-KVINTET · ЛИПЕЦК · ЖИВЫЕ ВЫСТУПЛЕНИЯ', f_kicker,
        MARGIN, 200, (163, 163, 163), 5.2)

# Заголовок NOVA
f_nova = font('seguibl.ttf', 200)
d.text((MARGIN, 240), 'NOVA', font=f_nova, fill=WHITE)

# PROJECT с широким трекингом
f_proj = font('segoeuib.ttf', 96)
tracked('PROJECT', f_proj, MARGIN, 450, (217, 217, 217), 26)

hairline(570, 0.18)

# Нижняя строка
f_foot = font('segoeui.ttf', 22)
d.text((MARGIN, 588), 'атмосферные сеты для вечера · Липецк', font=f_foot,
       fill=(136, 136, 136))

out = pathlib.Path('Public/og-cover.jpg')
img.save(out, 'JPEG', quality=88)
print('saved', out, out.stat().st_size, 'bytes')
