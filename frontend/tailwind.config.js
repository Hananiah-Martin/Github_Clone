/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'github-dark': '#0d1117',
        'github-btn': '#238636',
        'github-border': '#30363d',
        'github-hover': '#1f6feb',
      },
    },
  },
  plugins: [],
}
