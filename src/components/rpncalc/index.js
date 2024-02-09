import './index.css';
import { config } from './config';
import { Icon } from './icon';
import { Keyboard } from './keyboard';
import { RPN } from './jrpncalc';
import { useEffect, useState } from 'react';

export default function RPNCalc() {

  const [currentExpression, setCurrentExpression] = useState(''),
    [lastAnswer, setLastAnswer] = useState(''),
    [lastExpression, setLastExpression] = useState(''),
    msgError = 'error',
    [pasteEnabled, setPasteEnabled] = useState(null),
    prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches,
    themes = config.themes,
    vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  function configTheme(selectedName, defaultName = 'os-default') {
    let defaultIndex = themes.findIndex(theme => theme.name === defaultName) || 0,
      out = {},
      selectedTheme = selectedName ? selectedName
        : localStorage.getItem('theme') || defaultName;
    let selectedIndex = themes.findIndex(theme => theme.name === selectedTheme);
    if (selectedIndex < 0) selectedIndex = defaultIndex;
    out.index = selectedIndex;
    if (selectedIndex === defaultIndex) {
      const osTheme = prefersDark ? 'dark' : 'light';
      out.theme = themes.find(theme => theme.name === osTheme);
      return out
    }
    out.theme = themes[selectedIndex];
    return out
  }

  let [themeIndex, setThemeIndex] = useState(configTheme().index);
  let [theme, setTheme] = useState(configTheme().theme.name);

  const handleKeyboardInput = (data) => {
    if (!data) return
    switch (data.value) {
      case 'a':
        setCurrentExpression(`${currentExpression}${lastAnswer} `);
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
    if (out !== msgError) {
      setLastAnswer(out);
      out = `${out} `;
    }
    setCurrentExpression(out);
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
    vibrateBasic();
    const text = await navigator.clipboard.readText();
    if (!text) return
    if (!validateNumbers(text)) return
    setCurrentExpression(`${currentExpression}${text} `);
  };

  const toggleTheme = () => {
    vibrateBasic();
    setThemeIndex((themeIndex) => (themeIndex + 1) % themes.length);
    let selectedTheme = themes[(themeIndex + 1) % themes.length].name;
    localStorage.setItem('theme', selectedTheme);
    setTheme(configTheme(selectedTheme).theme.name);
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

  const vibrateBasic = (pattern = [50]) => {
    if (!vibrateEnabled) return
    window.navigator.vibrate(pattern);
  };

  return (
    <div className="flex flex-col h-screen mx-auto" data-theme={theme} data-oldname="container">
      <div className="basis-1/3 bg-light flex flex-col" data-oldname="top">
        <div className="flex flex-row h-full" data-oldname="row">
          <div className="basis-1/12 flex items-start justify-start p-4" data-oldname="theme">
            <div className="
              bg-primary-light
              cursor-default
              p-2
              rounded-full
              select-none
            " onClick={toggleTheme}>
              <Icon id={themes[themeIndex].icon} />
            </div>
          </div>
          <div className="basis-11/12 flex items-end justify-end text-dark p-4" data-oldname="history">
            <div className="text-xl">{formatNumbers(lastExpression)}<br />{formatNumbers(lastAnswer)}</div>
          </div>
        </div>
        <div className="basis-3/5 flex items-end justify-end p-4" data-oldname="result">
          <span className="text-4xl text-primary">{formatNumbers(currentExpression)}<span className="cursor text-dark">|</span></span>
          {pasteEnabled && <span className="
            bg-primary-light
            cursor-default
            ml-2
            p-2
            rounded-full
            select-none
          " onClick={handlePaste}><Icon id="clipboard" /></span>}
        </div>
      </div>
      <div className="basis-2/3 pt-2" data-oldname="keypad">
        <Keyboard config={inputConfig} />
      </div>
    </div>
  );
}
