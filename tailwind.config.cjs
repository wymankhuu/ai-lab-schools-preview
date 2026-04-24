/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Livvic", "system-ui", "sans-serif"],
        body: ["Montserrat", "system-ui", "sans-serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      colors: {
        "playlab-blue": "#122134",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
