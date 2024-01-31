import './index.css';
import configMain from './index.json';
import { useEffect, useState } from 'react';

function Keyboard({ config = {} }) {

  const configKeyboard = configMain.data.attributes.keyboard;

  const cols = config.cols || configKeyboard.defaults.cols,
    currentInput = config.currentInput,
    [dynamicStyles, setDynamicStyles] = useState(''),
    idKeyboard = config.id || 'main',
    [pressedKey, setPressedKey] = useState(''),
    setCurrentInput = config.setCurrentInput,
    vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  const buttons = configKeyboard.data[idKeyboard].map((button) => ({
    id: button.id,
    label: button.label || button.value,
    styles: configKeyboard.styles[button.type] || configKeyboard.styles.main,
    type: button.type,
    value: button.value
  }));

  const handleInput = (input) => {
    vibrateBasic();
    setCurrentInput(`${currentInput}${input.value}`);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const button = buttons.find(button => button.value === event.key);
      if (button) {
        setPressedKey(button.id);
        setDynamicStyles(button.styles.active || '');
        setTimeout(() => {
          setPressedKey(null);
          setDynamicStyles('');
        }, 100);
        setCurrentInput((currentInput) => `${currentInput}${event.key}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const vibrateBasic = (pattern = [50]) => {
    if (!vibrateEnabled) return
    window.navigator.vibrate(pattern);
  };

  return (
    <div className={`grid grid-cols-${cols}`}>
      {buttons.map((button) =>
        <div
          className={`cursor-default font-bold m-2 p-2 rounded-full select-none text-center
            ${`button-${button.id}` === `button-${pressedKey}` ? dynamicStyles : button.styles?.main}
          `}
          key={`button-${button.id}`}
          onClick={() => handleInput(button)}
        >
          {button.label}
        </div>
      )}
    </div>
  );
}

export default Keyboard;