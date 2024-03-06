# RPNCalc

A Reverse Polish Notation (RPN) calculator app produced with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/)

## Introduction

Reverse Polish Notation (RPN) is a mathematical notation in which every operator follows all of its operands. It is also known as postfix notation. The description "Polish" refers to the nationality of logician Jan Lukasiewicz, who invented (prefix) Polish notation in the 1920's.

### Examples

| Infix Notation          | Reverse Polish Notation |
| ----------------------- | ----------------------- |
| 1+2                     | 1 2 +                   |
| 1+2+3                   | 1 2 + 3 +               |
| 5(1+2+3)                | 5 1 2 + 3 + ×           |
| (5(1+2+3))-8            | 5 1 2 + 3 + × 8 -       |
| ((5(1+2+3))-8)÷13       | 5 1 2 + 3 + × 8 - 13 ÷  |

## Motivation

RPN is faster because it:

- Eliminates parenthesized expressions
- Reduces the number of keystrokes and operations needed to perform typical calculations

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