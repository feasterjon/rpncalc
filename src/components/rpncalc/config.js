export const config = {
  input: {
    buttons: {
      data: [
        {
          id: 1,
          label: '\u221a',
          type: 'fn',
          value: 's'
        },
        {
          id: 2,
          label: 'AC',
          type: 'del',
          value: 'Delete'
        },
        {
          id: 3,
          label: '\u232B',
          type: 'operator',
          value: 'Backspace'
        },
        {
          id: 4,
          label: 'ANS',
          type: 'operator',
          value: 'a'
        },
        {
          id: 5,
          label: '\u00F7',
          type: 'operator',
          value: '/'
        },
        {
          id: 6,
          type: 'fn',
          value: '^'
        },
        {
          id: 7,
          value: '7'
        },
        {
          id: 8,
          value: '8'
        },
        {
          id: 9,
          value: '9'
        },
        {
          id: 10,
          label: '\u00D7',
          type: 'operator',
          value: '*'
        },
        {
          id: 11,
          label: '\u03C0',
          name: 'Archimedes\' Constant',
          type: 'fn',
          value: 'p',
          valueMath: Math.PI
        },
        {
          id: 12,
          value: '4'
        },
        {
          id: 13,
          value: '5'
        },
        {
          id: 14,
          value: '6'
        },
        {
          id: 15,
          type: 'operator',
          value: '-'
        },
        {
          id: 16,
          label: '\u2107',
          name: 'Euler\'s Number',
          type: 'fn',
          value: 'e',
          valueMath: Math.E
        },
        {
          id: 17,
          value: '1'
        },
        {
          id: 18,
          value: '2'
        },
        {
          id: 19,
          value: '3'
        },
        {
          id: 20,
          type: 'operator',
          value: '+'
        },
        {
          id: 21,
          label: '\u03C6',
          name: 'The Golden Ratio',
          type: 'fn',
          value: 'f',
          valueMath: (1 + Math.sqrt(5)) / 2
        },
        {
          id: 22,
          value: '0'
        },
        {
          id: 23,
          label: '\u00B7',
          value: '.'
        },
        {
          id: 24,
          label: 'SPC',
          value: ' '
        },
        {
          id: 25,
          label: '\u23ce',
          type: 'enter',
          value: 'Enter'
        }
      ],
      styles: { // active is repeated in main to ensure active styles are applied onClick
        del: {
          active: 'bg-secondary',
          main: 'active:bg-secondary bg-secondary-light border-2 border-secondary-light'
        },
        enter: {
          active: 'bg-primary',
          main: 'active:bg-primary bg-primary-light border-2 border-primary-light'
        },
        fn: {
          active: 'bg-gray-400',
          main: 'active:bg-gray-400 border-2 border-gray-300'
        },
        main: {
          active: 'bg-gray-400',
          main: 'active:bg-gray-400 bg-gray-300 border-2 border-gray-300'
        },
        operator: {
          active: 'bg-primary',
          main: 'active:bg-primary border-2 border-primary-light'
        }
      }
    }
  }
};