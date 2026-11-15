"""Обложка для соцсетей из реального снимка: кадр 1.jpg → 1200×630,
монохромная подача сайта (grayscale + контраст + приглушённая яркость).
Центральный crop, без изменения пропорций кадра внутри crop."""
from PIL import Image, ImageEnhance

SRC = "Public/1.jpg"
OUT = "Public/og-cover-photo.jpg"
TARGET_W = 1200
TARGET_H = 630

img = Image.open(SRC)
w, h = img.size

# Масштаб по ширине, затем центральная обрезка по высоте
scaled_w = TARGET_W
scaled_h = round(h * TARGET_W / w)
img = img.resize((scaled_w, scaled_h), Image.LANCZOS)

top = (scaled_h - TARGET_H) // 2
img = img.crop((0, top, TARGET_W, top + TARGET_H))

img = img.convert("L").convert("RGB")
img = ImageEnhance.Contrast(img).enhance(1.06)
img = ImageEnhance.Brightness(img).enhance(0.82)

img.save(OUT, "JPEG", quality=86, progressive=True, optimize=True)
print(OUT, img.size)
