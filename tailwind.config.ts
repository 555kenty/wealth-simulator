import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nm: {
          bg: "var(--nm-bg)",
          highlight: "var(--nm-highlight)",
          shadow: "var(--nm-shadow)",
          text: "var(--nm-text)",
          "text-muted": "var(--nm-text-muted)",
        },
        industrial: {
          bg: "#EBEBE8",
          fg: "#18181B",
          accent: "#0066FF",
          border: "#D4D4D8",
        },
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        general: ["General Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      animation: {
        float: "floatBob 3s ease-in-out infinite",
        shimmer: "waveShimmer 2s infinite",
        glow: "glowPulse 2s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
        "status-pulse": "statusPulse 2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
