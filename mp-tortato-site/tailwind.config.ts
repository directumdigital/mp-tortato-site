import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0A0F3D",
          deep: "#0A0F3D",
          mid: "#2A3A8C",
          ice: "#EEF2FB",
        },
        ink: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-epilogue)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        card: "20px",
        xl2: "28px",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(10,15,61,0.18)",
        nav: "0 6px 24px -16px rgba(10,15,61,0.35)",
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 600ms ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
