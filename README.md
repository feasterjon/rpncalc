<p>
  <a href="https://app.jonfeaster.com/rpncalc/" target="_blank">
    <img alt="RPN Calculator" src="https://raw.githubusercontent.com/feasterjon/rpncalc/main/public/images/logo.svg" width="60%" />
  </a>
</p>

A Reverse Polish Notation (RPN) calculator Progressive Web App (PWA) produced with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/)

View the live version at [https://app.jonfeaster.com/rpncalc/](https://app.jonfeaster.com/rpncalc/).

## Introduction

Reverse Polish Notation (RPN) is a mathematical notation in which every operator follows all of its operands. It is also known as postfix notation. The description "Polish" refers to the nationality of logician Jan Lukasiewicz, who invented (prefix) Polish notation in the 1920's.

## Motivation

RPN is faster because it:

- Eliminates parenthesized expressions
- Reduces the number of keystrokes and operations needed to perform typical calculations

## Quick Start

### Explore On Your Device

RPN Calculator is a **Progressive Web App (PWA)** that provides a user experience like that of a platform-specific app. In addition to being accessed directly from the web it can also be *installed on your device.*

1. Visit the app at [https://app.jonfeaster.com/rpncalc/](https://app.jonfeaster.com/rpncalc/).
2. **Check for Install Option:**
    - **Desktop Browsers:** Look for an "Install" button or menu option in the address bar (usually on the right side).
    - **Mobile Browsers:** You might see a banner or prompt asking if you want to add the website to your home screen.
3. **Click "Install":** Follow the on-screen prompts to complete the installation. These prompts may vary slightly depending on the browser.

### Explore Locally (for Developers)

1. Clone this repo.
2. Install dependencies: `npm install`
3. Start a local server and follow the prompts to view the code running in a browser: `npm run dev`

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

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    ...
    --rpncalc-color-primary-hs: 207deg 73%;
    ...
    --rpncalc-color-secondary-hs: 12deg 72%;
    ...
  }
}
```

#### Tailwind CSS

The custom color palette is configured in the `tailwind.config.ts` file in the field `rpncalc`.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  ...
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
  ...
};
...
```
