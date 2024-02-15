import './index.css';
import { config } from './config';
import { Icon } from './icon';
import { Keyboard } from './keyboard';
import { RPN } from './jrpncalc';
import { useEffect, useState } from 'react';

export default function RPNCalc() {

  const sessionHistory = JSON.parse(localStorage.getItem('history')) || [];

  const
    [appHistory, setAppHistory] = useState(sessionHistory),
    [currentExpression, setCurrentExpression] = useState(sessionHistory.length ? `${sessionHistory[sessionHistory.length - 1]?.answer} ` : ''),
    [lastAnswer, setLastAnswer] = useState(sessionHistory[sessionHistory.length - 1]?.answer || ''),
    [lastExpression, setLastExpression] = useState(sessionHistory[sessionHistory.length - 1]?.expression || ''),
    msgError = 'error',
    [pasteEnabled, setPasteEnabled] = useState(null),
    prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches,
    themes = config.themes,
    vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  function configTheme(selectedName, defaultName = 'os-default') {
    let defaultIndex = themes.findIndex(theme => theme.name === defaultName) || 0,
      out = {},
      selectedTheme = selectedName ? selectedName
        : localStorage.getItem('theme') ? localStorage.getItem('theme')
        : defaultName;
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
      updateHistory(currentExpression, out);
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

  const updateHistory = (expression, answer) => {
    if (!expression || !answer) return
    sessionHistory.push({
      answer: answer,
      date: Date.now(),
      expression: expression
    });
    localStorage.setItem('history', JSON.stringify(sessionHistory));
    setAppHistory(sessionHistory);
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
    <div className="flex flex-col h-screen mx-auto" data-mode={theme}>
      <div className="basis-1/3 bg-slate-100 dark:bg-dark flex flex-col lg:basis-1/3 sm:basis-1/2 overflow-y-auto">
        <div className="flex flex-row h-full">
          <div className="basis-1/12 flex items-start justify-start p-4">
            <div className="
              active:bg-slate-400
              bg-slate-300
              cursor-default
              dark:active:bg-slate-600
              dark:bg-slate-700
              dark:text-slate-100
              p-2
              rounded-full
              select-none
              text-slate-900
            " onClick={toggleTheme}>
              <Icon id={themes[themeIndex].icon} />
            </div>
          </div>
          <div className="basis-11/12 dark:text-slate-100 flex items-end justify-end text-slate-900 p-4">
            <div className="text-xl text-right">
              {lastExpression ? (
                <>
                  {formatNumbers(lastExpression)}<br />{formatNumbers(lastAnswer)}
                </>
              ) : (
                <>
                  &nbsp;<br />&nbsp;
                </>
              )}
            </div>
          </div>
        </div>
        <div className="basis-3/5 flex items-end justify-end p-4">
          <span className="text-4xl text-primary dark:text-primary-light">{formatNumbers(currentExpression)}<span className="cursor dark:text-slate-100 text-slate-900">|</span></span>
          {pasteEnabled && <span className="
            active:bg-slate-400
            bg-slate-300
            cursor-default
            dark:active:bg-slate-600
            dark:bg-slate-700
            dark:text-slate-100
            ml-2
            p-2
            rounded-full
            select-none
            text-slate-900
          " onClick={handlePaste}><Icon id="clipboard" /></span>}
        </div>
      </div>
      <div className="dark:bg-xdark basis-2/3 flex justify-center lg:basis-2/3 sm:basis-1/2">
        <Keyboard config={inputConfig} />
      </div>
    </div>
  );
}
