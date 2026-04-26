/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Livvic", "system-ui", "sans-serif"],
        body: ["Montserrat", "system-ui", "sans-serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
        // Brand v2.0
        display: ['"EB Garamond"', "Georgia", "serif"],
        mono: ['"Spline Sans Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        "playlab-blue": "#122134",
        // Brand v2.0
        brand: {
          ink: "#0c0f14",
          bg: "#fbf9f6",
          cream: "#eff0e5",
          white: "#ffffff",
        },
        accent: {
          yellow: "#feffa0",
          lemon: "#fff46c",
          lime: "#d4fd63",
          blue: "#a4beeb",
          royal: "#356fe5",
          navy: "#283f88",
          pink: "#efd8ef",
          rose: "#f4baef",
          orange: "#ed6e2d",
          red: "#ce463f",
          forest: "#398239",
          green: "#96be53",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
