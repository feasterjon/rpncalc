/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--color-accent))',
          dark: 'hsl(var(--color-accent-dark))',
        },
        dark: 'hsl(var(--color-dark))',
        light: 'hsl(var(--color-light))',
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          dark: 'hsl(var(--color-primary-dark))',
          light: 'hsl(var(--color-primary-light))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))',
          dark: 'hsl(var(--color-secondary-dark))',
          light: 'hsl(var(--color-secondary-light))'
        },
        xdark: 'hsl(var(--color-xdark))',
        xlight: 'hsl(var(--color-xlight))'
      }
    },
  },
  plugins: [],
}

