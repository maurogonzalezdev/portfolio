/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        "fira-code": ["Fira Code", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
