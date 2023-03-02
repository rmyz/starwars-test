/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        starjedi: ["var(--font-starjedi)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
