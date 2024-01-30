import './index.css';
import { useEffect, useState } from 'react';

function RPNCalc() {

  const buttonStyles = {
    del: {
      active: 'bg-secondary',
      main: 'bg-secondary-light border-2 border-secondary-light'
    },
    enter: {
      active: 'bg-primary',
      main: 'bg-primary-light border-2 border-primary-light'
    },
    operand: {
      active: 'bg-gray-400',
      main: 'bg-gray-200 border-2 border-gray-200'
    },
    operator: {
      active: 'bg-primary',
      main: 'border-primary-light border-2 border-primary-light'
    }
  }

  const buttons = [
    {
      id: 1,
      label: 'AC',
      styles: buttonStyles.del,
      value: 'Delete'
    },
    {
      id: 2,
      label: '\u232B',
      styles: buttonStyles.operator,
      value: 'Backspace'
    },
    {
      id: 3,
      label: 'ANS',
      styles: buttonStyles.operator,
      value: 'a'
    },
    {
      id: 4,
      label: '\u00F7',
      styles: buttonStyles.operator,
      value: '/'
    },
    {
      id: 5,
      styles: buttonStyles.operand,
      value: '7'
    },
    {
      id: 6,
      styles: buttonStyles.operand,
      value: '8'
    },
    {
      id: 7,
      styles: buttonStyles.operand,
      value: '9'
    },
    {
      id: 8,
      label: '\u00D7',
      styles: buttonStyles.operator,
      value: '*'
    },
    {
      id: 9,
      styles: buttonStyles.operand,
      value: '4'
    },
    {
      id: 10,
      styles: buttonStyles.operand,
      value: '5'
    },
    {
      id: 11,
      styles: buttonStyles.operand,
      value: '6'
    },
    {
      id: 12,
      styles: buttonStyles.operator,
      value: '-'
    },
    {
      id: 13,
      styles: buttonStyles.operand,
      value: '1'
    },
    {
      id: 14,
      styles: buttonStyles.operand,
      value: '2'
    },
    {
      id: 15,
      styles: buttonStyles.operand,
      value: '3'
    },
    {
      id: 16,
      styles: buttonStyles.operator,
      value: '+'
    },
    {
      id: 17,
      styles: buttonStyles.operand,
      value: '0'
    },
    {
      id: 18,
      styles: buttonStyles.operand,
      value: '.'
    },
    {
      id: 19,
      label: 'SPC',
      styles: buttonStyles.operand,
      value: ' '
    },
    {
      id: 20,
      label: 'ENTER',
      styles: buttonStyles.enter,
      value: 'Enter'
    }
  ];

  const [currentNumber, setCurrentNumber] = useState('');

  const [dynamicStyles, setDynamicStyles] = useState('');

  let formatNumbers = (expression) => {
    return expression
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
        let buttonStylesActive = button.styles?.active || '';
        setPressedKey(button.id);
        setTimeout(() => {
          setPressedKey(null);
        }, 100);
        setDynamicStyles(buttonStylesActive);
        setCurrentNumber((currentNumber) => `${currentNumber}${event.key}`);
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
            className={`active:${button.styles?.active} cursor-default ease-in-out m-2 p-2 rounded-full text-center
              ${`button-${button.id}` === `button-${pressedKey}` ? dynamicStyles : button.styles?.main}
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

export default RPNCalc;
