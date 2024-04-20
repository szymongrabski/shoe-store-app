/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#27233A',
        'secondary': '#505168',
        'third': '#B3C0A4',
        'btn-col': '#27233A',
        'btn-hover': '#B3C0A4'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}