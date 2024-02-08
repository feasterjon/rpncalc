import './index.css';
import { useEffect, useState } from 'react';

export function Keyboard({ config = {} }) {

  const configButtons = config.buttons?.data || [],
    configButtonsStyles = config.buttons?.styles || {},
    [dynamicStyles, setDynamicStyles] = useState(''),
    [pressedKey, setPressedKey] = useState(''),
    setCurrentInput = config.setCurrentInput,
    vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  const buttons = configButtons.map((button) => ({
    id: button.id,
    label: button.label || button.value,
    styles: configButtonsStyles[button.type] || configButtonsStyles.main,
    type: button.type,
    value: button.value
  }));

  const handleInput = (input) => {
    vibrateBasic();
    setCurrentInput(input);
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
        setCurrentInput(button);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [buttons, setCurrentInput]);

  const vibrateBasic = (pattern = [50]) => {
    if (!vibrateEnabled) return
    window.navigator.vibrate(pattern);
  };

  return (
    <div className="flex flex-wrap">
      {buttons.map((button) =>
        <div className="w-1/5" key={`button-${button.id}`}>
          <div
            className={`cursor-default font-bold m-2 p-2 rounded-full select-none text-center text-dark
              ${`button-${button.id}` === `button-${pressedKey}` ? dynamicStyles : button.styles?.main}
            `}
            onClick={() => handleInput(button)}
          >
            {button.label}
          </div>
        </div>
      )}
    </div>
  );
}