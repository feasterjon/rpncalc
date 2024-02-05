import './index.css';
import { useEffect, useState } from 'react';

function Keyboard({ config = {} }) {

  const currentInput = config.currentInput,
    [dynamicStyles, setDynamicStyles] = useState(''),
    idKeyboard = config.id || 'main',
    [pressedKey, setPressedKey] = useState(''),
    setCurrentInput = config.setCurrentInput,
    vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  const configButtons = {
    data: {
      main: [
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
          type: 'fn',
          value: 'p'
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
          type: 'fn',
          value: 'e'
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
          type: 'fn',
          value: 'f'
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
      ]
    },
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
  };

  const buttons = configButtons.data[idKeyboard].map((button) => ({
    id: button.id,
    label: button.label || button.value,
    styles: configButtons.styles[button.type] || configButtons.styles.main,
    type: button.type,
    value: button.value
  }));

  const handleInput = (input) => {
    vibrateBasic();
    setCurrentInput(`${currentInput}${input.value}`);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const button = buttons.find(button => button.value === event.key);
      if (button) {
        setPressedKey(button.id);
        setDynamicStyles(button.styles.active || '');
        setTimeout(() => {
          setPressedKey(null);
          setDynamicStyles('');
        }, 100);
        setCurrentInput((currentInput) => `${currentInput}${event.key}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [buttons, setCurrentInput]);

  const vibrateBasic = (pattern = [50]) => {
    if (!vibrateEnabled) return
    window.navigator.vibrate(pattern);
  };

  return (
    <div className="flex flex-wrap">
      {buttons.map((button) =>
        <div className="w-1/5" key={`button-${button.id}`}>
          <div
            className={`cursor-default font-bold m-2 p-2 rounded-full select-none text-center
              ${`button-${button.id}` === `button-${pressedKey}` ? dynamicStyles : button.styles?.main}
            `}
            onClick={() => handleInput(button)}
          >
            {button.label}
          </div>
        </div>
      )}
    </div>
  );
}

export default Keyboard;