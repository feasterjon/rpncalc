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
    order: button.order,
    styles: configButtonsStyles[button.type] || configButtonsStyles.main,
    size: button.size,
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
    <div className="flex flex-wrap items-center justify-center">
      {buttons.map((button) =>
        <div
          className={`
            ${button.type === 'fn' ? 'basis-1/5' : 'basis-1/4'}
            ${button.order}
            lg:basis-1/5
          `}
          key={`button-${button.id}`}
        >
          <div
            className={`
              aspect-square
              cursor-default
              dark:text-slate-100
              flex
              items-center
              justify-center
              lg:aspect-square
              lg:size-3/4
              mx-auto
              rounded-full
              select-none
              size-2/3
              sm:aspect-auto
              sm:text-base
              text-center
              text-slate-900
              text-xl
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