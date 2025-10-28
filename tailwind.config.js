/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <-- keep this and only this export
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
