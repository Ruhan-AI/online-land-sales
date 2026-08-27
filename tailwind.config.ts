import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#102633",       // Primary ink
          blue: "#5E82AE",      // OLS Blue
          "blue-dark": "#43648E",
          "blue-light": "#EBF1F8",
          forest: "#2F6B4F",    // Evergreen
          "forest-dark": "#1E4734",
          "forest-light": "#EAF2EC",
          sand: "#F4EFE5",      // Warm sand
          "sand-light": "#FAF7F2",
          clay: "#C4653D",      // Hot-lot clay / alert
          "clay-light": "#FAF0EB",
          canvas: "#FAFBF8",    // Main canvas
          charcoal: "#1F2937",
          muted: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      borderRadius: {
        card: "16px",
        modal: "20px",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(16, 38, 51, 0.06), 0 2px 6px -1px rgba(16, 38, 51, 0.04)",
        card: "0 10px 30px -4px rgba(16, 38, 51, 0.08), 0 4px 10px -2px rgba(16, 38, 51, 0.04)",
        hover: "0 20px 40px -6px rgba(16, 38, 51, 0.12), 0 8px 16px -3px rgba(16, 38, 51, 0.06)",
        float: "0 25px 50px -12px rgba(16, 38, 51, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
