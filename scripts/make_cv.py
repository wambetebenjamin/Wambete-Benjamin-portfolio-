#!/usr/bin/env python3
"""Generate the CV PDF for Wambete Benjamin (public/cv/Wambete-Benjamin-CV.pdf)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

BLUE = HexColor("#00A8CC")
DARK = HexColor("#111827")
GREY = HexColor("#4B5563")
LIGHT = HexColor("#9CA3AF")
RULE = HexColor("#E5E7EB")

W, H = A4
M = 18 * mm
OUT = "/home/user/Wambete-Benjamin-portfolio-/public/cv/Wambete-Benjamin-CV.pdf"

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Wambete Benjamin — CV")
c.setAuthor("Wambete Benjamin")

y = H - M


def heading(text):
    global y
    c.setFont("Helvetica-Bold", 12.5)
    c.setFillColor(BLUE)
    c.drawString(M, y, text.upper())
    c.setStrokeColor(BLUE)
    c.setLineWidth(1.6)
    c.line(M, y - 4.5, M + 34, y - 4.5)
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.line(M + 38, y - 4.2, W - M, y - 4.2)
    y -= 13 * mm


def body(text, size=9.5, color=GREY, bold=False, x=M, leading=5.2 * mm):
    global y
    font = "Helvetica-Bold" if bold else "Helvetica"
    c.setFont(font, size)
    c.setFillColor(color)
    for line in text.split("\n"):
        c.drawString(x, y, line)
        y -= leading


def entry(title, meta, desc=None):
    global y
    c.setFont("Helvetica-Bold", 10.5)
    c.setFillColor(DARK)
    c.drawString(M, y, title)
    c.setFont("Helvetica", 9)
    c.setFillColor(LIGHT)
    c.drawRightString(W - M, y, meta)
    y -= 5.4 * mm
    if desc:
        c.setFont("Helvetica", 9.3)
        c.setFillColor(GREY)
        for line in desc.split("\n"):
            c.drawString(M, y, line)
            y -= 4.9 * mm
    y -= 2.6 * mm


# ---------------------------------------------------------------- header
c.setFillColor(DARK)
c.setFont("Helvetica-Bold", 26)
c.drawString(M, y, "Wambete Benjamin")
y -= 7.5 * mm
c.setFont("Helvetica", 12)
c.setFillColor(BLUE)
c.drawString(M, y, "Full-Stack Web Developer")
y -= 6.5 * mm
c.setFont("Helvetica", 9)
c.setFillColor(GREY)
c.drawString(M, y, "Nairobi, Kenya")
c.drawString(M + 32 * mm, y, "•  +254 112 272 061")
c.drawString(M + 78 * mm, y, "•  hello@wambetebenjamin.dev")
y -= 4.6 * mm
links = "GitHub: github.com/wambetebenjamin   |   LinkedIn: linkedin.com/in/wambetebenjamin   |   Portfolio: wambetebenjamin.dev"
c.setFont("Helvetica", 8.3)
c.setFillColor(LIGHT)
c.drawString(M, y, links)
y -= 8 * mm

# ---------------------------------------------------------------- profile
heading("Professional Profile")
body("Full-stack web developer with 5+ years of experience designing and building fast, accessible\n"
     "web applications for startups and SMEs across East Africa. I specialise in React, Next.js and\n"
     "Node.js, with a strong eye for UI/UX and a track record of shipping products that convert.")
y -= 4 * mm

# ---------------------------------------------------------------- experience
heading("Work Experience")
entry("Senior Full-Stack Developer — Savannah Digital, Nairobi",
      "2023 — Present",
      "• Lead development of client platforms serving 40k+ monthly users (Next.js, Node.js, MongoDB).\n"
      "• Cut average page load time by 55% through SSR, image optimisation and edge caching.\n"
      "• Mentor a team of 3 junior developers and run the internal code-review culture.")
entry("Frontend Developer — Tatu Tech Solutions, Nairobi",
      "2021 — 2023",
      "• Built 20+ responsive marketing sites and dashboards in React and Tailwind CSS.\n"
      "• Introduced a reusable component library that halved UI delivery time.")
entry("Freelance Web Developer",
      "2020 — 2021",
      "• Delivered e-commerce and booking platforms for 30+ small-business clients.")
y -= 2 * mm

# ---------------------------------------------------------------- skills
heading("Technical Skills")
body("Frontend:   HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, Tailwind CSS, Framer Motion", bold=False)
body("Backend:    Node.js, Express, Python, REST APIs, MongoDB, PostgreSQL, Firebase")
body("Design:     Figma, UI/UX Design, Design Systems, Prototyping")
body("DevOps:     Git, GitHub Actions, Vercel, Docker basics, testing (Jest, Cypress)")
y -= 4 * mm

# ---------------------------------------------------------------- projects
heading("Selected Projects")
entry("ShopSavannah — E-commerce platform",
      "React · Node · MongoDB",
      "Full-featured storefront + admin dashboard; M-Pesa and Stripe payments, 12k orders/month.")
entry("NexaChat — AI chat SaaS",
      "Next.js · OpenAI · PostgreSQL",
      "AI assistant with usage metering and team workspaces; 500+ sign-ups in the first month.")
y -= 2 * mm

# ---------------------------------------------------------------- education
heading("Education & Certifications")
entry("BSc Computer Science — University of Nairobi", "2017 — 2020")
entry("Meta Front-End Developer Professional Certificate — Coursera", "2022")
entry("freeCodeCamp — JavaScript Algorithms & Data Structures", "2020")

c.showPage()
c.save()
print("CV written to", OUT)
