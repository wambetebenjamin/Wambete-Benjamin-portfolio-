#!/usr/bin/env python3
"""Generate portfolio placeholder graphics (dark theme + electric blue)."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math, random

BG = (10, 14, 23)          # #0a0e17
BLUE = (0, 212, 255)       # #00D4FF
BLUE_DIM = (0, 212, 255, 90)
WHITE = (240, 247, 255)
GREY = (148, 163, 184)
CARD = (17, 24, 39)
FONT_DIR = "/usr/share/fonts/truetype/dejavu/"
SS = 2  # supersample factor

def font(size, bold=False):
    name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype(FONT_DIR + name, size)

def vgrad(w, h, top=(13, 20, 36), bottom=(6, 9, 16)):
    base = Image.new("RGB", (w, h))
    px = base.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        for x in range(w):
            px[x, y] = (r, g, b)
    return base

def radial_glow(img, cx, cy, radius, color=BLUE, alpha=70):
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    steps = 40
    for i in range(steps, 0, -1):
        r = int(radius * i / steps)
        a = int(alpha * (1 - i / steps) ** 1.6)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (a,))
    glow = glow.filter(ImageFilter.GaussianBlur(radius * 0.08))
    img.alpha_composite(glow)

def dot_grid(img, step=44, radius=1, color=(255, 255, 255, 14)):
    d = ImageDraw.Draw(img)
    for y in range(0, img.height, step):
        for x in range(0, img.width, step):
            d.ellipse([x - radius, y - radius, x + radius, y + radius], fill=color)

def rounded(draw, box, r, **kw):
    draw.rounded_rectangle(box, radius=r, **kw)

def base_canvas(w, h, glows=((0.82, 0.15, 500, 90), (0.12, 0.9, 420, 60))):
    img = vgrad(w, h).convert("RGBA")
    for gx, gy, rad, a in glows:
        radial_glow(img, int(w * gx), int(h * gy), rad, BLUE, a)
    return img

def save(img, path, w, h):
    img.convert("RGB").resize((w, h), Image.LANCZOS).save(path, quality=92)
    print("saved", path)

# ---------------------------------------------------------------- project 6
def project6():
    W, H = 1600 * SS // 2 * 2, 1000 * SS // 2 * 2  # 3200x2000 (SS=2 on 1600x1000)
    W, H = 1600, 1000
    S = SS
    w, h = W * S, H * S
    img = base_canvas(w, h, glows=((0.85, 0.1, 600, 80), (0.1, 0.95, 500, 55)))
    d = ImageDraw.Draw(img)

    # window
    m = int(150 * S)
    win = [m, int(120 * S), w - m, h - int(110 * S)]
    # shadow
    sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle(win, radius=int(24 * S), fill=(0, 0, 0, 160))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(int(40 * S))))
    rounded(d, win, int(24 * S), fill=(13, 18, 30, 255), outline=(0, 212, 255, 70), width=max(2, S))
    # title bar
    tb = [win[0], win[1], win[2], win[1] + int(72 * S)]
    rounded(d, tb, int(24 * S), fill=(18, 25, 42, 255))
    d.rectangle([tb[0], tb[1] + int(36 * S), tb[2], tb[3]], fill=(18, 25, 42, 255))
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        cx = win[0] + int((36 + i * 34) * S)
        d.ellipse([cx - int(9 * S), tb[1] + int(36 * S) - int(9 * S), cx + int(9 * S), tb[1] + int(36 * S) + int(9 * S)], fill=c)
    d.text((win[0] + int(140 * S), tb[1] + int(20 * S)), "NexaChat AI", font=font(int(24 * S), True), fill=WHITE)

    # sidebar
    sb_top = tb[3] + int(26 * S)
    sb = [win[0] + int(26 * S), sb_top, win[0] + int(420 * S), win[3] - int(26 * S)]
    rounded(d, sb, int(18 * S), fill=(16, 22, 38, 255))
    # new chat button
    btn = [sb[0] + int(20 * S), sb[1] + int(20 * S), sb[2] - int(20 * S), sb[1] + int(78 * S)]
    rounded(d, btn, int(14 * S), fill=BLUE + (255,))
    d.text((btn[0] + int(24 * S), btn[1] + int(16 * S)), "+  New Conversation", font=font(int(24 * S), True), fill=(8, 12, 20))
    items = ["Debug my React code", "Write API docs", "SQL query optimisation", "Design a landing page", "Explain async/await"]
    y = btn[3] + int(30 * S)
    for i, it in enumerate(items):
        ih = int(64 * S)
        if i == 0:
            rounded(d, [sb[0] + int(14 * S), y, sb[2] - int(14 * S), y + ih], int(12 * S), fill=(0, 212, 255, 36))
        d.ellipse([sb[0] + int(30 * S), y + ih // 2 - int(7 * S), sb[0] + int(44 * S), y + ih // 2 + int(7 * S)], fill=BLUE if i == 0 else GREY)
        d.text((sb[0] + int(58 * S), y + int(16 * S)), it, font=font(int(21 * S)), fill=WHITE if i == 0 else GREY)
        y += ih + int(12 * S)

    # chat area
    ca = [sb[2] + int(26 * S), sb_top, win[2] - int(26 * S), win[3] - int(26 * S)]
    rounded(d, ca, int(18 * S), fill=(11, 16, 28, 255))
    # AI orb
    ob = [ca[0] + int(34 * S), sb_top + int(28 * S)]
    orb = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(orb).ellipse([ob[0], ob[1], ob[0] + int(56 * S), ob[1] + int(56 * S)], fill=BLUE + (200,))
    img.alpha_composite(orb.filter(ImageFilter.GaussianBlur(int(10 * S))))
    d.ellipse([ob[0] + int(6 * S), ob[1] + int(6 * S), ob[0] + int(50 * S), ob[1] + int(50 * S)], fill=(6, 10, 18), outline=BLUE, width=max(2, S))
    d.text((ob[0] + int(74 * S), ob[1] + int(12 * S)), "NexaChat", font=font(int(22 * S), True), fill=WHITE)

    # bubbles: AI left, user right
    d = ImageDraw.Draw(img)
    ay = ob[1] + int(90 * S)
    ai_text_w = int(700 * S)
    rounded(d, [ca[0] + int(30 * S), ay, ca[0] + int(30 * S) + ai_text_w, ay + int(120 * S)], int(16 * S), fill=(22, 30, 50, 255))
    for i, line in enumerate(["Here's an optimized version of your", "component using React.memo and a", "custom hook for data fetching:"]):
        d.text((ca[0] + int(52 * S), ay + int(18 + i * 30) * S), line, font=font(int(21 * S)), fill=(203, 213, 225))
    # code bubble
    cy = ay + int(140 * S)
    rounded(d, [ca[0] + int(30 * S), cy, ca[0] + int(30 * S) + ai_text_w, cy + int(130 * S)], int(16 * S), fill=(9, 13, 24, 255), outline=(0, 212, 255, 60), width=max(2, S))
    code_lines = [("const", BLUE), (" { data } ", WHITE), ("=", GREY), (" useData", (247, 140, 120)), ("(/api/stats)", (140, 220, 160))]
    x = ca[0] + int(52 * S)
    for txt, col in code_lines:
        d.text((x, cy + int(20 * S)), txt, font=font(int(21 * S)), fill=col)
        x += d.textlength(txt, font=font(int(21 * S))) + int(6 * S)
    for i, line in enumerate(["  memo(() => <Chart data={data} />)", "]"]):
        d.text((ca[0] + int(52 * S), cy + int((52 + i * 30)) * S), line, font=font(int(21 * S)), fill=(203, 213, 225))
    # user bubble
    uy = cy + int(170 * S)
    uw = int(560 * S)
    rounded(d, [ca[2] - int(30 * S) - uw, uy, ca[2] - int(30 * S), uy + int(84 * S)], int(16 * S), fill=BLUE + (255,))
    d.text((ca[2] - int(30 - uw + 22) * S, uy + int(28 * S)), "Perfect — ship it! 🚀", font=font(int(22 * S), True), fill=(8, 12, 20))
    # input bar
    ib = [ca[0] + int(26 * S), ca[3] - int(96 * S), ca[2] - int(26 * S), ca[3] - int(26 * S)]
    rounded(d, ib, int(24 * S), fill=(18, 26, 44, 255), outline=(90, 110, 150, 120), width=max(2, S))
    d.text((ib[0] + int(26 * S), ib[1] + int(20 * S)), "Ask NexaChat anything…", font=font(int(22 * S)), fill=(110, 125, 150))
    send = [ib[2] - int(84 * S), ib[1] + int(12 * S), ib[2] - int(12 * S), ib[3] - int(12 * S)]
    rounded(d, send, int(16 * S), fill=BLUE + (255,))
    d.polygon([(send[0] + int(16 * S), send[1] + int(12 * S)), (send[0] + int(16 * S), send[1] + int(36 * S)), (send[2] - int(12 * S), send[1] + int(24 * S))], fill=(8, 12, 20))

    save(img, "/home/user/Wambete-Benjamin-portfolio-/public/images/project-6.png", 1600, 1000)

# ---------------------------------------------------------------- blog covers
def blog1():
    W, H = 1200, 750
    S = SS
    w, h = W * S, H * S
    img = base_canvas(w, h, glows=((0.8, 0.2, 460, 85), (0.15, 0.85, 400, 55)))
    d = ImageDraw.Draw(img)
    # terminal window
    tw = [int(170 * S), int(150 * S), w - int(170 * S), h - int(150 * S)]
    rounded(d, tw, int(22 * S), fill=(12, 17, 30, 250), outline=(0, 212, 255, 80), width=max(2, S))
    d.rectangle([tw[0], tw[1] + int(54 * S), tw[2], tw[1] + int(54 * S) + int(2 * S)], fill=(30, 41, 66))
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        cx = tw[0] + int((34 + i * 32) * S)
        d.ellipse([cx - int(8 * S), tw[1] + int(27 * S) - int(8 * S), cx + int(8 * S), tw[1] + int(27 * S) + int(8 * S)], fill=c)
    lines = [("$ npm install future", (140, 220, 160)), ("✔ WebAssembly modules loaded", GREY), ("✔ Edge functions deployed", GREY), ("→ building the web of 2026…", BLUE), ("warning: AI-assisted dev is the norm", (255, 189, 46))]
    y = tw[1] + int(100 * S)
    for txt, col in lines:
        d.text((tw[0] + int(48 * S), y), txt, font=font(int(30 * S), "$" in txt), fill=col)
        y += int(62 * S)
    save(img, "/home/user/Wambete-Benjamin-portfolio-/public/images/blog-1.png", W, H)

def blog2():
    W, H = 1200, 750
    S = SS
    w, h = W * S, H * S
    img = base_canvas(w, h, glows=((0.5, 0.5, 480, 70), (0.1, 0.1, 380, 45)))
    d = ImageDraw.Draw(img)
    # speed gauge
    cx, cy, r = int(w * 0.5), int(h * 0.52), int(240 * S)
    d.arc([cx - r, cy - r, cx + r, cy + r], 150, 390, fill=(30, 41, 66), width=int(34 * S))
    d.arc([cx - r, cy - r, cx + r, cy + r], 150, 275, fill=BLUE, width=int(34 * S))
    ang = math.radians(275)
    d.ellipse([cx + int(r * 0.72 * math.cos(ang)) - int(12 * S), cy + int(r * 0.72 * math.sin(ang)) - int(12 * S),
               cx + int(r * 0.72 * math.cos(ang)) + int(12 * S), cy + int(r * 0.72 * math.sin(ang)) + int(12 * S)], fill=WHITE)
    d.text((cx - int(150 * S), cy - int(40 * S)), "100", font=font(int(110 * S), True), fill=WHITE, anchor=None)
    tw = d.textlength("100", font=font(int(110 * S), True))
    d.text((cx - tw / 2 + int(60 * S), cy + int(70 * S)), "/100", font=font(int(44 * S)), fill=GREY)
    # speed lines
    for i in range(7):
        x = int((90 + i * 30) * S) if i % 2 == 0 else int((w - 90 - i * 30) * S - int(160 * S))
        yy = int((120 + i * 78) * S)
        ln = random.randint(120, 260) * S
        d.rounded_rectangle([x, yy, x + ln, yy + int(10 * S)], radius=int(5 * S), fill=(0, 212, 255, 70))
    save(img, "/home/user/Wambete-Benjamin-portfolio-/public/images/blog-2.png", W, H)

def blog3():
    W, H = 1200, 750
    S = SS
    w, h = W * S, H * S
    img = base_canvas(w, h, glows=((0.25, 0.3, 420, 70), (0.85, 0.85, 420, 55)))
    d = ImageDraw.Draw(img)
    # floating UI cards
    cards = [
        (0.16, 0.18, 0.42, 0.34, 0, 255),
        (0.42, 0.34, 0.68, 0.62, -6, 235),
        (0.28, 0.52, 0.56, 0.82, 4, 215),
    ]
    for gx, gy, gx2, gy2, rot, alpha in cards:
        x1, y1 = int(w * gx), int(h * gy)
        x2, y2 = int(w * gx2), int(h * gy2)
        sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).rounded_rectangle([x1, y1, x2, y2], radius=int(20 * S), fill=(0, 0, 0, 130))
        img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(int(24 * S))))
        rounded(d, [x1, y1, x2, y2], int(20 * S), fill=(15, 21, 37, 252), outline=(0, 212, 255, 60), width=max(2, S))
    # palette swatches on first card
    c1 = (int(w * 0.16), int(h * 0.18), int(w * 0.42), int(h * 0.34))
    for i, col in enumerate([BLUE, (124, 58, 237), (247, 140, 120), (255, 215, 0), (39, 201, 63)]):
        cx = c1[0] + int((50 + i * 64) * S)
        d.ellipse([cx - int(22 * S), c1[1] + int(46 * S) - int(22 * S), cx + int(22 * S), c1[1] + int(46 * S) + int(22 * S)], fill=col)
    d.text((c1[0] + int(44 * S), c1[1] + int(96 * S)), "design-tokens.json", font=font(int(24 * S), True), fill=GREY)
    # cursor on second card
    c2 = (int(w * 0.42), int(h * 0.34), int(w * 0.68), int(h * 0.62))
    d.text((c2[0] + int(40 * S), c2[1] + int(34 * S)), "Checkout Flow v2", font=font(int(26 * S), True), fill=WHITE)
    for i in range(3):
        rounded(d, [c2[0] + int(40 * S), c2[1] + int((92 + i * 52)) * S, c2[2] - int(40 + (i * 30)) * S, c2[1] + int((122 + i * 52)) * S], int(10 * S), fill=(26, 36, 60, 255))
    px, py = c2[2] - int(90 * S), c2[3] - int(80 * S)
    d.polygon([(px, py), (px + int(34 * S), py + int(44 * S)), (px + int(16 * S), py + int(46 * S)), (px + int(22 * S), py + int(70 * S))], fill=WHITE, outline=(10, 14, 23))
    # third card text
    c3 = (int(w * 0.28), int(h * 0.52), int(w * 0.56), int(h * 0.82))
    d.text((c3[0] + int(40 * S), c3[1] + int(30 * S)), "WCAG  AA  ✓", font=font(int(30 * S), True), fill=BLUE)
    for i in range(4):
        rounded(d, [c3[0] + int(40 * S), c3[1] + int((88 + i * 46)) * S, c3[2] - int(40) * S, c3[1] + int((112 + i * 46)) * S], int(9 * S), fill=(26, 36, 60, 255))
    save(img, "/home/user/Wambete-Benjamin-portfolio-/public/images/blog-3.png", W, H)

# ---------------------------------------------------------------- OG image
def og():
    W, H = 1200, 630
    S = SS
    w, h = W * S, H * S
    img = base_canvas(w, h, glows=((0.85, 0.25, 520, 95), (0.1, 0.85, 460, 60)))
    d = ImageDraw.Draw(img)
    dot_grid(img, step=int(44 * S), radius=max(1, S))
    d = ImageDraw.Draw(img)
    # logo mark
    bx = int(90 * S)
    by = int(88 * S)
    rounded(d, [bx, by, bx + int(120 * S), by + int(120 * S)], int(28 * S), fill=(0, 212, 255, 30), outline=BLUE, width=int(3 * S))
    d.text((bx + int(30 * S), by + int(28 * S)), "AM", font=font(int(54 * S), True), fill=BLUE)
    d.text((bx, by + int(160 * S)), "AM Dev", font=font(int(64 * S), True), fill=BLUE)
    # big title
    d.text((int(90 * S), int(300 * S)), "Wambete Benjamin", font=font(int(84 * S), True), fill=WHITE)
    d.text((int(92 * S), int(408 * S)), "Full-Stack Web Developer", font=font(int(46 * S)), fill=GREY)
    # chips
    chips = ["React", "Next.js", "Node.js", "UI/UX"]
    x = int(92 * S)
    for c in chips:
        cw = d.textlength(c, font=font(int(28 * S), True)) + int(52 * S)
        rounded(d, [x, int(508 * S), x + cw, int(508 + 60) * S], int(30 * S), fill=(0, 212, 255, 28), outline=(0, 212, 255, 90), width=max(2, S))
        d.text((x + int(26 * S), int(524 * S)), c, font=font(int(28 * S), True), fill=(120, 230, 255))
        x += cw + int(22 * S)
    # nairobi tag
    d.text((int(92 * S), int(596 * S)), "Nairobi, Kenya", font=font(int(30 * S)), fill=(100, 116, 139))
    save(img, "/home/user/Wambete-Benjamin-portfolio-/public/images/og-image.png", W, H)

project6()
blog1()
blog2()
blog3()
og()
