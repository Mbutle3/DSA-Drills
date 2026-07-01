import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0d14",
        panel: "#121722",
        "panel-2": "#161c29",
        border: "#242b3d",
        text: "#e7e9f2",
        muted: "#8892a8",
        sky: "#7dd3fc",
        violet: "#c4b5fd",
        amber: "#ffb454",
        correct: "#7fd88f",
        incorrect: "#ff7b72",
        review: "#f9a8d4",
        favorite: "#fcd34d",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
