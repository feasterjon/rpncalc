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
    currentInput: currentNumber,
    setCurrentInput: handleKeyboardInput
  };

  const keyboardConfigFn = {
    cols: 1,
    currentInput: currentNumber,
    id: 'fn',
    setCurrentInput: handleKeyboardInput
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
        <div className="basis-1/5 sm:basis-1/4">
          <Keyboard config={keyboardConfigFn} />
        </div>
        <div className="basis-4/5 sm:basis-3/4">
          <Keyboard config={keyboardConfig} />
        </div>
      </div>
    </div>
  );
}

export default RPNCalc;
