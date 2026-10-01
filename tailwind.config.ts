import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#1f1f1f",
          900: "#292929",
          800: "#333333",
          700: "#4a4a4a",
          600: "#666666",
        },
        electric: {
          DEFAULT: "#009BB7",
          50: "#e8fbff",
          100: "#cff6fb",
          200: "#9fe8f2",
          300: "#66d3e2",
          400: "#22b8cc",
          500: "#009bb7",
          600: "#047f96",
          700: "#0b6678",
        },
        gold: {
          DEFAULT: "#FAAD3B",
          50: "#fff8eb",
          100: "#feecd0",
          200: "#fed9a1",
          300: "#fdc36d",
          400: "#faad3b",
          500: "#f49a14",
          600: "#d9790a",
          700: "#b4590d",
        },
        paper: "#F2F3F5",
        whatsapp: "#25D366",
        whatsappDark: "#128C7E",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,155,183,0.16), transparent 68%), radial-gradient(ellipse 50% 35% at 8% 20%, rgba(250,173,59,0.16), transparent 70%)",
        "grid-fade":
          "linear-gradient(rgba(0,155,183,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,155,183,0.08) 1px, transparent 1px)",
      },
      boxShadow: {
        "glow-sm": "0 12px 30px rgba(0,155,183,0.18)",
        glow: "0 18px 55px rgba(0,155,183,0.22)",
        "glow-lg": "0 28px 90px rgba(0,155,183,0.26)",
        card: "0 18px 55px rgba(31, 31, 31, 0.10)",
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out 1.5s infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(1.9)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
