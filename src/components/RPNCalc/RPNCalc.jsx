'use client';

import { CONFIG } from '../../config';
import { Dialog } from '../Elements/Dialog';
import { Dropdown } from '../Elements/Dropdown';
import { Icon } from '../Elements/Icon';
import { Keyboard } from '../Elements/Keyboard';
import { LoadingScreen } from '../Elements/LoadingScreen';
import { Transition } from '../Elements/Transition';
import { Help } from '../Help';
import { JRPNCalc as RPN } from './JRPNCalc';
import { storage } from '../../utils/storage';
import styles from './RPNCalc.module.css';
import { useEffect, useRef, useState } from 'react';
import { vibrate } from '../../utils/vibrate';

export function RPNCalc(props) {

  const config = props.config ? Object.assign(CONFIG, props.config) : CONFIG;

  const [appHistory, setAppHistory] = useState([]),
    [appHistoryVisible, setAppHistoryVisible] = useState(false),
    [appHistoryExtendedVisible, setAppHistoryExtendedVisible] = useState(false),
    [currentExpression, setCurrentExpression] = useState(''),
    help = config.help,
    inputRef = useRef(null),
    [isLoading, setIsLoading] = useState(true),
    [keyboardVisible, setKeyboardVisible] = useState(true),
    [lastAnswer, setLastAnswer] = useState(''),
    [dialogVisibleHelp, setDialogVisibleHelp] = useState(false),
    msgError = 'error',
    [pasteEnabled, setPasteEnabled] = useState(null),
    [prefersDark, setPrefersDark] = useState(null),
    [theme, setTheme] = useState('light'),
    [themeIndex, setThemeIndex] = useState(0),
    themes = config.themes;

  if (config.storage?.prefix) storage.prefix = config.storage?.prefix;
  useEffect(() => {
    const savedHistory = storage.getItem('history') || [];
    setAppHistory(savedHistory);
    setLastAnswer(savedHistory[savedHistory.length - 1]?.answer || '');
  }, []);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches,
      savedTheme = storage.getItem('theme');
    setPrefersDark(prefersDarkScheme);
    let selectedIndex = themes.findIndex(theme => theme.name === savedTheme);
    let selectedTheme = themes[selectedIndex];
    if (!selectedTheme) selectedIndex = 0;
    if (selectedIndex === 0) {
      const osTheme = prefersDarkScheme ? 'dark' : 'light';
      selectedTheme = themes.find(theme => theme.name === osTheme);
    }
    setTheme(selectedTheme.name);
    setThemeIndex(selectedIndex);
    setIsLoading(false);
  }, [themes]);

  const appHistoryFormatted = appHistory.reduce((accumulator, item) => {
    const date = new Date(item.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    accumulator[date] = accumulator[date] || [];
    accumulator[date].push(item);
    return accumulator
  }, {});

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
    buttons: config.input?.buttons,
    setCurrentInput: handleKeyboardInput
  };

  const calc = () => {
    let out = RPN(formatExpression(currentExpression.toString()), msgError).toString();
    if (out !== msgError) {
      out = formatAnswer(out);
      setLastAnswer(out);
      historyUpdate(currentExpression, out);
      out = `${out} `;
    }
    setCurrentExpression(out);
  }

  const checkPasteEnabled = async () => {
    try {
      await navigator.clipboard.readText();
      setPasteEnabled(true);
    } catch (error) {}
  }
  useEffect(() => {
    checkPasteEnabled();
  }, []);

  const formatAnswer = (data, maxDecimals = 10, maxDigits) => {
    if (!data) return ''
    const parts = data.split('e');
    const partNumber = parts[0],
      partExponent = parts[1];
    const numberParts = partNumber.split('.');
    const numberPartsInteger = maxDigits ? numberParts[0].slice(0, maxDigits) : numberParts[0];
    let numberPartsDecimal = numberParts[1];
    if (maxDecimals && numberPartsDecimal) numberPartsDecimal = numberParts[1].slice(0, maxDecimals);
    if (maxDecimals && partExponent) {
      if ((numberPartsDecimal.length + partExponent.length + 1) > maxDecimals) {
        numberPartsDecimal = `${numberPartsDecimal.slice(0, numberPartsDecimal.length - (partExponent.length + 1))}e${partExponent}`;
        return `${numberPartsInteger}.${numberPartsDecimal}`
      }
      numberPartsDecimal = `${numberPartsDecimal}e${partExponent}`;
    }
    if (numberPartsDecimal) return `${numberPartsInteger}.${numberPartsDecimal}`
    return numberPartsInteger
  }

  const formatExpression = (expression) => {
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

  const formatNumbers = (expression) => {
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
    vibrate();
    const text = await navigator.clipboard.readText();
    if (inputRef.current) inputRef.current.focus();
    if (!text) return
    if (!validateNumbers(text)) return
    setCurrentExpression(`${currentExpression}${text} `);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey && event.key === '/') || event.key === '?') {
        setDialogVisibleHelp(!dialogVisibleHelp);
      }
      if (!event.ctrlKey && event.key === 'h') { // exclude ctrlKey as browsers may access browser history via Ctrl + h
        setAppHistoryVisible(!appHistoryVisible);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [appHistoryVisible, dialogVisibleHelp, setAppHistoryVisible, setDialogVisibleHelp]);

  const toggleHistory = () => {
    vibrate();
    setAppHistoryVisible(!appHistoryVisible);
  };

  const toggleHistoryExtended = () => {
    vibrate();
    setAppHistoryExtendedVisible(!appHistoryExtendedVisible);
  };

  const toggleKeypad = () => {
    vibrate();
    setKeyboardVisible(!keyboardVisible);
  };

  const toggleTheme = () => {
    vibrate();
    let selectedIndex = themeIndex + 1;
    let selectedTheme = themes[selectedIndex],
      selectedThemeName;
    if (!selectedTheme) selectedIndex = 0;
    if (selectedIndex === 0) {
      const osTheme = prefersDark ? 'dark' : 'light';
      selectedTheme = themes.find(theme => theme.name === osTheme);
      selectedThemeName = themes[selectedIndex].name;
    }
    if (!selectedThemeName) selectedThemeName = selectedTheme.name;
    storage.setItem('theme', selectedThemeName);
    setTheme(selectedTheme.name);
    setThemeIndex(selectedIndex);
  };

  const historyRemove = () => {
    appHistory.length = 0;
    storage.removeItem('history');
  };

  const historyUpdate = (expression, answer, lengthMax = 100) => {
    if (!expression || !answer) return
    const lastHistory = appHistory[appHistory.length - 1];
    if (lastHistory?.expression === expression && lastHistory?.answer === answer) return // prevent duplicate history
    if (appHistory.length >= lengthMax) appHistory.splice(0, appHistory.length - lengthMax + 1);
    appHistory.push({
      answer: answer,
      date: Date.now(),
      expression: expression,
      id: getId()
    });
    storage.setItem('history', appHistory);
  };

  const validateNumbers = (expression, maxDecimals, maxDigits) => {
    if (!expression || (!maxDecimals && !maxDigits)) return true
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
    <>
      {isLoading ? (
        <LoadingScreen message="Loading..." />
      ) : (
        <div className={`
          flex
          flex-col
          h-full
          w-full
          ${config.hScreen !== false ? 'h-screen' : ''}
        `} data-mode={theme}>
          <div className="bg-neutral-300 dark:bg-neutral-700" data-name="history">
            <Transition show={appHistoryVisible}>
              <div className="flex p-4" data-name="history-title">
                <div className="
                  dark:text-rpncalc-primary-light
                  flex select-none
                  text-3xl
                  text-rpncalc-primary-dark
                ">
                  <button className="cursor-pointer my-auto" aria-label="Toggle History" onClick={toggleHistory}>
                    <Icon id="arrow-left" styles="h-8 w-8" />
                  </button>
                  <button className="cursor-pointer ml-2" aria-label="Toggle History" onClick={toggleHistory}>History</button>
                </div>
                <div className="flex grow items-end justify-end">
                  <button className="
                    cursor-pointer
                    dark:hover:bg-neutral-600
                    dark:text-neutral-100
                    hover:bg-neutral-400
                    ml-2
                    p-2
                    rounded-full
                    select-none
                    text-neutral-900
                  " aria-label="Clear History" onClick={() => {historyRemove(); toggleHistory();}}>
                    <Icon id="trash" />
                  </button>
                  <button className="
                    cursor-pointer
                    dark:hover:bg-neutral-600
                    dark:text-neutral-100
                    hover:bg-neutral-400
                    ml-2
                    p-2
                    rounded-full
                    select-none
                    text-neutral-900
                  " aria-label="Toggle History" onClick={toggleHistory}>
                    <Icon id="x-mark" />
                  </button>
                </div>
              </div>
              <div className="
                break-all
                dark:text-neutral-100
                items-end
                justify-end
                lg:text-2xl
                text-lg
                text-right
                text-neutral-900
                xl:text-3xl
              ">
                {Object.entries(appHistoryFormatted).map(([date, entries], index) => (
                  <Transition show={(index < Object.entries(appHistoryFormatted).length - 1) ? appHistoryExtendedVisible : true} key={index}>
                    <div className="border-neutral-900 border-t dark:border-neutral-100 p-4">
                      <div className="flex mb-4">
                        <div className="flex grow">
                          <h2 className="text-left" id={`history-${index}`}>{date}</h2>
                        </div>
                        <div className="flex items-end justify-end my-auto">
                          {(Object.entries(appHistoryFormatted).length > 1) && (
                            <button className="
                              bg-neutral-400
                              cursor-pointer
                              dark:bg-neutral-600
                              dark:hover:bg-neutral-500
                              dark:text-neutral-100
                              hover:bg-neutral-500
                              ml-2
                              p-2
                              rounded-full
                              select-none
                              text-neutral-900
                            " aria-label="Toggle Extended History" onClick={toggleHistoryExtended}>
                              {appHistoryExtendedVisible ? (<Icon id="chevron-down" />): <Icon id="chevron-up" />}
                            </button>
                          )}
                        </div>
                      </div>
                      <ul className="list-none" aria-labelledby={`history-${index}`}>
                        {entries.map((entry) => (
                          <li key={`history-${entry.id}`}>
                            {formatNumbers(entry.expression)}<br />
                            <span className="dark:text-rpncalc-primary-light text-rpncalc-primary-dark">{formatNumbers(entry.answer)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Transition>
                ))}
              </div>
            </Transition>
          </div>
          <div className={`
            bg-neutral-200
            dark:bg-neutral-800
            ${keyboardVisible ? '' : 'grow'}
          `} data-name="terminal">
            <div className="flex items-end justify-end p-4">
              <Dropdown config={
                {
                  data: [
                    {
                      icon: themes[themeIndex].icon,
                      id: 1,
                      label: 'Theme',
                      onClick: toggleTheme,
                      persist: true
                    },
                    {
                      icon: 'clock',
                      id: 2,
                      label: 'History',
                      onClick: toggleHistory
                    },
                    {
                      icon: keyboardVisible ? 'eye' : 'eye-slash',
                      id: 3,
                      label: 'Keypad',
                      onClick: toggleKeypad,
                      persist: true,
                      styles: 'hidden lg:flex'
                    },
                    {
                      icon: 'question-mark-circle',
                      id: 4,
                      label: 'Help',
                      onClick: () => { setDialogVisibleHelp(!dialogVisibleHelp) }
                    }
                  ],
                  icon: 'ellipsis-vertical',
                  label: 'Settings',
                  styles: {
                    data: 'dark:hover:bg-neutral-600 dark:text-neutral-100 hover:bg-neutral-400 text-neutral-900',
                    main: 'bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100 hover:bg-neutral-400 ml-2 p-2 rounded-full text-neutral-900',
                    menu: 'bg-neutral-300 dark:bg-neutral-700'
                  }
                }
              } />
            </div>
            <div className="flex items-end justify-end p-4">
              <span className={`
                break-all
                dark:text-rpncalc-primary-light
                text-rpncalc-primary-dark
                xl:text-7xl
                ${(formatNumbers(currentExpression).length < 25) ? 'lg:text-6xl' : 'lg:text-5xl'}
                ${(formatNumbers(currentExpression).length < 20) ? 'md:text-6xl' : 'md:text-5xl'}
                ${(formatNumbers(currentExpression).length < 10) ? 'text-6xl' : 'text-5xl'}
              `}
                aria-label="Expression"
                ref={inputRef}
                role="textbox"
                tabIndex={0}
              >
                {formatNumbers(currentExpression)}<span className={`${styles.cursor} dark:text-neutral-100 text-neutral-900`} aria-hidden="true">|</span>
              </span>
              {pasteEnabled && <button className="
                cursor-pointer
                dark:hover:bg-neutral-700
                dark:text-neutral-100
                hover:bg-neutral-300
                ml-2
                p-2
                rounded-full
                select-none
                text-neutral-900
              "
                aria-label="Paste"
                onClick={handlePaste}
              ><Icon id="clipboard" /></button>}
            </div>
          </div>
          <div className={`
            bg-neutral-100
            dark:bg-neutral-900
            flex
            justify-center
            lg:items-center
            rpncalc-tall:items-center
            ${keyboardVisible ? 'grow' : 'hidden'}
          `} data-name="interface">
            <Keyboard config={inputConfig} />
          </div>
          <Transition show={dialogVisibleHelp}>
            <Dialog
              body={
                <Help config={help} />
              }
            close={() => setDialogVisibleHelp(false)} darkMode={(theme === 'dark') ? true : false} footer={help.footer} title={help.title} />
          </Transition>
        </div>
      )}
    </>
  );
}
