import './index.css';
import Keyboard from './keyboard';
import { RPN } from './jrpncalc';
import { useEffect, useState } from 'react';

function RPNCalc() {

  const [currentExpression, setCurrentExpression] = useState(''),
    [lastExpression, setLastExpression] = useState(''),
    [pasteEnabled, setPasteEnabled] = useState(null);

  function calc() {
    let expression = currentExpression.toString();
    let result = RPN(formatExpression(expression)).toString();
    let resultTruncated = result.match(/^-?\d+(?:\.\d{0,10})?/); // truncate decimal to 10th digit
    if (resultTruncated) result = resultTruncated.toString();
    setCurrentExpression(result);
    return
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
    let output = expression.toString();
    output = output.replace(new RegExp(',', 'g'), '');
    output = output.replace(new RegExp('\u00D7', 'g'), '*');
    output = output.replace(new RegExp('\u00F7', 'g'), '/');
    return output
  }

  function formatNumbers(expression) {
    let output = '';
    expression = expression.toString();
    let numbers = expression.split(' ');
    numbers.forEach((number) => {
      let numFragments = number.split('.');
      numFragments[0] = numFragments[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      output = `${output} ${numFragments.join('.')}`;
    });
    return output
  }

  const handleKeyboardInput = (data) => {
    if (!data) return
    switch(data.value) {
      case 'Backspace':
        setCurrentExpression(currentExpression.substring(0, (currentExpression.length - 1)));
        return
      case 'Delete':
        setLastExpression('');
        setCurrentExpression('');
        return
      case 'Enter':
        setLastExpression(currentExpression);
        calc();
        return
    }
    const out = (data.value === ' ') ? data.value : data.label || data.value;
    setCurrentExpression(`${currentExpression}${out}`);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    if (text) setCurrentExpression(`${currentExpression}${text}`);
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
          type: 'fn',
          value: 'p'
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
          type: 'fn',
          value: 'e'
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
          type: 'fn',
          value: 'f'
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

  function validateNumbers(expression) {
    let output = true;
    expression = expression.toString();
    let numbers = expression.split(' ');
    numbers.forEach((number) => {
      let numFragments = number.split('.');
      if (numFragments?.[0]?.length > 15) {
        alert('Maximum number of digits (15) exceeded.');
        return false
      }
      if (numFragments?.[1]?.length > 10) {
        alert('Maximum number of digits after decimal point (10) exceeded.');
        return false
      }
    });
    return output
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen">
        <div className="basis-1/3 flex flex-col">
          <div className="basis-1/12 bg-green-400" data-oldname="theme">
            Theme
          </div>
          <div className="basis-1/12 bg-red-200" data-oldname="history">
          <p className="text-xl">{formatNumbers(lastExpression)}</p>
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
            <p className="text-4xl">{formatNumbers(currentExpression)}<span className="cursor">|</span></p>
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
