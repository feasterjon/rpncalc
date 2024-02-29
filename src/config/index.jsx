export const CONFIG = {
  help: {
    sections: [
      {
        data: [
          {
            data: 'Reverse Polish Notation (RPN) is a mathematical notation in which every operator follows all of its operands. It is also known as postfix notation. The description "Polish" refers to the nationality of logician Jan Lukasiewicz, who invented (prefix) Polish notation in the 1920\'s.',
            type: 'text'
          }
        ],
        id: 1
      },
      {
        data: [
          {
            data: {
              data: [
                {
                  data: [
                    '1+2',
                    '1 2 +'
                  ],
                  id: 1
                },
                {
                  data: [
                    '1+2+3',
                    '1 2 + 3 +'
                  ],
                  id: 2
                },
                {
                  data: [
                    '5(1+2+3)',
                    '5 1 2 + 3 + \u00D7'
                  ],
                  id: 3
                },
                {
                  data: [
                    '(5(1+2+3))-8',
                    '5 1 2 + 3 + \u00D7 8 -'
                  ],
                  id: 4
                },
                {
                  data: [
                    '((5(1+2+3))-8)\u00F713',
                    '5 1 2 + 3 + \u00D7 8 - 13 \u00F7'
                  ],
                  id: 5
                }
              ],
              headings: [
                {
                  id: 1,
                  name: 'Infix Notation'
                },
                {
                  id: 2,
                  name: 'Reverse Polish Notation'
                }
              ],
              type: 'c'
            },
            type: 'table'
          }
        ],
        heading: 'Examples',
        id: 2
      },
      {
        data: [
          {
            data: {
              data: [
                {
                  data: [
                    'Last Answer (ANS)',
                    'a'
                  ],
                  id: 1
                },
                {
                  data: [
                    'Square Root (\u221ax): \u221a4 = 4 s',
                    's'
                  ],
                  id: 2
                },
                {
                  data: [
                    'Exponentiation (b\u207F): 2\u00D72\u00D72 = 2 3 ^',
                    '^'
                  ],
                  id: 3
                },
                {
                  data: [
                    'Archimedes\' Constant (\u03C0)',
                    'p'
                  ],
                  id: 4
                },
                {
                  data: [
                    'Euler\'s Number (\u2107)',
                    'e'
                  ],
                  id: 5
                },
                {
                  data: [
                    'The Golden Ratio (\u03C6)',
                    'f'
                  ],
                  id: 6
                },
                {
                  data: [
                    'All Clear (AC)',
                    'Delete'
                  ],
                  id: 7
                },
                {
                  data: [
                    'Access History',
                    'h'
                  ],
                  id: 8
                },
                {
                  data: [
                    'Access Help',
                    '?, Ctrl + /'
                  ],
                  id: 9
                }
              ],
              headings: [
                {
                  id: 1,
                  name: 'Description-Example'
                },
                {
                  id: 2,
                  name: 'Shortcut'
                }
              ],
              type: 'c'
            },
            type: 'table'
          }
        ],
        heading: 'Keyboard Shortcuts',
        id: 3
      }
    ],
    title: 'Help'
  },
  input: {
    buttons: {
      data: [
        {
          id: 1,
          label: '\u221a',
          order: 'sm:order-[1]',
          type: 'fn',
          value: 's'
        },
        {
          id: 2,
          order: 'sm:order-[6]',
          type: 'fn',
          value: '^'
        },
        {
          id: 3,
          label: '\u03C0',
          name: 'Archimedes\' Constant',
          order: 'sm:order-[11]',
          type: 'fn',
          value: 'p',
          valueMath: Math.PI
        },
        {
          id: 4,
          label: '\u2107',
          name: 'Euler\'s Number',
          order: 'sm:order-[16]',
          type: 'fn',
          value: 'e',
          valueMath: Math.E
        },
        {
          id: 5,
          label: '\u03C6',
          name: 'The Golden Ratio',
          order: 'sm:order-[21]',
          type: 'fn',
          value: 'f',
          valueMath: (1 + Math.sqrt(5)) / 2
        },
        {
          id: 6,
          label: 'AC',
          order: 'sm:order-[2]',
          type: 'del',
          value: 'Delete'
        },
        {
          icon: 'backspace',
          id: 7,
          label: '\u232B',
          order: 'sm:order-[3]',
          type: 'operator',
          value: 'Backspace'
        },
        {
          id: 8,
          label: 'ANS',
          order: 'sm:order-[4]',
          type: 'operator',
          value: 'a'
        },
        {
          id: 9,
          label: '\u00F7',
          order: 'sm:order-[5]',
          type: 'operator',
          value: '/'
        },
        {
          id: 10,
          order: 'sm:order-[7]',
          value: '7'
        },
        {
          id: 11,
          order: 'sm:order-[8]',
          value: '8'
        },
        {
          id: 12,
          order: 'sm:order-[9]',
          value: '9'
        },
        {
          id: 13,
          label: '\u00D7',
          order: 'sm:order-[10]',
          type: 'operator',
          value: '*'
        },
        {
          id: 14,
          order: 'sm:order-[12]',
          value: '4'
        },
        {
          id: 15,
          order: 'sm:order-[13]',
          value: '5'
        },
        {
          id: 16,
          order: 'sm:order-[14]',
          value: '6'
        },
        {
          id: 17,
          order: 'sm:order-[15]',
          type: 'operator',
          value: '-'
        },
        {
          id: 18,
          order: 'sm:order-[17]',
          value: '1'
        },
        {
          id: 19,
          order: 'sm:order-[18]',
          value: '2'
        },
        {
          id: 20,
          order: 'sm:order-[19]',
          value: '3'
        },
        {
          id: 21,
          order: 'sm:order-[20]',
          type: 'operator',
          value: '+'
        },
        {
          id: 22,
          order: 'sm:order-[22]',
          value: '0'
        },
        {
          id: 23,
          label: '\u00B7',
          order: 'sm:order-[23]',
          value: '.'
        },
        {
          id: 24,
          label: 'SPC',
          order: 'sm:order-[24]',
          value: ' '
        },
        {
          id: 25,
          label: '\u23ce',
          order: 'sm:order-[25]',
          type: 'enter',
          value: 'Enter'
        }
      ],
      styles: { // active is repeated in etc to ensure active styles are applied onClick
        del: {
          active: 'bg-rpncalc-secondary dark:bg-rpncalc-secondary-dark',
          etc: 'border-2 border-rpncalc-secondary-light dark:hover:bg-rpncalc-secondary-dark dark:hover:border-rpncalc-secondary-dark dark:border-rpncalc-secondary hover:bg-rpncalc-secondary',
          main: 'bg-rpncalc-secondary-light dark:bg-rpncalc-secondary'
        },
        enter: {
          active: 'bg-rpncalc-primary dark:bg-rpncalc-primary-dark',
          etc: 'border-2 border-rpncalc-primary-light dark:hover:bg-rpncalc-primary-dark dark:hover:border-rpncalc-primary-dark dark:border-rpncalc-primary hover:bg-rpncalc-primary',
          main: 'bg-rpncalc-primary-light dark:bg-rpncalc-primary'
        },
        fn: {
          active: 'bg-neutral-300 dark:bg-neutral-700',
          etc: 'border-2 border-neutral-200 dark:hover:bg-neutral-700 dark:border-neutral-800 hover:bg-neutral-300'
        },
        main: {
          active: 'bg-neutral-300 dark:bg-neutral-700',
          etc: 'border-2 border-neutral-200 dark:hover:bg-neutral-700 dark:border-neutral-800 hover:bg-neutral-300',
          main: 'bg-neutral-200 dark:bg-neutral-800'
        },
        operator: {
          active: 'bg-rpncalc-primary',
          etc: 'border-2 border-rpncalc-primary-light dark:border-rpncalc-primary hover:bg-rpncalc-primary'
        }
      }
    }
  },
  themes: [
    {
      icon: 'computer-desktop',
      id: 1,
      label: 'System',
      name: "os-default"
    },
    {
      icon: 'sun',
      id: 2,
      label: 'Light',
      name: "light"
    },
    {
      icon: 'moon',
      id: 3,
      label: 'Dark',
      name: "dark"
    }
  ]
};