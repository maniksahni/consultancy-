import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        royal: { DEFAULT: "var(--royal)", deep: "var(--royal-deep)" },
        cream: {
          DEFAULT: "var(--cream)",
          50: "var(--cream)",
          100: "var(--cream)",
          200: "var(--line)",
        },
        gold: { DEFAULT: "var(--gold)", 500: "var(--gold)" },
        ink: { DEFAULT: "var(--ink)", muted: "var(--muted)" },
      },
      spacing: {
        "space-1": "var(--space-1)",
        "space-2": "var(--space-2)",
        "space-3": "var(--space-3)",
        "space-4": "var(--space-4)",
        "space-5": "var(--space-5)",
        "space-6": "var(--space-6)",
        "space-7": "var(--space-7)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
