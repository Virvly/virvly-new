/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#00759F",
          "blue-deep": "#053349",
          orange: "#F78C1E",
          "orange-hover": "#e07f13",
          charcoal: "#1C1C1C",
          ink: "#111111",
          "grey-1": "#6B6F72",
          "grey-2": "#9AA0A4",
          "grey-line": "rgba(28,28,28,0.10)",
          paper: "#FFFFFF",
          "paper-2": "#F6F7F8",
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        max: "1180px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(.22,.61,.36,1)",
      },
    },
  },
  plugins: [],
};
