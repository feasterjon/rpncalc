import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const buttons = [
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
      value: '.'
    },
    {
      id: 19,
      label: 'SPC',
      value: ' '
    },
    {
      id: 20,
      label: 'ENTER',
      type: 'enter',
      value: 'Enter'
    }
  ];

  const buttonStyles = {
    del: {
      active: 'bg-secondary',
      main: ['bg-secondary-light']
    },
    enter: {
      active: 'bg-primary',
      main: ['bg-primary-light']
    },
    operand: {
      active: 'bg-gray-400',
      main: ['bg-gray-200']
    },
    operator: {
      active: 'bg-primary',
      main: [
        'border-2',
        'border-primary-light'
      ]
    }
  }

  const [currentNumber, setCurrentNumber] = useState('');

  const [dynamicClass, setDynamicClass] = useState('');

  let formatNumbers = (expression) => {
    return expression
  };

  const getButtonActiveClass = (value) => {
    const button = buttons.find(button => button.value === value);
    const buttonType = button?.type || 'operand';
    return buttonStyles[buttonType].active || ''
  };

  const getButtonClass = (button) => {
    const buttonStyle = buttonStyles[button.type] || buttonStyles.operand;
    return [
      `active:${buttonStyle.active}`,
      'ease-in-out',
      'm-2',
      'p-2',
      'rounded-full',
      'text-center',
      ...buttonStyle.main
    ].join(' ')
  };

  const handleInput = (input) => {
    vibrateBasic();
    setCurrentNumber(`${currentNumber}${input.value}`);
  };

  const [pressedKey, setPressedKey] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const button = buttons.find(button => button.value === event.key);
      if (button) {
        let buttonActiveClass = getButtonActiveClass(event.key) || '';
        setPressedKey(button.id);
        setTimeout(() => {
          setPressedKey(null);
        }, 100);
        setDynamicClass(buttonActiveClass);
        setCurrentNumber((currentNumber) => `${currentNumber}${event.key}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const vibrateBasic = (pattern = [50]) => {
    if (!pattern.length || !vibrateEnabled) return
    window.navigator.vibrate(pattern);
  };

  const vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  return (
    <div className="container">
      <div className="top">
        <div className="row">
          <div className="theme">
          </div>
          <div className="history">
            <p className="text">{formatNumbers(currentNumber)}<span className="cursor">|</span></p>
            <div className="separator"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        {buttons.map((button) =>
          <div
            className={`${getButtonClass(button)}
              ${`button-${button.id}` === `button-${pressedKey}` ? dynamicClass : ''}
            `}
            key={`button-${button.id}`}
            onClick={() => handleInput(button)}
          >
            {button.label || button.value}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
