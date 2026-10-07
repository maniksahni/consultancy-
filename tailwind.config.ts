import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
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
          DEFAULT: "#FBFAF7",
          50: "#FFFFFF",
          100: "#FBFAF7",
          200: "#EDF1F3",
        },
        ink: {
          DEFAULT: "#152126",
          soft: "#26373B",
          muted: "#465453",
        },
        terra: {
          DEFAULT: "#0F6B5D",
          light: "#8BD0C1",
          dark: "#0B554A",
        },
        stone: {
          DEFAULT: "#6E746D",
          light: "#92978E",
          dark: "#525D56",
        },
        sand: "#E7DECE",
        // keep legacy tokens so CountryFlag and other untouched components still compile
        gold: {
          50: "#FCFAF5",
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
          950: "#080706",
          900: "#0E0C0A",
          850: "#141210",
          800: "#1E1A17",
          700: "#2C2622",
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
