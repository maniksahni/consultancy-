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
          DEFAULT: "#F2EDE4",
          50: "#FAF7F2",
          100: "#F2EDE4",
          200: "#E6DDD0",
        },
        ink: {
          DEFAULT: "#14120C",
          soft: "#2C271E",
          muted: "#4A4237",
        },
        terra: {
          DEFAULT: "#C25B1A",
          light: "#D97035",
          dark: "#9E4812",
        },
        stone: {
          DEFAULT: "#786B5E",
          light: "#A09286",
          dark: "#584D42",
        },
        sand: "#E0D9CE",
        // keep legacy tokens so CountryFlag and other untouched components still compile
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
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "Cambria", "serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
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
