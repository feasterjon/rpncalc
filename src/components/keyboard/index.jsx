import { vibrate } from './helpers';
import { Icon } from './icon';
import { useEffect, useState } from 'react';

export function Keyboard({ config = {} }) {

  const configButtons = config.buttons?.data || [],
    configButtonsStyles = config.buttons?.styles || {},
    [dynamicStyles, setDynamicStyles] = useState(''),
    [pressedKey, setPressedKey] = useState(''),
    setCurrentInput = config.setCurrentInput;

  const buttons = configButtons.map((button) => ({
    icon: button.icon,
    id: button.id,
    label: button.label || button.value,
    order: button.order,
    styles: configButtonsStyles[button.type] || configButtonsStyles.main,
    size: button.size,
    type: button.type,
    value: button.value
  }));

  const handleInput = (input) => {
    vibrate();
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

  return (
    <div className="flex flex-wrap items-center justify-center lg:aspect-square lg:w-auto sm:aspect-auto sm:w-11/12">
      {buttons.map((button) =>
        <div
          className={`
            ${button.type === 'fn' ? 'basis-1/5' : 'basis-1/4'}
            ${button.order}
            sm:basis-1/5
          `}
          key={`button-${button.id}`}
        >
          <div
            className={`
              aspect-square
              cursor-pointer
              dark:text-neutral-100
              flex
              font-bold
              items-center
              justify-center
              lg:aspect-square
              lg:text-2xl
              mx-auto
              my-1
              rounded-full
              select-none
              size-3/4
              sm:aspect-auto
              sm:size-11/12
              sm:text-base
              text-center
              text-neutral-900
              text-xl
              ${button.styles.etc}
              ${`button-${button.id}` === `button-${pressedKey}` ? dynamicStyles : button.styles.main ? button.styles.main : ''}
            `}
            onClick={() => handleInput(button)}
          >
            {button.icon ? <Icon id={button.icon} /> : button.label}
          </div>
        </div>
      )}
    </div>
  );
}