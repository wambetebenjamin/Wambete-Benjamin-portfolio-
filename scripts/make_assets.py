#!/usr/bin/env python3
"""Generate portfolio graphics using the Wambete Benjamin light brand palette."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math, random

BG = (247, 251, 252)       # #f7fbfc
BLUE = (0, 155, 183)       # #009BB7
BLUE_DIM = (0, 155, 183, 90)
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
    rounded(d, win, int(24 * S), fill=(13, 18, 30, 255), outline=(0, 155, 183, 70), width=max(2, S))
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
            rounded(d, [sb[0] + int(14 * S), y, sb[2] - int(14 * S), y + ih], int(12 * S), fill=(0, 155, 183, 36))
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
    rounded(d, [ca[0] + int(30 * S), cy, ca[0] + int(30 * S) + ai_text_w, cy + int(130 * S)], int(16 * S), fill=(9, 13, 24, 255), outline=(0, 155, 183, 60), width=max(2, S))
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
    d.text((ca[2] - int(30 - uw + 22) * S, uy + int(28 * S)), "Perfect — ship it!", font=font(int(22 * S), True), fill=(8, 12, 20))
    # input bar
    ib = [ca[0] + int(26 * S), ca[3] - int(96 * S), ca[2] - int(26 * S), ca[3] - int(26 * S)]
    rounded(d, ib, int(24 * S), fill=(18, 26, 44, 255), outline=(90, 110, 150, 120), width=max(2, S))
    d.text((ib[0] + int(26 * S), ib[1] + int(20 * S)), "Ask NexaChat anything…", font=font(int(22 * S)), fill=(110, 125, 150))
    send = [ib[2] - int(84 * S), ib[1] + int(12 * S), ib[2] - int(12 * S), ib[3] - int(12 * S)]
    rounded(d, send, int(16 * S), fill=BLUE + (255,))
    d.polygon([(send[0] + int(16 * S), send[1] + int(12 * S)), (send[0] + int(16 * S), send[1] + int(36 * S)), (send[2] - int(12 * S), send[1] + int(24 * S))], fill=(8, 12, 20))

    save(img, "/home/user/Wambete-Benjamin-portfolio-/public/images/project-6.png", 1600, 1000)

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
    d.text((bx + int(28 * S), by + int(28 * S)), "WB", font=font(int(48 * S), True), fill=BLUE)
    d.text((bx, by + int(160 * S)), "Wambete Benjamin", font=font(int(58 * S), True), fill=BLUE)
    # big title
    d.text((int(90 * S), int(300 * S)), "Wambete Benjamin", font=font(int(84 * S), True), fill=WHITE)
    d.text((int(92 * S), int(408 * S)), "Full-Stack Web Developer", font=font(int(46 * S)), fill=GREY)
    # chips
    chips = ["React", "Next.js", "Node.js", "UI/UX"]
    x = int(92 * S)
    for c in chips:
        cw = d.textlength(c, font=font(int(28 * S), True)) + int(52 * S)
        rounded(d, [x, int(508 * S), x + cw, int(508 + 60) * S], int(30 * S), fill=(0, 155, 183, 28), outline=(0, 155, 183, 90), width=max(2, S))
        d.text((x + int(26 * S), int(524 * S)), c, font=font(int(28 * S), True), fill=(120, 230, 255))
        x += cw + int(22 * S)
    # nairobi tag
    d.text((int(92 * S), int(596 * S)), "Nairobi, Kenya", font=font(int(30 * S)), fill=(100, 116, 139))
    save(img, "/home/user/Wambete-Benjamin-portfolio-/public/images/og-image.png", W, H)

project6()
og()
