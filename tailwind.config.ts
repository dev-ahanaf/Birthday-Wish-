import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        romantic: {
          50: "#fff0f3",
          100: "#ffe3e8",
          400: "#ff4d6d",
          500: "#c9184a",
          600: "#a01a58",
          900: "#590d22",
        },
        elegant: {
          50: "#f8fafc",
          100: "#f1f5f9",
          400: "#fbbf24",
          500: "#d97706",
          800: "#1e1b4b",
          900: "#0f172a",
        },
        party: {
          50: "#fff7ed",
          400: "#ff007f",
          500: "#7928ca",
          600: "#00dfd8",
          900: "#180033",
        },
        playful: {
          50: "#faf5ff",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#c084fc",
          800: "#6b21a8",
        },
        minimal: {
          50: "#f9fafb",
          800: "#1e293b",
          900: "#0f172a",
          950: "#030712",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        handwriting: ["var(--font-dancing)", "cursive"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "bounce-gentle": "bounceGentle 3s infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "confetti-pop": "confettiPop 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(-4%)" },
          "50%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
