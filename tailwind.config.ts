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
          950: "#05070d",
          900: "#0a0e17",
          800: "#0f1524",
          700: "#161d31",
          600: "#1f2940",
        },
        electric: {
          DEFAULT: "#00D4FF",
          50: "#e6fbff",
          100: "#c6f5ff",
          200: "#8eecff",
          300: "#4fe2ff",
          400: "#00d4ff",
          500: "#00b8e0",
          600: "#0093b4",
          700: "#00728d",
        },
        whatsapp: "#25D366",
        whatsappDark: "#128C7E",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,255,0.18), transparent)",
        "grid-fade":
          "linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(0,212,255,0.25)",
        glow: "0 0 40px rgba(0,212,255,0.35)",
        "glow-lg": "0 0 80px rgba(0,212,255,0.45)",
        card: "0 8px 32px rgba(0, 0, 0, 0.45)",
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
