import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070B14",
          900: "#0F172A",
          850: "#131E35",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
        emerald: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        primary: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          dark: "#0A0F1D",
        },
        accent: {
          emerald: "#10B981",
          blue: "#3B82F6",
          amber: "#F59E0B",
          indigo: "#6366F1",
        },
        gold: {
          50: "#FAF7F2",
          100: "#F4EFE6",
          200: "#E8DEC9",
          300: "#DBCBAA",
          400: "#CDB68B",
          500: "#C5A880",
          600: "#B49363",
          700: "#987848",
          800: "#765C37",
          900: "#554228",
        },
        obsidian: {
          950: "#04060A",
          900: "#070A11",
          850: "#0B0F19",
          800: "#101625",
          700: "#182236",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Charter", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Newsreader", "Charter", "Georgia", "serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.37)",
        "glow-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.3)",
        "glow-blue": "0 0 25px -5px rgba(59, 130, 246, 0.3)",
        "glow-green-ring": "0 0 0 4px rgba(16, 185, 129, 0.35), 0 0 20px 4px rgba(16, 185, 129, 0.2)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 20px 35px -5px rgba(15, 23, 42, 0.12), 0 10px 15px -3px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-mesh": "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "ticker-scroll": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glow-ring-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(16,185,129,0.6), 0 0 15px 2px rgba(16,185,129,0.3)",
          },
          "50%": {
            boxShadow: "0 0 0 8px rgba(16,185,129,0), 0 0 25px 6px rgba(16,185,129,0.15)",
          },
        },
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "probability-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--fill-width)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "ticker-scroll": "ticker-scroll 35s linear infinite",
        "glow-ring-pulse": "glow-ring-pulse 2s ease-in-out infinite",
        "slide-up-fade": "slide-up-fade 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
