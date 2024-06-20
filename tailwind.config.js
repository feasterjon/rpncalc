/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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

