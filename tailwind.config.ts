import { brand } from "./src/config/brand";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "space-1": "8px",
        "space-2": "16px",
        "space-3": "24px",
        "space-4": "32px",
        "space-5": "48px",
        "space-6": "64px",
        "space-7": "96px",
      },
      colors: {
        cream: {
          DEFAULT: `var(--color58)`,
          50: `var(--color4)`,
          100: `var(--color58)`,
          200: `var(--color232)`,
        },
        ink: {
          DEFAULT: `var(--color59)`,
          soft: `var(--color233)`,
          muted: `var(--color234)`,
        },
        terra: {
          DEFAULT: `var(--color1)`,
          light: `var(--color57)`,
          dark: `var(--color1)`,
        },
        stone: {
          DEFAULT: `var(--color235)`,
          light: `var(--color236)`,
          dark: `var(--color237)`,
        },
        sand: `var(--color10)`,
        // keep legacy tokens so CountryFlag and other untouched components still compile
        gold: {
          50: `var(--color4)`,
          100: `var(--color238)`,
          200: `var(--color239)`,
          300: `var(--color240)`,
          400: `var(--color241)`,
          500: `var(--color242)`,
          600: `var(--color243)`,
          700: `var(--color244)`,
          800: `var(--color245)`,
          900: `var(--color246)`,
        },
        obsidian: {
          950: `var(--color247)`,
          900: `var(--color248)`,
          850: `var(--color249)`,
          800: `var(--color250)`,
          700: `var(--color251)`,
        },
      },
      fontFamily: {
        display: [brand.fonts.display],
        serif: [brand.fonts.display],
        sans: [brand.fonts.body],
      },
      keyframes: {
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        "slide-up-fade": "slide-up-fade 0.3s ease-out forwards",
        marquee: "marquee 28s linear infinite",
        ping: "ping 1s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
