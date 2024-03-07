[![RPNCalc](public/logo.png "Reverse Polish Notation (RPN) Calculator")](https://feasterjon.github.io/rpncalc/)

A Reverse Polish Notation (RPN) calculator app produced with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/)

View the live version at [https://feasterjon.github.io/rpncalc/](https://feasterjon.github.io/rpncalc/).

## Introduction

Reverse Polish Notation (RPN) is a mathematical notation in which every operator follows all of its operands. It is also known as postfix notation. The description "Polish" refers to the nationality of logician Jan Lukasiewicz, who invented (prefix) Polish notation in the 1920's.

## Motivation

RPN is faster because it:

- Eliminates parenthesized expressions
- Reduces the number of keystrokes and operations needed to perform typical calculations

## Quick Start

1. Clone this repo.
2. Install dependencies: `npm install`
3. Start a local server and follow the prompts to view the code running in a browser: `npm start`

## Examples

| Infix Notation          | Reverse Polish Notation |
| ----------------------- | ----------------------- |
| 1+2                     | 1 2 +                   |
| 1+2+3                   | 1 2 + 3 +               |
| 5(1+2+3)                | 5 1 2 + 3 + ×           |
| (5(1+2+3))-8            | 5 1 2 + 3 + × 8 -       |
| ((5(1+2+3))-8)÷13       | 5 1 2 + 3 + × 8 - 13 ÷  |

## Keyboard Shortcuts

| Description-Example                | Shortcut    |
| ---------------------------------- | ----------- |
| Last Answer (ANS)                  | a           |
| Square Root (√x): √4 = 4 s         | s           |
| Exponentiation (bⁿ): 2×2×2 = 2 3 ^ | ^           |
| Archimedes' Constant (π)           | p           |
| Euler's Number (ℇ)                 | e           |
| The Golden Ratio (φ)               | f           |
| All Clear (AC)                     | Delete      |
| Access History                     | h           |
| Access Help                        | ?, Ctrl + / |

## Configuration

### Colors

The custom color palette is primarily customized using CSS custom properties (variables) in `src/index.css`. Essentially, two colors (`primary`, `secondary`) are all that need to be changed as they are referenced thereafter. These values are hue and saturation values (hence the `hs` suffix).

``` index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    ...
    --rpncalc-color-primary-hs: 207 73%;
    ...
    --rpncalc-color-secondary-hs: 12 72%;
    ...
  }
}
```

#### Tailwind CSS

The custom color palette is configured in the `tailwind.config.js` file in the namespace `rpncalc`.

``` tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...
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
      }
    }
  },
  ...
}
```