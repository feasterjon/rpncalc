import './index.css';
import { config } from './config';
import { Keyboard } from './keyboard';
import { RPN } from './jrpncalc';
import { useEffect, useState } from 'react';

export default function RPNCalc() {

  const [currentExpression, setCurrentExpression] = useState(''),
    [lastAnswer, setLastAnswer] = useState(''),
    [lastExpression, setLastExpression] = useState(''),
    msgError = 'error',
    [pasteEnabled, setPasteEnabled] = useState(null),
    [themeDark, setThemeDark] = useState(false);

  const handleKeyboardInput = (data) => {
    if (!data) return
    switch (data.value) {
      case 'a':
        setCurrentExpression(`${currentExpression}${lastAnswer}`);
        break;
      case 'Backspace':
        if (currentExpression === msgError) {
          setCurrentExpression('');
          break;
        }
        setCurrentExpression(currentExpression.substring(0, (currentExpression.length - 1)));
        break;
      case 'Delete':
        setCurrentExpression('');
        setLastAnswer('')
        setLastExpression('');
        break;
      case 'Enter':
        setLastExpression(currentExpression);
        calc();
        break;
      default:
        let out = (data.value === ' ' || data.value === '.') ? data.value : data.label || data.value; // do not set the Space or Period label
        out = `${currentExpression}${out}`;
        if (validateNumbers(out)) setCurrentExpression(out);
        break;
    }
  };

  const inputConfig = {
    buttons: config.input.buttons,
    setCurrentInput: handleKeyboardInput
  };

  function calc() {
    let out = RPN(formatExpression(currentExpression.toString()), msgError).toString();
    const outTruncated = out.match(/^-?\d+(?:\.\d{0,10})?/); // truncate decimal to 10th digit
    if (outTruncated) out = outTruncated.toString();
    setCurrentExpression(out);
    if (out !== msgError) setLastAnswer(out);
  }

  async function checkPasteEnabled() {
    try {
      await navigator.clipboard.readText();
      setPasteEnabled(true);
    } catch (error) {}
  }
  useEffect(() => {
    checkPasteEnabled();
  }, []);

  function formatExpression(expression) {
    if (!expression) return
    const buttonsFormat = inputConfig.buttons?.data?.filter(button =>
      button.type === 'fn' || button.type === 'operator'
    );
    let out = expression.toString();
    out = out.replace(new RegExp(',', 'g'), ''); // remove commas
    if (buttonsFormat.length) {
      buttonsFormat.forEach(button => {
        let buttonValue = button.valueMath || button.value;
        out = out.replace(new RegExp(`${button.label}`, 'g'), buttonValue);
        // out = out.replaceAll(button.label, buttonValue); // 2024-02-07: eventually do this (too new)
      });
    }
    return out
  }

  function formatNumbers(expression) {
    let out = '';
    expression = expression.toString();
    let numbers = expression.split(' ');
    numbers.forEach(number => {
      let numFragments = number.split('.');
      numFragments[0] = numFragments[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      out = `${out} ${numFragments.join('.')}`;
    });
    return out
  }

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    if (text && validateNumbers(text)) setCurrentExpression(`${currentExpression}${text}`);
  };

  const toggleTheme = () => {
    setThemeDark(!themeDark);
  };

  function validateNumbers(expression, maxDecimals = 10, maxDigits = 15) {
    if (!expression) return true
    expression = expression.toString();
    let numbers = expression.split(' ');
    for (const number of numbers) {
      let numFragments = number.split('.');
      if (numFragments?.[0]?.length > maxDigits) {
        alert(`Maximum number of digits (${maxDigits}) exceeded.`);
        return false
      }
      if (numFragments?.[1]?.length > maxDecimals) {
        alert(`Maximum number of digits after decimal point (${maxDecimals}) exceeded.`);
        return false
      }
    }
    return true
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen">
        <div className="basis-1/3 flex flex-col">
          <div className="basis-1/12 bg-light" data-oldname="theme">
            <p className="cursor-default select-none" onClick={toggleTheme}>
              {themeDark ? <span className="text-4xl">&#9789;</span> : <span className="text-4xl">&#9788;</span>}
            </p>
          </div>
          <div className="basis-1/12 bg-light text-dark" data-oldname="history">
            <p className="text-xl">{formatNumbers(lastExpression)}</p>
            <p className="text-xl">{formatNumbers(lastAnswer)}</p>
          </div>
          <div className="basis-10/12 bg-light p-4" data-oldname="result">
            {pasteEnabled && <p className="
              bg-primary-light
              cursor-default
              p-2
              rounded-full
              select-none
              text-center
              text-dark
              text-xl
              w-20
            " onClick={handlePaste}>&#x2398;</p>}
            <p className="text-4xl text-primary place-self-end">{formatNumbers(currentExpression)}<span className="cursor text-dark">|</span></p>
          </div>
        </div>
        <div className="basis-2/3">
          <Keyboard config={inputConfig} />
        </div>
      </div>
    </div>
  );
}
