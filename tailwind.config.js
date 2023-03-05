/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#F2D24E",
      },
      fontFamily: {
        sans: ["var(--font-sfpro)", "sans"],
        starjedi: ["var(--font-starjedi)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
