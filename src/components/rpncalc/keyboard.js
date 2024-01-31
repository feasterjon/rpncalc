import './index.css';
import { useEffect, useState } from 'react';

function Keyboard({ config = {}, currentInput, setCurrentInput }) {

  const buttonsConfig = {
    data: [
      {
        data: [
          {
            id: 1,
            label: 'AC',
            type: 'del',
            value: 'Delete'
          },
          {
            id: 2,
            label: '\u232B',
            type: 'operator',
            value: 'Backspace'
          },
          {
            id: 3,
            label: 'ANS',
            type: 'operator',
            value: 'a'
          },
          {
            id: 4,
            label: '\u00F7',
            type: 'operator',
            value: '/'
          },
          {
            id: 5,
            value: '7'
          },
          {
            id: 6,
            value: '8'
          },
          {
            id: 7,
            value: '9'
          },
          {
            id: 8,
            label: '\u00D7',
            type: 'operator',
            value: '*'
          },
          {
            id: 9,
            value: '4'
          },
          {
            id: 10,
            value: '5'
          },
          {
            id: 11,
            value: '6'
          },
          {
            id: 12,
            type: 'operator',
            value: '-'
          },
          {
            id: 13,
            value: '1'
          },
          {
            id: 14,
            value: '2'
          },
          {
            id: 15,
            value: '3'
          },
          {
            id: 16,
            type: 'operator',
            value: '+'
          },
          {
            id: 17,
            value: '0'
          },
          {
            id: 18,
            label: '\u00B7',
            value: '.'
          },
          {
            id: 19,
            label: 'SPC',
            value: ' '
          },
          {
            id: 20,
            label: '\u23ce',
            type: 'enter',
            value: 'Enter'
          }
        ],
        name: 'main'
      },
      {
        data: [
          {
            id: 1,
            label: '\u221a',
            type: 'fn',
            value: 's'
          },
          {
            id: 2,
            type: 'fn',
            value: '^'
          },
          {
            id: 3,
            label: '\u03C0',
            type: 'fn',
            value: 'p'
          },
          {
            id: 4,
            type: 'fn',
            value: 'e'
          },
          {
            id: 5,
            label: '\u03C6',
            type: 'fn',
            value: 'f'
          }
        ],
        name: 'functions'
      }
    ],
    relationships: {
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
  };

  const buttons = buttonsConfig.data[config.interface || 0].data.map((button) => ({
    id: button.id,
    label: button.label || button.value,
    styles: buttonsConfig.relationships.styles[button.type] || buttonsConfig.relationships.styles.main,
    type: button.type,
    value: button.value
  }));

  const [dynamicStyles, setDynamicStyles] = useState('');

  const handleInput = (input) => {
    vibrateBasic();
    setCurrentInput(`${currentInput}${input.value}`);
  };

  const [pressedKey, setPressedKey] = useState('');

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
  }, []);

  const vibrateBasic = (pattern = [50]) => {
    if (!vibrateEnabled) return
    window.navigator.vibrate(pattern);
  };

  const vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  return (
    <div className={`grid grid-cols-${config.cols || 4}`}>
      {buttons.map((button) =>
        <div
          className={`cursor-default font-bold m-2 p-2 rounded-full select-none text-center
            ${`button-${button.id}` === `button-${pressedKey}` ? dynamicStyles : button.styles?.main}
          `}
          key={`button-${button.id}`}
          onClick={() => handleInput(button)}
        >
          {button.label}
        </div>
      )}
    </div>
  );
}

export default Keyboard;