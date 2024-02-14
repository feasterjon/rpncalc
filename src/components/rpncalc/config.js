export const config = {
  input: {
    buttons: {
      data: [
        {
          id: 1,
          label: '\u221a',
          order: 'lg:order-[1]',
          type: 'fn',
          value: 's'
        },
        {
          id: 2,
          order: 'lg:order-[6]',
          type: 'fn',
          value: '^'
        },
        {
          id: 3,
          label: '\u03C0',
          name: 'Archimedes\' Constant',
          order: 'lg:order-[11]',
          type: 'fn',
          value: 'p',
          valueMath: Math.PI
        },
        {
          id: 4,
          label: '\u2107',
          name: 'Euler\'s Number',
          order: 'lg:order-[16]',
          type: 'fn',
          value: 'e',
          valueMath: Math.E
        },
        {
          id: 5,
          label: '\u03C6',
          name: 'The Golden Ratio',
          order: 'lg:order-[21]',
          type: 'fn',
          value: 'f',
          valueMath: (1 + Math.sqrt(5)) / 2
        },
        {
          id: 6,
          label: 'AC',
          order: 'lg:order-[2]',
          type: 'del',
          value: 'Delete'
        },
        {
          id: 7,
          label: '\u232B',
          order: 'lg:order-[3]',
          type: 'operator',
          value: 'Backspace'
        },
        {
          id: 8,
          label: 'ANS',
          order: 'lg:order-[4]',
          type: 'operator',
          value: 'a'
        },
        {
          id: 9,
          label: '\u00F7',
          order: 'lg:order-[5]',
          type: 'operator',
          value: '/'
        },
        {
          id: 10,
          order: 'lg:order-[7]',
          value: '7'
        },
        {
          id: 11,
          order: 'lg:order-[8]',
          value: '8'
        },
        {
          id: 12,
          order: 'lg:order-[9]',
          value: '9'
        },
        {
          id: 13,
          label: '\u00D7',
          order: 'lg:order-[10]',
          type: 'operator',
          value: '*'
        },
        {
          id: 14,
          order: 'lg:order-[12]',
          value: '4'
        },
        {
          id: 15,
          order: 'lg:order-[13]',
          value: '5'
        },
        {
          id: 16,
          order: 'lg:order-[14]',
          value: '6'
        },
        {
          id: 17,
          order: 'lg:order-[15]',
          type: 'operator',
          value: '-'
        },
        {
          id: 18,
          order: 'lg:order-[17]',
          value: '1'
        },
        {
          id: 19,
          order: 'lg:order-[18]',
          value: '2'
        },
        {
          id: 20,
          order: 'lg:order-[19]',
          value: '3'
        },
        {
          id: 21,
          order: 'lg:order-[20]',
          type: 'operator',
          value: '+'
        },
        {
          id: 22,
          order: 'lg:order-[22]',
          value: '0'
        },
        {
          id: 23,
          label: '\u00B7',
          order: 'lg:order-[23]',
          value: '.'
        },
        {
          id: 24,
          label: 'SPC',
          order: 'lg:order-[24]',
          value: ' '
        },
        {
          id: 25,
          label: '\u23ce',
          order: 'lg:order-[25]',
          type: 'enter',
          value: 'Enter'
        }
      ],
      styles: { // active is repeated in etc to ensure active styles are applied onClick
        del: {
          active: 'bg-secondary dark:bg-secondary-dark',
          etc: 'active:bg-secondary border-2 border-secondary-light dark:active:bg-secondary-dark dark:active:border-secondary-dark dark:border-secondary',
          main: 'bg-secondary-light dark:bg-secondary'
        },
        enter: {
          active: 'bg-primary dark:bg-primary-dark',
          etc: 'active:bg-primary border-2 border-primary-light dark:active:bg-primary-dark dark:active:border-primary-dark dark:border-primary',
          main: 'bg-primary-light dark:bg-primary'
        },
        fn: {
          active: 'bg-slate-300 dark:bg-slate-600',
          etc: 'active:bg-slate-300 border-2 border-slate-200 dark:active:bg-slate-600 dark:border-slate-700'
        },
        main: {
          active: 'bg-slate-300 dark:bg-slate-600',
          etc: 'active:bg-slate-300 border-2 border-slate-200 dark:active:bg-slate-600 dark:border-slate-700',
          main: 'bg-slate-200 dark:bg-slate-700'
        },
        operator: {
          active: 'bg-primary',
          etc: 'active:bg-primary border-2 border-primary-light dark:border-primary'
        }
      }
    }
  },
  themes: [
    {
      icon: 'computerDesktop',
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