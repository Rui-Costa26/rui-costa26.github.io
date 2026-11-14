"""One-off generator for social images (1200x630) and the apple-touch-icon.
Usage: python3 scripts/build-og.py   (needs Pillow, fonttools, brotli)"""
import io, pathlib
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
root = pathlib.Path(__file__).resolve().parent.parent
fs = root / 'node_modules/@fontsource-variable'
def font(path, size, wght):
    f = TTFont(str(path)); f.flavor = None; b = io.BytesIO(); f.save(b); b.seek(0)
    ft = ImageFont.truetype(b, size)
    try: ft.set_variation_by_axes([wght] if 'instrument' not in str(path) else [wght, 100])
    except Exception: pass
    return ft
BRI = fs / 'bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2'
INS = fs / 'instrument-sans/files/instrument-sans-latin-wght-normal.woff2'
PAPER, INK, SOFT, COBALT, SKY, YELLOW, WHITE = '#F1F4FA', '#111C3A', '#525E7A', '#2346C4', '#DCE5FB', '#F6C445', '#FFFFFF'
out = root / 'public/og'; out.mkdir(parents=True, exist_ok=True)

def rounded(im, box, r, fill):
    ImageDraw.Draw(im).rounded_rectangle(box, r, fill=fill)

def tiles(im, x, y, s, g, photo=None, icon=None):
    # The hero board: a 3x3 grid with the photo (or app icon) over the top-left 2x2.
    c = lambda i: (s + g) * i
    for (cx, cy, col) in [(2, 0, COBALT), (2, 1, YELLOW), (0, 2, WHITE), (1, 2, SKY), (2, 2, INK)]:
        rounded(im, (x + c(cx), y + c(cy), x + c(cx) + s, y + c(cy) + s), 24, col)
    big = 2 * s + g
    if photo:
        src = Image.open(photo).convert('RGB').resize((big, big), Image.LANCZOS)
        m = Image.new('L', (big, big), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, big, big), 24, fill=255)
        im.paste(src, (x, y), m)
    else:
        rounded(im, (x, y, x + big, y + big), 24, WHITE)
        k = int(big * .62); src = Image.open(icon).convert('RGB').resize((k, k), Image.LANCZOS)
        m = Image.new('L', (k, k), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, k, k), int(k * .22), fill=255)
        im.paste(src, (x + (big - k) // 2, y + (big - k) // 2), m)

def card(name, title, sub, photo=None, icon=None):
    im = Image.new('RGB', (1200, 630), PAPER); d = ImageDraw.Draw(im)
    rounded(im, (64, 64, 104, 104), 11, COBALT)
    d.text((84, 84), 'RC', font=font(BRI, 18, 700), fill=WHITE, anchor='mm')
    d.text((120, 84), 'Rui Costa', font=font(BRI, 28, 700), fill=INK, anchor='lm')
    y = 200
    for i, line in enumerate(title):
        d.text((64, y), line, font=font(BRI, 76, 800), fill=COBALT if i == len(title) - 1 and len(title) > 1 else INK); y += 82
    d.text((66, y + 30), sub, font=font(INS, 32, 500), fill=SOFT)
    tiles(im, 790, 135, 112, 12, photo=photo, icon=icon)
    im.save(out / name, optimize=True)

photo = root / 'src/assets/rui.jpg'
card('home-en.png', ['Rui Costa,', 'iOS developer.'], 'Bosch Portugal · my own iPhone apps · AI', photo=photo)
card('home-pt.png', ['Rui Costa,', 'programador iOS.'], 'Bosch Portugal · as minhas apps · IA', photo=photo)
card('fruidoku-en.png', ['Fruidoku'], 'A fruit logic puzzle for iPhone, by Rui Costa', icon=root / 'src/assets/fruidoku/icon.png')
card('fruidoku-pt.png', ['Fruidoku'], 'Um puzzle de lógica com frutas, por Rui Costa', icon=root / 'src/assets/fruidoku/icon.png')
card('formly-en.png', ['Formly'], 'Private body progress tracker, by Rui Costa', icon=root / 'src/assets/formly/icon.png')
card('formly-pt.png', ['Formly'], 'Registo privado do progresso corporal, por Rui Costa', icon=root / 'src/assets/formly/icon.png')
Image.open(photo).convert('RGB').resize((600, 600), Image.LANCZOS).save(out / 'rui-costa.jpg', quality=85)
# apple-touch-icon
ic = Image.new('RGB', (180, 180), COBALT); d = ImageDraw.Draw(ic)
d.text((90, 92), 'RC', font=font(BRI, 76, 700), fill=WHITE, anchor='mm'); ic.save(root / 'public/apple-touch-icon.png')
print('ok')
