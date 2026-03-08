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
        primary: "#8B5CF6",
        secondary: "#06B6D4",
        accent: "#A855F7",
        dark: "#0a0a0f",
        "dark-card": "#111118",
        "dark-border": "#1e1e2e",
      },
      fontFamily: {
        mono: ["'Space Mono'", "monospace"],
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.7)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
