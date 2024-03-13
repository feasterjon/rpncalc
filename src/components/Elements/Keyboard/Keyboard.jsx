import { Icon } from '../Icon';
import { useEffect, useState } from 'react';
import { vibrate } from '../../../utils/vibrate';

export function Keyboard(props) {

  const configButtons = props.config.buttons?.data || [],
    configButtonsStyles = props.config.buttons?.styles || {},
    [dynamicStyles, setDynamicStyles] = useState(''),
    [pressedKey, setPressedKey] = useState(''),
    setCurrentInput = props.config.setCurrentInput;

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
    <div className="
      flex
      lg:aspect-square
      lg:w-auto
      sm:w-full
      w-auto
    ">
      <div className="
        flex
        flex-wrap
        items-center
        justify-center
        w-full
      ">
        {buttons.map((button) =>
          <div
            className={`
              ${button.type === 'fn' ? 'basis-1/5' : 'basis-1/4'}
              ${button.order}
              sm:basis-1/5
            `}
            key={`button-${button.id}`}
          >
            <button
              className={`
                aspect-square
                cursor-pointer
                dark:text-neutral-100
                flex
                font-bold
                items-center
                justify-center
                lg:aspect-square
                mx-auto
                my-[0.125rem]
                rounded-full
                select-none
                size-3/4
                sm:aspect-auto
                sm:size-11/12
                text-center
                text-neutral-900
                text-2xl
                ${button.styles.etc}
                ${`button-${button.id}` === `button-${pressedKey}` ? dynamicStyles : button.styles.main ? button.styles.main : ''}
              `}
              aria-label={button.label}
              onClick={() => handleInput(button)}
              tabIndex={-1}
            >
              {button.icon ? <Icon id={button.icon} /> : button.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}