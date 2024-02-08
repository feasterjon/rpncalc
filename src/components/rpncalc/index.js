import './index.css';
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

  const keyboardConfig = {
    buttons: {
      data: [
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
          name: 'Archimedes\' Constant',
          type: 'fn',
          value: 'p',
          valueMath: Math.PI
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
          label: '\u2107',
          name: 'Euler\'s Number',
          type: 'fn',
          value: 'e',
          valueMath: Math.E
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
          name: 'The Golden Ratio',
          type: 'fn',
          value: 'f',
          valueMath: (1 + Math.sqrt(5)) / 2
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
      ],
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
    },
    setCurrentInput: handleKeyboardInput
  };

  function calc() {
    let out = RPN(formatExpression(currentExpression.toString()), msgError).toString();
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
    const buttonsFormat = keyboardConfig.buttons?.data?.filter(button =>
      button.type === 'fn' || button.type === 'operator'
    );
    let out = expression.toString();
    out = out.replace(new RegExp(',', 'g'), ''); // remove commas
    if (buttonsFormat.length) {
      buttonsFormat.forEach(button => {
        out = out.replace(new RegExp(`${button.label}`, 'g'), button.valueMath || button.value);
        // out = out.replaceAll(button.label, button.valueMath || button.value); // 2024-02-07: eventually do this (too new)
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
    if (text) setCurrentExpression(`${currentExpression}${text}`);
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
          <Keyboard config={keyboardConfig} />
        </div>
      </div>
    </div>
  );
}
