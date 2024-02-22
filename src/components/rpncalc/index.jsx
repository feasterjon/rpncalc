import styles from './index.module.css';
import { config as configCom } from './config';
import { Icon } from './icon';
import { Keyboard } from '../keyboard';
import { RPN } from './jrpncalc';
import { useEffect, useState } from 'react';

export function RPNCalc(props) {

  const config = props.config ? Object.assign(configCom, props.config) : configCom,
    sessionHistory = JSON.parse(localStorage.getItem('history')) || [];

  const
    [appHistory, setAppHistory] = useState(sessionHistory),
    [appHistoryVisible, setAppHistoryVisible] = useState(false),
    [currentExpression, setCurrentExpression] = useState(''),
    [isOpen, setIsOpen] = useState(false),
    [keypadVisible, setKeypadVisible] = useState(true),
    [lastAnswer, setLastAnswer] = useState(sessionHistory[sessionHistory.length - 1]?.answer || ''),
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
        break;
      case 'Enter':
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

  const getId = () => {
    return Math.floor(Math.random() * (10 ** 10 - 10 ** 9 + 1)) + (10 ** 9) // random 10-digit positive integer
  };

  const handlePaste = async () => {
    vibrateBasic();
    const text = await navigator.clipboard.readText();
    if (!text) return
    if (!validateNumbers(text)) return
    setCurrentExpression(`${currentExpression}${text} `);
  };

  const toggleDropdown = (dropdown) => {
    vibrateBasic();
    if (dropdown.length < 2) return
    dropdown[1](!dropdown[0]);
  };

  const toggleHistory = () => {
    vibrateBasic();
    setAppHistoryVisible(!appHistoryVisible);
  };

  const toggleKeypad = () => {
    vibrateBasic();
    setKeypadVisible(!keypadVisible);
  };

  const toggleTheme = () => {
    vibrateBasic();
    setThemeIndex((themeIndex) => (themeIndex + 1) % themes.length);
    let selectedTheme = themes[(themeIndex + 1) % themes.length].name;
    localStorage.setItem('theme', selectedTheme);
    setTheme(configTheme(selectedTheme).theme.name);
  };

  const updateHistory = (expression, answer, lengthMax = 100) => {
    if (!expression && !answer) {
      sessionHistory.length = 0;
      localStorage.removeItem('history');
      setAppHistory(sessionHistory);
      return
    }
    if (!expression || !answer) return
    if (sessionHistory.length >= lengthMax) sessionHistory.splice(0, sessionHistory.length - lengthMax + 1);
    sessionHistory.push({
      answer: answer,
      date: Date.now(),
      expression: expression,
      id: getId()
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
    <div className={`
      flex
      flex-col
      h-full
      w-full
      ${config.hScreen !== false && `h-screen`}
    `} data-mode={theme}>
      <div className={`
        bg-neutral-300
        dark:bg-neutral-700
        ${!appHistoryVisible && 'hidden'}
      `} data-name="history">
        <div className="flex items-end justify-end p-4">
          <div className="
            active:bg-neutral-500
            bg-neutral-400
            cursor-default
            dark:active:bg-neutral-500
            dark:bg-neutral-600
            dark:text-neutral-100
            ml-2
            p-2
            rounded-full
            select-none
            text-neutral-900
          " onClick={() => {updateHistory(); toggleHistory();}}>
            <Icon id="trash" />
          </div>
          <div className="
            active:bg-neutral-500
            bg-neutral-400
            cursor-default
            dark:active:bg-neutral-500
            dark:bg-neutral-600
            dark:text-neutral-100
            ml-2
            p-2
            rounded-full
            select-none
            text-neutral-900
          " onClick={toggleHistory}>
            <Icon id="x-mark" />
          </div>
        </div>
        <div className="
          dark:text-neutral-100
          items-end
          justify-end
          lg:text-2xl
          p-4
          text-lg
          text-right
          text-neutral-900
          xl:text-3xl
        ">
          <ol className="list-none">
            {appHistory.map((item) =>
              <li key={`history-${item.id}`}>
                {formatNumbers(item.expression)}<br />
                <span className="dark:text-rpncalc-primary-light text-rpncalc-primary">{formatNumbers(item.answer)}</span>
              </li>
            )}
          </ol>
        </div>
      </div>
      <div className={`
        bg-neutral-200
        dark:bg-neutral-800
        ${!keypadVisible && `grow`}
      `} data-name="terminal">
        <div className="flex items-end justify-end p-4">
          <div className="inline-block relative">
            <div className="
              bg-neutral-300
              cursor-pointer
              dark:bg-neutral-700
              dark:hover:bg-neutral-600
              dark:text-neutral-100
              hover:bg-neutral-400
              ml-2
              p-2
              rounded-full
              select-none
              text-neutral-900
            " onClick={() => toggleDropdown([isOpen, setIsOpen])}>
              <Icon id="ellipsis-vertical" />
            </div>
            {isOpen && (
              <div className="
                absolute
                bg-neutral-300
                dark:bg-neutral-700
                focus:outline-none
                mt-2
                origin-top
                right-0
                rounded-md
                shadow-md
                z-10
              ">
                <ul className="py-1">
                  <li className="
                    cursor-pointer
                    dark:active:bg-neutral-600
                    dark:hover:bg-neutral-600
                    dark:text-neutral-100
                    flex
                    hover:bg-neutral-400
                    items-center
                    p-2
                    select-none
                    text-neutral-900
                  " onClick={toggleTheme}>
                    <Icon id={themes[themeIndex].icon} /><span className="pl-2">Theme</span>
                  </li>
                  <li className="
                    cursor-pointer
                    dark:active:bg-neutral-600
                    dark:hover:bg-neutral-600
                    dark:text-neutral-100
                    flex
                    hover:bg-neutral-400
                    items-center
                    p-2
                    select-none
                    text-neutral-900
                  " onClick={() => {toggleDropdown([isOpen, setIsOpen]); toggleHistory();}}>
                    <Icon id="clock" /><span className="pl-2">History</span>
                  </li>
                  <li className="
                    cursor-pointer
                    dark:active:bg-neutral-600
                    dark:hover:bg-neutral-600
                    dark:text-neutral-100
                    hidden
                    hover:bg-neutral-400
                    items-center
                    lg:flex
                    p-2
                    select-none
                    text-neutral-900
                  " onClick={toggleKeypad}>
                    <Icon id={keypadVisible ? 'eye' : 'eye-slash'} /><span className="pl-2">Keypad</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-end justify-end p-4">
          <span className="dark:text-rpncalc-primary-light lg:text-5xl text-4xl text-rpncalc-primary xl:text-6xl">
            {formatNumbers(currentExpression)}<span className={`${styles.cursor} dark:text-neutral-100 text-neutral-900`}>|</span>
          </span>
          {pasteEnabled && <span className="
            active:bg-neutral-400
            bg-neutral-300
            cursor-pointer
            dark:active:bg-neutral-600
            dark:bg-neutral-700
            dark:text-neutral-100
            ml-2
            p-2
            rounded-full
            select-none
            text-neutral-900
          " onClick={handlePaste}><Icon id="clipboard" /></span>}
        </div>
      </div>
      <div className={`
        bg-neutral-100
        dark:bg-neutral-900
        flex
        justify-center
        ${keypadVisible && `grow`}
        ${!keypadVisible && `hidden`}
      `} data-name="interface">
        <Keyboard config={inputConfig} visible={keypadVisible} />
      </div>
    </div>
  );
}
