import './index.css';
import Keyboard from './keyboard';
// import { RPN } from './jrpncalc';
import { useEffect, useState } from 'react';

function RPNCalc() {

  const [currentNumber, setCurrentNumber] = useState(''),
    [pasteEnabled, setPasteEnabled] = useState(null);

  async function checkPasteEnabled() {
    try {
      await navigator.clipboard.readText();
      setPasteEnabled(true);
    } catch (error) {}
  }
  useEffect(() => {
    checkPasteEnabled();
  }, []);

  let formatNumbers = (expression) => {
    return expression
  };

  const handleKeyboardInput = (data) => {
    setCurrentNumber(data);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    if (text) setCurrentNumber(`${currentNumber}${text}`);
  };

  const keyboardConfig = {
    currentInput: currentNumber,
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
            {pasteEnabled && <p className="
              bg-primary
              cursor-default
              m-2
              p-2
              rounded-full
              select-none
              text-xl
              text-center
              w-20
            " onClick={handlePaste}>&#x2398;</p>}
            <p className="text-4xl">{formatNumbers(currentNumber)}<span className="cursor">|</span></p>
          </div>
        </div>
        <div className="basis-2/3 bg-neutral-100">
          <Keyboard config={keyboardConfig} />
        </div>
      </div>
    </div>
  );
}

export default RPNCalc;
