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
        cinematic: {
          bg: "#020617",
          slate: "#94a3b8",
          white: "#ffffff",
        },
        nm: {
          bg: "var(--nm-bg)",
          highlight: "var(--nm-highlight)",
          shadow: "var(--nm-shadow)",
          text: "var(--nm-text)",
          accent: "var(--nm-accent)",
        },
      },
      fontFamily: {
        cabinet: ["Cabinet Grotesk", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
        general: ["General Sans", "sans-serif"],
      },
      animation: {
        portal: "portalPulse 8s ease-in-out infinite",
        "ring-slow": "ringRotate 20s linear infinite",
        "ring-slower": "ringRotate 30s linear infinite",
        marquee: "marquee 40s linear infinite",
        float: "floatBob 3s ease-in-out infinite",
        shimmer: "waveShimmer 2.5s infinite",
        glow: "glowPulse 2s ease-in-out infinite",
        "count-pulse": "countPulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "cursorBlink 1s step-end infinite",
        notify: "notifyPulse 2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
