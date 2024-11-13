import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "412px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-1": "#ED1641",
        "color-2": "#870D25",
      },
      width: {
        "width-1": "758px",
      },
      height: {
        "height-1": "939px",
        "height-2": "570px",
      },
      fontFamily: {
        Krona: ["Krona One", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
