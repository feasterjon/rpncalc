import './index.css';
import Keyboard from './keyboard';
import { RPN } from './jrpncalc';
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
      <div className="flex flex-col h-screen">
        <div className="basis-1/3 flex flex-col">
          <div className="basis-1/12 bg-green-400" data-oldname="theme">
            Theme
          </div>
          <div className="basis-1/12 bg-red-200" data-oldname="history">
          <p className="text-xl">{formatNumbers(currentNumber)}</p>
          </div>
          <div className="basis-10/12 bg-orange-200" data-oldname="result">
            <p className="text-4xl">{formatNumbers(currentNumber)}<span className="cursor">|</span></p>
          </div>
        </div>
        <div className="basis-2/3 bg-neutral-100">
          <div className="flex flex-row">
            <div className="basis-1/5 sm:basis-1/4">
              <Keyboard config={keyboardConfigFn} />
            </div>
            <div className="basis-4/5 sm:basis-3/4">
              <Keyboard config={keyboardConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RPNCalc;
