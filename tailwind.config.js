/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          dark: 'hsl(var(--color-primary-dark))',
          light: 'hsl(var(--color-primary-light))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))',
          dark: 'hsl(var(--color-secondary-dark))',
          light: 'hsl(var(--color-secondary-light))'
        }
      }
    },
  },
  plugins: [],
}

