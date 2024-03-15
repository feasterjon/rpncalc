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
        rpncalc: {
          primary: {
            DEFAULT: 'hsl(var(--rpncalc-color-primary))',
            dark: 'hsl(var(--rpncalc-color-primary-dark))',
            light: 'hsl(var(--rpncalc-color-primary-light))'
          },
          secondary: {
            DEFAULT: 'hsl(var(--rpncalc-color-secondary))',
            dark: 'hsl(var(--rpncalc-color-secondary-dark))',
            light: 'hsl(var(--rpncalc-color-secondary-light))'
          }
        }
      },
      screens: {
        'rpncalc-tall': {
          'raw': '(min-height: 1024px)'
        }
      }
    },
  },
  plugins: [],
}

