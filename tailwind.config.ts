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
          950: "#0f172a",
          900: "#172033",
          800: "#243044",
          700: "#334155",
          600: "#475569",
        },
        electric: {
          DEFAULT: "#009BB7",
          50: "#e8fbff",
          100: "#c8f3fa",
          200: "#93e5f0",
          300: "#55d1df",
          400: "#18b8cc",
          500: "#009bb7",
          600: "#087f99",
          700: "#076799",
        },
        brandAmber: "#FAAD3B",
        brandBlue: "#076799",
        campaignRed: "#F44336",
        paper: "#F7FBFC",
        whatsapp: "#25D366",
        whatsappDark: "#128C7E",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,155,183,0.16), transparent), radial-gradient(ellipse 45% 35% at 80% 5%, rgba(250,173,59,0.12), transparent)",
        "grid-fade":
          "linear-gradient(rgba(0,155,183,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,155,183,0.08) 1px, transparent 1px)",
      },
      boxShadow: {
        "glow-sm": "0 10px 24px rgba(0,155,183,0.18)",
        glow: "0 18px 45px rgba(0,155,183,0.2)",
        "glow-lg": "0 26px 70px rgba(0,155,183,0.25)",
        card: "0 18px 45px rgba(15, 23, 42, 0.10)",
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
