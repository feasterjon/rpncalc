import './index.css';
import Keyboard from './keyboard';
import { useState } from 'react';

function RPNCalc() {

  const [currentNumber, setCurrentNumber] = useState('');

  let formatNumbers = (expression) => {
    return expression
  };

  const handleKeyboardInput = (data) => {
    setCurrentNumber(data);
  };

  const keyboardConfig = {
    cols: 1,
    interface: 1
  };

  return (
    <div className="container mx-auto">
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
      <div className="flex flex-row">
        <div class="basis-1/5 sm:basis-1/4">
          <Keyboard
            config={keyboardConfig}
            currentInput={currentNumber}
            setCurrentInput={handleKeyboardInput}
          />
        </div>
        <div class="basis-4/5 sm:basis-3/4">
          <Keyboard
            currentInput={currentNumber}
            setCurrentInput={handleKeyboardInput}
          />
        </div>
      </div>
    </div>
  );
}

export default RPNCalc;
