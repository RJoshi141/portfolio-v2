/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Helvetica Neue"', '"Helvetica"', 'Arial', 'sans-serif'],
        'heading': ['Tanker', '"Helvetica Neue"', '"Helvetica"', 'Arial', 'sans-serif'],
      },
      colors: {
        carnation: "#f46565", // 🌸 accent color
        "card-light": "#fef0f0", // 💡 light mode card bg
        "card-dark": "#161618", // 🌙 dark mode card bg
        "tech-dark": "#000000", // dark mode for tech stack
        teal: {
          600: "#f46565", // alias teal
        },
        cyan: {
          400: "#f46565", // alias cyan
        },
      },
    },
  },
  plugins: [],
};
