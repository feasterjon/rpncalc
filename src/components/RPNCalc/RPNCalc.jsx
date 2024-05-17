'use client';

import { CONFIG } from '../../config';
import { Dialog } from '../Elements/Dialog';
import { Dropdown } from '../Elements/Dropdown';
import { Help } from '../Help';
import { Icon } from '../Elements/Icon';
import { JRPNCalc as RPN } from './JRPNCalc';
import { Keyboard } from '../Elements/Keyboard';
import { LoadingScreen } from '../Elements/LoadingScreen';
import { randomId } from '../../utils/randomId';
import { storage } from '../../utils/storage';
import styles from './RPNCalc.module.css';
import { Transition } from '../Elements/Transition';
import { useEffect, useReducer, useRef } from 'react';
import { vibrate } from '../../utils/vibrate';

const actions = {
  setAppHistory: 'SET_APP_HISTORY',
  setCurrentExpression: 'SET_CURRENT_EXPRESSION',
  setIsLoading: 'SET_IS_LOADING',
  setLastAnswer: 'SET_LAST_ANSWER',
  setPasteEnabled: 'SET_PASTE_ENABLED',
  setPrefersDark: 'SET_PREFERS_DARK',
  setTheme: 'SET_THEME',
  setThemeIndex: 'SET_THEME_INDEX',
  toggleAppHistoryExtendedVisible: 'TOGGLE_APP_HISTORY_EXTENDED_VISIBLE',
  toggleAppHistoryVisible: 'TOGGLE_APP_HISTORY_VISIBLE',
  toggleDialogVisibleHelp: 'TOGGLE_DIALOG_VISIBLE_HELP',
  toggleKeyboardVisible: 'TOGGLE_KEYBOARD_VISIBLE'
};

const initialState = {
  appHistory: [],
  appHistoryExtendedVisible: false,
  appHistoryVisible: false,
  currentExpression: '',
  dialogVisibleHelp: false,
  isLoading: true,
  keyboardVisible: true,
  lastAnswer: '',
  pasteEnabled: null,
  prefersDark: null,
  theme: 'light',
  themeIndex: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.setAppHistory:
      return { ...state, appHistory: action.payload };
    case actions.setCurrentExpression:
      return { ...state, currentExpression: action.payload };
    case actions.setIsLoading:
      return { ...state, isLoading: action.payload };
    case actions.setLastAnswer:
      return { ...state, lastAnswer: action.payload };
    case actions.setPasteEnabled:
      return { ...state, pasteEnabled: action.payload };
    case actions.setPrefersDark:
      return { ...state, prefersDark: action.payload };
    case actions.setTheme:
      return { ...state, theme: action.payload };
    case actions.setThemeIndex:
      return { ...state, themeIndex: action.payload };
    case actions.toggleAppHistoryExtendedVisible:
      return { ...state, appHistoryExtendedVisible: !state.appHistoryExtendedVisible };
    case actions.toggleAppHistoryVisible:
      return { ...state, appHistoryVisible: !state.appHistoryVisible };
    case actions.toggleDialogVisibleHelp:
      return { ...state, dialogVisibleHelp: !state.dialogVisibleHelp };
    case actions.toggleKeyboardVisible:
      return { ...state, keyboardVisible: !state.keyboardVisible };
    default:
      return state;
  }
};

export function RPNCalc(props) {

  const config = props.config ? Object.assign(CONFIG, props.config) : CONFIG,
    inputRef = useRef(null),
    msgError = 'error',
    [state, dispatch] = useReducer(reducer, initialState);

  const help = config.help,
    themes = config.themes;

  if (config.storage?.prefix) storage.prefix = config.storage?.prefix;

  const setAppHistory = (data) => {
    dispatch({ type: actions.setAppHistory, payload: data });
  },
  setCurrentExpression = (data) => {
    dispatch({ type: actions.setCurrentExpression, payload: data });
  },
  setIsLoading = (data) => {
    dispatch({ type: actions.setIsLoading, payload: data });
  },
  setLastAnswer = (data) => {
    dispatch({ type: actions.setLastAnswer, payload: data });
  },
  setPasteEnabled = (data) => {
    dispatch({ type: actions.setPasteEnabled, payload: data });
  },
  setPrefersDark = (data) => {
    dispatch({ type: actions.setPrefersDark, payload: data });
  },
  setTheme = (data) => {
    dispatch({ type: actions.setTheme, payload: data });
  },
  setThemeIndex = (data) => {
    dispatch({ type: actions.setThemeIndex, payload: data });
  },
  toggleAppHistoryExtendedVisible = () => {
    dispatch({ type: actions.toggleAppHistoryExtendedVisible });
  },
  toggleAppHistoryVisible = () => {
    dispatch({ type: actions.toggleAppHistoryVisible });
  },
  toggleDialogVisibleHelp = () => {
    dispatch({ type: actions.toggleDialogVisibleHelp });
  },
  toggleKeyboardVisible = () => {
    dispatch({ type: actions.toggleKeyboardVisible });
  };

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches,
      savedTheme = storage.getItem('theme');
    let savedHistory = storage.getItem('history') || [];
    if (!Array.isArray(savedHistory)) {
      savedHistory = [];
      storage.removeItem('history');
    }
    setAppHistory(savedHistory);
    setLastAnswer(savedHistory[savedHistory.length - 1]?.answer || '');
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

  const checkPasteEnabled = async () => {
    try {
      await navigator.clipboard.readText();
      setPasteEnabled(true);
    } catch (error) {}
  }
  useEffect(() => {
    checkPasteEnabled();
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey && event.key === '/') || event.key === '?') {
        toggleDialogVisibleHelp();
      }
      if (!event.ctrlKey && event.key === 'h') { // exclude ctrlKey as browsers may access browser history via Ctrl + h
        toggleAppHistoryVisible();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [state.appHistoryVisible, state.dialogVisibleHelp]);

  const appHistoryFormatted = state.appHistory.reduce((accumulator, item) => {
    const date = new Date(item.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    accumulator[date] = accumulator[date] || [];
    accumulator[date].push(item);
    return accumulator
  }, {});

  const calc = () => {
    let out = RPN(formatExpression(state.currentExpression.toString()), msgError).toString();
    if (out !== msgError) {
      out = formatAnswer(out);
      setLastAnswer(out);
      historyUpdate(state.currentExpression, out);
      out = `${out} `;
    }
    setCurrentExpression(out);
  }

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

  const handleInsert = (data) => {
    if (!data) return
    if (!validateNumbers(data)) return
    setCurrentExpression(`${state.currentExpression}${data} `);
  };

  const handleKeyboardInput = (data) => {
    if (!data) return
    switch (data.value) {
      case 'a':
        setCurrentExpression(`${state.currentExpression}${state.lastAnswer} `);
        break;
      case 'Backspace':
        if (state.currentExpression === msgError) {
          setCurrentExpression('');
          break;
        }
        setCurrentExpression(state.currentExpression.substring(0, (state.currentExpression.length - 1)));
        break;
      case 'Delete':
        setCurrentExpression('');
        break;
      case 'Enter':
        calc();
        break;
      default:
        let out = (data.value === ' ' || data.value === '.') ? data.value : data.label || data.value; // do not set the Space or Period label
        out = `${state.currentExpression}${out}`;
        if (validateNumbers(out)) setCurrentExpression(out);
        break;
    }
  };

  const inputConfig = {
    buttons: config.input?.buttons,
    setCurrentInput: handleKeyboardInput
  };

  const handlePaste = async () => {
    vibrate();
    const text = await navigator.clipboard.readText();
    if (inputRef.current) inputRef.current.focus();
    if (!text) return
    if (!validateNumbers(text)) return
    setCurrentExpression(`${state.currentExpression}${text} `);
  };

  const historyRemove = () => {
    state.appHistory.length = 0;
    storage.removeItem('history');
  };

  const historyUpdate = (expression, answer, lengthMax = 100) => {
    if (!expression || !answer) return
    const lastHistory = state.appHistory[state.appHistory.length - 1];
    if (lastHistory?.expression === expression && lastHistory?.answer === answer) return // prevent duplicate history
    if (state.appHistory.length >= lengthMax) state.appHistory.splice(0, state.appHistory.length - lengthMax + 1);
    state.appHistory.push({
      answer: answer,
      date: Date.now(),
      expression: expression,
      id: randomId()
    });
    storage.setItem('history', state.appHistory);
  };

  const toggleTheme = () => {
    let selectedIndex = state.themeIndex + 1;
    let selectedTheme = themes[selectedIndex],
      selectedThemeName;
    if (!selectedTheme) selectedIndex = 0;
    if (selectedIndex === 0) {
      const osTheme = state.prefersDark ? 'dark' : 'light';
      selectedTheme = themes.find(theme => theme.name === osTheme);
      selectedThemeName = themes[selectedIndex].name;
    }
    if (!selectedThemeName) selectedThemeName = selectedTheme.name;
    storage.setItem('theme', selectedThemeName);
    setTheme(selectedTheme.name);
    setThemeIndex(selectedIndex);
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
      {state.isLoading ? (
        <LoadingScreen message="Loading..." />
      ) : (
        <div className={`
          flex
          flex-col
          h-full
          w-full
          ${config.hScreen !== false ? 'h-screen' : ''}
        `} data-mode={state.theme}>
          <div className="bg-neutral-300 dark:bg-neutral-700" data-name="history">
            <Transition show={state.appHistoryVisible}>
              <div className="flex p-4" data-name="history-title">
                <div className="
                  dark:text-rpncalc-primary-light
                  flex select-none
                  text-3xl
                  text-rpncalc-primary-dark
                ">
                  <button className="cursor-pointer my-auto" aria-label="Toggle History" onClick={toggleAppHistoryVisible}>
                    <Icon id="arrow-left" styles="h-8 w-8" />
                  </button>
                  <button className="cursor-pointer ml-2" aria-label="Toggle History" onClick={toggleAppHistoryVisible}>History</button>
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
                  " aria-label="Clear History" onClick={() => {historyRemove(); toggleAppHistoryVisible();}}>
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
                  " aria-label="Toggle History" onClick={toggleAppHistoryVisible}>
                    <Icon id="x-mark" />
                  </button>
                </div>
              </div>
              <div className="
                break-all
                dark:text-neutral-100
                items-end
                justify-end
                text-3xl
                text-right
                text-neutral-900
              ">
                {Object.entries(appHistoryFormatted).map(([date, entries], index) => (
                  <Transition show={(index < Object.entries(appHistoryFormatted).length - 1) ? state.appHistoryExtendedVisible : true} key={index}>
                    <div className="border-neutral-900 border-t dark:border-neutral-100 p-4">
                      <div className="flex mb-4">
                        <div className="flex grow">
                          <h2 className="cursor-pointer select-all text-left" id={`history-${index}`}>{date}</h2>
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
                            " aria-label="Toggle Extended History" onClick={toggleAppHistoryExtendedVisible}>
                              {state.appHistoryExtendedVisible ? (<Icon id="chevron-down" />): <Icon id="chevron-up" />}
                            </button>
                          )}
                        </div>
                      </div>
                      <ul className="list-none" aria-labelledby={`history-${index}`}>
                        {entries.map((entry) => (
                          <li className="py-2" key={`history-${entry.id}`}>
                            <span className="
                              cursor-pointer
                              select-all
                            " onClick={() => {handleInsert(entry.expression);}}>{formatNumbers(entry.expression)}</span><br />
                            <span className="
                              cursor-pointer
                              dark:text-rpncalc-primary-light
                              select-all
                              text-rpncalc-primary-dark
                            " onClick={() => {handleInsert(entry.answer);}}>{formatNumbers(entry.answer)}</span>
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
            ${state.keyboardVisible ? '' : 'grow'}
          `} data-name="terminal">
            <div className="flex items-end justify-end p-4">
              <Dropdown config={
                {
                  data: [
                    {
                      icon: themes[state.themeIndex].icon,
                      id: 1,
                      label: 'Theme',
                      onClick: toggleTheme,
                      persist: true
                    },
                    {
                      icon: 'clock',
                      id: 2,
                      label: 'History',
                      onClick: toggleAppHistoryVisible
                    },
                    {
                      icon: state.keyboardVisible ? 'eye' : 'eye-slash',
                      id: 3,
                      label: 'Keypad',
                      onClick: toggleKeyboardVisible,
                      persist: true,
                      styles: 'hidden lg:flex'
                    },
                    {
                      icon: 'question-mark-circle',
                      id: 4,
                      label: 'Help',
                      onClick: () => { toggleDialogVisibleHelp() }
                    }
                  ],
                  icon: 'ellipsis-vertical',
                  label: 'Settings',
                  styles: {
                    data: 'dark:hover:bg-neutral-600 dark:text-neutral-100 hover:bg-neutral-400 p-3 text-neutral-900 text-xl',
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
                ${(formatNumbers(state.currentExpression).length < 25) ? 'lg:text-6xl' : 'lg:text-5xl'}
                ${(formatNumbers(state.currentExpression).length < 20) ? 'md:text-6xl' : 'md:text-5xl'}
                ${(formatNumbers(state.currentExpression).length < 10) ? 'text-6xl' : 'text-5xl'}
              `}
                aria-label="Expression"
                ref={inputRef}
                role="textbox"
                tabIndex={0}
              >
                {formatNumbers(state.currentExpression)}<span className={`${styles.cursor} dark:text-neutral-100 text-neutral-900`} aria-hidden="true">|</span>
              </span>
              {state.pasteEnabled && <button className="
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
            ${state.keyboardVisible ? 'grow' : 'hidden'}
          `} data-name="interface">
            <Keyboard config={inputConfig} />
          </div>
          <Transition show={state.dialogVisibleHelp}>
            <Dialog
              close={() => toggleDialogVisibleHelp()}
              darkMode={(state.theme === 'dark') ? true : false}
              footer={help.footer}
              title={help.title}
            >
              <Help config={help} />
            </Dialog>
          </Transition>
        </div>
      )}
    </>
  );
}
