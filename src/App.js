import './App.css';
import { useState } from 'react';

function App() {

  const buttons = [
    {
      id: 1,
      value: 'C'
    },
    {
      id: 2,
      label: '\u232B',
      value: 'DEL'
    },
    {
      id: 3,
      label: '\u00F7',
      value: '/'
    },
    {
      id: 4,
      label: '7',
      value: 7
    },
    {
      id: 5,
      label: '8',
      value: 8
    },
    {
      id: 6,
      label: '9',
      value: 9
    },
    {
      id: 7,
      label: '\u00D7',
      value: '*'
    },
    {
      id: 8,
      label: '4',
      value: 4
    },
    {
      id: 9,
      label: '5',
      value: 5
    },
    {
      id: 10,
      label: '6',
      value: 6
    },
    {
      id: 11,
      value: '-'
    },
    {
      id: 12,
      label: '1',
      value: 1
    },
    {
      id: 13,
      label: '2',
      value: 2
    },
    {
      id: 14,
      label: '3',
      value: 3
    },
    {
      id: 15,
      value: '+'
    },
    {
      id: 16,
      label: '0',
      value: 0
    },
    {
      id: 17,
      value: '.'
    },
    {
      id: 18,
      label: '\u005F\u005F',
      value: ' '
    },
    {
      id: 19,
      value: '='
    }
  ];

  const [currentNumber, setCurrentNumber] = useState('');

  let formatNumbers = (expression) => {
    return expression
  };

  const handleInput = (input = 'Input handled') => {
    vibrateBasic();
    setCurrentNumber(currentNumber + input);
  };

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
            <p className="text">{formatNumbers(currentNumber)}</p>
            <div className="separator"></div>
          </div>
        </div>
      </div>
      {buttons.map((button) =>
        <div className="
            bg-primary-light
            ease-in-out
            active:bg-primary
            active:rounded-md
            m-5
            p-2
            rounded-full
            text-center
            w-10
          " key={`button-${button.id}`}>
          <button onClick={() => handleInput(button.value)}>
            {button.label || button.value}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
